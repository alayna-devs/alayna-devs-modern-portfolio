export function createEduCards(data, type) {
    return data.map(item => `
        <div class="edu-card ${type}">
            <div>
                <img class="edu-image" src="${item.image}" 
                    alt="${item.title || item.major}" />
            </div>
            
            <div>
                <h4>${item.title || item.major}</h4>
                <h4>${item.provider || item.school}</h4>
                <p>${item.date}</p>
                ${item.status
                    ? `<span class="edu-status ${item.status.toLowerCase().replace(" ", "-")}">${item.status}</span>`
                    : ""
                }
                <p>${item.location}</p>
                ${item.verifyUrl || item.site
                    ? `<a href="${item.verifyUrl || item.site}" target="_blank" rel="noopener noreferrer">View</a>`
                    : ""
                }
            </div>
        </div>
    `).join("")
}
