import { router } from "./router"

function navigate(event) {
    const link = event.target.closest("a[data-link]");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    // Skip full URLs/mailto/tel links.
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(href)) return;

    event.preventDefault();
    history.pushState({}, "", href);
    router();

    const hash = link.hash || (href.includes("#") ? href.slice(href.indexOf("#")) : "");
    if (!hash) return;

    const id = hash.slice(1);
    requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", router);
} else {
    router();
}

window.addEventListener("popstate", router);
document.addEventListener("click", navigate);


