import { projectPlaceholder } from "./images"

export const defaultProjects = [
    {
        id: "portfolio-v1",
        cover: projectPlaceholder,
        title: "Portfolio",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "website",
        featured: true,
        status: "In-progress",
        live: "/",
        github: "https://github.com/ROM-01",
        media: [projectPlaceholder, ]
    },
    {
        id: "portfolio-v2",
        cover: projectPlaceholder,
        title: "Portfolio",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "website",
        featured: true,
        status: "Complete",
        live: "/",
        github: "https://github.com/ROM-01",
        media: [projectPlaceholder, "demo.mp4"]
    },
    {
        id: "portfolio-v3",
        cover: projectPlaceholder,
        title: "Portfolio",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "website",
        featured: true,
        status: "",
        live: "something",
        github: "something",
        media: ["something", "demo.mp4"]
    },
    {
        id: "portfolio-v4",
        cover: projectPlaceholder,
        title: "Portfolio",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "website",
        featured: true,
        status: "",
        live: "something",
        github: "something",
        media: ["something", "demo.mp4"]
    },
    {
        id: "planet-v1",
        cover: projectPlaceholder,
        title: "Planet Information",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "mobile",
        featured: false,
        status: "",
        live: "something",
        github: "something",
        media: ["something", "demo.mp4"]
    },
    {
        id: "horror-v1",
        cover: projectPlaceholder,
        title: "Horror Game",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "games",
        featured: false,
        status: "",
        live: "something",
        github: "something",
        media: ["something", "demo.mp4"]
    },
    {
        id: "logger-v1",
        cover: projectPlaceholder,
        title: "Log Monitor",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "systems",
        featured: false,
        status: "",
        live: "something",
        github: "something",
        media: ["something", "demo.mp4"]
    }
]

const FEATURED_LIMIT = 4
const STORAGE_KEY = "projects"

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
    const fallbackCover = isImageSource(requestedCover)
        ? requestedCover
        : (firstImageMedia || projectPlaceholder)

    return {
        id: String(input.id || "").trim() || generatedId,
        cover: fallbackCover,
        title,
        date: String(input.date || "").trim(),
        description: String(input.description || "").trim(),
        tech: splitInputToList(input.tech),
        label: String(input.label || "").trim(),
        featured: Boolean(input.featured),
        status: String(input.status || "").trim(),
        live: String(input.live || "").trim(),
        github: String(input.github || "").trim(),
        media: mediaItems.length ? mediaItems : [fallbackCover]
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

function loadProjects() {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []

    try {
        const parsed = JSON.parse(data)
        return normalizeProjectList(parsed)
    } catch {
        return []
    }
}

export function getProjects() {
    const storedProjects = loadProjects()
    if (storedProjects.length) return storedProjects
    return normalizeProjectList(defaultProjects)
}

export function getFeaturedProjects(limit = FEATURED_LIMIT) {
    const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : FEATURED_LIMIT
    const allProjects = getProjects()
    const selected = allProjects.filter((project) => project.featured).slice(0, safeLimit)
    if (selected.length === safeLimit) return selected

    const selectedIds = new Set(selected.map((project) => project.id))
    const defaultFallback = defaultProjects
        .filter((project) => project.featured)
        .map((project, index) => normalizeProject(project, index))
        .filter((project) => !selectedIds.has(project.id))

    return [...selected, ...defaultFallback].slice(0, safeLimit)
}
