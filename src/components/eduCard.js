export function createEduCards(data, type) {
    return data.map(item => `
        <div class="edu-card ${type}">
                <h4>${item.title || item.major}</h4>
                <h4>${item.provider || item.school}</h4>
                <p>${item.date}</p>
                ${item.status
                    ? `<span class="edu-status ${item.status.toLowerCase().replace(" ", "-")}">${item.status}</span>`
                    : ""
                }

                ${item.location ? `<p>${item.location}</p>` : ""
                }
                
                ${item.verifyUrl || item.site
                    ? `<a href="${item.verifyUrl || item.site}" target="_blank" rel="noopener noreferrer">View</a>`
                    : ""
                }

                    <img class="edu-image" src="${item.image}" 
                        alt="${item.title || item.major}" />
        </div>
    `).join("")
}
