import { GITHUB } from "../data/links"
import { heroPhoto } from "../data/images"
import namePronounceAudio from "../assets/audio/name-pronounce.mp3"

const NOOP = () => {}

export function createHeader() {
    return `
        <header class="hero-header">
            <div class="container">
                <div class="intro-div">
                    <div class="intro-info-div">
                        <div class="location-line">
                            <span class="location-dot" aria-hidden="true"></span>
                            <span class="location-text">Chicago, IL</span>
                        </div>
                        <div class="name-row">
                            <h1 class="name-info">Alayna Taylor</h1>
                            <button
                                class="name-pronounce-btn icon-tooltip"
                                type="button"
                                data-pronounce-btn
                                data-audio-src="${namePronounceAudio}"
                                data-tooltip="Hear pronunciation"
                                aria-label="Play name pronunciation"
                            >
                                <i class="fa-solid fa-volume-high" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="title-info">Software Engineer</div>
                        <p class="bio-info">Computer Science student focused on full-stack web development, building responsive applications while strengthening foundations in modern frontend and backend development, API integration, and database-driven systems.</p>
                        <a class="github-btn app-btn link-button" href="${GITHUB}" target="_blank" rel="noopener noreferrer">View My GitHub</a>
                    </div>

                    <div class="intro-photo-div">
                        <img
                            class="intro-photo"
                            src="${heroPhoto}"
                            alt="Alayna Taylor portrait"
                            loading="eager"
                            decoding="async"
                            fetchpriority="high"
                            width="736"
                            height="736"
                        />
                    </div>
                </div>
            </div>
        </header>
    `
}

export function initHeroPhotoTilt() {
    const photo = document.querySelector(".hero-header .intro-photo")
    if (!photo) return NOOP

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return NOOP

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (!canHover) return NOOP

    const maxRotation = 14
    const maxLift = 18
    let frame = 0
    let lastEvent = null
    let rect = null

    const updateRect = () => {
        rect = photo.getBoundingClientRect()
    }

    const reset = () => {
        photo.style.transform = "translateZ(0) rotateX(0deg) rotateY(0deg) translateY(0)"
    }

    const applyTilt = (event) => {
        if (!rect) updateRect()
        if (!rect) return

        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const percentX = (x - centerX) / centerX
        const percentY = (y - centerY) / centerY

        const rotateY = -percentX * maxRotation
        const rotateX = percentY * maxRotation
        const lift = -Math.max(Math.abs(percentX), Math.abs(percentY)) * maxLift

        photo.style.transform = `translateZ(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${lift}px)`
    }

    const handleMove = (event) => {
        lastEvent = event
        if (frame) return
        frame = window.requestAnimationFrame(() => {
            frame = 0
            if (lastEvent) applyTilt(lastEvent)
        })
    }

    const handleEnter = () => updateRect()
    const handleLeave = () => reset()

    photo.addEventListener("pointerenter", handleEnter)
    photo.addEventListener("pointermove", handleMove)
    photo.addEventListener("pointerleave", handleLeave)
    window.addEventListener("resize", updateRect)

    return () => {
        if (frame) window.cancelAnimationFrame(frame)
        window.removeEventListener("resize", updateRect)
        photo.removeEventListener("pointerenter", handleEnter)
        photo.removeEventListener("pointermove", handleMove)
        photo.removeEventListener("pointerleave", handleLeave)
        reset()
    }
}
