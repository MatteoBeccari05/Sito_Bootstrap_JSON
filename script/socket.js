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

fetch('../json/socket.json')
  .then(response => response.json())
  .then(data => {
    const navbarLinks = document.getElementById('navbarLinks');
    data.navbar.links.forEach(link => {
      const listItem = document.createElement('li');
      listItem.classList.add('nav-item');
      
      const anchor = document.createElement('a');
      anchor.classList.add('nav-link');
      anchor.href = link.href;
      anchor.textContent = link.text;
      if (link.active) {
        anchor.classList.add('active');
      }
      
      listItem.appendChild(anchor);
      navbarLinks.appendChild(listItem);
    });

    const contentContainer = document.getElementById('contentContainer');

    const title = document.createElement('h2');
    title.textContent = data.content.title;
    contentContainer.appendChild(title);

    data.content.paragraphs.forEach(paragraph => {
      const p = document.createElement('p');
      p.classList.add('giustificato');
      p.innerHTML = paragraph.text;
      contentContainer.appendChild(p);
    });


    data.content.sections.forEach(section => {
      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = section.title;
      contentContainer.appendChild(sectionTitle);

      if (section.paragraphs) {
        section.paragraphs.forEach(paragraph => {
          const p = document.createElement('p');
          p.innerHTML = paragraph;
          contentContainer.appendChild(p);
        });
      }

      if (section.list) {
        const ul = document.createElement('ul');
        ul.classList.add('giustificato');
        section.list.forEach(item => {
          const li = document.createElement('li');
          const b = document.createElement('b');
          b.textContent = item.title;
          li.appendChild(b);
          const span = document.createElement('span');
          span.innerHTML = item.text;
          li.appendChild(span);
          ul.appendChild(li);
        });
        contentContainer.appendChild(ul);
      }
    });

    data.content.images.forEach(image => {
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt;
      img.classList.add('img-fluid', 'mb-4');
      contentContainer.appendChild(img);

      const caption = document.createElement('p');
      caption.classList.add('text-center');
      caption.textContent = image.caption;
      contentContainer.appendChild(caption);
    });

    const footer = document.getElementById('footer');
    footer.innerHTML = `
      <p>${data.footer.text} <img src="${data.footer.logo}" alt="WBSCHOOL Logo" style="height: 50px;"></p>
      <p>${data.footer.author}</p>
    `;
  })
  .catch(error => {
    console.error('Errore nel caricamento del file JSON:', error);
  });
