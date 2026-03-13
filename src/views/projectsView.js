import { getProjects } from "../data/projectsStore"
import { createNav } from "../components/nav"
import { createFooter } from "../components/footer"

import '../style/projectsView.css'
import { createProjectCard } from "../components/projectCard"

function escapeHtml(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;")
}

function createCards(list) {
    return list
        .map((project) => createProjectCard(project))
        .join("")
}

function createFilterButtons(projects) {
    const labels = [...new Set(
        projects
            .map((project) => String(project.label || "").trim())
            .filter(Boolean)
    )]

    return [
        `<button class="filter-btn active" data-filter="all" aria-pressed="true">All</button>`,
        ...labels.map((label) => {
            const safeLabel = escapeHtml(label)
            return `<button class="filter-btn" data-filter="${safeLabel}" aria-pressed="false">${safeLabel}</button>`
        })
    ].join("")
}

function getFilteredProjects(projects, activeFilter, searchText) {
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
    const projects = getProjects()

    return `
        ${createNav()}
        <section id="all-projects">
            <div class="container">
                <a class="link-button go-back-link" href="/" data-go-back data-link>Go Back</a>
                <h1 class="all-projects-title">All My Projects</h1>
                <div class="projects-toolbar">
                    <input
                        id="projectSearch"
                        class="projects-search"
                        type="search"
                        aria-label="Search projects"
                        autocomplete="off"
                        placeholder="Search by title, tech, or description"
                    />
                    <div class="projects-filters" id="projectsFilters">
                        ${createFilterButtons(projects)}
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

    const projects = getProjects()
    let activeFilter = "all"
    let searchText = ""
    let inputDebounce = 0
    const updateFilterButtonState = (activeButton) => {
        filters.querySelectorAll(".filter-btn").forEach((button) => {
            const isActive = button === activeButton
            button.classList.toggle("active", isActive)
            button.setAttribute("aria-pressed", String(isActive))
        })
    }
    const openProjectDetails = (id) => {
        history.replaceState({ ...(history.state || {}), scrollY: window.scrollY }, "", window.location.href)
        history.pushState({}, "", `/project/${encodeURIComponent(id)}`)
        window.dispatchEvent(new PopStateEvent("popstate"))
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }

    const applyFilters = () => {
        const filteredProjects = getFilteredProjects(projects, activeFilter, searchText)
        renderProjects(filteredProjects, grid, counter)
    }

    const handleClick = (e) => {
        const goBackLink = e.target.closest("[data-go-back]")
        if (goBackLink) {
            e.preventDefault()
            if (window.history.length > 1) {
                window.history.back()
                return
            }

            history.pushState({}, "", "/")
            window.dispatchEvent(new PopStateEvent("popstate"))
            window.scrollTo({ top: 0, left: 0, behavior: "auto" })
            return
        }

        const filterButton = e.target.closest(".filter-btn")
        if (filterButton) {
            if (filterButton.classList.contains("active")) return
            activeFilter = filterButton.dataset.filter || "all"
            updateFilterButtonState(filterButton)
            applyFilters()
            return
        }

        const card = e.target.closest(".project-card")
        if (!card) return

        const id = card.dataset.id
        if (!id) return

        openProjectDetails(id)
    }

    const handleKeydown = (e) => {
        if (e.key !== "Enter" && e.key !== " ") return

        const card = e.target.closest(".project-card")
        if (!card) return

        const id = card.dataset.id
        if (!id) return

        e.preventDefault()
        openProjectDetails(id)
    }

    const handleInput = () => {
        searchText = search.value
        if (inputDebounce) window.clearTimeout(inputDebounce)
        inputDebounce = window.setTimeout(() => {
            inputDebounce = 0
            applyFilters()
        }, 120)
    }

    section.addEventListener("click", handleClick)
    section.addEventListener("keydown", handleKeydown)
    search.addEventListener("input", handleInput)

    return () => {
        if (inputDebounce) window.clearTimeout(inputDebounce)
        section.removeEventListener("click", handleClick)
        section.removeEventListener("keydown", handleKeydown)
        search.removeEventListener("input", handleInput)
    }
}
