import { GITHUB, LINKEDIN } from "../data/links"

export function createContacts() {
    return `
        <section id="contacts">
            <div class="container">
                <div class="contacts-content">
                    <div class="contact-card">
                        <div>
                            <img class="profile-image" src="/src/assets/images/temp-photo.jpg" />

                            <div>
                                <h3>Alayna Taylor</h3>
                                <p>Software Engineer | Full-Stack</p>
                            </div>
                        </div>

                        <div>
                            <h1 class="tech-title">Impressed? Let's Connect!</h1>
                            <p>I build fast, accessible web apps with React, Next.js, and TypeScript. I'm looking for teams that value product quality, performance, and thoughtful UX.</p>
                        </div>
                        
                        <div>
                            <a href="mailto:@alaynaonetay@gmail.com">
                                <button>Email Me</button>
                            </a>
                            <a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">
                                <button>LinkedIN</button>
                            </a>
                            <a href="${GITHUB}" target="_blank" rel="noopener noreferrer">
                                <button>Github</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
}

export function initRotateCard() {
    const card = document.querySelector(".contact-card")
    const maxRotation = 15

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()

        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const distanceX = x - centerX
        const distanceY = y - centerY

        const percentX = distanceX / centerX
        const percentY = distanceY / centerY

        const rotateY = -percentX * maxRotation
        const rotateX = percentY * maxRotation

        card.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `

        const tiltAmount = Math.max(Math.abs(percentX), Math.abs(percentY))
        const blur = 40 + tiltAmount * 20

        const shadowX = -percentX * shadowDistance
        const shadowY = percentY * shadowDistance

        card.style.boxShadow = `
        ${shadowX}px ${shadowY}px ${blur}px rgba(0,0,0,0.25)
        `
    })

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg)"
    })

}