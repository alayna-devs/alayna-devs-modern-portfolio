import { createNav } from '../components/nav'
import { createHeader } from '../sections/header'
import { createProjects } from '../sections/projects'
import { createSkills } from '../sections/skills'
import { createEducation } from '../sections/education'
import { createFooter } from '../components/footer'
import { createContacts } from '../sections/contacts'

import '../import_css'
import '@fortawesome/fontawesome-free/css/all.min.css'

export function createHomeView() {
    return `
        ${createNav()}
        ${createHeader()}
        ${createProjects()}
        ${createSkills()}
        ${createEducation()}
        ${createContacts()}
        ${createFooter()}
    `
}
