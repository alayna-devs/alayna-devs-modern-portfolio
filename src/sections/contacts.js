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
                                <p>Software Engineer | Full-Stack Web Developer</p>
                            </div>
                        </div>

                        <div class="contact-copy">
                            <h2 class="tech-title">Impressed? Let&#39;s Connect!</h2>
                            <p>I build fast, accessible web applications using React, TailwindCSS, Express.js, and Javascript. I’m always interested in connecting with teams that care about performance, clean design, and great user experiences.</p>
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
    let frame = 0
    let lastEvent = null
    let cardRect = null

    const updateRect = () => {
        cardRect = card.getBoundingClientRect()
    }

    const resetCardState = () => {
        card.style.transform = "translateZ(0) rotateX(0deg) rotateY(0deg)"
        card.style.boxShadow = "0px 24px 40px rgba(0,0,0,0.28)"
    }

    const applyTilt = (event) => {

        if (!cardRect) updateRect()
        const x = event.clientX - cardRect.left
        const y = event.clientY - cardRect.top

        const centerX = cardRect.width / 2
        const centerY = cardRect.height / 2

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

    const handlePointerMove = (event) => {
        lastEvent = event
        if (frame) return
        frame = window.requestAnimationFrame(() => {
            frame = 0
            if (lastEvent) applyTilt(lastEvent)
        })
    }

    const handlePointerEnter = () => {
        updateRect()
    }

    const handlePointerLeave = () => {
        resetCardState()
    }

    card.addEventListener("pointerenter", handlePointerEnter)
    card.addEventListener("pointermove", handlePointerMove)
    card.addEventListener("pointerleave", handlePointerLeave)
    window.addEventListener("resize", updateRect)

    return () => {
        if (frame) window.cancelAnimationFrame(frame)
        window.removeEventListener("resize", updateRect)
        card.removeEventListener("pointerenter", handlePointerEnter)
        card.removeEventListener("pointermove", handlePointerMove)
        card.removeEventListener("pointerleave", handlePointerLeave)
    }
}
