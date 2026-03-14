import { projectPlaceholder } from "../data/images"
import { escapeHtml } from "../utils/escapeHtml"

function isImageSource(value = "") {
    const normalized = String(value || "").trim()
    if (!normalized) return false

    if (normalized.startsWith("data:image/")) return true
    if (normalized.startsWith("blob:")) return true
    if (normalized.startsWith("/")) return true

    return /\.(avif|webp|png|jpe?g|gif|svg)([?#].*)?$/i.test(normalized)
}

export function createProjectCard(project, options = {}) {
    if (!project || !project.id) return ""

    const className = options.className ? ` ${options.className}` : ""
    const isUnavailable = String(project.id).startsWith("featured-unavailable-")
    const title = escapeHtml(project.title || "Untitled Project")
    const labelOrder = ["website", "mobile", "games", "systems", "desktop"]
    const labels = Array.isArray(project.labels) && project.labels.length
        ? project.labels
            .map((item) => String(item || "").trim().replace(/^custom:/i, ""))
            .filter(Boolean)
        : [String(project.label || "").trim().replace(/^custom:/i, "")].filter(Boolean)
    const sortedLabels = [...new Set(labels)].sort((a, b) => {
        const left = a.toLowerCase()
        const right = b.toLowerCase()
        const leftIndex = labelOrder.indexOf(left)
        const rightIndex = labelOrder.indexOf(right)
        const leftRank = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex
        const rightRank = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex
        if (leftRank !== rightRank) return leftRank - rightRank
        return left.localeCompare(right)
    })
    const labelHtml = sortedLabels.length
        ? sortedLabels
            .map((item) => escapeHtml(item))
            .join(` <span class="card-label-separator" aria-hidden="true">•</span> `)
        : "Project"
    const techItemsHtml = Array.isArray(project.tech) && project.tech.length > 0
        ? project.tech.map((item) => `<span class="card-tech-item">${escapeHtml(item)}</span>`).join("")
        : `<span class="card-tech-item">N/A</span>`
    const coverSource = isImageSource(project.cover)
        ? project.cover
        : projectPlaceholder
    const cover = escapeHtml(coverSource)
    const imageLoading = options.imageLoading || "lazy"
    const imageFetchPriority = options.imageFetchPriority || "auto"
    const cardTabIndex = isUnavailable ? "-1" : "0"
    const cardRole = isUnavailable ? "article" : "button"
    const unavailableDataAttr = isUnavailable ? ` data-unavailable="true"` : ""
    const cardAriaLabel = isUnavailable
        ? `${title} project placeholder`
        : `Open ${title}`

    return `
        <article class="project-card${className}" data-id="${escapeHtml(project.id)}"${unavailableDataAttr} tabindex="${cardTabIndex}" role="${cardRole}" aria-label="${escapeHtml(cardAriaLabel)}">
            <img
                src="${cover}"
                alt="${title}"
                loading="${imageLoading}"
                decoding="async"
                fetchpriority="${imageFetchPriority}"
                width="1200"
                height="900"
            />
            <div class="card-content">
                <h3 class="card-title">${title}</h3>
                <div class="card-meta">
                    <span class="card-label">${labelHtml}</span>
                    <div class="card-tech-list">${techItemsHtml}</div>
                </div>
            </div>
        </article>
    `
}
