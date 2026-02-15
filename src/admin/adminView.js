import { addProject } from "../data/projectsStore"

const params = new URLSearchParams(window.location.search)
const token = params.get("token")

const ADMIN_TOKEN = "s"

if (token !== ADMIN_TOKEN) {
    document.body.innerHTML = "<h1>404</h1>"
    throw new Error("Unauthorized")
}

function getProjectFromForm() {
    return {
        id: crypto.randomUUID(),
        title: titleInput.value,
        date: new Date().toISOString(),
        description: descInput.value,
        tech: techInput.value.split(","),
        labels: labelsInput.value.split(","),
        featured: featuredCheckbox.checked,
        github: githubURL.value,
        media: mediaInput.value
    }
}

saveBtn.addEventListner("click", () => {
    const project = getProjectFromForm()
    addProject(project)
})