// Auto-generate the entry for tag file
function updateGeneratedEntryName() {
  const history = document.getElementById('select-history').value;
  const common = document.getElementById('select-common').value;

  if (!history || !common) return;

  const historyData = JSON.parse(localStorage.getItem('euuHistoryCountriesForms') || '{}')[history];
  const commonData = JSON.parse(localStorage.getItem('euuCommonCountryFiles') || '{}')[common];

  if (!historyData || !commonData) return;

  const tag = historyData.tag || 'XXX';
  const country = commonData.countryName || 'Unnamed';
  const pairing = `${tag} = "countries/${country}.txt"`;

  document.getElementById('new-entry-name').value = pairing;
}

// Render file lists for common/countries and history/countries
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

      const btn = document.createElement('button');
      btn.textContent = 'Select';
      btn.style.marginLeft = '0.5rem';
      btn.onclick = () => {
        document.getElementById('file-preview').textContent = JSON.stringify(data, null, 2);
        document.getElementById('new-entry-name').value = `${data?.countryName || data?.fileName || fileName}`;
      };
      div.appendChild(btn);

      listEl.appendChild(div);
    });

    countEl.textContent = `${filtered.length} of ${allFiles.length} files shown`;
  }

  searchEl.addEventListener('input', updateList);
  updateList();
}

//Populate selects for generating tags
  function populateSelect(selectId, storageKey) {
    const select = document.getElementById(selectId);
    const fileData = JSON.parse(localStorage.getItem(storageKey) || '{}');
    select.innerHTML = '<option value="">Select...</option>';
    Object.entries(fileData).forEach(([fileName, data]) => {
      const option = document.createElement('option');
      option.value = fileName;
      option.textContent = data?.countryName || data?.fileName || fileName;
      select.appendChild(option);
    });
  }

  // To show the list of tags
  function renderEntryList() {
    const entryList = document.getElementById('entry-list');
    const entries = JSON.parse(localStorage.getItem('euuGeneratedEntries') || '[]');
    entryList.innerHTML = '';
  
    entries.forEach((entry, index) => {
      const div = document.createElement('div');
      div.className = 'file-item';
      div.innerHTML = `
        <span>${entry.entryName}</span>
        <button data-index="${index}" class="delete-entry">🗑️</button>
      `;
      entryList.appendChild(div);
    });
  }
  
  // Handle delete clicks (only once, globally)
  document.getElementById('entry-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-entry')) {
      const entries = JSON.parse(localStorage.getItem('euuGeneratedEntries') || '[]');
      const index = parseInt(e.target.dataset.index, 10);
      entries.splice(index, 1);
      localStorage.setItem('euuGeneratedEntries', JSON.stringify(entries));
      renderEntryList();
    }
  });

  // Save tag entry
  document.getElementById('save-entry').addEventListener('click', () => {
    const history = document.getElementById('select-history').value;
    const common = document.getElementById('select-common').value;

    if (!history || !common) return alert('Both files must be selected.');

    const historyData = JSON.parse(localStorage.getItem('euuHistoryCountriesForms') || '{}')[history];
    const commonData = JSON.parse(localStorage.getItem('euuCommonCountryFiles') || '{}')[common];

    if (!historyData || !commonData) return alert('Could not find selected files in storage.');

    const tag = historyData.tag || 'TAG';
    const country = commonData.countryName || 'Country Name';
    const entryName = `${tag} = \"countries/${country}.txt\"`;

    const entries = JSON.parse(localStorage.getItem('euuGeneratedEntries') || '[]');
    entries.push({ entryName, history, common });
    localStorage.setItem('euuGeneratedEntries', JSON.stringify(entries));
    renderEntryList();
  });

  // Download country tags
  document.getElementById('download-tags').addEventListener('click', () => {
    const entries = JSON.parse(localStorage.getItem('euuGeneratedEntries') || '[]');
    const content = entries.map(e => e.name).join('\n');
  
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'country_tags.txt';
    a.click();
  
    URL.revokeObjectURL(url);
  });

  document.getElementById('select-history').addEventListener('change', updateGeneratedEntryName);
  document.getElementById('select-common').addEventListener('change', updateGeneratedEntryName);

  renderFileList('history-list', 'history-count', 'search-history', 'euuHistoryCountriesForms');
  renderFileList('common-list', 'common-count', 'search-common', 'euuCommonCountryFiles');

  populateSelect('select-history', 'euuHistoryCountriesForms');
  populateSelect('select-common', 'euuCommonCountryFiles');
  renderEntryList();