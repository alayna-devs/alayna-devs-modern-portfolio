import "../style/404View.css"

export function create404View() {
    return `
        <section id="not-found-view" class="section-reveal">
            <div class="container">
                <div class="not-found-card">
                    <p class="not-found-label">Error 404</p>
                    <h1 class="not-found-title">Page Not Found</h1>
                    <p class="not-found-copy">
                        The page you are looking for does not exist or may have moved.
                    </p>
                    <div class="not-found-actions">
                        <button class="link-button" type="button" data-404-back>
                            Go Back
                        </button>
                        <a class="app-btn" href="/" data-link>Go Home</a>
                    </div>
                </div>
            </div>
        </section>
    `
}

export function init404View() {
    const notFoundView = document.getElementById("not-found-view")
    if (!notFoundView) return

    const handleClick = (event) => {
        const backButton = event.target.closest("[data-404-back]")
        if (!backButton || !notFoundView.contains(backButton)) return

        event.preventDefault()
        if (window.history.length > 1) {
            window.history.back()
            return
        }

        history.pushState({}, "", "/")
        window.dispatchEvent(new PopStateEvent("popstate"))
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }

    notFoundView.addEventListener("click", handleClick)

    return () => {
        notFoundView.removeEventListener("click", handleClick)
    }
}