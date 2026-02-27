import { defaultImg } from "../data/images"

function escapeHtml(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;")
}

function toStatusClass(status = "") {
    return String(status).trim().toLowerCase().replace(/\s+/g, "-")
}

export function createEduCards(items, typeClass = "") {
    if (!Array.isArray(items) || !items.length) return ""

    return items.map((item, index) => {
        const title = escapeHtml(item.title || item.major || "")
        const provider = escapeHtml(item.provider || item.school || "")
        const date = escapeHtml(item.date || "")
        const status = escapeHtml(item.status || "")
        const location = escapeHtml(item.location || "")
        const verifyUrl = item.verifyUrl || item.site
        const statusClass = toStatusClass(item.status)
        const image = item.image || defaultImg
        const isPriorityImage = index < 2

        return `
            <article class="edu-card ${typeClass}">
                <h4>${title}</h4>
                <h4>${provider}</h4>
                <p>${date}</p>
                ${status ? `<span class="edu-status ${statusClass}">${status}</span>` : ""}
                ${location ? `<p>${location}</p>` : ""}
                ${verifyUrl ? `<a href="${verifyUrl}" target="_blank" rel="noopener noreferrer">View</a>` : ""}
                <img
                    class="edu-image"
                    src="${image}"
                    alt="${title}"
                    loading="${isPriorityImage ? "eager" : "lazy"}"
                    decoding="async"
                    fetchpriority="${isPriorityImage ? "high" : "low"}"
                    width="48"
                    height="48"
                    draggable="false"
                />
            </article>
        `
    }).join("")
}
