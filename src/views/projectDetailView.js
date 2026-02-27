import { projects } from "../data/projectsStore"
import { projectPlaceholder } from "../data/images"
import { openNewTab } from "../utils/utils"

import "../style/projectDetailView.css"
import { createNav } from "../components/nav"
import { createFooter } from "../components/footer"
import { create404View } from "./404View"

function escapeHtml(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;")
}

function isImageUrl(value = "") {
    return /\.(avif|webp|png|jpe?g|gif|svg)([?#].*)?$/i.test(String(value))
}

function isOpenableUrl(value = "") {
    const normalized = String(value).trim()
    if (!normalized) return false
    return /^(https?:\/\/|mailto:|tel:|\/)/i.test(normalized)
}

function getProjectImage(project) {
    const mediaItems = Array.isArray(project.media) ? project.media : [project.media]
    const fromMedia = mediaItems.find((item) => item && isImageUrl(item))
    if (fromMedia) return fromMedia
    if (project.cover && isImageUrl(project.cover)) return project.cover
    return projectPlaceholder
}

export function createProjectDetailView(id) {
    const project = projects.find((p) => p.id === id)

    if (!project) {
        return `
            ${create404View()}
        `
    }

    const title = escapeHtml(project.title || "Project")
    const date = escapeHtml(project.date || "")
    const status = escapeHtml(project.status || "")
    const description = escapeHtml(project.description || "")
    const tech = escapeHtml(Array.isArray(project.tech) ? project.tech.join(", ") : (project.tech || ""))
    const media = getProjectImage(project)
    const githubUrl = escapeHtml(project.github || "")
    const liveUrl = escapeHtml(project.live || "")

    return `
        ${createNav()}
        <section id="project-details">
            <div class="container">
                <a href="/" data-link>Go Back</a>
                <div class="project-details-div">
                    <div class="details-info-div">
                        <h1 class="details-title">${title}</h1>
                        <div class="date-status-div">
                            <p class="details-date">${date}</p>
                            <p class="details-status">${status}</p>
                        </div>
                        <p class="details-desc">${description}</p>
                        <p class="details-tech">${tech}</p>
                    </div>

                    <div class="details-media-div">
                        <img
                            src="${media}"
                            alt="${title}"
                            loading="eager"
                            decoding="async"
                            fetchpriority="high"
                            width="1200"
                            height="900"
                        />
                    </div>

                </div>

                <button class="details-github" type="button" data-url="${githubUrl}">View Code</button>
                <button class="details-live" type="button" data-url="${liveUrl}">View Live Project</button>
            </div>
        </section>
        ${createFooter()}
    `
}

export function initProjectDetailView() {
    const projectDetails = document.querySelector("#project-details")
    if (!projectDetails) return

    const handleClick = (e) => {
        const button = e.target.closest(".details-github, .details-live")
        if (!button || !projectDetails.contains(button)) return

        const url = button.dataset.url || ""
        if (!isOpenableUrl(url)) return

        openNewTab(url)
    }

    projectDetails.addEventListener("click", handleClick)

    return () => {
        projectDetails.removeEventListener("click", handleClick)
    }
}
