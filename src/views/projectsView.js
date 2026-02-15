import { projects } from "../data/projectsStore"
import { createNav } from "../components/nav"
import { createFooter } from "../components/footer"

import '../style/projectsView.css'
import { createProjectCard } from "../components/projectCard"

function createCards(list) {
    return list
        .map((project) => createProjectCard(project, { className: "project-card--compact" }))
        .join("")
}

function createFilterButtons() {
    const labels = [...new Set(projects.map((project) => project.label).filter(Boolean))]

    return [
        `<button class="filter-btn active" data-filter="all">All</button>`,
        ...labels.map((label) => `<button class="filter-btn" data-filter="${label}">${label}</button>`)
    ].join("")
}

function getFilteredProjects(activeFilter, searchText) {
    const normalizedSearch = searchText.trim().toLowerCase()

    return projects.filter((project) => {
        const matchesFilter = activeFilter === "all" || project.label === activeFilter
        if (!matchesFilter) return false

        if (!normalizedSearch) return true

        const haystack = [
            project.title,
            project.description,
            project.label,
            ...(project.tech || [])
        ].join(" ").toLowerCase()

        return haystack.includes(normalizedSearch)
    })
}

function renderProjects(list, grid, counter) {
    if (!list.length) {
        grid.innerHTML = `<p class="projects-empty">No projects match your filters.</p>`
        counter.textContent = "0 projects"
        return
    }

    grid.innerHTML = createCards(list)
    counter.textContent = `${list.length} project${list.length === 1 ? "" : "s"}`
}

export function createProjectView() {
    return `
        ${createNav()}
        <section id="all-projects">
            <div class="container">
                <a href="/" data-link>Go Home</a>
                <h1 class="all-projects-title">All My Projects</h1>
                <div class="projects-toolbar">
                    <input
                        id="projectSearch"
                        class="projects-search"
                        type="search"
                        placeholder="Search by title, tech, or description"
                    />
                    <div class="projects-filters" id="projectsFilters">
                        ${createFilterButtons()}
                    </div>
                </div>
                <p class="projects-count" id="projectsCount">${projects.length} projects</p>
                <div class="all-projects-grid" id="allProjectsGrid">
                    ${createCards(projects)}
                </div>
            </div>
        </section>
        ${createFooter()}
    `
}

export function initProjectView() {
    const section = document.getElementById("all-projects")
    if (!section) return

    const grid = section.querySelector("#allProjectsGrid")
    const counter = section.querySelector("#projectsCount")
    const search = section.querySelector("#projectSearch")
    const filters = section.querySelector("#projectsFilters")

    if (!grid || !counter || !search || !filters) return

    let activeFilter = "all"
    let searchText = ""

    const applyFilters = () => {
        const filteredProjects = getFilteredProjects(activeFilter, searchText)
        renderProjects(filteredProjects, grid, counter)
    }

    section.addEventListener("click", (e) => {
        const filterButton = e.target.closest(".filter-btn")
        if (filterButton) {
            activeFilter = filterButton.dataset.filter || "all"
            filters.querySelectorAll(".filter-btn").forEach((button) => {
                button.classList.toggle("active", button === filterButton)
            })
            applyFilters()
            return
        }

        const card = e.target.closest(".project-card")
        if (!card) return

        const id = card.dataset.id
        if (!id) return

        history.pushState({}, "", `/project/${encodeURIComponent(id)}`)
        window.dispatchEvent(new PopStateEvent("popstate"))
    })

    search.addEventListener("input", () => {
        searchText = search.value
        applyFilters()
    })
}
