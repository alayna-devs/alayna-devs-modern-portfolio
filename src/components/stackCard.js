export function createStackCard(stack) {
    if (!stack) return ""

    return `
        <div class="stack-card" title="${stack.name}">
            <div class="stack-icon" aria-hidden="true">
                ${stack.icon}
            </div>
        </div>
    `
}

export function createHighlightCard(highlight) {
    if (!highlight) return ""

    return `
        <div class="highlights-section">
            <div class="highlights-card" aria-hidden="true">
                <div class="highlights-icon">
                    ${highlight.icon}
                </div>
            </div>

            <p class="highlights-name">${highlight.name}</p>
        </div>
    `
}
