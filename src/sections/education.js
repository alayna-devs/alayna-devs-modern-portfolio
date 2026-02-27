import { academics, certs, courses } from "../data/educationStore"
import { createEduCards } from "../components/eduCard"

const educationGroups = [
    { title: "Notable Certifications", items: certs, typeClass: "" },
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
    if (!scrollSections.length) return

    const disposers = []

    scrollSections.forEach((section) => {
        const grid = section.querySelector(".edu-grid")
        const leftBtn = section.querySelector(".grid-btn-left")
        const rightBtn = section.querySelector(".grid-btn-right")

        if (!grid || !leftBtn || !rightBtn) return

        const getStep = () => Math.max(Math.floor(grid.clientWidth * 0.92), 240)

        const updateButtons = () => {
            const maxScroll = grid.scrollWidth - grid.clientWidth
            const hasOverflow = grid.scrollWidth > grid.clientWidth + 1

            leftBtn.style.display = hasOverflow ? "block" : "none"
            rightBtn.style.display = hasOverflow ? "block" : "none"

            if (!hasOverflow) return

            leftBtn.disabled = grid.scrollLeft <= 1
            rightBtn.disabled = grid.scrollLeft >= maxScroll - 1
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
            grid.scrollBy({ left: -getStep(), behavior: "smooth" })
        }

        const handleRight = () => {
            grid.scrollBy({ left: getStep(), behavior: "smooth" })
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

    return () => {
        disposers.forEach(dispose => dispose())
    }
}
