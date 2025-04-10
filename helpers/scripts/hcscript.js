// Scripts for history/countries

const nameInput = document.getElementById('name');
const tagInput = document.getElementById('tag');
const governmentSelect = document.getElementById('government');
const governmentReformSelect = document.getElementById('government-reform');
const technologyGroupSelect = document.getElementById('technology-group');
const religionSelect = document.getElementById('religion');
const religiousSchoolSelect = document.getElementById('religious-school');

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