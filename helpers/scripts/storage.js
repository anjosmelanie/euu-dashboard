export function saveCurrentHistoryCountry(){
    const tag = document.getElementById('country-tag').value.toUpperCase();
    const name = document.getElementById('country-name').value;
    const fileName = tag + ' - ' + name + '.txt';

    if(!tag) return;

    const data = {
        fileName: fileName,
        name: name,
        tag: tag,
        capital: document.getElementById('capital-province').value,
        fixedcapital: document.getElementById('fixed-capital').value,
        government: document.getElementById('government').value,
        governmentreform: document.getElementById('government-reform').value,
        technologygroup: document.getElementById('technology-group').value,
        religion: document.getElementById('religion').value,
        religiousschool: document.getElementById('religious-school').value,
        culturegroup: document.getElementById('culture-group').value,
        primaryculture: document.getElementById('primary-culture').value,
        acceptedCultures: getAcceptedCultures(),
        historicalFriends: getHistoricalFriends(),
        historicalEnemies: getHistoricalRivals(),
        monarchname: document.getElementById('monarch-name').value,
        dynasty: document.getElementById('dynasty').value,
        birthDate: document.getElementById('birth-date').value,
        eu4Date: document.getElementById('eu4-birth-date').value,
        adminskill: document.getElementById('adm-skill').value,
        dipskill: document.getElementById('dip-skill').value,
        milskill: document.getElementById('mil-skill').value
    };

    let countries = JSON.parse(localStorage.getItem('euuHistoryCountriesForms')) || {};
    countries[fileName] = data;
    localStorage.setItem('euuHistoryCountriesForms', JSON.stringify(countries));

    alert(`Saved country data for ${fileName} 🫡`);

  }

  function getAcceptedCultures() {
    const culturePairs = document.querySelectorAll('.accepted-culture-pair');
    const acceptedCultures = [];
  
    culturePairs.forEach(pair => {
      const group = pair.querySelector('select[name^="acceptedCultureGroup"]');
      const culture = pair.querySelector('select[name^="acceptedCulture"]');
  
      if (group?.value && culture?.value) {
        acceptedCultures.push({
          group: group.value,
          culture: culture.value
        });
      }
    });
  
    return acceptedCultures;
  }

  function getHistoricalFriends() {
    const friendsList = document.querySelectorAll('.historical-friends');
    const historicalFriends = [];

    friendsList.forEach(friend => {
        const input = friend.querySelector('input');
        const value = input?.value;
        
        if (value) historicalFriends.push(value);
    });

    return historicalFriends;

  }

  function getHistoricalRivals() {
    const rivalsList = document.querySelectorAll('.historical-rivals');
    const historicalRivals = [];

    rivalsList.forEach(rival => {
        const input = rival.querySelector('input');
        const value = input?.value;
        
        if (value) historicalRivals.push(value);
    });

    return historicalRivals;

  }