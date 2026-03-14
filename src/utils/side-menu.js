import { createIcon } from "../components/fa_icons"
import { CODEWARS, GITHUB, HACKERRANK, LEETCODE, LINKEDIN, RESUME, YOUTUBE, DEV } from "../data/links"

export function createSideMenu() {
    return `
        <aside class="side-menu" aria-hidden="true">
            <button class="menu-close-btn" type="button" aria-label="Close menu">
                ${createIcon("xmark", "solid")}
            </button>

            <div class="side-menu-group">
                <h5>Explore More</h5>
                <ul class="side-menu-links">
                    <li><a href="/" data-link>Home</a></li>
                    <li><a href="/about-me" data-link>About Me</a></li>
                    <li><a href="/projects" data-link>All Projects</a></li>
                    <li><a href="/testimonials" data-link>Testimonials</a></li>
                    <li><a href="/blogs-articles" data-link>Blogs and Articles</a></li>
                </ul>
            </div>

            <div class="side-menu-group">
                <h5>Socials &amp; Resume</h5>
                <ul class="side-menu-links">
                    <li><a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                    <li><a href="${GITHUB}" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    <li><a href="${YOUTUBE}" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                    <li><a href="${DEV}" target="_blank" rel="noopener noreferrer">DEV</a></li>
                    <li><a href="${RESUME}" target="_blank" rel="noopener noreferrer">Resume (PDF)</a></li>
                </ul>
            </div>

            <div class="side-menu-group">
                <h5>Coding Profiles</h5>
                <ul class="side-menu-links">
                    <li><a href="${LEETCODE}" target="_blank" rel="noopener noreferrer">LeetCode</a></li>
                    <li><a href="${CODEWARS}" target="_blank" rel="noopener noreferrer">Codewars</a></li>
                    <li><a href="${HACKERRANK}" target="_blank" rel="noopener noreferrer">HackerRank</a></li>
                </ul>
            </div>
        </aside>
    `
}
