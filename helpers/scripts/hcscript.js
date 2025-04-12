// Imports from other js files
import { CULTURE_OPTIONS, TRIGGER_RELIGIONS, RELIGIOUS_SCHOOL_OPTIONS, GOVERNMENT_REFORM_OPTIONS,
   TECHNOLOGY_GROUPS, RELIGIONS } from './constants.js';
import { defaultOption, populateSelect, makeUppercaseOnInput, downloadFile } from './utils.js';

// Constants for history/countries
const nameInput = document.getElementById('country-name');
const tagInput = document.getElementById('country-tag');
const governmentSelect = document.getElementById('government');
populateSelect(governmentSelect, Object.keys(GOVERNMENT_REFORM_OPTIONS), "Select a government type");
const governmentReformSelect = document.getElementById('government-reform');
const technologyGroupSelect = document.getElementById('technology-group');
populateSelect(technologyGroupSelect, TECHNOLOGY_GROUPS, "Select a technology group");
const religionSelect = document.getElementById('religion');
populateSelect(religionSelect, RELIGIONS, "Select a religion");
const religiousSchoolSelect = document.getElementById('religious-school');
const cultureGroupSelect = document.getElementById('culture-group');
populateSelect(cultureGroupSelect, Object.keys(CULTURE_OPTIONS), "Select a culture group");
const primaryCultureSelect = document.getElementById('primary-culture');

// Hidden fields wrappers
const religiousSchoolWrapper = document.getElementById('schoolWrapper');

// Save changes to local storage
document.getElementById('save-country').addEventListener('click', saveCurrentHistoryCountry);
document.getElementById('download-country').addEventListener('click', () => {
  saveCurrentHistoryCountry();
  //const data = getCurrentFormData();
  //const text = generateCountryFileText(data);
  downloadFile({ fileName: data.fileName, text });
});

// Prevent form submission (for now)
document.getElementById('dataForm').addEventListener('submit', e => {
  e.preventDefault();
  alert("Form submitted!");
});

// Government Reform dropdown
governmentSelect.addEventListener('change', () => {
  const selectedGovernment = governmentSelect.value;
  const reforms = GOVERNMENT_REFORM_OPTIONS[selectedGovernment] || [];

  // Clear current template options
  governmentReformSelect.innerHTML = defaultOption('government reform');

  // Populate new ones
  reforms.forEach(reform => {
    const option = document.createElement('option');
    option.value = reform.toLowerCase().replace(/\s+/g, '-'); // make safe value
    option.textContent = reform;
    governmentReformSelect.appendChild(option);
  });
});

// Religious School conditional dropdown
religionSelect.addEventListener('change', () => {
    const selectedReligion = religionSelect.value;
    const schools = RELIGIOUS_SCHOOL_OPTIONS[selectedReligion] || [];

    if (TRIGGER_RELIGIONS.includes(selectedReligion)) {
        religiousSchoolWrapper.style.display = 'block';
    } else {
        religiousSchoolWrapper.style.display = 'none';
    }

    // Clear current template options
    religiousSchoolSelect.innerHTML = defaultOption('religious school');

    // Populate new ones
    schools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.toLowerCase().replace(/\s+/g, '-'); // make safe value
        option.textContent = school;
        religiousSchoolSelect.appendChild(option);
    });
  });

