import { createSideMenu } from "../utils/side-menu"
import { createIcon } from "./fa_icons"

import { CODEWARS, GITHUB, HACKERRANK, LEETCODE, LINKEDIN, RESUME } from "../data/links"

const linkedInIcon = createIcon("linkedin", "brands")
const githubIcon = createIcon("github", "brands")
const resumeIcon = createIcon("file-pdf", "solid")
const leetcodeIcon = createIcon("leetcode", "brands")
const hackerrankIcon = createIcon("hackerrank", "brands")
const codewarsIcon = createIcon("code", "solid")
const barsIcon = createIcon("bars", "solid")

export function createNav() {
    return `
        <nav class="navbar">
            <div class="container navdiv">
                <div class="logo"><a href="/" data-link>alayna_devs</a></div>

                <ul class="social-links">
                    <li><a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${linkedInIcon}</a></li>
                    <li><a href="${GITHUB}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${githubIcon}</a></li>
                    <li><a href="${LEETCODE}" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">${leetcodeIcon}</a></li>
                    <li><a href="${CODEWARS}" target="_blank" rel="noopener noreferrer" aria-label="Codewars">${codewarsIcon}</a></li>
                    <li><a href="${HACKERRANK}" target="_blank" rel="noopener noreferrer" aria-label="HackerRank">${hackerrankIcon}</a></li>
                    <li><a href="${RESUME}" target="_blank" rel="noopener noreferrer" aria-label="Resume PDF">${resumeIcon}</a></li>
                    <li>
                        <button class="menu-toggle bars-icon" type="button" aria-expanded="false" aria-label="Open menu">
                            ${barsIcon}
                        </button>
                    </li>
                </ul>
            </div>
            ${createSideMenu()}
        </nav>
    `
}

export function initMenu() {
    const nav = document.querySelector(".navbar")
    if (!nav) return

    const menuToggle = nav.querySelector(".menu-toggle")
    const menu = nav.querySelector(".side-menu")
    const closeButton = nav.querySelector(".menu-close-btn")

    if (!menuToggle || !menu || !closeButton) return

    const openMenu = () => {
        menu.classList.add("active")
        menu.setAttribute("aria-hidden", "false")
        menuToggle.setAttribute("aria-expanded", "true")
    }

    const closeMenu = () => {
        menu.classList.remove("active")
        menu.setAttribute("aria-hidden", "true")
        menuToggle.setAttribute("aria-expanded", "false")
    }

    const handleToggleClick = (event) => {
        event.stopPropagation()
        if (menu.classList.contains("active")) {
            closeMenu()
            return
        }
        openMenu()
    }

    const handleCloseClick = (event) => {
        event.stopPropagation()
        closeMenu()
    }

    const handleOutsideClick = (event) => {
        if (!menu.classList.contains("active")) return
        if (menu.contains(event.target) || menuToggle.contains(event.target)) return
        closeMenu()
    }

    const handleEscape = (event) => {
        if (event.key === "Escape") closeMenu()
    }

    menuToggle.addEventListener("click", handleToggleClick)
    closeButton.addEventListener("click", handleCloseClick)
    document.addEventListener("click", handleOutsideClick)
    document.addEventListener("keydown", handleEscape)

    return () => {
        menuToggle.removeEventListener("click", handleToggleClick)
        closeButton.removeEventListener("click", handleCloseClick)
        document.removeEventListener("click", handleOutsideClick)
        document.removeEventListener("keydown", handleEscape)
    }
}
