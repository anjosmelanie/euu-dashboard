document.getElementById('upload-history-file').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
  
      try {
        // If JSON
        const data = JSON.parse(text);
        populateHCForm(data);
      } catch (err) {
        // If not JSON, treat it as a raw EU4 .txt file
        const parsed = parseHistoryFile(text); // <- You'll write this
        populateHCForm(parsed);
      }
    };
  
    reader.readAsText(file);
  })

  function populateHCForm(data) {
    // 🌟 Set the form values
    document.getElementById('country-name').value = data.name || '';
    document.getElementById('country-tag').value = data.tag || '';
    document.getElementById('government').value = data.government || '';
    document.getElementById('government-reform').value = data.governmentreform || '';
    document.getElementById('technology-group').value = data.technologygroup || '';
    document.getElementById('religion').value = data.religion || '';
    document.getElementById('religious-school').value = data.religiousschool || '';

    const groupSelect = document.getElementById('culture-group');
    populateSelect(groupSelect, Object.keys(CULTURE_OPTIONS), dropdownDefaultValue("accepted culture"));
    groupSelect.value = data.culturegroup || '';
    groupSelect.dispatchEvent(new Event('change')); // 💥 triggers population of primary cultures

    setTimeout(() => {
        document.getElementById('primary-culture').value = data.primaryculture || '';
    }, 50); // gives time for population to happen


    document.getElementById('capital-province').value = data.capital || '';
    document.getElementById('fixed-capital').checked = !!data.fixedcapital;
    
    // Monarch stuff
    document.getElementById('monarch-name').value = data.monarchname || '';
    document.getElementById('dynasty').value = data.dynasty || '';
    document.getElementById('birth-date').value = data.birthDate || '';
    document.getElementById('eu4-birth-date').value = data.eu4Date || '';
    document.getElementById('adm-skill').value = data.adminskill || '';
    document.getElementById('dip-skill').value = data.dipskill || '';
    document.getElementById('mil-skill').value = data.milskill || '';
    
    // Dynamic stuff 💫
    setAcceptedCultures(data.acceptedCultures);
    setHistoricalFriends(data.historicalFriends);
    setHistoricalRivals(data.historicalEnemies);
  }

  function parseHistoryFile(text) {
    const data = {};
    const monarch = {};
  
    // Remove comments and trim
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'));
  
    let inMonarchBlock = false;
  
    for (let line of lines) {
      if (line.includes('1444.11.11')) continue; // We can skip the date line
  
      if (line.includes('monarch = {')) {
        inMonarchBlock = true;
        continue;
      }
  
      if (inMonarchBlock) {
        if (line === '}') {
          inMonarchBlock = false;
          data.monarch = monarch;
          continue;
        }
  
        const [key, value] = line.split('=').map(s => s.trim().replace(/^"|"$/g, ''));
        monarch[key] = isNaN(value) ? value : Number(value);
      } else {
        const [key, value] = line.split('=').map(s => s.trim().replace(/^"|"$/g, ''));
        data[key] = isNaN(value) ? value : Number(value);
      }
    }
  
    return data;
  }