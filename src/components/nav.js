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
        <nav class="navbar nav-visible">
            <div class="container navdiv">
                <div class="logo"><a href="/" data-link>alayna_devs</a></div>

                <ul class="social-links">
                    <li><a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-tooltip="LinkedIn">${linkedInIcon}</a></li>
                    <li><a href="${GITHUB}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-tooltip="GitHub">${githubIcon}</a></li>
                    <li><a href="${LEETCODE}" target="_blank" rel="noopener noreferrer" aria-label="LeetCode" data-tooltip="Leetcode">${leetcodeIcon}</a></li>
                    <li><a href="${CODEWARS}" target="_blank" rel="noopener noreferrer" aria-label="Codewars" data-tooltip="Codewars">${codewarsIcon}</a></li>
                    <li><a href="${HACKERRANK}" target="_blank" rel="noopener noreferrer" aria-label="HackerRank" data-tooltip="HackerRank">${hackerrankIcon}</a></li>
                    <li><a href="${RESUME}" target="_blank" rel="noopener noreferrer" aria-label="Resume PDF" data-tooltip="Resume">${resumeIcon}</a></li>
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

    const existingDetachedMenu = document.body.querySelector(".side-menu[data-detached='true']")
    if (existingDetachedMenu && existingDetachedMenu !== menu) {
        existingDetachedMenu.remove()
    }
    if (menu.parentElement !== document.body) {
        document.body.appendChild(menu)
    }
    menu.setAttribute("data-detached", "true")

    const lockBodyScroll = () => {
        const scrollY = window.scrollY
        document.body.dataset.lockScrollY = String(scrollY)
        document.body.style.position = "fixed"
        document.body.style.top = `-${scrollY}px`
        document.body.style.left = "0"
        document.body.style.right = "0"
        document.body.style.width = "100%"
    }

    const unlockBodyScroll = () => {
        if (!("lockScrollY" in document.body.dataset)) return
        const locked = Number.parseFloat(document.body.dataset.lockScrollY || "0")
        document.body.style.position = ""
        document.body.style.top = ""
        document.body.style.left = ""
        document.body.style.right = ""
        document.body.style.width = ""
        delete document.body.dataset.lockScrollY
        window.scrollTo({ top: Number.isFinite(locked) ? locked : 0, left: 0, behavior: "auto" })
    }

    const openMenu = () => {
        setNavVisible(true)
        menu.classList.add("active")
        menu.setAttribute("aria-hidden", "false")
        menuToggle.setAttribute("aria-expanded", "true")
        nav.classList.add("menu-open")
        document.body.classList.add("menu-open")
        lockBodyScroll()
    }

    const closeMenu = () => {
        menu.classList.remove("active")
        menu.setAttribute("aria-hidden", "true")
        menuToggle.setAttribute("aria-expanded", "false")
        nav.classList.remove("menu-open")
        document.body.classList.remove("menu-open")
        unlockBodyScroll()
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

    const handleMenuLinkClick = (event) => {
        const link = event.target.closest("a")
        if (!link) return
        closeMenu()
    }

    menuToggle.addEventListener("click", handleToggleClick)
    closeButton.addEventListener("click", handleCloseClick)
    menu.addEventListener("click", handleMenuLinkClick)
    document.addEventListener("click", handleOutsideClick)
    document.addEventListener("keydown", handleEscape)

    let lastScrollY = window.scrollY
    const topBuffer = 16
    const minDelta = window.matchMedia("(max-width: 1100px)").matches ? 2 : 6
    let isNavVisible = true
    let scrollRaf = 0
    const setNavVisible = (visible) => {
        if (visible === isNavVisible) return
        isNavVisible = visible
        nav.classList.toggle("nav-visible", visible)
        nav.classList.toggle("nav-hidden", !visible)
    }
    
    const processScroll = () => {
        if (menu.classList.contains("active")) return

        const currentScrollY = window.scrollY
        const delta = currentScrollY - lastScrollY
        
        if (currentScrollY <= topBuffer) {
            setNavVisible(true)
            lastScrollY = currentScrollY
            return
        }
        
        if (Math.abs(delta) < minDelta) return
        
        setNavVisible(delta < 0)
        lastScrollY = currentScrollY
    }

    const handleScroll = () => {
        if (scrollRaf) return
        scrollRaf = window.requestAnimationFrame(() => {
            scrollRaf = 0
            processScroll()
        })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    processScroll()

    return () => {
        closeMenu()
        menuToggle.removeEventListener("click", handleToggleClick)
        closeButton.removeEventListener("click", handleCloseClick)
        menu.removeEventListener("click", handleMenuLinkClick)
        document.removeEventListener("click", handleOutsideClick)
        document.removeEventListener("keydown", handleEscape)
        if (scrollRaf) window.cancelAnimationFrame(scrollRaf)
        window.removeEventListener("scroll", handleScroll)
        menu.remove()
    }
}
