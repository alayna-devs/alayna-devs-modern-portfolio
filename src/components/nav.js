import { createSideMenu } from '../utils/side-menu'
import { createIcon } from './fa_icons'

import { COFFEE, GITHUB, LEETCODE, LINKEDIN, RESUME } from '../data/links'

const linkedIN_icon = createIcon("linkedin", "brands")
const github_icon = createIcon("github", "brands")
const coffee_icon = createIcon("mug-hot", "solid")
const resume_icon = createIcon("file-pdf", "solid")
const leetcode_icon = createIcon("leetcode", "brands")
const bars_icon = createIcon("bars", "solid")

export function createNav() {

    return `
        <!--All items within nav bar-->
        <nav class="navbar">
            <div class="navdiv">

                <div class="logo"><a href="/">Savant</a></div>
                    <ul class="social-links">
                        <li><a href=${LINKEDIN} target="blank">${linkedIN_icon}</a></li>
                        <li><a href=${GITHUB} target="blank">${github_icon}</a></li>
                        <li><a href=${LEETCODE}>${leetcode_icon}</a></li>
                        <li><a href=${RESUME} target="blank">${resume_icon}</a></li>
                        <li><a href=${COFFEE} target="blank">${coffee_icon}</a></li>
                        <li class="bars-icon">${bars_icon}</li>
                    </ul>
            </div>
            ${createSideMenu()}
        </nav>
    `
}

export function initMenu() {
    const nav = document.querySelector("nav")
    if (!nav) return

    const barIcon = nav.querySelector(".bars-icon")
    const menu = nav.querySelector(".side-menu")

    if (!barIcon || !menu) return

    // OPEN
    barIcon.addEventListener("click", (e) => {
        e.stopPropagation()
        menu.classList.add("active")
    })

    // CLOSE when clicking outside
    document.addEventListener("click", (e) => {
        if (!menu.classList.contains("active")) return
        if (!menu.contains(e.target)) {
            menu.classList.remove("active")
        }
    })
}


