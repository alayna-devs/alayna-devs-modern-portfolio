import { initMenu } from "./components/nav"
import { initScrollToggleButton } from "./components/scrollToggleButton"
import { initContactCardTilt } from "./sections/contacts"
import { initEducationSection } from "./sections/education"
import { initProjectsSection } from "./sections/projects"
import { initHeroPhotoTilt } from "./sections/header"
import { initSectionScrollReveal } from "./utils/scrollReveal"
import { create404View, init404View } from "./views/404View"
import { createAboutMeView } from "./views/aboutMeView"
import { createBlogsArticlesView } from "./views/blogsArticleView"
import { createHomeView } from "./views/homeView"
import { initComingSoonView } from "./views/comingSoonView"
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
        registerDisposer(initSectionScrollReveal())
        registerDisposer(initMenu())
        registerDisposer(initHeroPhotoTilt())
        registerDisposer(initProjectsSection())
        registerDisposer(initEducationSection())
        registerDisposer(initContactCardTilt())
        registerDisposer(initScrollToggleButton())
        scrollToHashTarget()
        return
    }

    if (path.startsWith("/project/")) {
        const id = decodeURIComponent(path.split("/project/")[1] || "")
        app.innerHTML = createProjectDetailView(id)
        registerDisposer(initSectionScrollReveal())
        registerDisposer(initMenu())
        registerDisposer(initProjectDetailView())
        return
    }

    if (path.startsWith("/projects")) {
        app.innerHTML = createProjectView()
        registerDisposer(initSectionScrollReveal())
        registerDisposer(initMenu())
        registerDisposer(initProjectView())
        return
    }

    if (path.startsWith("/about-me")) {
        app.innerHTML = createAboutMeView()
        registerDisposer(initSectionScrollReveal())
        registerDisposer(initComingSoonView())
        return
    }

    if (path.startsWith("/testimonials")) {
        app.innerHTML = createTestimonialsView()
        registerDisposer(initSectionScrollReveal())
        registerDisposer(initComingSoonView())
        return
    }

    if (path.startsWith("/blogs-articles")) {
        app.innerHTML = createBlogsArticlesView()
        registerDisposer(initSectionScrollReveal())
        registerDisposer(initComingSoonView())
        return
    }

    app.innerHTML = create404View()
    registerDisposer(initSectionScrollReveal())
    registerDisposer(init404View())
}
