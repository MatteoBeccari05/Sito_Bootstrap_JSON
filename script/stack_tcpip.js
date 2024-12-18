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

document.addEventListener('DOMContentLoaded', function () {
    fetch('../json/stack_tcpip.json')
        .then(response => response.json())
        .then(data => {
            document.title = data.head.title;

            const headLinks = data.head.links;
            headLinks.forEach(link => {
                const linkElement = document.createElement('link');
                linkElement.setAttribute('rel', link.rel);
                linkElement.setAttribute('href', link.href);
                if (link.integrity) linkElement.setAttribute('integrity', link.integrity);
                if (link.crossorigin) linkElement.setAttribute('crossorigin', link.crossorigin);
                document.head.appendChild(linkElement);
            });

            const navbarBrand = document.querySelector('.navbar-brand');
            const brand = data.body.nav.navbar.container_fluid.navbar_brand;
            navbarBrand.innerHTML = `
                <a class="navbar-brand" href="${brand.href}">
                    <img src="${brand.img.src}" alt="${brand.img.alt}" style="height: ${brand.img.height}">
                </a>
            `;

            const navbarToggler = document.querySelector('.navbar-toggler');
            const togglerData = data.body.nav.navbar.container_fluid.navbar_toggler;
            navbarToggler.setAttribute('type', togglerData.type);
            navbarToggler.setAttribute('data-bs-toggle', togglerData.data_bs_toggle);
            navbarToggler.setAttribute('data-bs-target', togglerData.data_bs_target);
            navbarToggler.setAttribute('aria-controls', togglerData.aria_controls);
            navbarToggler.setAttribute('aria-expanded', togglerData.aria_expanded);
            navbarToggler.setAttribute('aria-label', togglerData.aria_label);
            navbarToggler.innerHTML = `<span class="${togglerData.span.class}"></span>`;

            const navbarLinks = data.body.nav.navbar.container_fluid.navbar_collapse.ul.navbar_nav;
            const navbarLinksElement = document.querySelector('#navbarNavDropdown .navbar-nav');
            navbarLinksElement.innerHTML = ''; 

            navbarLinks.forEach(link => {
                const linkElement = document.createElement('li');
                linkElement.classList.add('nav-item');

                const anchor = document.createElement('a');
                anchor.classList.add('nav-link');

                if (link.link.active) anchor.classList.add('active');
                anchor.href = link.link.href;
                anchor.textContent = link.link.text;

                linkElement.appendChild(anchor);
                navbarLinksElement.appendChild(linkElement);
            });

            const contentContainer = document.querySelector('.container.mt-5');
            const content = data.body.content.container;
            contentContainer.innerHTML = `
                <h1 class="text-center mb-4">${content.header.text}</h1>
                ${content.paragraphs.map(section => {
                    if (section.h3) {
                        return `<h3>${section.h3}</h3><p class="${section.class}">${section.text}</p>`;
                    } else if (section.img) {
                        return `<img src="${section.img.src}" alt="${section.img.alt}" class="${section.img.class}">`;
                    } else {
                        return `<p>${section.text}</p>`;
                    }
                }).join('')}
            `;

            const footerContent = document.querySelector('footer');
            const footer = data.body.footer;
            footerContent.innerHTML = `
                <p>${footer.content[0].text} 
                    <img src="${footer.content[0].img.src}" alt="${footer.content[0].img.alt}" style="height: ${footer.content[0].img.height};">
                </p>
                <p>${footer.content[1].text}</p>
            `;
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
});
