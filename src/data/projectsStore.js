export const projects = [
    {
        id: "portfolio-v1",
        cover: "/cat.gif",
        title: "Portfolio",
        date: "02-02-2025",
        description: "My personal developer portfolio",
        tech: ["HTML", "CSS", "JS"],
        label: "website",
        featured: true,
        status: "In-progress",
        live: "/",
        github: "https://github.com/ROM-01",
        media: ["/public/cat.gif"]
    },

    {
        id: "portfolio-v2",
        cover: "/cat.gif",
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
        id: "portfolio-v3",
        cover: "/cat.gif",
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
        cover: "/cat.gif",
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
        cover: "/cat.gif",
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
        cover: "/cat.gif",
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
        cover: "/cat.gif",
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


// Load projects

const STORAGE_KEY = "projects"

export function loadProjects() {
    //get stored data
    const data = localStorage.getItem(STORAGE_KEY)
    // convert the data into JS object
    return data ? JSON.parse(data) : []
}

// Save projects
export function saveProjects(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

// Add/delete helpers
export function addProject(project) {
    const projects = loadProjects()
    projects.push(project)
    saveProjects(projects)
}

export function deleteProject(id) {
    const projects = loadProjects().filter(p => p.id !== id)
    saveProjects(projects)
}