function renderNavbar() {
    const navbarHTML = `
      <nav class="navbar" id="navbar">
        <ul>
          <li><a href="index.html">home</a></li>
          <li><a href="history-countries.html">history/countries</a></li>
          <li><a href="common-countries.html">common/countries</a></li>
        </ul>
      </nav>
    `;
  
    const placeholder = document.getElementById('navbar');
    if (placeholder) {
      placeholder.outerHTML = navbarHTML;
    }
  }

  function renderFooter() {
    const footerHTML = `
      <footer class="footer">
        <div class="footer-content">
          <span>&copy; 2025 anjosmelanie</span>
        <a href="https://github.com/anjosmelanie" target="_blank" aria-label="GitHub">
          <img src="icons/git.png" alt="GitHub" height="20" />
        </a>
        </div>
      </footer>
    `;
  
    const placeholder = document.getElementById('footer');
    if (placeholder) {
      placeholder.outerHTML = footerHTML;
    }
  }

  // deprecated
  function renderHeader(title = 'EUU Modding Tool') {
    const headerHTML = `
      <header class="header">
        <h1>${title}</h1>
      </header>
    `;
  
    const placeholder = document.getElementById('header');
    if (placeholder) {
      placeholder.outerHTML = headerHTML;
    }
  }

  renderNavbar();
  renderFooter();