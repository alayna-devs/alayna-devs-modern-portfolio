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

    const statusPriority = {
        completed: 0,
        "in-progress": 1,
        upcoming: 2
    }

    const sortedItems = items
        .map((item, index) => ({ item, index }))
        .sort((a, b) => {
            const aStatus = toStatusClass(a.item?.status || "")
            const bStatus = toStatusClass(b.item?.status || "")
            const aPriority = statusPriority[aStatus] ?? Number.MAX_SAFE_INTEGER
            const bPriority = statusPriority[bStatus] ?? Number.MAX_SAFE_INTEGER

            if (aPriority !== bPriority) return aPriority - bPriority
            return a.index - b.index
        })
        .map(({ item }) => item)

    return sortedItems.map((item, index) => {
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
                <h4 class="edu-card-title">${title}</h4>
                <h4 class="edu-card-provider">${provider}</h4>
                <p class="edu-card-date">${date}</p>
                ${status ? `<span class="edu-status ${statusClass}">${status}</span>` : ""}
                ${location ? `<p class="edu-card-location">${location}</p>` : ""}
                ${verifyUrl ? `<a class="link-button edu-view-link" href="${verifyUrl}" target="_blank" rel="noopener noreferrer"><span>View</span><i class="fa-solid fa-up-right-from-square" aria-hidden="true"></i></a>` : ""}
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
