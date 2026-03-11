const NOOP = () => {}

export function initSectionScrollReveal() {
    const sections = document.querySelectorAll("#app section")
    if (!sections.length) return NOOP

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
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
    })

    sections.forEach((section) => {
        section.classList.add("section-reveal")
        observer.observe(section)
    })

    return () => observer.disconnect()
}
