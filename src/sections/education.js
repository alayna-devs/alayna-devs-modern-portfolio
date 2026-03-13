import { academics, certs, courses } from "../data/educationStore"
import { createEduCards } from "../components/eduCard"

const SCROLL_EPSILON = 1
const NOOP = () => {}

const educationGroups = [
    { title: "Notable Certifications", items: certs, typeClass: "cert-card" },
    { title: "Courses and Programs", items: courses, typeClass: "course-card" },
    { title: "Academics Overview", items: academics, typeClass: "academic-card" }
]

function createEducationGroup(group) {
    return `
        <div class="edu-group">
            <h3>${group.title}</h3>
            <div class="edu-scroll">
                <button class="grid-btn-left" type="button" aria-label="Scroll left">←</button>

                <div class="edu-grid">
                    ${createEduCards(group.items, group.typeClass)}
                </div>

                <button class="grid-btn-right" type="button" aria-label="Scroll right">→</button>
            </div>
        </div>
    `
}

export function createEducation() {
    const groupsHtml = educationGroups.map(group => createEducationGroup(group)).join("")

    return `
        <section id="education">
            <div class="container">
                <div class="edu-content">
                    <h2 class="edu-title">Education</h2>
                    ${groupsHtml}
                </div>
            </div>
        </section>
    `
}

export function initEducationSection() {
    const scrollSections = document.querySelectorAll(".edu-scroll")
    if (!scrollSections.length) return NOOP

    const disposers = []

    scrollSections.forEach((section) => {
        const grid = section.querySelector(".edu-grid")
        const leftBtn = section.querySelector(".grid-btn-left")
        const rightBtn = section.querySelector(".grid-btn-right")

        if (!grid || !leftBtn || !rightBtn) return

        const getMaxScroll = () => Math.max(0, grid.scrollWidth - grid.clientWidth)
        const getStep = () => {
            const firstCard = grid.querySelector(".edu-card")
            if (!firstCard) return Math.max(240, Math.floor(grid.clientWidth * 0.82))

            const cardWidth = firstCard.getBoundingClientRect().width
            const computed = window.getComputedStyle(grid)
            const rawGap = computed.columnGap || computed.gap || "0"
            const parsedGap = Number.parseFloat(rawGap)
            const gap = Number.isFinite(parsedGap) ? parsedGap : 0

            return Math.max(1, Math.round(cardWidth + gap))
        }

        const clampScrollLeft = (value) => {
            return Math.min(getMaxScroll(), Math.max(0, value))
        }

        const updateButtons = () => {
            const maxScroll = getMaxScroll()
            const hasOverflow = maxScroll > SCROLL_EPSILON
            const currentLeft = clampScrollLeft(grid.scrollLeft)

            leftBtn.hidden = !hasOverflow
            rightBtn.hidden = !hasOverflow

            leftBtn.disabled = !hasOverflow || currentLeft <= SCROLL_EPSILON
            rightBtn.disabled = !hasOverflow || currentLeft >= maxScroll - SCROLL_EPSILON
        }

        let scrollRaf = 0
        const handleScroll = () => {
            if (scrollRaf) return
            scrollRaf = window.requestAnimationFrame(() => {
                scrollRaf = 0
                updateButtons()
            })
        }

        const handleLeft = () => {
            const currentLeft = clampScrollLeft(grid.scrollLeft)
            const targetLeft = clampScrollLeft(currentLeft - getStep())
            grid.scrollTo({ left: targetLeft, behavior: "smooth" })
        }

        const handleRight = () => {
            const currentLeft = clampScrollLeft(grid.scrollLeft)
            const targetLeft = clampScrollLeft(currentLeft + getStep())
            if (targetLeft <= currentLeft + SCROLL_EPSILON) return
            grid.scrollTo({ left: targetLeft, behavior: "smooth" })
        }

        grid.addEventListener("scroll", handleScroll, { passive: true })
        leftBtn.addEventListener("click", handleLeft)
        rightBtn.addEventListener("click", handleRight)

        let resizeObserver = null
        if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(updateButtons)
            resizeObserver.observe(grid)
        } else {
            window.addEventListener("resize", updateButtons)
        }

        updateButtons()

        disposers.push(() => {
            grid.removeEventListener("scroll", handleScroll)
            leftBtn.removeEventListener("click", handleLeft)
            rightBtn.removeEventListener("click", handleRight)
            if (scrollRaf) window.cancelAnimationFrame(scrollRaf)

            if (resizeObserver) {
                resizeObserver.disconnect()
            } else {
                window.removeEventListener("resize", updateButtons)
            }
        })
    })

    return () => disposers.forEach(dispose => dispose())
}
