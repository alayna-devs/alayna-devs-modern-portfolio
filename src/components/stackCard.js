export function createStackCard(stacks) {
    return `
        <div class="stack-card">
            <div class="stack-icon">
                ${stacks.icon}
            </div>
        </div>
    `
}

export function createHighlightCard(highlights) {
    return `
        <div class="highlights-section">
            <div class="highlights-card">
                <div class="highlights-icon">
                ${highlights.icon}
                </div>
            </div>

            <div class="highlights-name">
                ${highlights.name}
            </div>

        </div>
    `
}