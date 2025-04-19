// Imports from other js files
import { CULTURE_OPTIONS, TRIGGER_RELIGIONS, RELIGIOUS_SCHOOL_OPTIONS, GOVERNMENT_REFORM_OPTIONS,
   TECHNOLOGY_GROUPS, RELIGIONS } from './constants.js';
import { dropdownDefaultValue, populateSelect, makeUppercaseOnInput, downloadFile, convertModernBirthDateTo1444, getRandomStat } from './utils.js';

// Constants for history/countries
const governmentSelect = document.getElementById('government');
populateSelect(governmentSelect, Object.keys(GOVERNMENT_REFORM_OPTIONS), dropdownDefaultValue("government type"));
const governmentReformSelect = document.getElementById('government-reform');
const technologyGroupSelect = document.getElementById('technology-group');
populateSelect(technologyGroupSelect, TECHNOLOGY_GROUPS, dropdownDefaultValue("technology group"));
const religionSelect = document.getElementById('religion');
populateSelect(religionSelect, RELIGIONS, dropdownDefaultValue("religion"));
const religiousSchoolSelect = document.getElementById('religious-school');
const cultureGroupSelect = document.getElementById('culture-group');
populateSelect(cultureGroupSelect, Object.keys(CULTURE_OPTIONS), dropdownDefaultValue("culture group"));
const primaryCultureSelect = document.getElementById('primary-culture');
const religiousSchoolWrapper = document.getElementById('schoolWrapper');

//Preview
function updatePreviewFromForm() {
  const data = getCurrentFormData(); // your form reader function
  const previewText = generateCountryPreviewText(data); // the one we made earlier
  document.getElementById('preview-box').textContent = previewText;
  document.getElementById('file-name').value = data.fileName;
}

//Any change anywhere in the form triggers the preview update
document.getElementById('form-section').addEventListener('input', updatePreviewFromForm);

// Save changes to local storage
document.getElementById('reload-preview').addEventListener('click', updatePreviewFromForm);
document.getElementById('save-country').addEventListener('click', saveCurrentHistoryCountry);
document.getElementById('download-country').addEventListener('click', () => {
  saveCurrentHistoryCountry();
  const data = getCurrentFormData();
  const text = generateCountryPreviewText(data);
  downloadFile({ fileName: data.fileName, text });
});

// Birth date adjustment
document.getElementById('birth-date').addEventListener('change', (e) => {
  const adjusted = convertModernBirthDateTo1444(e.target.value);
  document.getElementById('eu4-birth-date').value = adjusted;
});

