import { academics, certs, courses } from "../data/educationStore";
import { createEduCards } from "../components/eduCard"

export function createEducation() {
    return `
        <section id="education">
            <div class="container">
                <div class="edu-content">
                    <h1 class="edu-title">Education</h1>
                    
                    <div>
                        <h3>Notable Certifications</h3>
                        <div class="edu-scroll">
                            <button class="grid-btn-left">←</button>

                            <div class="edu-grid">
                                    ${createEduCards(certs, "")}
                            </div>

                            <button class="grid-btn-right">→</button>
                        </div>
                    </div>
                
                    <div>
                        <h3>Courses and Programs</h3>
                        <div class="edu-scroll">
                            <button class="grid-btn-left">←</button>

                            <div class="edu-grid">
                                ${createEduCards(courses, "course-card")}
                            </div>

                            <button class="grid-btn-right">→</button>
                        </div>
                    </div>
                    


                    <div>
                        <h3>Academics Overview</h3>
                        <div class="edu-scroll">
                            <button class="grid-btn-left">←</button>

                            <div class="edu-grid">
                                    ${createEduCards(academics, "academic-card")}
                            </div>

                            <button class="grid-btn-right">→</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
}

export function initButtons() {
    const scrollSections = document.querySelectorAll(".edu-scroll")

    scrollSections.forEach(section => {
        const grid = section.querySelector(".edu-grid")
        const leftBtn = section.querySelector(".grid-btn-left")
        const rightBtn = section.querySelector(".grid-btn-right")

        const scrollAmount = grid.clientWidth

        function updateButtons() {
            const maxScroll = grid.scrollWidth - grid.clientWidth

            if (grid.scrollWidth <= grid.clientWidth) {
                leftBtn.style.display = "none"
                rightBtn.style.display = "none"
                return
            }

            leftBtn.style.display = "block"
            rightBtn.style.display = "block"

            leftBtn.disabled = grid.scrollLeft <= 0
            rightBtn.disabled = grid.scrollLeft >= maxScroll - 1
        }


        leftBtn.addEventListener("click", () => {
            grid.scrollBy({
                left: -scrollAmount,
                behavior: "smooth"
            })
        })

        rightBtn.addEventListener("click", () => {
            grid.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            })
        })

        grid.addEventListener("scroll", updateButtons)
        window.addEventListener("resize", updateButtons)

        updateButtons()
    })
}