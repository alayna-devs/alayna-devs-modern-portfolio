import { projectPlaceholder } from "./images"

export const projects = [
    {
        id: "portfolio-v1",
        cover: projectPlaceholder,
        title: "Portfolio",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "website",
        featured: true,
        status: "In-progress",
        live: "/",
        github: "https://github.com/ROM-01",
        media: [projectPlaceholder, ]
    },
    {
        id: "portfolio-v2",
        cover: projectPlaceholder,
        title: "Portfolio",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "website",
        featured: true,
        status: "Complete",
        live: "/",
        github: "https://github.com/ROM-01",
        media: [projectPlaceholder, "demo.mp4"]
    },
    {
        id: "portfolio-v3",
        cover: projectPlaceholder,
        title: "Portfolio",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "website",
        featured: true,
        status: "",
        live: "something",
        github: "something",
        media: ["something", "demo.mp4"]
    },
    {
        id: "portfolio-v4",
        cover: projectPlaceholder,
        title: "Portfolio",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "website",
        featured: true,
        status: "",
        live: "something",
        github: "something",
        media: ["something", "demo.mp4"]
    },
    {
        id: "planet-v1",
        cover: projectPlaceholder,
        title: "Planet Information",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "mobile",
        featured: false,
        status: "",
        live: "something",
        github: "something",
        media: ["something", "demo.mp4"]
    },
    {
        id: "horror-v1",
        cover: projectPlaceholder,
        title: "Horror Game",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "games",
        featured: false,
        status: "",
        live: "something",
        github: "something",
        media: ["something", "demo.mp4"]
    },
    {
        id: "logger-v1",
        cover: projectPlaceholder,
        title: "Log Monitor",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "systems",
        featured: false,
        status: "",
        live: "something",
        github: "something",
        media: ["something", "demo.mp4"]
    }
]

const STORAGE_KEY = "projects"

export function loadProjects() {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []

    try {
        const parsed = JSON.parse(data)
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export function saveProjects(nextProjects) {
    if (!Array.isArray(nextProjects)) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProjects))
}

export function addProject(project) {
    const existingProjects = loadProjects()
    existingProjects.push(project)
    saveProjects(existingProjects)
}

export function deleteProject(id) {
    const nextProjects = loadProjects().filter(project => project.id !== id)
    saveProjects(nextProjects)
}
