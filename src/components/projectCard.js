import { projectPlaceholder } from "../data/images"

function escapeHtml(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;")
}

export function createProjectCard(project, options = {}) {
    if (!project || !project.id) return ""

    const className = options.className ? ` ${options.className}` : ""
    const title = escapeHtml(project.title || "Untitled Project")
    const label = escapeHtml(project.label || "Project")
    const cover = project.cover || projectPlaceholder
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
                <span class="card-title">${title}</span>
                <span class="card-label">${label}</span>
            </div>
        </article>
    `
}
