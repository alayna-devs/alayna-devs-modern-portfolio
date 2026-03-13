const NOOP = () => {}

export function initSectionScrollReveal() {
    const sections = document.querySelectorAll("#app section")
    if (!sections.length) return NOOP

    const revealIfInView = (section) => {
        const rect = section.getBoundingClientRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        const entersViewport = rect.top <= viewportHeight * 0.92 && rect.bottom >= 0
        if (entersViewport) {
            section.classList.add("is-visible")
            return true
        }
        return false
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) {
        sections.forEach((section) => {
            section.classList.add("section-reveal", "is-visible")
        })
        return NOOP
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
        })
    }, {
        threshold: 0.08,
        rootMargin: "0px 0px -4% 0px"
    })

    sections.forEach((section) => {
        section.classList.add("section-reveal")
        if (!revealIfInView(section)) {
            observer.observe(section)
        }
    })

    // Ensure sections already in-view at route load reveal immediately.
    requestAnimationFrame(() => {
        sections.forEach((section) => {
            if (!section.classList.contains("is-visible") && revealIfInView(section)) {
                observer.unobserve(section)
            }
        })
    })

    return () => observer.disconnect()
}
