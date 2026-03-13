import { projectPlaceholder } from "../data/images"

function escapeHtml(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;")
}

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
    const title = escapeHtml(project.title || "Untitled Project")
    const label = escapeHtml(project.label || "Project")
    const techItemsHtml = Array.isArray(project.tech) && project.tech.length > 0
        ? project.tech.map((item) => `<span class="card-tech-item">${escapeHtml(item)}</span>`).join("")
        : `<span class="card-tech-item">N/A</span>`
    const coverSource = isImageSource(project.cover)
        ? project.cover
        : projectPlaceholder
    const cover = escapeHtml(coverSource)
    const imageLoading = options.imageLoading || "lazy"
    const imageFetchPriority = options.imageFetchPriority || "auto"

    return `
        <article class="project-card${className}" data-id="${escapeHtml(project.id)}" tabindex="0" role="button" aria-label="Open ${title}">
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
                    <span class="card-label">${label}</span>
                    <div class="card-tech-list">${techItemsHtml}</div>
                </div>
            </div>
        </article>
    `
}
