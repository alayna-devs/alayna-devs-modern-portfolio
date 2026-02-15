export function createProjectCard(project, options = {}) {
    const className = options.className ? ` ${options.className}` : ""

    return `
        <article class="project-card${className}" data-id="${project.id}">
            <img src="${project.cover}" alt="${project.title}" />
            <div class="card-content">
                <span class="card-title">${project.title}</span>
                <span class="card-label">${project.label}</span>
            </div>
        </article>
    `
}
