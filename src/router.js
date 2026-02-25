import { initMenu } from "./components/nav";
import { initButtons } from "./sections/education";
import { initProject } from "./sections/projects";
import { createHomeView } from "./views/homeView";
import { createProjectDetailView } from "./views/projectDetailView";
import { createProjectView, initProjectView } from "./views/projectsView";

function normalizePath(pathname) {
    if (!pathname || pathname === "/") return "/";
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function router() {
    const app = document.getElementById("app");
    if (!app) return;

    const path = normalizePath(window.location.pathname);

    if (path === "/" || path === "/index.html") {
        app.innerHTML = createHomeView();
        initMenu();
        initProject();
        initButtons()
        return;
    }

    if (path.startsWith("/project/")) {
        const id = decodeURIComponent(path.split("/project/")[1] || "");
        app.innerHTML = createProjectDetailView(id);
        return;
    }

    if (path.startsWith("/projects")) {
        app.innerHTML = createProjectView();
        initMenu();
        initProjectView();
        return;
    }

    app.innerHTML = `
        <section class="container">
            <h1>404</h1>
            <p>Page not found.</p>
            <a href="/" data-link>Go Home</a>
        </section>
    `;
}
