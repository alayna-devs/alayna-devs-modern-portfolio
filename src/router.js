import { initMenu } from "./components/nav"
import { initContactCardTilt } from "./sections/contacts"
import { initEducationSection } from "./sections/education"
import { initProjectsSection } from "./sections/projects"
import { create404View } from "./views/404View"
import { createAboutMeView } from "./views/aboutMeView"
import { createBlogsArticlesView } from "./views/blogsArticleView"
import { createHomeView } from "./views/homeView"
import { createProjectDetailView, initProjectDetailView } from "./views/projectDetailView"
import { createProjectView, initProjectView } from "./views/projectsView"
import { createTestimonialsView } from "./views/testimonialsView"

let activeDisposers = []

function normalizePath(pathname) {
    if (!pathname || pathname === "/") return "/"
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
}

function disposeActiveView() {
    activeDisposers.forEach((dispose) => {
        try {
            dispose()
        } catch {
            // Ignore cleanup failures to avoid route lock-ups.
        }
    })
    activeDisposers = []
}

function registerDisposer(dispose) {
    if (typeof dispose === "function") {
        activeDisposers.push(dispose)
    }
}

function scrollToHashTarget() {
    const hash = window.location.hash?.slice(1)
    if (!hash) return

    requestAnimationFrame(() => {
        const target = document.getElementById(hash)
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    })
}

export function router() {
    const app = document.getElementById("app")
    if (!app) return

    disposeActiveView()

    const path = normalizePath(window.location.pathname)

    if (path === "/" || path === "/index.html") {
        app.innerHTML = createHomeView()
        registerDisposer(initMenu())
        registerDisposer(initProjectsSection())
        registerDisposer(initEducationSection())
        registerDisposer(initContactCardTilt())
        scrollToHashTarget()
        return
    }

    if (path.startsWith("/project/")) {
        const id = decodeURIComponent(path.split("/project/")[1] || "")
        app.innerHTML = createProjectDetailView(id)
        registerDisposer(initMenu())
        registerDisposer(initProjectDetailView())
        return
    }

    if (path.startsWith("/projects")) {
        app.innerHTML = createProjectView()
        registerDisposer(initMenu())
        registerDisposer(initProjectView())
        return
    }

    if (path.startsWith("/about-me")) {
        app.innerHTML = createAboutMeView()
        return
    }

    if (path.startsWith("/testimonials")) {
        app.innerHTML = createTestimonialsView()
        return
    }

    if (path.startsWith("/blogs-articles")) {
        app.innerHTML = createBlogsArticlesView()
        return
    }

    app.innerHTML = create404View()
}
