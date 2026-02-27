import { courseraLogo, googleLogo, ibmLogo, studyLogo, harvardLogo, scrumBadge, wguLogo, pluralsightLogo, ctdLogo } from "./images"

import { couseraProfile, CS50, ctdCert, googleITPython, ibmFrontendReact, ibmIntroWeb, pluralsightProfile, scrumAlliance, studyBusiness, studyIT, wguCSDegree } from "./links"

export const certs = [
    {
        id: 1,
        image: googleLogo,
        title: "Google IT Automation with Python Professional Certificate",
        provider: "Coursera",
        date: "01/2026 - Present",
        status: "In-progress",
        verifyUrl: googleITPython,
        location: "Online"
    },
    {
        id: 2,
        image: ibmLogo,
        title: "Introduction to Web Development with HTML5, CSS3, and JavaScript",
        provider: "edX",
        date: "02/2026",
        status: "Completed",
        verifyUrl: ibmIntroWeb,
        location: "Online"
    },
    {
        id: 3,
        image: ibmLogo,
        title: "Developing Front End Apps with React",
        provider: "edX",
        date: "02/2026",
        status: "Upcoming",
        verifyUrl: ibmFrontendReact,
        location: "Online"
    },
    {
        id: 4,
        image: harvardLogo,
        title: "CS50's Introduction to Computer Science",
        provider: "edX",
        date: "03/2026",
        status: "Upcoming",
        verifyUrl: CS50,
        location: "Online"
    },
    {
        id: 5,
        image: scrumBadge,
        title: "Scrum Foundations",
        provider: "Scrum Alliance",
        date: "02/2023",
        status: "Completed",
        verifyUrl: scrumAlliance,
        location: "Online"
    },
]

export const courses = [
    {
        id: 1,
        image: ctdLogo,
        title: "Fullstack Development with HTML, CSS, JavaScript, React, and Node.js",
        provider: "Code The Dream",
        date: "02/2025 - 11/2025",
        status: "Completed",
        verifyUrl: ctdCert, 
        location: "Online"
    },
    {
        id: 2,
        image: pluralsightLogo,
        title: "Public Achievement Record",
        provider: "Pluralsight",
        date: "Current",
        status: "",
        verifyUrl: pluralsightProfile,
        location: ""
    },
    {
        id: 3,
        image: courseraLogo,
        title: "Public Achievement Record",
        provider: "Coursera",
        date: "Current",
        status: "",
        verifyUrl: couseraProfile,
        location: ""
    },
]

export const academics = [
    {
        id: 1,
        image: wguLogo,
        major: "B.S. Computer Science",
        school: "Western Governor University",
        date: "03/2026 - Present",
        location: "Online",
        site: wguCSDegree,
    },
    {
        id: 2,
        image: studyLogo,
        major: "Computer Science 102: Fundamentals of Information Technology",
        school: "study.com",
        date: "05/2023",
        location: "Online",
        site: studyIT,
    },
    {
        id: 3,
        image: studyLogo,
        major: "Business 104: Information Systems and Computer Applications",
        school: "study.com",
        date: "05/2023",
        location: "Online",
        site: studyBusiness,
    },
]
