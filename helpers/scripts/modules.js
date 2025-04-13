// TO DO: change dashboard.html for index.html
function renderNavbar() {
    const navbarHTML = `
      <nav class="navbar" id="navbar">
        <ul>
          <li><a href="dashboard.html">home</a></li>
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

  renderNavbar();