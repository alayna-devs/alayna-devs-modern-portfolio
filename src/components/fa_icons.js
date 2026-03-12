// navigation icons
export function createIcon(name, style = "brands", extra = "") {
    return `<i class="fa-${style} fa-${name} ${extra}"></i> `
}

export function createDevIcon(name, variant = "plain", extra = "") {
    return `<i class="devicon-${name}-${variant} ${extra}"></i> `
}

