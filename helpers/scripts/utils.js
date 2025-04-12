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

  export function makeUppercaseOnInput(inputEl) {
    inputEl.addEventListener('input', () => {
      inputEl.value = inputEl.value.toUpperCase();
    });
  }

  export function downloadFile(data) {
    const blob = new Blob([data.text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = data.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }