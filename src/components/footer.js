import { DEV, GITHUB, LINKEDIN, YOUTUBE } from "../data/links";
import { createIcon } from "./fa_icons";

export function createFooter() {
    const currentYear = new Date().getFullYear();
    const contactItems = [
        { icon: "location-dot", label: "Location Template" },
        { icon: "phone", label: "Phone Template" },
        { icon: "envelope", label: "Email Template" },
        { icon: "file-pdf", label: "Resume Template" },
    ];

    return `
        <footer>
            <div class="footer-grid-container">
                <div class="footer-top">
                    <div class="footer-brand">
                        <h2>alayna_devs</h2>
                        <ul class="footer-contacts-icons">
                            ${contactItems
        .map(
            ({ icon, label }) => `
                                <li class="footer-contact-item">
                                    ${createIcon(icon, "solid")}
                                    <span class="footer-contact-label">${label}</span>
                                </li>
                            `
        )
        .join("")}
                        </ul>
                    </div>

                    <div class="footer-grid">
                        <div>
                            <h3>Menu</h3>
                            <ul>
                                <li><a href="/#projects" data-link>Projects</a></li>
                                <li><a href="/#skills" data-link>Skills</a></li>
                                <li><a href="/#education" data-link>Education</a></li>
                                <li><a href="/#contacts" data-link>Contacts</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3>More</h3>
                            <ul>
                                <li><a href="/about-me" data-link>About Me</a></li>
                                <li><a href="/projects" data-link>All Projects</a></li>
                                <li><a href="/testimonials" data-link>Testimonials</a></li>
                                <li><a href="/blogs-articles" data-link>Blogs and Articles</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3>Socials</h3>
                            <ul>
                                <li><a href="${LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                                <li><a href="${GITHUB}" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                                <li><a href="${YOUTUBE}" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                                <li><a href="${DEV}" target="_blank" rel="noopener noreferrer">DEV</a></li>
                            </ul>
                        </div>

                        <div class="footer-upcoming">
                            <h3>Upcoming</h3>
                            <ul>
                                <li>About Me Page</li>
                                <li>Work Experience Section</li>
                                <li>Technical Blog</li>
                                <li>Case Studies</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <h2>Let&#39;s build something <span>great</span>.</h2>
                    <p>© ${currentYear}. All rights reserved by Alayna Taylor.</p>
                </div>
            </div>
        </footer>
    `
}
