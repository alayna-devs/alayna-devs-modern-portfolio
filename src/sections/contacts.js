import { GITHUB, LINKEDIN } from "../data/links"
import { profilePhoto } from "../data/images"

export function createContacts() {
    return `
        <section id="contacts">
            <div class="container">
                <div class="contacts-content">
                    <div class="contact-card">
                        <div class="contact-profile">
                            <img
                                class="profile-image"
                                src="${profilePhoto}"
                                alt="Alayna Taylor profile"
                                loading="lazy"
                                decoding="async"
                                fetchpriority="low"
                                width="512"
                                height="512"
                                draggable="false"
                            />

                            <div>
                                <h3>Alayna Taylor</h3>
                                <p>Software Engineer | Full-Stack</p>
                            </div>
                        </div>

                        <div class="contact-copy">
                            <h2 class="tech-title">Impressed? Let&#39;s Connect!</h2>
                            <p>I build fast, accessible web apps with React, Next.js, and TypeScript. I&#39;m looking for teams that value product quality, performance, and thoughtful UX.</p>
                        </div>

                        <div class="contact-links">
                            <a class="contact-link-btn" href="mailto:alaynaonetay@gmail.com">Email Me</a>
                            <a class="contact-link-btn" href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a class="contact-link-btn" href="${GITHUB}" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
}

export function initContactCardTilt() {
    const card = document.querySelector(".contact-card")
    if (!card) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (!canHover) return

    const maxRotation = 12
    const shadowDistance = 24

    const handlePointerMove = (event) => {
        const rect = card.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const percentX = (x - centerX) / centerX
        const percentY = (y - centerY) / centerY

        const rotateY = -percentX * maxRotation
        const rotateX = percentY * maxRotation

        const tiltAmount = Math.max(Math.abs(percentX), Math.abs(percentY))
        const blur = 34 + tiltAmount * 14

        const shadowX = -percentX * shadowDistance
        const shadowY = percentY * shadowDistance

        card.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        card.style.boxShadow = `${shadowX}px ${shadowY}px ${blur}px rgba(0,0,0,0.24)`
    }

    const handlePointerLeave = () => {
        card.style.transform = "translateZ(0) rotateX(0deg) rotateY(0deg)"
        card.style.boxShadow = "0px 24px 40px rgba(0,0,0,0.28)"
    }

    card.addEventListener("pointermove", handlePointerMove)
    card.addEventListener("pointerleave", handlePointerLeave)

    return () => {
        card.removeEventListener("pointermove", handlePointerMove)
        card.removeEventListener("pointerleave", handlePointerLeave)
    }
}