// Culture Group dropdown
  cultureGroupSelect.addEventListener('change', () => {
    const selectedCultureGroup = cultureGroupSelect.value;
    const cultures = CULTURE_OPTIONS[selectedCultureGroup] || [];
  
    // Clear current template options
    primaryCultureSelect.innerHTML = defaultOption('primary culture');
  
    // Populate new ones
    cultures.forEach(culture => {
      const option = document.createElement('option');
      option.value = culture.toLowerCase().replace(/\s+/g, '-'); // make safe value
      option.textContent = culture;
      primaryCultureSelect.appendChild(option);
    });
  });

  // Add accepted culture
  const addCultureBtn = document.getElementById('add-accepted-culture');
  const culturesContainer = document.getElementById('accepted-cultures-container');

  let acceptedCultureCount = 0;
  
  addCultureBtn.addEventListener('click', addAcceptedCulture);

  // Add historical friends
  const addFriendBtn = document.getElementById('add-historical-friend');
  const friendsContainer = document.getElementById('historical-friends-container');

  let historicalFriendCount = 0;

  addFriendBtn.addEventListener('click', addHistoricalFriend);

  //Add historical rivals
  const addRivalBtn = document.getElementById('add-historical-rival');
  const rivalsContainer = document.getElementById('historical-rivals-container');

  let historicalRivalsCount = 0;
  
  addRivalBtn.addEventListener('click', addHistoricalRival);

  function createRemoveButton(wrapper) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '🗑️';
    button.classList.add('remove-btn');
    button.addEventListener('click', () => wrapper.remove());
    return button;
  }

  function addAcceptedCulture() {
    acceptedCultureCount++;
  
    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.classList.add('horizontal', 'accepted-culture-pair');
  
    // Create label
    const label = document.createElement('label');
    label.htmlFor = `acceptedCulture${acceptedCultureCount}`;
    label.textContent = `Accepted culture ${acceptedCultureCount}:`;
  
    // Create group select
    const cultureGroupSelect = document.createElement('select');
    cultureGroupSelect.name = `acceptedCultureGroup${acceptedCultureCount}`;
  
    // Create culture select
    const cultureSelect = document.createElement('select');
    cultureSelect.name = `acceptedCulture${acceptedCultureCount}`;
  
    // Populate both selects
    populateSelect(cultureGroupSelect, Object.keys(CULTURE_OPTIONS), 'Select a CUlture group');
    populateSelect(cultureSelect, [], '-- Select culture group first --');
  
    // Hook up dynamic culture loading
    cultureGroupSelect.addEventListener('change', () => {
      const selectedGroup = cultureGroupSelect.value;
      const cultures = CULTURE_OPTIONS[selectedGroup] || [];
      populateSelect(cultureSelect, cultures, '-- Select CULture --');
    });
  
    // Create remove button
    const removeButton = createRemoveButton(wrapper);
  
    // Append everything
    wrapper.appendChild(label);
    wrapper.appendChild(cultureGroupSelect);
    wrapper.appendChild(cultureSelect);
    wrapper.appendChild(removeButton);
  
    // Append to container
    document.getElementById('accepted-cultures-container').appendChild(wrapper);
  
    return wrapper; // 💖 important for setting on load
  }

  function addHistoricalFriend() {
    historicalFriendCount++;
  
    const wrapper = document.createElement('div');
    wrapper.classList.add('horizontal', 'historical-friends');
  
    const label = document.createElement('label');
    label.htmlFor = `historical-friend${historicalFriendCount}`;
    label.textContent = `Historical Friend ${historicalFriendCount}:`;
  
    const input = document.createElement('input');
    input.type = 'text';
    input.name = `historical-friend${historicalFriendCount}`;
    input.id = `historical-friend${historicalFriendCount}`;
    input.placeholder = `FRI`;
    input.classList.add('countryTag');
    makeUppercaseOnInput(input);
  
    const removeButton = createRemoveButton(wrapper);
  
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    wrapper.appendChild(removeButton);
  
    friendsContainer.appendChild(wrapper);
    return wrapper; // 💡 so it can be used by setHistoricalFriends
  }

  function addHistoricalRival() {
    historicalRivalsCount++;
  
    const wrapper = document.createElement('div');
    wrapper.classList.add('horizontal', 'historical-rivals');
  
    const label = document.createElement('label');
    label.htmlFor = `historical-rival${historicalRivalsCount}`;
    label.textContent = `Historical Rival ${historicalRivalsCount}:`;
  
    const input = document.createElement('input');
    makeUppercaseOnInput(input);
    input.type = 'text';
    input.name = `historical-rival${historicalRivalsCount}`;
    input.id = `historical-rival${historicalRivalsCount}`;
    input.placeholder = 'RIV';
    input.classList.add('countryTag', 'historical-rivals');
    input.maxLength = 3;
  
    const removeButton = createRemoveButton(wrapper);
  
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    wrapper.appendChild(removeButton);
    rivalsContainer.appendChild(wrapper);
  
    return wrapper; // so you can use it in setHistoricalRivals()
  }

  // Save to local storage
  function saveCurrentHistoryCountry(){
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
    countries[tag] = data;
    localStorage.setItem('euuHistoryCountriesForms', JSON.stringify(countries));

  }

  // Load from Local Storage
  function loadCountry(tag) {
    const saved = JSON.parse(localStorage.getItem('euuHistoryCountriesForms')) || {};
    const data = saved[tag];
    if (!data) {
      alert(`No saved data for tag: ${tag}`);
      return;
    }
  
    // 🌟 Set the form values
    document.getElementById('country-name').value = data.name || '';
    document.getElementById('country-tag').value = data.tag || '';
    document.getElementById('government').value = data.government || '';
    document.getElementById('government-reform').value = data.governmentreform || '';
    document.getElementById('technology-group').value = data.technologygroup || '';
    document.getElementById('religion').value = data.religion || '';
    document.getElementById('religious-school').value = data.religiousschool || '';

    const groupSelect = document.getElementById('culture-group');
    populateSelect(groupSelect, Object.keys(CULTURE_OPTIONS), 'Please choose a culture group');
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
    console.log("Accepted cultures from storage:", data.acceptedCultures);
    setAcceptedCultures(data.acceptedCultures);
    setHistoricalFriends(data.historicalFriends);
    setHistoricalRivals(data.historicalEnemies);
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

  function setAcceptedCultures(list = []) {
    const container = document.getElementById('accepted-cultures-container');
    container.innerHTML = ''; // clear existing entries
  
    list.forEach(({ group, culture }) => {
      if (!group || !culture) return;
      
      const wrapper = addAcceptedCulture(); // assumes it returns the created element
      const groupSelect = wrapper.querySelector('select[name^="acceptedCultureGroup"]');
      const cultureSelect = wrapper.querySelector('select[name^="acceptedCulture"]');
  
      groupSelect.value = group;
      groupSelect.dispatchEvent(new Event('change')); // to trigger culture options
  
      setTimeout(() => {
        cultureSelect.value = culture;
      }, 150);
    });
  }

  function setHistoricalFriends(list = []) {
    const container = document.getElementById('historical-friends-container');
    container.innerHTML = ''; // clear existing
  
    list.forEach(tag => {
      const wrapper = addHistoricalFriend(); // assumes it returns the wrapper
      const input = wrapper.querySelector('input[name^="historical-friend"]');
      if (input) input.value = tag;
    });
  }

  function setHistoricalRivals(list = []) {
    const container = document.getElementById('historical-rivals-container');
    container.innerHTML = ''; // clear existing
  
    list.forEach(tag => {
      const wrapper = addHistoricalRival(); // assumes it returns the wrapper
      const input = wrapper.querySelector('input[name^="historical-rival"]');
      if (input) input.value = tag;
    });
  }

  function populateSavedCountries() {
    const select = document.getElementById('save-manager');
    select.innerHTML = '<option value="">-- Load a saved country --</option>';
    const all = JSON.parse(localStorage.getItem('euuHistoryCountriesForms')) || {};
  
    Object.keys(all).forEach(key => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = key;
      select.appendChild(opt);
    });
  }
  
  document.getElementById('loadCountryBtn').addEventListener('click', () => {
    const key = document.getElementById('savedCountriesSelect').value;
    if (key) loadCountry(key);
  });
  
  populateSavedCountries(); // call this on page load

  function renderSaveManager() {
    const container = document.getElementById('save-manager');
    container.innerHTML = '';
  
    const saves = JSON.parse(localStorage.getItem('euuHistoryCountriesForms')) || {};
    const keys = Object.keys(saves);
  
    if (keys.length === 0) {
      container.textContent = "No saved countries yet...";
      return;
    }
  
    keys.forEach(key => {
      const entry = document.createElement('div');
      entry.classList.add('save-entry');
  
      const label = document.createElement('span');
      label.textContent = key;
  
      const loadBtn = document.createElement('button');
      loadBtn.textContent = '📂';
      loadBtn.title = 'Load';
      loadBtn.addEventListener('click', () => loadCountry(key));
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑️';
      deleteBtn.title = 'Delete';
      deleteBtn.addEventListener('click', () => {
        if (confirm(`Delete "${key}"?`)) {
          deleteSave(key);
          renderSaveManager();
        }
      });
  
      entry.appendChild(label);
      entry.appendChild(loadBtn);
      entry.appendChild(deleteBtn);
      container.appendChild(entry);
    });
  }

  function deleteSave(key) {
    const saves = JSON.parse(localStorage.getItem('euuHistoryCountriesForms')) || {};
    delete saves[key];
    localStorage.setItem('euuHistoryCountriesForms', JSON.stringify(saves));
  }

  window.addEventListener('DOMContentLoaded', () => {
    renderSaveManager();
  });

  function getCurrentFormData() {
    return {
      name: document.getElementById('country-name').value,
      tag: document.getElementById('country-tag').value.toUpperCase(),
      government: document.getElementById('government').value,
      governmentreform: document.getElementById('government-reform').value,
      technologygroup: document.getElementById('technology-group').value,
      religion: document.getElementById('religion').value,
      religiousschool: document.getElementById('religious-school')?.value,
      culturegroup: document.getElementById('culture-group').value,
      primaryculture: document.getElementById('primary-culture').value,
      capital: document.getElementById('capital').value,
      fixedcapital: document.getElementById('fixed-capital').checked ? document.getElementById('capital').value : '',
      monarchname: document.getElementById('monarch-name').value,
      dynasty: document.getElementById('dynasty').value,
      birthDate: document.getElementById('birthDate').value,
      eu4Date: document.getElementById('eu4date').value,
      adm: document.getElementById('admin-skill')?.value || 3,
      dip: document.getElementById('diplo-skill')?.value || 3,
      mil: document.getElementById('mil-skill')?.value || 3,
      acceptedCultures: getAcceptedCultures(), // assumes this helper already exists
      historicalFriends: getHistoricalFriends(),
      historicalEnemies: getHistoricalRivals(),
      fileName: `${document.getElementById('country-tag').value.toUpperCase()} - ${document.getElementById('country-name').value}.txt`
    };
  }

  function generateCountryFileText(data) {
    return `government = ${data.government}
  add_government_reform = ${data.governmentreform}
  government_rank = 1
  mercantilism = 25
  technology_group = ${data.technologygroup}
  religion = ${data.religion}
  religious_school = ${data.religiousschool || '-'}
  primary_culture = ${data.primaryculture}
  ${(data.acceptedCultures || []).map(c => `add_accepted_culture = ${c.culture}`).join('\n')}
  ${(data.historicalFriends || []).map(f => `historical_friend = ${f}`).join('\n')}
  ${(data.historicalEnemies || []).map(r => `historical_rival = ${r}`).join('\n')}
  capital = ${data.capital}
  fixed_capital = ${data.fixedcapital ? 'yes' : 'no'}
  monarch_name = "${data.monarchname}"
  dynasty = "${data.dynasty}"
  birth_date = ${data.birthDate}
  eu4_date = ${data.eu4Date}
  adm = ${data.adm || 3}
  dip = ${data.dip || 3}
  mil = ${data.mil || 3}
  `;
  }