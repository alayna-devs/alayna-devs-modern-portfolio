import { GITHUB } from "../data/links"
import { heroPhoto } from "../data/images"
import namePronounceAudio from "../assets/audio/name-pronounce.mp3"

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
                        <p class="bio-info">Computer Science student focused on full-stack web development, building responsive applications while strengthening foundations in React, TailwindCSS, JavaScript, Express.js, and PostgreSQL.</p>
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
