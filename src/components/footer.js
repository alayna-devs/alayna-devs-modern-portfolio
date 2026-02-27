import { DEV, GITHUB, LINKEDIN, YOUTUBE } from "../data/links";
import { createIcon } from "./fa_icons";

export function createFooter() {
    return `
        <footer>
            <div class="footer-grid-container">
                <div>
                    <div class="footer-brand">
                        <h2>alayna_devs</h2>
                        <ul class="footer-contacts-icons">
                            <li>${createIcon("location-dot", "solid")}</li>
                            <li>${createIcon("phone", "solid")}</li>
                            <li>${createIcon("envelope", "solid")}</li>
                            <li>${createIcon("file-pdf", "solid")}</li>
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

                        <div>
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

                <div class="footer-cta">
                    <h2>Let&#39;s build something great.</h2>
                </div>

                <div class="footer-bottom">
                    <p>© 2026. All rights reserved by Alayna Taylor.</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
        </footer>
    `
}
