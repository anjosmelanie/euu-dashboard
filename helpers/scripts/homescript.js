function renderFileList(id, countId, searchId, localStorageKey) {
    const listEl = document.getElementById(id);
    const countEl = document.getElementById(countId);
    const searchEl = document.getElementById(searchId);

    function updateList() {
      const fileData = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
      const allFiles = Object.entries(fileData);

      const searchTerm = searchEl.value.toLowerCase();
      const filtered = allFiles.filter(([fileName, data]) => {
        const name = data?.countryName || data?.fileName || fileName;
        return name.toLowerCase().includes(searchTerm);
      });

      listEl.innerHTML = '';
      filtered.forEach(([fileName, data]) => {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.textContent = data?.countryName || data?.fileName || fileName;
        listEl.appendChild(div);
      });

      countEl.textContent = `${filtered.length} of ${allFiles.length} files shown`;
    }

    searchEl.addEventListener('input', updateList);
    updateList();
  }

  renderFileList('history-list', 'history-count', 'search-history', 'euuHistoryCountriesForms');
  renderFileList('common-list', 'common-count', 'search-common', 'euuCommonCountryFiles');