// Government Reform dropdown
governmentSelect.addEventListener('change', () => {
  const selectedGovernment = governmentSelect.value;
  const reforms = GOVERNMENT_REFORM_OPTIONS[selectedGovernment] || [];

  // Clear current template options
  governmentReformSelect.innerHTML = dropdownDefaultValue('government reform');

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
    religiousSchoolSelect.innerHTML = dropdownDefaultValue('religious school');

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
    primaryCultureSelect.innerHTML = dropdownDefaultValue('primary culture');
  
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
    populateSelect(cultureGroupSelect, Object.keys(CULTURE_OPTIONS), dropdownDefaultValue("culture group"));
    populateSelect(cultureSelect, [], dropdownDefaultValue("accepted culture"));
  
    // Hook up dynamic culture loading
    cultureGroupSelect.addEventListener('change', () => {
      const selectedGroup = cultureGroupSelect.value;
      const cultures = CULTURE_OPTIONS[selectedGroup] || [];
      populateSelect(cultureSelect, cultures, dropdownDefaultValue("accepted culture"));
      console.log(cultures);
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

  function getAcceptedCultures() {
    const culturePairs = document.querySelectorAll('.accepted-culture-pair');
    const acceptedCultures = [];
  
    culturePairs.forEach(pair => {
      const group = pair.querySelector('select[name^="acceptedCultureGroup"]');
      const culture = pair.querySelector('select[name^="acceptedCulture"]:not([name^="acceptedCultureGroup"])');
  
      if ( group?.value && culture?.value ) {
        acceptedCultures.push({
          group: group.value,
          culture: culture.value.toLowerCase()
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
      const cultureSelect = wrapper.querySelector('select[name^="acceptedCulture"]:not([name^="acceptedCultureGroup"])');
  
      console.log(culture);
      groupSelect.value = group;
      groupSelect.dispatchEvent(new Event('change'));

      // Give the event a moment to populate the dropdown
      setTimeout(() => {
        cultureSelect.value = culture;
      }, 50); // if 50ms is flaky, bump it up a bit
      cultureSelect.value = culture;
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
      capital: document.getElementById('capital-province').value,
      fixedcapital: document.getElementById('fixed-capital').checked,
      monarchname: document.getElementById('monarch-name').value,
      dynasty: document.getElementById('dynasty').value,
      birthDate: document.getElementById('birth-date').value,
      eu4Date: document.getElementById('eu4-birth-date').value,
      adm: document.getElementById('adm-skill')?.value || 3,
      dip: document.getElementById('dip-skill')?.value || 3,
      mil: document.getElementById('mil-skill')?.value || 3,
      acceptedCultures: getAcceptedCultures(), 
      historicalFriends: getHistoricalFriends(),
      historicalEnemies: getHistoricalRivals(),
      fileName: `${document.getElementById('country-tag').value.toUpperCase()} - ${document.getElementById('country-name').value}.txt`
    };
  }

  function generateCountryPreviewText(data) {
    let lines = [];
  
    lines.push(`government = ${data.government}`);
    if (data.governmentreform) {
      lines.push(`add_government_reform = ${data.governmentreform}`);
    }
    lines.push(`government_rank = 1`);
    lines.push(`mercantilism = 25`);
    lines.push(`technology_group = ${data.technologygroup}`);
    lines.push(`religion = ${data.religion}`);
    if (data.religiousschool) {
      lines.push(`religious_school = ${data.religiousschool}`);
    }
    lines.push(`primary_culture = ${data.primaryculture}`);
  
    (data.acceptedCultures || []).forEach(({ culture }) =>
      lines.push(`add_accepted_culture = ${culture}`)
    );
  
    (data.historicalFriends || []).forEach(friend =>
      lines.push(`historical_friend = ${friend}`)
    );
  
    (data.historicalEnemies || []).forEach(rival =>
      lines.push(`historical_rival = ${rival}`)
    );
  
    lines.push(`capital = ${data.capital}`);
    if (data.fixedcapital && data.capital) {
      lines.push(`fixed_capital = ${data.capital}`);
    }
  
    lines.push(generateMonarchBlock(data));
  
    return lines.join('\n');
  }

  function generateMonarchBlock(data) {
    return `1444.11.11 = {
      monarch = {
          name = "${data.monarchname || ''}"
          monarch_name = "${data.monarchname || ''}"
          dynasty = "${data.dynasty || ''}"
          birth_date = ${formatDateForTxt(data.eu4Date)}
          adm = ${data.adm || 3}
          dip = ${data.dip || 3}
          mil = ${data.mil || 3}
      }
  }`;
  }

  function formatDateForTxt(dateStr) {
    console.log(dateStr);
    if (!dateStr) return '1444.11.11'; // fallback
    const [day, month, year] = dateStr.split('/');
    return `${year}.${parseInt(month)}.${parseInt(day)}`;
  }

  function getCultureGroup(culture) {
    for (const group in CULTURE_OPTIONS) {
      console.log(group + ", " + culture);
      if (CULTURE_OPTIONS[group].includes(culture)) {
        return group;
      }
    }
    return null;
  }

  document.getElementById("culture-search").addEventListener("input", (e) => {
    const culture = e.target.value.trim().toLowerCase();
    const group = getCultureGroup(culture);
    document.getElementById("group-result").textContent =
      group ? `Group: ${group}` : "Culture not found";
  });

  function randomizeStats() {
    document.getElementById("adm-skill").value = getRandomStat();
    document.getElementById("dip-skill").value = getRandomStat();
    document.getElementById("mil-skill").value = getRandomStat();
  }

  document.getElementById("reroll-stats").addEventListener("click", randomizeStats);

  window.addEventListener('DOMContentLoaded', () => {
    renderSaveManager();
    updatePreviewFromForm();
    randomizeStats();
  });