import { createProjectCard } from "../components/projectCard"
import { getFeaturedProjects } from "../data/projectsStore"

export function createProjects() {
    const featuredProjects = getFeaturedProjects(4)
    const featuredCardsHtml = featuredProjects.map(project => createProjectCard(project)).join("")

    return `
        <section id="projects">
            <div class="container">
                <h2 class="projects-title">Featured Projects</h2>
                <p class="projects-body">Selected work across frontend, backend, tooling, and more!</p>

                <div class="projects-grid-div">
                    <div class="projects-grid" id="projectsGrid">
                        ${featuredCardsHtml}
                    </div>

                    <a class="projects-btn link-button" href="/projects" data-link>View All Projects</a>
                </div>
            </div>
        </section>
    `
}

export function initProjectsSection() {
    const section = document.getElementById("projects")
    if (!section) return

    const openProjectFromCard = (card) => {
        if (card?.dataset?.unavailable === "true") return
        const projectId = card?.dataset?.id
        if (!projectId) return

        history.replaceState({ ...(history.state || {}), scrollY: window.scrollY }, "", window.location.href)
        history.pushState({}, "", `/project/${encodeURIComponent(projectId)}`)
        window.dispatchEvent(new PopStateEvent("popstate"))
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }

    const handleClick = (event) => {
        const card = event.target.closest(".project-card")
        if (!card || !section.contains(card)) return
        openProjectFromCard(card)
    }

    const handleKeydown = (event) => {
        if (event.key !== "Enter" && event.key !== " ") return

        const card = event.target.closest(".project-card")
        if (!card || !section.contains(card)) return

        event.preventDefault()
        openProjectFromCard(card)
    }

    section.addEventListener("click", handleClick)
    section.addEventListener("keydown", handleKeydown)

    return () => {
        section.removeEventListener("click", handleClick)
        section.removeEventListener("keydown", handleKeydown)
    }
}
