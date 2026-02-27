import { stacks, highlights } from "../data/skillsStore"
import { createStackCard, createHighlightCard } from "../components/stackCard"

export function createSkills() {
    const currentStacks = stacks.filter(stack => stack.current)
    const baseStacks = stacks.filter(stack => !stack.current)

    const baseStackCardsHtml = baseStacks.map(stack => createStackCard(stack)).join("")
    const currentStackCardsHtml = currentStacks.map(stack => createStackCard(stack)).join("")
    const highlightCardsHtml = highlights.map(highlight => createHighlightCard(highlight)).join("")

    return `
        <section id="skills">
            <div class="container">
                <div class="skills-content">
                    <div class="stacks-div">
                        <h2 class="skills-title">Engineering Toolkit</h2>
                        <p class="skills-body">Core stack and current learning focus.</p>

                        <div class="stacks-grid">
                            ${baseStackCardsHtml}
                        </div>

                        <div class="current-div">
                            <p class="current-title">Currently Focused On</p>
                            <div class="current-grid">
                                ${currentStackCardsHtml}
                            </div>
                        </div>
                    </div>

                    <div class="highlights-grid">
                        ${highlightCardsHtml}
                    </div>
                </div>
            </div>
        </section>
    `
}
