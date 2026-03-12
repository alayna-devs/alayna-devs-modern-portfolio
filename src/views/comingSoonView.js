import "../style/comingSoonView.css"

export function createComingSoonView() {
    return `
        <section id="coming-soon-view" class="section-reveal">
            <div class="container">
                <div class="coming-soon-card">
                    <p class="coming-soon-label">Update In Progress</p>
                    <h1 class="coming-soon-title">Coming Soon</h1>
                    <p class="coming-soon-copy">
                        This page is on the way and will be available soon.
                    </p>
                    <div class="coming-soon-actions">
                        <button class="link-button" type="button" data-coming-soon-back>
                            Go Back
                        </button>
                        <a class="app-btn" href="/" data-link>Go Home</a>
                    </div>
                </div>
            </div>
        </section>
    `
}

export function initComingSoonView() {
    const view = document.getElementById("coming-soon-view")
    if (!view) return

    const handleClick = (event) => {
        const backButton = event.target.closest("[data-coming-soon-back]")
        if (!backButton || !view.contains(backButton)) return

        event.preventDefault()
        if (window.history.length > 1) {
            window.history.back()
            return
        }

        history.pushState({}, "", "/")
        window.dispatchEvent(new PopStateEvent("popstate"))
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }

    view.addEventListener("click", handleClick)

    return () => {
        view.removeEventListener("click", handleClick)
    }
}