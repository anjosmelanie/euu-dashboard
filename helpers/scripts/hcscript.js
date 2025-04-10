// Scripts for history/countries

const nameInput = document.getElementById('name');
const tagInput = document.getElementById('tag');
const governmentSelect = document.getElementById('government');
const governmentReformSelect = document.getElementById('government-reform');
const technologyGroupSelect = document.getElementById('technology-group');
const religionSelect = document.getElementById('religion');
const religiousSchoolSelect = document.getElementById('religious-school');
const cultureGroupSelect = document.getElementById('culture-group');
const primaryCultureSelect = document.getElementById('primary-culture');

// Hidden fields wrappers
const religiousSchoolWrapper = document.getElementById('schoolWrapper');
const triggerReligions = ['sunni', 'shia'];

// Fields for Preview
nameInput.addEventListener('input', () => {
  document.getElementById('previewName').textContent = nameInput.value || '-';
});

tagInput.addEventListener('input', () => {
  document.getElementById('previewTag').textContent = (tagInput.value).toUpperCase() || '-';
});

governmentSelect.addEventListener('input', () => {
  document.getElementById('previewGovernment').textContent = governmentSelect.value || '-';
});

governmentReformSelect.addEventListener('input', () => {
    document.getElementById('previewReform').textContent = governmentReformSelect.value || '-';
});

technologyGroupSelect.addEventListener('input', () => {
    document.getElementById('previewTechnology').textContent = technologyGroupSelect.value || '-';
});

religionSelect.addEventListener('input', () => {
    document.getElementById('previewReligion').textContent = religionSelect.value || '-';
});

religiousSchoolSelect.addEventListener('input', () => {
    document.getElementById('previewSchool').textContent = religiousSchoolSelect.value || '-';
});

primaryCultureSelect.addEventListener('input', () => {
    document.getElementById('previewCulture').textContent = primaryCultureSelect.value || '-';
});

// End of fields preview

// Prevent form submission (for now)
document.getElementById('dataForm').addEventListener('submit', e => {
  e.preventDefault();
  alert("Form submitted!");
});

// Government Reform dropdown
// TO DO: Add all government reforms (will take forever)
const governmentReformOptions = {
  monarchy: ['Feudal Nobility', 'Autocracy', 'Elective Monarchy', 'Admiralty Regime', 'Eastern Plutocracy', 'Iqta', 'Barbary Iqta', 'Indian Sultanate', 'Nayankara System', 'Misl Confederacy', 'Rajput Kingdom', 'Mandala System', 'Chakravarti', 'Chinese Kingdom', 'Confucian Bureaucracy', 'Celestial Empire', 'Ganden Phodrang', 'Hermit Kingdom', 'Daimyo', 'Independent Daimyo', 'Shogunate', 'Supreme Shogunate', 'Divine Empire', 'Land of the Christian Sun', 'Russian Principality', 'Tsardom', 'Russian Empire', 'Ruthenian Tsardom', 'Austrian Archduchy', 'Imperial Austrian Monarchy'],
  republic: ['Empty Object', 'API Config', 'User Settings'],
  religion: ['Game Settings', 'Dev Build', 'Production Ready'],
  tribal: ['Game Settings', 'Dev Build', 'Production Ready']
};

governmentSelect.addEventListener('change', () => {
  const selectedGovernment = governmentSelect.value;
  const reforms = governmentReformOptions[selectedGovernment] || [];

  // Clear current template options
  governmentReformSelect.innerHTML = '<option value="">-- Select a government reform --</option>';

  // Populate new ones
  reforms.forEach(reform => {
    const option = document.createElement('option');
    option.value = reform.toLowerCase().replace(/\s+/g, '-'); // make safe value
    option.textContent = reform;
    governmentReformSelect.appendChild(option);
  });
});

// Religious School conditional dropdown
const religiousSchoolOptions = {
    sunni: ['hanafi_school', 'hanbali_school', 'maliki_school', 'shafii_school'],
    shia: ['ismaili_school', 'jafari_school', 'zaidi_school']
  };

religionSelect.addEventListener('change', () => {
    const selectedReligion = religionSelect.value;
    const schools = religiousSchoolOptions[selectedReligion] || [];

    if (triggerReligions.includes(selectedReligion)) {
        religiousSchoolWrapper.style.display = 'block';
    } else {
        religiousSchoolWrapper.style.display = 'none';
    }

    // Clear current template options
    religiousSchoolSelect.innerHTML = '<option value="">-- Select a government reform --</option>';

    // Populate new ones
    schools.forEach(school => {
        const option = document.createElement('option');
        option.value = school.toLowerCase().replace(/\s+/g, '-'); // make safe value
        option.textContent = school;
        religiousSchoolSelect.appendChild(option);
    });
  });

// Culture Group dropdown
  const primaryCultureOptions = {
    "Aboriginal": ["Gamilaraay", "Gunwinyguan", "Kulin", "Kuric", "Nyoongah", "Palawa", "Paman", "Yura"],
    "Altaic": [],
    "Andean": [],
    "Apachean": [],
    "Araucanian": [],
    "Aridoamerican": [],
    "Baltic": [],
    "British": [],
    "Burman": [],
    "Byzantine": [],
    "Caddoan": [],
    "Caribbean": [],
    "Carpathian": [],
    "Caucasian": [],
    "Celtic": [],
    "Central Algonquian": [],
    "Central American": [],
    "Central Indian": [],
    "Chibchan": [],
    "Chinese": [],
    "Cushitic": [],
    "Dravidian": [],
    "East Bantu": [],
    "Eastern Algonquian": [],
    "Eastern Aryan": [],
    "East Slavic": [],
    "Eskaleut": [],
    "Evenki": [],
    "French": [],
    "Germanic": [],
    "Great Lakes": [],
    "Iberian": [],
    "Iranian": [],
    "Iroquoian": [],
    "Japanese": [],
    "Je": [],
    "Kamchatkan": [],
    "Kongo": [],
    "Korean": [],
    "Latin": [],
    "Levantine": [],
    "Lost Cultures": [],
    "Maghrebi": [],
    "Malay": [],
    "Mande": [],
    "Marañón": [],
    "Matacoan": [],
    "Mayan": [],
    "Mon-Khmer": [],
    "Muskogean": [],
    "Na-Déné": [],
    "Nordic": [],
    "Otomanguean": [],
    "Pacific": [],
    "Penutian": [],
    "Plains Algonquian": [],
    "Sahelian": [],
    "Slavic": [],
    "Sonoran": [],
    "Southern African": [],
    "South Slavic": [],
    "Sudanese": [],
    "Tai": [],
    "Tatar": [],
    "Tibetan": [],
    "Tupi": [],
    "Ugric": [],
    "West African": [],
    "Western Aryan": [],
    "West Slavic": []
  };

  cultureGroupSelect.addEventListener('change', () => {
    const selectedCultureGroup = cultureGroupSelect.value;
    const cultures = primaryCultureOptions[selectedCultureGroup] || [];
  
    // Clear current template options
    primaryCultureSelect.innerHTML = '<option value="">-- Select a primary culture --</option>';
  
    // Populate new ones
    cultures.forEach(culture => {
      const option = document.createElement('option');
      option.value = culture.toLowerCase().replace(/\s+/g, '-'); // make safe value
      option.textContent = culture;
      primaryCultureSelect.appendChild(option);
    });
  });