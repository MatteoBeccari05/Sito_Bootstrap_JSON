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


fetch('../json/index.json')  // Percorso del file JSON
        .then(response => response.json())
        .then(data => {
            // titolo della pagina
            document.title = data.title;

            // navbar
            const navbarLogo = document.getElementById('navbar-logo');
            navbarLogo.src = data.navbar.brand.logo;
            navbarLogo.alt = data.navbar.brand.alt;

            const navbarItems = document.getElementById('navbar-items');
            data.navbar.items.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('nav-item');
                const a = document.createElement('a');
                a.classList.add('nav-link');
                a.href = item.href;
                a.textContent = item.text;
                if (item.active) {
                    a.classList.add('active');
                }
                li.appendChild(a);
                navbarItems.appendChild(li);
            });

            //contenuto principale
            document.getElementById('header-title').textContent = data.content.header.title;
            document.getElementById('header-subtitle').textContent = data.content.header.subtitle;

            document.getElementById('content-title').textContent = data.content.description.title;

            const contentList = document.getElementById('content-list');
            data.content.description.list.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${item.title}</strong>: ${item.description}`;
                contentList.appendChild(li);
            });

            // cards
            const cardsRow = document.getElementById('cards-row');
            data.content.cards.forEach(card => {
                const col = document.createElement('div');
                col.classList.add('col-md-4');

                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');
                const img = document.createElement('img');
                img.src = card.image;
                img.classList.add('card-img-top');
                img.alt = card.title;
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                cardTitle.textContent = card.title;

                const cardText = document.createElement('p');
                cardText.classList.add('card-text');
                cardText.textContent = card.description;

                const cardLink = document.createElement('a');
                cardLink.classList.add('btn', 'btn-primary');
                cardLink.href = card.link;
                cardLink.textContent = 'Vai all\'argomento';

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardBody.appendChild(cardLink);
                cardDiv.appendChild(img);
                cardDiv.appendChild(cardBody);
                col.appendChild(cardDiv);
                cardsRow.appendChild(col);
            });

            // footer
            document.getElementById('footer-text').innerHTML = data.footer.text;
            const footerLogo = document.createElement('img');
            footerLogo.src = data.footer.logo;
            footerLogo.alt = 'WBSCHOOL Logo';
            footerLogo.style.height = '50px';
            document.getElementById('footer-text').appendChild(footerLogo);
            document.getElementById('footer-author').textContent = data.footer.author;
        })
        .catch(error => console.error('Error loading JSON:', error));
