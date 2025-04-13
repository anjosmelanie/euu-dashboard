export function dropdownDefaultValue(label) {
  return startsWithVowel(label) ? `-- Select an ${label} --` : `-- Select a ${label} --`;
  }

  function startsWithVowel(str) {
    return /^[aeiou]/i.test(str.trim());
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

  export function convertModernBirthDateTo1444(dateString) {
    const [day, month, year] = dateString.split('/').map(str => parseInt(str, 10));
  
    if (!day || !month || !year) return '';
  
    const modernBirth = new Date(year, month - 1, day); // month is 0-indexed in JS
    const modernReference = new Date('2025-01-01');
    const eu4Reference = new Date('1444-11-11');
  
    // Calculate age in 2025
    let age = modernReference.getFullYear() - modernBirth.getFullYear();
    const beforeBirthday =
      modernReference.getMonth() < modernBirth.getMonth() ||
      (modernReference.getMonth() === modernBirth.getMonth() &&
       modernReference.getDate() < modernBirth.getDate());
  
    if (beforeBirthday) age--;
  
    const targetYear = eu4Reference.getFullYear() - age;
    const paddedDay = day.toString().padStart(2, '0');
    const paddedMonth = month.toString().padStart(2, '0');
  
    return `${paddedDay}/${paddedMonth}/${targetYear}`;
  }


  export function getPrettyRGB() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.random() * 30; // 70%–100%
    const lightness = 45 + Math.random() * 10;  // 45%–55%
  
    const [r, g, b] = hslToRgb(hue, saturation, lightness);
    return [r, g, b];
  }

  function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
  
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
  
    return [f(0), f(8), f(4)];
  }