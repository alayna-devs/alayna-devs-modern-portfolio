import { createProjectCard } from '../components/projectCard'
import { projects } from '../data/projectsStore'

export function createProjects() {
    const featuredProjects = projects.filter(p => p.featured)

    const cardHTML = featuredProjects
    .map(project => createProjectCard(project))
    .join("")

    return `
        <section id="projects">
            <div class="container">
                
                <h1 class="projects-title">Featured Latest Projects</h1>

                <div class="projects-body">My Projects Experience</div>

                <div class="projects-grid-div">
                    <div class="projects-grid" id="projectsGrid">
                        ${cardHTML}
                    </div>

                    <button class="projects-btn">View All Projects</button>
                </div>
            </div>
        </section>
    `
}

export function initProject() {
    const section = document.getElementById("projects")
    if (!section) return

    section.addEventListener("click", (e) => {
        if (e.target.closest(".project-card")) {
            const card = e.target.closest(".project-card")
            if (!card) return console.log("project card", card)

            const id = card.dataset.id

            history.pushState({}, "", `/project/${encodeURIComponent(id)}`)
            window.dispatchEvent(new PopStateEvent("popstate"))
        }
        
        if (e.target.closest(".projects-btn")) {
            const button = e.target.closest(".projects-btn")
            if (!button) return console.log("project button", button)

            if (button) {
                history.pushState({}, "", `/projects`)
                window.dispatchEvent(new PopStateEvent("popstate"))
            }
        }
    })
}
