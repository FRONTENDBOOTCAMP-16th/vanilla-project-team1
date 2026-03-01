export function renderHeader(target, options = {}) {
  const { title = '', showIcons = true, onClickGoBackButton } = options;

  target.innerHTML = `
    <header class="app-header">
      <div class="header-left">

      ${
        showIcons
          ? `
          <button class="header-icon" type="button" data-action="goback" aria-label="뒤로가기">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="back-arrow">
              <path fill="none" d="M0 0h24v24H0V0z" opacity=".87"></path>
              <path d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"></path>
            </svg>          
          </button>
          <button class="header-icon" type="button" data-action="gohome" aria-label="홈으로가기">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 24 24">
            <path d="M 12.03125 1.5 A 1.0001 1.0001 0 0 0 11.492188 1.6386719 L 1.9921875 7.2265625 A 1.0001 1.0001 0 1 0 3 8.953125 L 3 20 A 1.0001 1.0001 0 0 0 4 21 L 20 21 A 1.0001 1.0001 0 0 0 21 20 L 21 8.953125 A 1.0001 1.0001 0 1 0 22.007812 7.2265625 L 12.507812 1.6386719 A 1.0001 1.0001 0 0 0 12.03125 1.5 z M 12 3.6601562 L 19 7.7773438 L 19 19 L 16 19 L 16 12 A 1.0001 1.0001 0 0 0 15 11 L 9 11 A 1.0001 1.0001 0 0 0 8 12 L 8 19 L 5 19 L 5 7.7773438 L 12 3.6601562 z M 10 13 L 14 13 L 14 19 L 10 19 L 10 13 z"></path>
            </svg>
          </button>
        `
          : ''
      }
      </div>

      ${title ? `<h1 class="header-title">${title}</h1>` : ''}

      <div class="header-right">
      </div>
    </header>
  `;

  target.querySelector('[data-action="gohome"]')?.addEventListener('click', () => {
    location.href = '/src/page/main/index.html';
  });

  target.querySelector('[data-action="goback"]')?.addEventListener('click', () => {
    if (onClickGoBackButton) return onClickGoBackButton();
  });
}
