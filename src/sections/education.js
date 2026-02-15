import { academics, certs, courses } from "../data/educationStore";
import { createEduCards } from "../components/eduCard"

export function createEducation() {
    return `
        <section id="education">
            <div class="container">
                <div class="edu-content">
                    <h1 class="edu-title">Education</h1>
                    
                    <div>
                        <h3>Certifications</h3>
                        <div class="edu-grid">
                            ${createEduCards(certs, "")}
                        </div>
                    </div>
                
                    <div>
                        <h3>Courses and Programs</h3>
                        <div class="edu-grid">
                            ${createEduCards(courses, "course-card")}
                        </div>
                    </div>


                    <div>
                        <h3>Academics</h3>
                        <div class="edu-grid">
                            ${createEduCards(academics, "academic-card")}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
}