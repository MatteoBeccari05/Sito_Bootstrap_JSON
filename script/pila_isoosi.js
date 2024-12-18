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
    fetch('../json/pila_isoosi.json')
        .then(response => response.json())
        .then(data => {
            // titolo della pagina
            document.title = data.title;

            // Navbar
            const navbar = document.querySelector('nav');
            navbar.innerHTML = `
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="${data.navbar.brand.href}">
                            <img src="${data.navbar.brand.img.src}" alt="${data.navbar.brand.img.alt}" style="height: ${data.navbar.brand.img.height};">
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav">
                                ${data.navbar.menu.map(item => `
                                    <li class="nav-item">
                                        <a class="nav-link ${item.active ? 'active' : ''}" href="${item.href}">${item.name}</a>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </nav>
            `;

            // Contenuto principale
            const contentDiv = document.querySelector('.content');
            contentDiv.innerHTML = `
                <div class="container mt-5">
                    <h1 class="text-center mb-4">${data.content.header.title}</h1>
                    <p class="giustificato">${data.content.header.subheading}</p>
                    <h3>${data.content.levels.title}</h3>
                    <p class="giustificato">${data.content.levels.description}</p>
                    <ul class="giustificato">
                        ${data.content.levels.list.map(level => `
                            <li>
                                <strong>Livello ${level.level}: ${level.name}</strong> - ${level.description}
                                ${level.links ? level.links.map(link => ` <a href="${link.href}" target="_blank">${link.text}</a>`).join('') : ''}
                            </li>
                        `).join('')}
                    </ul>
                    <img src="${data.content.image.src}" class="img-fluid" alt="${data.content.image.alt}">
                    <p class="text-center">${data.content.image.caption}</p>
                </div>
            `;

            // Footer
            const footer = document.querySelector('footer');
            footer.innerHTML = `
                <p>${data.footer.text} <img src="${data.footer.image.src}" alt="${data.footer.image.alt}" style="height: ${data.footer.image.height};"></p>
                <p>${data.footer.author}</p>
            `;
        })
        .catch(error => console.error('Errore nel caricamento del JSON:', error));
});
