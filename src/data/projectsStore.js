import { projectPlaceholder } from "./images"
import { addPreconnect, preloadImages } from "../utils/imagePreload"
import { createClient } from "@supabase/supabase-js"

const FEATURED_LIMIT = 4
const SUPABASE_URL = String(import.meta.env.VITE_SUPABASE_URL || "").trim()
const SUPABASE_ANON_KEY = String(import.meta.env.VITE_SUPABASE_ANON_KEY || "").trim()

function isValidHttpUrl(value = "") {
    try {
        const url = new URL(String(value || "").trim())
        return url.protocol === "http:" || url.protocol === "https:"
    } catch {
        return false
    }
}

const supabase = isValidHttpUrl(SUPABASE_URL) && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null

let projectsCache = []
let projectsInitialized = false

function isImageSource(value = "") {
    const normalized = String(value || "").trim()
    if (!normalized) return false

    if (normalized.startsWith("data:image/")) return true
    if (normalized.startsWith("blob:")) return true
    if (normalized.startsWith("/")) return true

    return /\.(avif|webp|png|jpe?g|gif|svg)([?#].*)?$/i.test(normalized)
}

function splitInputToList(value) {
    if (Array.isArray(value)) {
        return value
            .map((item) => String(item || "").trim())
            .filter(Boolean)
    }

    return String(value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
}

function removeCustomPrefix(value = "") {
    return String(value || "").trim().replace(/^custom:/i, "").trim()
}

function normalizeProject(input = {}, index = 0) {
    const title = String(input.title || "").trim() || "Untitled Project"
    const slugBase = title
        .toLowerCase()
        .replaceAll(/[^a-z0-9]+/g, "-")
        .replaceAll(/^-+|-+$/g, "")
    const generatedId = slugBase || `project-${index + 1}`

    const mediaItems = splitInputToList(input.media)
    const requestedCover = String(input.cover || "").trim()
    const firstImageMedia = mediaItems.find((item) => isImageSource(item)) || ""
    const normalizedCover = isImageSource(requestedCover)
        ? requestedCover
        : firstImageMedia

    const normalizedLabels = splitInputToList(input.labels).map(removeCustomPrefix).filter(Boolean)
    const singleLabel = removeCustomPrefix(input.label)
    const labels = normalizedLabels.length
        ? normalizedLabels
        : (singleLabel ? [singleLabel] : [])
    const normalizedStatus = removeCustomPrefix(input.status)
    const featuredOrderCandidate = Number(input.featured_order)
    const featuredOrder = Number.isFinite(featuredOrderCandidate) && featuredOrderCandidate >= 1 && featuredOrderCandidate <= 4
        ? Math.trunc(featuredOrderCandidate)
        : null

    return {
        id: String(input.id || "").trim() || generatedId,
        cover: normalizedCover,
        title,
        date: String(input.date || "").trim(),
        description: String(input.description || "").trim(),
        tech: splitInputToList(input.tech),
        labels,
        label: labels[0] || "",
        featured: Boolean(input.featured),
        featured_order: featuredOrder,
        status: normalizedStatus,
        live: String(input.live || "").trim(),
        github: String(input.github || "").trim(),
        media: mediaItems
    }
}

function ensureUniqueProjectIds(projectList) {
    const usedIds = new Set()

    return projectList.map((project, index) => {
        let nextId = String(project.id || "").trim() || `project-${index + 1}`
        while (usedIds.has(nextId)) {
            nextId = `${nextId}-${index + 1}`
        }

        usedIds.add(nextId)
        return { ...project, id: nextId }
    })
}

function normalizeProjectList(list) {
    if (!Array.isArray(list)) return []
    const normalized = list.map((project, index) => normalizeProject(project, index))
    return ensureUniqueProjectIds(normalized)
}

function mapSupabaseProject(record = {}, index = 0) {
    return normalizeProject({
        id: String(record.slug || record.id || "").trim() || `project-${index + 1}`,
        title: record.title,
        date: record.date,
        description: record.description,
        tech: record.tech,
        labels: record.labels,
        label: record.label,
        featured_order: record.featured_order,
        status: record.status,
        featured: Boolean(record.featured),
        cover: record.cover_url,
        media: Array.isArray(record.media) ? record.media : [],
        live: record.live_url,
        github: record.github_url
    }, index)
}

function createUnavailableFeaturedProject(slotIndex = 0) {
    return normalizeProject({
        id: `featured-unavailable-${slotIndex + 1}`,
        title: "Not Available",
        description: "",
        tech: ["?"],
        label: "?",
        status: "",
        featured: true,
        cover: projectPlaceholder,
        media: []
    }, slotIndex)
}

export async function initializeProjectsStore() {
    if (projectsInitialized) return projectsCache
    projectsInitialized = true

    if (!supabase) {
        projectsCache = []
        return projectsCache
    }

    try {
        const { data, error } = await supabase
            .from("projects")
            .select(`
                id,
                slug,
                title,
                date,
                description,
                tech,
                labels,
                label,
                status,
                featured,
                featured_order,
                cover_url,
                media,
                live_url,
                github_url,
                is_published
            `)
            .eq("is_published", true)
            .order("created_at", { ascending: false })

        if (error) throw error

        const mappedProjects = normalizeProjectList((data || []).map((record, index) => mapSupabaseProject(record, index)))
        projectsCache = mappedProjects

        addPreconnect(SUPABASE_URL)
        const featured = getFeaturedProjects(FEATURED_LIMIT)
        const coverUrls = featured.map((p) => p.cover).filter(Boolean)
        preloadImages(coverUrls, 6)
    } catch {
        projectsCache = []
    }

    return projectsCache
}

export function getProjects() {
    return projectsCache
}

export function getFeaturedProjects(limit = FEATURED_LIMIT) {
    const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : FEATURED_LIMIT
    const allProjects = getProjects()
    const selected = allProjects
        .filter((project) => project.featured)
        .map((project, index) => ({ project, index }))
        .sort((left, right) => {
            const leftOrderCandidate = Number(left.project.featured_order)
            const rightOrderCandidate = Number(right.project.featured_order)
            const leftOrder = Number.isFinite(leftOrderCandidate) && leftOrderCandidate >= 1 && leftOrderCandidate <= 4
                ? leftOrderCandidate
                : Number.MAX_SAFE_INTEGER
            const rightOrder = Number.isFinite(rightOrderCandidate) && rightOrderCandidate >= 1 && rightOrderCandidate <= 4
                ? rightOrderCandidate
                : Number.MAX_SAFE_INTEGER
            if (leftOrder !== rightOrder) return leftOrder - rightOrder
            return left.index - right.index
        })
        .map((entry) => entry.project)
        .slice(0, safeLimit)
    if (selected.length === safeLimit) return selected

    const placeholders = []
    for (let index = selected.length; index < safeLimit; index += 1) {
        placeholders.push(createUnavailableFeaturedProject(index))
    }

    return [...selected, ...placeholders]
}
