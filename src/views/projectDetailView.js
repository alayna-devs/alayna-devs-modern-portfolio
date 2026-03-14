import { getProjects } from "../data/projectsStore"
import { openNewTab } from "../utils/utils"

import "../style/projectDetailView.css"
import { createNav } from "../components/nav"
import { createFooter } from "../components/footer"
import { create404View } from "./404View"
import { escapeHtml } from "../utils/escapeHtml"

function isImageUrl(value = "") {
    return /\.(avif|webp|png|jpe?g|gif|svg)([?#].*)?$/i.test(String(value))
}

function isVideoUrl(value = "") {
    return /\.(mp4|webm|mov|m4v|ogg)([?#].*)?$/i.test(String(value))
}

function isOpenableUrl(value = "") {
    const normalized = String(value).trim()
    if (!normalized) return false
    return /^(https?:\/\/|mailto:|tel:|\/)/i.test(normalized)
}

function getProjectMediaItems(project) {
    const mediaItems = Array.isArray(project.media) ? project.media : [project.media]
    const parsedMediaItems = mediaItems
        .filter((item) => typeof item === "string" && item.trim())
        .map((item) => item.trim())
        .flatMap((item) => {
            if (isImageUrl(item)) return [{ type: "image", src: item }]
            if (isVideoUrl(item)) return [{ type: "video", src: item }]
            return []
        })

    if (parsedMediaItems.length > 0) return parsedMediaItems

    const cover = String(project.cover || "").trim()
    if (isImageUrl(cover)) return [{ type: "image", src: cover }]
    if (isVideoUrl(cover)) return [{ type: "video", src: cover }]

    return []
}

function renderMediaItem(media, index, title) {
    if (media.type === "video") {
        return `
            <div class="details-media-card">
                <video
                    class="details-media"
                    controls
                    playsinline
                    preload="metadata"
                    src="${escapeHtml(media.src)}"
                    aria-label="${title} project video ${index + 1}"
                ></video>
            </div>
        `
    }

    return `
        <div class="details-media-card">
            <img
                class="details-media"
                src="${escapeHtml(media.src)}"
                alt="${title} preview ${index + 1}"
                loading="${index === 0 ? "eager" : "lazy"}"
                decoding="async"
                fetchpriority="${index === 0 ? "high" : "auto"}"
                width="1200"
                height="900"
            />
        </div>
    `
}

function getProjectLabels(project) {
    if (Array.isArray(project.labels) && project.labels.length) {
        return project.labels
            .map((label) => String(label || "").trim())
            .filter(Boolean)
    }

    const singleLabel = String(project.label || "").trim()
    if (!singleLabel) return []

    return singleLabel
        .split(",")
        .map((label) => label.trim())
        .filter(Boolean)
}

export function createProjectDetailView(id) {
    const projects = getProjects()
    const projectIndex = projects.findIndex((p) => p.id === id)
    const project = projectIndex >= 0 ? projects[projectIndex] : undefined

    if (!project) {
        return `
            ${create404View()}
        `
    }

    const title = escapeHtml(project.title || "Project")
    const date = String(project.date || "").trim()
    const status = String(project.status || "").trim()
    const description = escapeHtml(String(project.description || "").trim() || "No project description has been added yet.")
    const labels = getProjectLabels(project)
    const techItems = Array.isArray(project.tech)
        ? project.tech.map((item) => String(item || "").trim()).filter(Boolean).map(escapeHtml)
        : []
    const mediaItems = getProjectMediaItems(project)
    const hasMedia = mediaItems.length > 0

    const rawGithubUrl = String(project.github || "").trim()
    const rawLiveUrl = String(project.live || "").trim()
    const hasGithubUrl = isOpenableUrl(rawGithubUrl)
    const hasLiveUrl = isOpenableUrl(rawLiveUrl)
    const githubUrl = escapeHtml(rawGithubUrl)
    const liveUrl = escapeHtml(rawLiveUrl)

    const labelChip = labels.length
        ? `<span class="details-chip">${
            labels
                .map((label) => escapeHtml(label))
                .join(` <span class="details-chip-separator" aria-hidden="true">•</span> `)
        }</span>`
        : ""
    const metaChipValues = [status, date].filter(Boolean)
    const metaChips = [
        labelChip,
        ...metaChipValues.map((value) => `<span class="details-chip">${escapeHtml(value)}</span>`)
    ].join("")

    const techHtml = techItems.length
        ? techItems.map((item) => `<span class="details-tech-item">${item}</span>`).join("")
        : `<span class="details-tech-empty">No tech stack listed.</span>`

    const mediaHtml = hasMedia
        ? mediaItems.map((media, index) => renderMediaItem(media, index, title)).join("")
        : ""

    const actionButtonsHtml = [
        hasGithubUrl
            ? `<button class="details-action link-button details-github" type="button" data-url="${githubUrl}">View Code</button>`
            : "",
        hasLiveUrl
            ? `<button class="details-action link-button details-live" type="button" data-url="${liveUrl}">View Live Project</button>`
            : ""
    ].filter(Boolean).join("")

    const previousProject = projectIndex > 0 ? projects[projectIndex - 1] : null
    const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null
    const previousProjectId = previousProject ? escapeHtml(previousProject.id) : ""
    const nextProjectId = nextProject ? escapeHtml(nextProject.id) : ""

    return `
        ${createNav()}
        <section id="project-details">
            <div class="container">
                <a class="link-button go-back-link" href="/projects" data-go-back data-link>Go Back</a>
                <div class="project-details-shell">
                    <div class="project-details-div${hasMedia ? "" : " project-details-div--no-media"}">
                        <div class="details-info-div">
                            <h1 class="details-title">${title}</h1>
                            ${metaChips ? `<div class="details-meta">${metaChips}</div>` : ""}
                            <p class="details-desc">${description}</p>
                            <div class="details-tech-list">
                                ${techHtml}
                            </div>
                            ${actionButtonsHtml ? `<div class="details-actions">${actionButtonsHtml}</div>` : ""}
                        </div>

                        ${hasMedia ? `<div class="details-media-div">${mediaHtml}</div>` : ""}

                    </div>

                    <div class="details-project-nav">
                        <button
                            class="project-nav-btn project-nav-btn--left"
                            type="button"
                            data-project-nav="prev"
                            data-target-id="${previousProjectId}"
                            ${previousProject ? "" : "disabled"}
                            aria-label="Previous project"
                        >
                            <span aria-hidden="true">&#8592;</span>
                        </button>
                        <button
                            class="project-nav-btn project-nav-btn--right"
                            type="button"
                            data-project-nav="next"
                            data-target-id="${nextProjectId}"
                            ${nextProject ? "" : "disabled"}
                            aria-label="Next project"
                        >
                            <span aria-hidden="true">&#8594;</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
        ${createFooter()}
    `
}

export function initProjectDetailView() {
    const projectDetails = document.querySelector("#project-details")
    if (!projectDetails) return

    const handleClick = (e) => {
        const goBackLink = e.target.closest("[data-go-back]")
        if (goBackLink) {
            e.preventDefault()
            if (window.history.length > 1) {
                window.history.back()
                return
            }

            history.pushState({}, "", "/projects")
            window.dispatchEvent(new PopStateEvent("popstate"))
            window.scrollTo({ top: 0, left: 0, behavior: "auto" })
            return
        }

        const button = e.target.closest(".details-github, .details-live")
        if (button && projectDetails.contains(button)) {
            const url = button.dataset.url || ""
            if (!isOpenableUrl(url)) return

            openNewTab(url)
            return
        }

        const navButton = e.target.closest("[data-project-nav]")
        if (!navButton || !projectDetails.contains(navButton) || navButton.disabled) return

        const targetId = String(navButton.dataset.targetId || "").trim()
        if (!targetId) return

        history.replaceState({ ...(history.state || {}), scrollY: window.scrollY }, "", `/project/${encodeURIComponent(targetId)}`)
        window.dispatchEvent(new PopStateEvent("popstate"))
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }

    projectDetails.addEventListener("click", handleClick)

    return () => {
        projectDetails.removeEventListener("click", handleClick)
    }
}
