import {stacks, highlights} from '../data/skillsStore'
import { createStackCard, createHighlightCard } from '../components/stackCard'

export function createSkills() {
    const currentOnlyCard = stacks.filter(stack => (stack.current)) //filter object
    const currentCard = currentOnlyCard.map(stack => (createStackCard(stack))).join("") // convert the object

    const stackOnlyCard = stacks.filter(stack => (!stack.current))
    const stackCard = stackOnlyCard.map(stack => ( createStackCard(stack)) ).join("")

    const highlightCard = highlights.map(highlight => (createHighlightCard(highlight))).join("")

    return `
        <section id="skills">
            <div class="container">
                
                <div class="skills-content">
                    
                    <div class="stacks-div">
                        <h1 class="skills-title">Engineering Toolkit</h1>
                        <p class="skills-body">My Tech Stack</p>

                        <div class="stacks-grid">
                            ${stackCard}
                        </div>

                        <div class="current-div">
                            <p class="current-title">Currently Focused On</p>
                            <div class="current-grid">
                                ${currentCard}
                            </div>
                        </div>
                    </div>

                    <div class="highlights-grid">
                        ${highlightCard}
                    </div>       
                </div>


            </div>
        </section>
    `
}