const TOP_THRESHOLD = 140
const BOTTOM_THRESHOLD = 140

export function createScrollToggleButton() {
    return `
        <button
            class="scroll-toggle-btn icon-tooltip"
            type="button"
            data-scroll-toggle
            data-tooltip="Scroll to bottom"
            aria-label="Scroll to bottom"
        >
            <i class="fa-solid fa-arrow-down" aria-hidden="true"></i>
        </button>
    `
}

export function initScrollToggleButton() {
    const button = document.querySelector("[data-scroll-toggle]");
    if (!button) return () => {};

    const icon = button.querySelector("i");
    if (!icon) return () => {};

    let mode = "down";
    let modeRaf = 0;

    const updateMode = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        const nearTop = scrollTop <= TOP_THRESHOLD;
        const nearBottom = maxScroll - scrollTop <= BOTTOM_THRESHOLD;
        const nextMode = nearTop && !nearBottom ? "down" : "up";

        if (nextMode === mode) return;

        mode = nextMode;
        icon.className = mode === "down" ? "fa-solid fa-arrow-down" : "fa-solid fa-arrow-up";

        const tooltip = mode === "down" ? "Scroll to bottom" : "Back to top";
        button.setAttribute("aria-label", tooltip);
        button.setAttribute("data-tooltip", tooltip);
    };

    const scheduleModeUpdate = () => {
        if (modeRaf) return;
        modeRaf = window.requestAnimationFrame(() => {
            modeRaf = 0;
            updateMode();
        });
    };

    const onClick = () => {
        const top = mode === "down"
            ? document.documentElement.scrollHeight
            : 0;

        window.scrollTo({
            top,
            behavior: "smooth"
        });
    };

    window.addEventListener("scroll", scheduleModeUpdate, { passive: true });
    window.addEventListener("resize", scheduleModeUpdate);
    button.addEventListener("click", onClick);
    updateMode();

    return () => {
        if (modeRaf) window.cancelAnimationFrame(modeRaf);
        window.removeEventListener("scroll", scheduleModeUpdate);
        window.removeEventListener("resize", scheduleModeUpdate);
        button.removeEventListener("click", onClick);
    };
}
