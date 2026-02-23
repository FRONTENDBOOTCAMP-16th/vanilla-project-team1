export function renderHeader(target, options = {}) {
  const {
    title = '',
    showLoginButton = true,
    showIcons = true,
    onLoginClick,
    onCartClick,
    onTicketClick,
  } = options;

  target.innerHTML = `
    <header class="app-header">
      <div class="header-left">
        ${showLoginButton ? `<button class="header-login" type="button">로그인하고 혜택받기</button>` : ''}
      </div>

      ${title ? `<h1 class="header-title">${title}</h1>` : ''}

      <div class="header-right">
        ${
          showIcons
            ? `
          <button class="header-icon" type="button" data-action="ticket" aria-label="티켓">
            🎟️
          </button>
          <button class="header-icon" type="button" data-action="cart" aria-label="장바구니">
            🛒
          </button>
        `
            : ''
        }
      </div>
    </header>
  `;

  const loginBtn = target.querySelector('.header-login');
  loginBtn?.addEventListener('click', () => {
    if (onLoginClick) return onLoginClick();
    // location.href = '/src/page/login/index.html';
  });

  target.querySelector('[data-action="cart"]')?.addEventListener('click', () => {
    if (onCartClick) return onCartClick();
  });

  target.querySelector('[data-action="ticket"]')?.addEventListener('click', () => {
    if (onTicketClick) return onTicketClick();
  });
}
