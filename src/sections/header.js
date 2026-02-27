import { GITHUB } from "../data/links"
import { heroPhoto } from "../data/images"

export function createHeader() {
    return `
        <header>
            <div class="container">
                <div class="intro-div">
                    <div class="intro-info-div">
                        <h1 class="name-info">Alayna Taylor</h1>
                        <div class="title-info">Software Engineer</div>
                        <p class="bio-info">Designing robust systems and building dependable software.</p>
                        <a class="github-btn" href="${GITHUB}" target="_blank" rel="noopener noreferrer">View My GitHub</a>
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
