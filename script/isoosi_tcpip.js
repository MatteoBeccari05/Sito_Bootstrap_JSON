document.addEventListener('DOMContentLoaded', function () {
    // Impedisci la copia del testo
    document.body.addEventListener('copy', (event) => {
        event.preventDefault();
        console.warn('Copia del testo non consentita!');
    });
    document.body.style.userSelect = 'none';
    document.body.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        console.warn('Clic destro disabilitato!');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('../json/isoosi_tcpip.json')
        .then(response => response.json())
        .then(data => {
            // titolo della pagina
            document.title = data.title;

            // navbar
            const navbar = document.querySelector('nav');
            navbar.innerHTML = `
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="${data.navbar.brand.href}">
                            <img src="${data.navbar.brand.logo}" alt="${data.navbar.brand.alt}" style="height: ${data.navbar.brand.height};">
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav">
                                ${data.navbar.items.map(item => `
                                    <li class="nav-item">
                                        <a class="nav-link ${item.active ? 'active' : ''}" href="${item.href}">${item.text}</a>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </nav>
            `;

            // contenuto principale
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = `
                <h1 class="text-center mb-4">${data.content.header.title}</h1>
                <p class="giustificato">${data.content.header.description}</p>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>${data.content.table.headers[0]}</th>
                            <th>${data.content.table.headers[1]}</th>
                            <th>${data.content.table.headers[2]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.content.table.rows.map(row => `
                            <tr>
                                <td>${row[0]}</td>
                                <td>${row[1]}</td>
                                <td>${row[2]}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <img src="${data.content.image.src}" class="img-fluid" alt="${data.content.image.alt}">
                ${data.content.paragraphs.map(paragraph => `
                    <h3 class="mt-4">${paragraph.title}</h3>
                    <p class="giustificato">${paragraph.content.join('</p><p class="giustificato">')}</p>
                `).join('')}
            `;

            // footer
            const footer = document.querySelector('footer');
            footer.innerHTML = `
                <p>${data.footer.text} <img src="${data.footer.logo}" alt="WBSCHOOL Logo" style="height: 50px;"></p>
                <p>${data.footer.author}</p>
            `;
        })
        .catch(error => console.error('Errore nel caricamento del JSON:', error));
});
