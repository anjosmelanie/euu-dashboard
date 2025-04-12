// Imports from other js files
import { CULTURE_OPTIONS, TRIGGER_RELIGIONS, RELIGIOUS_SCHOOL_OPTIONS, GOVERNMENT_REFORM_OPTIONS,
   TECHNOLOGY_GROUPS, RELIGIONS } from './constants.js';
import { defaultOption, populateSelect } from './utils.js';

// Constants for history/countries
const nameInput = document.getElementById('name');
const tagInput = document.getElementById('tag');
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

  addCultureBtn.addEventListener('click', () => {
    acceptedCultureCount++;

      // Wrapper div for layout
    const wrapper = document.createElement('div');
    wrapper.classList.add('horizontal');
    wrapper.classList.add('accepted-culture-pair');

    // Create culture group select
    const cultureGroupSelect = document.createElement('select');
    const cultureSelect = document.createElement('select');

    cultureGroupSelect.name = `acceptedCultureGroup${acceptedCultureCount}`;
    cultureSelect.name = `acceptedCulture${acceptedCultureCount}`;
    populateSelect(cultureGroupSelect, Object.keys(CULTURE_OPTIONS), 'Select a CULture group');
    populateSelect(cultureSelect, [], '-- Select culture group first --');

    // Create accepted culture select
    cultureGroupSelect.addEventListener('change', () => {
      const selectedGroup = cultureGroupSelect.value;
      const cultures = CULTURE_OPTIONS[selectedGroup] || [];
      populateSelect(cultureSelect, cultures, '-- Select CULture --');
    });

    //Remove accepted culture
    // TO DO: Extract to utils
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = '🗑️';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', () => {
      wrapper.remove();
    });

    // Append to wrapper
    wrapper.appendChild(cultureGroupSelect);
    wrapper.appendChild(cultureSelect);
    wrapper.appendChild(removeButton);

    // Add to container
    culturesContainer.appendChild(wrapper);
    });

  // Add historical friends