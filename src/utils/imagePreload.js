/**
 * Image preloading and cache hints.
 * Database-stored image URLs (e.g. Supabase Storage) are fetched via HTTP.
 * The browser caches responses based on Cache-Control from the server.
 * Preloading fetches images early so they're in cache when <img> tags render;
 * preconnect warms the connection so the first request is faster.
 */

function isPreloadableUrl(value = "") {
    const url = String(value || "").trim()
    if (!url) return false
    try {
        const parsed = new URL(url)
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false
        if (url.startsWith("data:") || url.startsWith("blob:")) return false
        return /\.(avif|webp|png|jpe?g|gif|svg)([?#].*)?$/i.test(url) || parsed.pathname.includes("/storage/")
    } catch {
        return false
    }
}

/**
 * Add preconnect hint for the given origin to speed up initial image fetches.
 * @param {string} url - Full URL (e.g. Supabase project URL)
 */
export function addPreconnect(url) {
    if (!url || typeof document === "undefined") return
    try {
        const parsed = new URL(String(url).trim())
        const origin = `${parsed.protocol}//${parsed.host}`
        const existing = document.querySelector(`link[rel="preconnect"][href="${origin}"]`)
        if (existing) return

        const link = document.createElement("link")
        link.rel = "preconnect"
        link.href = origin
        link.crossOrigin = "anonymous"
        document.head.appendChild(link)
    } catch {
        /* ignore invalid URLs */
    }
}

/**
 * Preload image URLs so they are fetched and cached before <img> tags render.
 * Safe to call with empty or invalid URLs; only preloads http(s) image URLs.
 * @param {string[]} urls - Image URLs to preload (e.g. project cover URLs)
 * @param {number} max - Maximum number to preload (default 6)
 */
export function preloadImages(urls = [], max = 6) {
    if (!Array.isArray(urls) || typeof document === "undefined") return
    const seen = new Set()
    let count = 0

    for (const url of urls) {
        if (count >= max) break
        if (!url || seen.has(url) || !isPreloadableUrl(url)) continue
        seen.add(url)

        const link = document.createElement("link")
        link.rel = "preload"
        link.as = "image"
        link.href = url
        document.head.appendChild(link)
        count += 1
    }
}
