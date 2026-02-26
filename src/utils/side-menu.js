import { createIcon } from "../components/fa_icons";


export function createSideMenu() {
    return `
        <div class="side-menu">
            <div class="menu-close-btn">
                ${createIcon("xmark", "solid")}
            </div>

            <h5>Explore More!</h5>
            <u>
                <li><a href="/">Home</a></li>
                <li><a href="">About Me</a></li>
                <li><a href="/projects">All Projects</a></li>
                <li><a href="">Testimonials</a></li>
            </u>

            <h5>Socials & Resume</h5>
            <u>
                <li><i class="fa-brands fa-linkedin"></i></li>
            </u>
        </div>
    `
}