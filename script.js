// Создание шапки сайта
const header = document.createElement('header');
header.className = 'main-header';

const title1 = document.createElement('h1');
title1.textContent = 'лучшие из лучших';
title1.className = 'site-title';

const title2 = document.createElement('h2');
title2.textContent = 'информация о популярынх футбольных игроках';
title2.className = 'site-subtitle';

header.appendChild(title1);
header.appendChild(title2);
document.body.prepend(header);

// Навигация
const pages = {
  home: 'Главная',
  about: 'Заработок',
  contact: 'Карьерный путь',
  history: 'Награды',
  money: 'Общая информация',
  persinfo: 'Стоимость'
};

const nav = document.getElementById('main-nav');
const content = document.getElementById('content');

// Создание меню
function createMenu() {
  const ul = document.createElement('ul');
  for (const key in pages) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + key;
    a.textContent = pages[key];
    li.appendChild(a);
    ul.appendChild(li);
  }
  nav.appendChild(ul);
}

// Загрузка HTML-контента из файлов
async function loadPage() {
    const fullHash = location.hash.substring(1) || 'home';
    const [page, anchor] = fullHash.split('-');
  
    if (pages[page]) {
      try {
        const response = await fetch(`pages/${page}.html`);
        if (!response.ok) throw new Error('404');
        const html = await response.text();
        content.innerHTML = html;
        document.title = pages[page];
  
        // Прокрутка к нужному элементу после загрузки
        setTimeout(() => {
          if (anchor) {
            const target = document.getElementById(anchor);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 100);
      } catch (error) {
        content.innerHTML = '<h1>Страница не найдена</h1>';
        document.title = 'Ошибка';
      }
    } else {
      content.innerHTML = '<h1>Страница не найдена</h1>';
      document.title = 'Ошибка';
    }
  }
  

// Обработка изменений URL-хеша
window.addEventListener('hashchange', loadPage);

// Инициализация
createMenu();
loadPage();
