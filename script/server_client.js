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

fetch('../json/server_client.json')
  .then(response => response.json())
  .then(data => {
    document.title = data.content.title;

    const navbar = document.querySelector('nav .navbar-nav');
    navbar.innerHTML = data.navbar.map(link => {
      const activeClass = link.active ? 'active' : '';
      return `<li class="nav-item">
                <a class="nav-link ${activeClass}" href="${link.link}">${link.text}</a>
              </li>`;
    }).join('');

    const contentDiv = document.querySelector('.content .container');
    contentDiv.innerHTML = `<h1 class="text-center">${data.content.title}</h1>`;

    data.content.sections.forEach(section => {
      if (section.type === 'paragraph') {
        contentDiv.innerHTML += `
          <p class="giustificato">${section.content}</p>
        `;
      } else if (section.type === 'heading') {
        contentDiv.innerHTML += `
          <h2>${section.content}</h2>
        `;
      } else if (section.type === 'ordered-list') {
        contentDiv.innerHTML += `
          <ol class="giustificato">
            ${section.content.map(item => `
              <li><b>${item.title}:</b> ${item.description}</li>
            `).join('')}
          </ol>
        `;
      } else if (section.type === 'unordered-list') {
        contentDiv.innerHTML += `
          <ul class="giustificato">
            ${section.content.map(item => `
              <li><b>${item.title}:</b> ${item.description}</li>
            `).join('')}
          </ul>
        `;
      } else if (section.type === 'image') {
        contentDiv.innerHTML += `
          <img src="${section.src}" alt="${section.alt}" class="img-fluid mb-4">
          <p class="text-center">${section.caption}</p>
        `;
      }
    });

    const footerDiv = document.querySelector('footer');
    footerDiv.innerHTML = `
      <p class="text-center">${data.footer.content}</p>
      <p class="text-center">${data.footer.secondary_content}</p>
    `;

  })
  .catch(error => {
    console.error('Errore nel caricamento del file JSON:', error);
  });
