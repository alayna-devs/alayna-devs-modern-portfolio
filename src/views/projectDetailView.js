import { projects } from "../data/projectsStore"
import { openNewTab } from "../utils/utils"

import "../style/projectDetailView.css"
import { createNav } from "../components/nav"
import { createFooter } from "../components/footer"

export function createProjectDetailView(id) {
    const project = projects.find((p) => p.id === id)

    if (!project) {
        return `
            <section class="container">
                <h1>404</h1>
                <p>Project not found.</p>
                <a href="/" data-link>Go Back</a>
            </section>
        `
    }

    return `
        ${createNav()}
        <section id="project-details">
            <div class="container">
                <a href="/" data-link>Go Back</a>
                <div class="project-details-div">
                    <div class="details-info-div">
                        <h1 class="details-title">${project.title}</h1>
                        <div class="date-status-div">
                            <p class="details-date">${project.date}</p>
                            <p class="details-status">${project.status}</p>
                        </div>
                        <p class="details-desc">${project.description}</p>
                        <p class="details-tech">${project.tech}</p>
                    </div>

                    <div class="details-media-div">
                        <img src="${project.media}" alt="${project.title}" />
                    </div>

                </div>

                <button class="details-github">View Code</button>
                <button class="details-live">View Live Project</button>
            </div>
        </section>
        ${createFooter()}
    `
}

export function initProjectDetailView() {
    const projectDetails = document.querySelector("#project-details")
    if (!projectDetails) return console.log("project details", projectDetails)

    projectDetails.addEventListener("click", (e) => {
        if (e.target.closest(".details-github")) {
            openNewTab(`${projects.github}`)
        }

        if (e.target.closest(".details-live")) {
            openNewTab(`${projects.website}`)
        } 
    })
}
