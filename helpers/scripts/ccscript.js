import { GRAPHICAL_CULTURES, IDEA_GROUPS, RESTRICTED_IDEA_GROUPS} from "./constants.js";
import { getPrettyRGB, downloadFile } from "./utils.js";

populateGraphicalCultures();

// Functions for reload - save - download
document.getElementById('reload-preview').addEventListener('click', updatePreviewFromForm);
document.getElementById('save-country').addEventListener('click', saveCurrentCommonCountry);
document.getElementById('download-country').addEventListener('click', () => {
  saveCurrentCommonCountry();
  const data = getCurrentFormData();
  const text = generateCountryFilePreview(data);
  downloadFile({ fileName: data.fileName, text }); //TODO: Trim filename?
});

// Functions for Graphical Cultures
function populateGraphicalCultures() {
    const select = document.getElementById('graphical-culture');
  
    GRAPHICAL_CULTURES.forEach(culture => {
      const option = document.createElement('option');
      option.value = culture;
      option.textContent = culture;
      select.appendChild(option);
    });
  }

// Functions for Color Selectors
document.querySelectorAll('.reroll-color').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
  
      const rInput = document.querySelector(`.${target}-r`);
      const gInput = document.querySelector(`.${target}-g`);
      const bInput = document.querySelector(`.${target}-b`);
      const previewId = `preview-${target}`;
  
      const [r, g, b] = getPrettyRGB();
      setColorInputs([r, g, b], rInput, gInput, bInput, previewId);
    });
  });

  function updateColorPreview(r, g, b, previewId) {
    const preview = document.getElementById(previewId);
    if (preview) {
      preview.style.backgroundColor = `rgb(${r || 0}, ${g || 0}, ${b || 0})`;
    }
  }

  function setColorInputs(rgb, rInput, gInput, bInput, previewId) {
    rInput.value = rgb[0];
    gInput.value = rgb[1];
    bInput.value = rgb[2];
    updateColorPreview(rgb[0], rgb[1], rgb[2], previewId);
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    const [r1, g1, b1] = getPrettyRGB();
    setColorInputs(
      [r1, g1, b1],
      document.querySelector('.color-r'),
      document.querySelector('.color-g'),
      document.querySelector('.color-b'),
      'preview-color'
    );
  
    const [r2, g2, b2] = getPrettyRGB();
    setColorInputs(
      [r2, g2, b2],
      document.querySelector('.rev-color-r'),
      document.querySelector('.rev-color-g'),
      document.querySelector('.rev-color-b'),
      'preview-rev-color'
    );

    updatePreviewFromForm();
    renderSaveManager('euuCommonCountryFiles');
  });

  // Functions for Idea Groups
  function getAllIdeaGroups() {
    return Object.values(IDEA_GROUPS).flat();
  }

  function getRandomizableIdeaGroups() {
    return getAllIdeaGroups().filter(idea => !RESTRICTED_IDEA_GROUPS.includes(idea));
  }

  function getRandomUniqueIdeas() {
    const selected = [];
  
    // Pick one idea from each category first
    Object.keys(IDEA_GROUPS).forEach(category => {
      const pool = IDEA_GROUPS[category].filter(idea => !RESTRICTED_IDEA_GROUPS.includes(idea));
      const idea = pool[Math.floor(Math.random() * pool.length)];
      selected.push(idea);
    });
  
    // Fill remaining slots from all randomizable ideas
    const remaining = getRandomizableIdeaGroups().filter(idea => !selected.includes(idea));
  
    while (selected.length < 8 && remaining.length > 0) {
      const idx = Math.floor(Math.random() * remaining.length);
      selected.push(remaining.splice(idx, 1)[0]);
    }
  
    return selected;
  }

  function populateIdeaSelects() {
    const allIdeas = getAllIdeaGroups();
    document.querySelectorAll('.idea-select').forEach(select => {
      select.innerHTML = '<option value="">-- Select idea group --</option>';
      allIdeas.forEach(idea => {
        const opt = document.createElement('option');
        opt.value = idea;
        opt.textContent = idea;
        select.appendChild(opt);
      });
    });
  }
  
  function applyRandomIdeasToForm() {
    const selected = getRandomUniqueIdeas();
    const selects = document.querySelectorAll('.idea-select');
    selects.forEach((select, i) => {
      select.value = selected[i] || '';
    });
  }

  document.getElementById('randomize-ideas').addEventListener('click', () => {
    populateIdeaSelects(); // ensure all selects are freshly populated
    applyRandomIdeasToForm(); // fill them with spicy chaos
  });

  // Preview Section
  function generateCountryFilePreview(data) {
    const lines = [];
  
    // Graphical culture
    if (data.graphicalCulture) {
      lines.push(`graphical_culture = ${data.graphicalCulture}`);
    }
  
    // Color
    if (data.color?.length === 3) {
      lines.push(`color = { ${data.color.join(' ')} }`);
    }
  
    // Revolutionary color
    if (data.revColor?.length === 3) {
      lines.push(`revolutionary_colors = { ${data.revColor.join(' ')} }`);
    }
  
    // Idea groups
    if (Array.isArray(data.ideaGroups) && data.ideaGroups.length > 0) {
      lines.push(`historical_idea_groups = {`);
      data.ideaGroups.forEach(idea => lines.push(`    ${idea}`));
      lines.push(`}`);
    }
  
    return lines.join('\n');
  }

  function updatePreviewFromForm() {
    const data = getCurrentFormData();
    const preview = generateCountryFilePreview(data);
    document.getElementById('preview-box').textContent = preview;
    document.getElementById('file-name').value = data.fileName;
  }

  function getCurrentFormData() {

    const countryName = document.getElementById('country-name')?.value || '';
    const fileName = countryName + ".txt";
    // Graphical culture
    const graphicalCulture = document.getElementById('graphical-culture')?.value || '';
  
    // Color (RGB)
    const color = [
      parseInt(document.querySelector('.color-r')?.value || 0),
      parseInt(document.querySelector('.color-g')?.value || 0),
      parseInt(document.querySelector('.color-b')?.value || 0)
    ];
  
    // Revolutionary color (RGB)
    const revColor = [
      parseInt(document.querySelector('.rev-color-r')?.value || 0),
      parseInt(document.querySelector('.rev-color-g')?.value || 0),
      parseInt(document.querySelector('.rev-color-b')?.value || 0)
    ];
  
    // Idea groups (8 total, from selects)
    const ideaGroups = Array.from(document.querySelectorAll('.idea-select'))
      .map(select => select.value)
      .filter(value => value); // remove empty strings
  
    return {
      countryName,
      fileName,
      graphicalCulture,
      color,
      revColor,
      ideaGroups
    };
  }

  document.getElementById('form-section').addEventListener('input', updatePreviewFromForm);

  // Functions for Local Storage
  function saveCurrentCommonCountry() {
    const data = getCurrentFormData();
    const name = data.fileName || 'unnamed_country';
  
    const all = JSON.parse(localStorage.getItem('euuCommonCountryFiles')) || {};
    all[name] = data;
  
    localStorage.setItem('euuCommonCountryFiles', JSON.stringify(all));
    renderSaveManager('euuCommonCountryFiles'); // refresh sidebar
  }

  function loadCountry(name) {
    const all = JSON.parse(localStorage.getItem('euuCommonCountryFiles')) || {};
    const data = all[name];
    if (!data) return;
  
    // Fill form fields
    document.getElementById('country-name').value = data.countryName;
    document.getElementById('graphical-culture').value = data.graphicalCulture || '';
    document.querySelector('.color-r').value = data.color?.[0] || 0;
    document.querySelector('.color-g').value = data.color?.[1] || 0;
    document.querySelector('.color-b').value = data.color?.[2] || 0;
    document.querySelector('.rev-color-r').value = data.revColor?.[0] || 0;
    document.querySelector('.rev-color-g').value = data.revColor?.[1] || 0;
    document.querySelector('.rev-color-b').value = data.revColor?.[2] || 0;
  
    const selects = document.querySelectorAll('.idea-select');
    selects.forEach((s, i) => {
      s.value = data.ideaGroups?.[i] || '';
    });
  
    document.getElementById('country-name').value = data.countryName || '';
  
    updateColorPreview(...data.color, 'preview-color');
    updateColorPreview(...data.revColor, 'preview-rev-color');
    updatePreviewFromForm();
  }

  function renderSaveManager() {
    const container = document.getElementById('save-manager');
    container.innerHTML = '';
  
    const saves = JSON.parse(localStorage.getItem('euuCommonCountryFiles')) || {};
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
    const saves = JSON.parse(localStorage.getItem('euuCommonCountryFiles')) || {};
    delete saves[key];
    localStorage.setItem('euuCommonCountryFiles', JSON.stringify(saves));
  }