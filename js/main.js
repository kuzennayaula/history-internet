/* =========================================================
   InternetHistory — интерактив
   Нативный JavaScript, без библиотек
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. БУРГЕР-МЕНЮ
     --------------------------------------------------------- */
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('main-nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });

    nav.querySelectorAll('.main-nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 768) {
          nav.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
        }
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768 && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------------------------------------------------
     2. АКТИВНАЯ ССЫЛКА В НАВИГАЦИИ
     --------------------------------------------------------- */
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html');

  document.querySelectorAll('.main-nav__link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('main-nav__link--active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('main-nav__link--active');
      link.removeAttribute('aria-current');
    }
  });

  /* ---------------------------------------------------------
     3. ВАЛИДАЦИЯ ФОРМ
     --------------------------------------------------------- */
  document.querySelectorAll('form.needs-validation').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        alert('Спасибо! Форма заполнена корректно.');
        form.reset();
        form.classList.remove('was-validated');
        return;
      }
      form.classList.add('was-validated');
    });
  });

  /* ---------------------------------------------------------
     4. ТАБЫ
     --------------------------------------------------------- */
  document.querySelectorAll('.tabs').forEach(function (tabsBlock) {
    const tabButtons = tabsBlock.querySelectorAll('.tabs__btn');
    const tabPanels = tabsBlock.querySelectorAll('.tabs__panel');

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const targetId = btn.getAttribute('aria-controls');

        tabButtons.forEach(function (b) {
          b.classList.remove('tabs__btn--active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(function (p) {
          p.hidden = true;
        });

        btn.classList.add('tabs__btn--active');
        btn.setAttribute('aria-selected', 'true');

        const target = document.getElementById(targetId);
        if (target) target.hidden = false;
      });
    });
  });

  /* ---------------------------------------------------------
     5. КНОПКА «НАВЕРХ»
     --------------------------------------------------------- */
  const toTopBtn = document.getElementById('to-top');

  if (toTopBtn) {
    window.addEventListener('scroll', function () {
      toTopBtn.hidden = window.scrollY <= 300;
    });

    toTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     6. ГОД В ПОДВАЛЕ
     --------------------------------------------------------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  /* ---------------------------------------------------------
     7. СЛАЙДЕР ХРОНОЛОГИИ
     Фильтрует события по выбранному году
     --------------------------------------------------------- */
  const yearRange = document.getElementById('year-range');
  const yearOutput = document.getElementById('year-output');
  const eventsList = document.getElementById('events-list');

  if (yearRange && yearOutput && eventsList) {
    const events = eventsList.querySelectorAll('.events-list__item');

    function filterEvents() {
      const selectedYear = parseInt(yearRange.value, 10);
      yearOutput.textContent = selectedYear;

      events.forEach(function (item) {
        const eventYear = parseInt(item.dataset.year, 10);
        item.hidden = eventYear > selectedYear;
      });
    }

    yearRange.addEventListener('input', filterEvents);
    filterEvents(); // применяем сразу при загрузке
  }
})();

