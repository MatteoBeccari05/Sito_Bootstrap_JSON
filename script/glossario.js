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

fetch('../json/glossario.json')
        .then(response => response.json())
        .then(data => {
            const navbarContainer = document.querySelector('nav .container-fluid');
            const navbarBrand = navbarContainer.querySelector('.navbar-brand');
            navbarBrand.href = data.navbar.brand.href;
            const navbarLogo = navbarBrand.querySelector('img');
            navbarLogo.src = data.navbar.brand.img.src;
            navbarLogo.alt = data.navbar.brand.img.alt;
            navbarLogo.style = data.navbar.brand.img.style;

            const navbarMenu = navbarContainer.querySelector('.navbar-nav');
            data.navbar.links.forEach(item => {
                const navItem = document.createElement('li');
                navItem.classList.add('nav-item');
                const activeClass = item.active ? ' active' : '';
                navItem.innerHTML = `<a class="nav-link${activeClass}" href="${item.href}">${item.text}</a>`;
                navbarMenu.appendChild(navItem);
            });

            const contentTitle = document.querySelector('.content-title');
            contentTitle.textContent = data.content.title;
            const accordionContainer = document.getElementById('glossaryAccordion');
            data.content.accordion.forEach((entry, index) => {
                const isExpanded = index === 0 ? 'true' : 'false';
                const showClass = index === 0 ? ' show' : '';

                const accordionItem = document.createElement('div');
                accordionItem.classList.add('accordion-item');
                accordionItem.innerHTML = `
                    <h2 class="accordion-header" id="heading${index}">
                        <button class="accordion-button${index !== 0 ? ' collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="${isExpanded}" aria-controls="collapse${index}">
                            ${entry.title}
                        </button>
                    </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse${showClass}" aria-labelledby="heading${index}" data-bs-parent="#glossaryAccordion">
                        <div class="accordion-body">
                            ${entry.content}
                            <ul class="list-group mt-3">
                                ${entry.items.map(item => `
                                    <li class="list-group-item">
                                        <strong>${item.title}</strong>: ${item.description}
                                    </li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
                accordionContainer.appendChild(accordionItem);
            });

            // footer
            const footer = document.querySelector('footer');
            footer.innerHTML = `
                <p>${data.footer.text} <img src="${data.footer.logo}" alt="WBSCHOOL Logo" style="height: 50px;"></p>
                <p>${data.footer.author}</p>
            `;
        })
        .catch(error => {
            console.error('Errore nel caricare il file JSON:', error);
        });
