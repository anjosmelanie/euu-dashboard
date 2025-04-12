export function defaultOption(label) {
    return `<option value="">-- Select a ${label} --</option>`;
  }

  export function populateSelect(selectEl, optionsArray, placeholder = '-- Select an option --') {
    // Clear existing options
    selectEl.innerHTML = '';
  
    // Add the placeholder option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = placeholder; //DefaultOption function?
    selectEl.appendChild(defaultOption);
  
    // Add the rest of the options
    optionsArray.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      selectEl.appendChild(opt);
    });
  }