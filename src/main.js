import { router } from "./router"
import { initializeProjectsStore } from "./data/projectsStore"

let pronunciationAudio = null;

function initMatrixBackground() {
    if (document.getElementById("matrix-bg")) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const saveData = navigator.connection?.saveData === true;
    if (saveData) return;

    const matrixBg = document.createElement("div");
    matrixBg.id = "matrix-bg";
    matrixBg.setAttribute("aria-hidden", "true");

    const isSmallViewport = window.matchMedia("(max-width: 768px)").matches;
    const isMediumViewport = window.matchMedia("(max-width: 1200px)").matches;
    const particleCount = isSmallViewport ? 24 : (isMediumViewport ? 32 : 42);
    const glyphs = ["0", "1"];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i += 1) {
        const digit = document.createElement("span");
        const depth = Math.random() < 0.38 ? "near" : "far";
        const drift = (Math.random() * 12 - 6).toFixed(2);

        digit.className = `matrix-digit ${depth}`;
        digit.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        digit.style.left = `${(Math.random() * 100).toFixed(2)}%`;
        digit.style.animationDelay = `${(-Math.random() * 18).toFixed(2)}s`;
        digit.style.animationDuration = `${(depth === "near" ? 10 : 16) + Math.random() * 8}s`;
        digit.style.setProperty("--drift-x", `${drift}px`);
        digit.style.opacity = depth === "near"
            ? (0.18 + Math.random() * 0.24).toFixed(2)
            : (0.08 + Math.random() * 0.14).toFixed(2);

        fragment.appendChild(digit);
    }

    matrixBg.appendChild(fragment);
    document.body.prepend(matrixBg);

    const toggleMatrixVisibility = () => {
        matrixBg.classList.toggle("matrix-paused", document.hidden);
    };

    document.addEventListener("visibilitychange", toggleMatrixVisibility);
    toggleMatrixVisibility();
}

function navigate(event) {
    if (event.defaultPrevented) return;

    const link = event.target.closest("a[data-link]");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    // Skip full URLs/mailto/tel links.
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(href)) return;

    event.preventDefault();
    history.replaceState({ ...(history.state || {}), scrollY: window.scrollY }, "", window.location.href);
    history.pushState({}, "", href);
    void router();

    const hash = link.hash || (href.includes("#") ? href.slice(href.indexOf("#")) : "");
    if (!hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        return;
    }

    const id = hash.slice(1);
    requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}

function playNamePronunciation(event) {
    const trigger = event.target.closest("[data-pronounce-btn]");
    if (!trigger) return;

    const source = trigger.getAttribute("data-audio-src");
    if (!source) return;

    const resolvedSource = new URL(source, window.location.href).href;

    if (!pronunciationAudio || pronunciationAudio.src !== resolvedSource) {
        pronunciationAudio = new Audio(source);
        pronunciationAudio.preload = "auto";
    }

    pronunciationAudio.currentTime = 0;
    void pronunciationAudio.play().catch(() => {});
}

async function bootstrapApp() {
    initMatrixBackground()
    router()

    // Hydrate projects after first paint so home animations start immediately.
    await initializeProjectsStore()
    router()
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        void bootstrapApp()
    })
} else {
    void bootstrapApp()
}

window.addEventListener("popstate", (event) => {
    void router();
    const savedScrollY = event.state?.scrollY;
    if (typeof savedScrollY === "number") {
        requestAnimationFrame(() => {
            window.scrollTo({ top: savedScrollY, left: 0, behavior: "auto" });
        });
    }
});
document.addEventListener("click", navigate);
document.addEventListener("click", playNamePronunciation);

let lastMouseX = 0;
let lastMouseY = 0;
let mouseRaf = null;
document.addEventListener("mousemove", (e) => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    if (mouseRaf) return;
    mouseRaf = requestAnimationFrame(() => {
        mouseRaf = null;
        document.body.style.setProperty("--x", `${lastMouseX}px`);
        document.body.style.setProperty("--y", `${lastMouseY}px`);
    });
}, { passive: true });


