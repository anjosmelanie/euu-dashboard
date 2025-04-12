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
    "Altaic": ["Kazakh", "Khalkha", "Korchin", "Kyrgyz", "Mongol", "Oirat", "Turkmeni", "Uyghur", "Uzbek"],
    "Andean": ["Aimara", "Chimuan", "Diaguita", "Quechua"],
    "Apachean": ["Eastern Apache", "Lipan", "Mescalero", "Navajo"],
    "Araucanian": ["Het", "Huarpe", "Mapuche", "Patagonian"],
    "Aridoamerican": ["Chichimecan", "Guamares", "Otomi", "Tecos", "Tepic", "Yaqui"],
    "Baltic": ["Estonian", "Latvian", "Lithuanian"],
    "British": ["American", "Cornish", "English", "Scottish", "Welsh"],
    "Burman": ["Arakanese", "Burmese", "Chin", "Kachin", "Karen"],
    "Byzantine": ["Cappadocian", "Gothic", "Greco-Georgian", "Greek", "Griko", "Pontic"],
    "Caddoan": ["Caddo", "Pawnee", "Wichita"],
    "Caribbean": ["Carib", "Lokono", "Maipurean", "Taino"],
    "Carpathian": ["Hungarian", "Romanian", "Transylvanian"],
    "Caucasian": ["Armenian", "Circassian", "Dagestani", "Georgian"],
    "Celtic": ["Highlander", "Irish"],
    "Central Algonquian": ["Anicinabe", "Anishinabe", "Cree", "Illini", "Innu-Naskapi", "Mesquakie", "Myaamia", "Shawnee"],
    "Central American": ["Aztec", "Matlantzinca", "Purepecha", "Totonac"],
    "Central Indian": ["Garjati", "Gondi", "Jharkandi"],
    "Chibchan": ["Caran", "Miskito", "Muisca"],
    "Chinese": ["Cantonese", "Gan", "Hakka", "Hubei", "Jianghuai", "Jin", "Manchu", "Min", "Shandong", "Sichuanese", "Sino-Altaic", "Sino-Korean", "Sino-Tibetan", "Sino-Vietnamese", "Sino-Zhuang", "Wu", "Xiang", "Xibei", "Zhili", "Zhongyuan"],
    "Cushitic": ["Afar", "Amhara", "Harari", "Oromo", "Sidamo", "Somali", "Tigray"],
    "Dravidian": ["Kannada", "Malayalam", "Tamil", "Telugu"],
    "East Bantu": ["Bena", "Malagasy", "Swahili", "Takama", "Thagiicu"],
    "Eastern Algonquian": ["Abenaki", "Delaware", "Mahican", "Maliseet", "Massachusset", "Mikmaq", "Pequot", "Powhatan"],
    "Eastern Aryan": ["Assamese", "Bengali", "Bihari", "Kochi", "Nepali", "Oriya", "Pahari", "Sinhalese"],
    "East Slavic": ["Byelorussian", "Muscovite", "Novgorodian", "Ruthenian", "Ryazanian"],
    "Eskaleut": ["Aleutian", "Inuit"],
    "Evenki": ["Buryat", "Evenk", "Jurchen", "Tungus", "Yakut", "Yukaghir"],
    "French": ["Anglois", "Aquitanian", "Breton", "Burgundian", "Francien", "Gascon", "Louisianan", "Norman", "Occitan", "Québécois", "Walloon"],
    "Germanic": ["Austrian", "Balten", "Bavarian", "Dutch", "Flemish", "Franconian", "Frisian", "Gothic", "Lower Saxon", "Pomeranian", "Prussian", "Rhenish", "Saxon", "Swabian", "Swiss", "Westphalian"],
    "Great Lakes": ["Ganda", "Masaba", "Rwandan"],
    "Hindustani": ["Avadhi", "Hindavi", "Kashmiri", "Panjabi", "Vindhyan"],
    "Iberian": ["Andalusian", "Aragonese", "Basque", "Brazilian", "Castilian", "Catalan", "Galician", "Leonese", "Mexican", "Platinean", "Portuguese"],
    "Iranian": ["Afghan", "Azerbaijani", "Baluchi", "Khorasani", "Kurdish", "Luri", "Mazandarani", "Persian", "Turco-Iranian"],
    "Iroquoian": ["Cherokee", "Huron", "Iroquois", "Laurentian", "Susquehannock", "Tionontate"],
    "Japanese": ["Kyushuan", "Saigoku", "Togoku"],
    "Je": ["Charruan", "Ge"],
    "Kamchatkan": ["Ainu", "Kamchatkan", "Nivkh"],
    "Kongo": ["Chokwe", "Jukun", "Kongolese", "Kuba", "Luba", "Lunda", "Mbangala", "Mbundu", "Sawabantu", "Yaka"],
    "Korean": ["Korean"],
    "Latin": ["Dalmatian", "Ligurian", "Lombard", "Maltese", "Neapolitan", "Piedmontese", "Romagnol", "Sardinian", "Sicilian", "Tuscan", "Umbrian", "Venetian"],
    "Levantine": ["Bedouin", "Egyptian", "Hejazi", "Khaleeji", "Mahri", "Mashriqi", "Omani", "Syrian", "Turkish", "Yemeni"],
    "Lost Cultures": ["Anglo-Saxon", "Aramaic", "Athenian", "Atlantean", "Babylonian", "Etrurian", "Hebrew", "Jan Mayenese", "Livonian", "Old Egyptian", "Parthian", "Phoenician", "Pruthenian", "Roman", "Scanian", "Scythian", "Spartan"],
    "Maghrebi": ["Algerian", "Berber", "Moroccan", "Tunisian"],
    "Malay": ["Acehnese", "Bornean", "Cham", "Filipino", "Javanese", "Madagascan", "Malayan", "Moluccan", "Nusa Tenggara", "Sulawesi", "Sumatran", "Sundanese"],
    "Mande": ["Bambara", "Bozo", "Dyola", "Mali", "Songhai", "Soninke"],
    "Marañón": ["Chachapoyan", "Jivaro"],
    "Matacoan": ["Chacoan"],
    "Mayan": ["Chontales", "Highland Mayan", "Lacandon", "Mayan", "Putun", "Wastek", "Yucatec"],
    "Mon-Khmer": ["Khmer", "Mon", "Vietnamese"],
    "Muskogean": ["Catawba", "Chickasaw", "Choctaw", "Creek", "Natchez", "Yamasee", "Yoron", "Yuchi"],
    "Na-Déné": ["Athabascan", "Chipewyan", "Haida"],
    "Nordic": ["Danish", "Finnish", "Icelandic", "Karelian", "Norse", "Norwegian", "Sámi", "Swedish"],
    "Otomanguean": ["Mixtec", "Tlapanec", "Zapotek"],
    "Pacific": ["Maori", "Melanesian", "Papuan", "Polynesian"],
    "Penutian": ["Chinook", "Salish", "Yokuts"],
    "Plains Algonquian": ["Arapaho", "Blackfoot", "Bungi", "Cheyenne", "Plains Cree"],
    "Sahelian": ["Bilala", "Fulani", "Hausa", "Kanuri", "Senegambian", "Tuareg", "Tunjur"],
    "Siouan": ["Chiwere", "Dakota", "Nakota", "Osage"],
    "Slavic": ["Bosnian", "Bulgarian", "Byelorussian", "Croatian", "Czech", "Muscovite", "Novgorodian", "Polish", "Ruthenian", "Ryazanian", "Serbian", "Silesian", "Slovak", "Slovene", "Sorbian"],
    "Sonoran": ["Kiowa", "Piman", "Pueblo", "Shoshone"],
    "Southern African": ["Bemba", "Khoisan", "Makua", "Nguni", "Nyasa", "Shona"],
    "South Slavic": ["Albanian", "Bosnian", "Bulgarian", "Croatian", "Serbian", "Slovene"],
    "Sudanese": ["Acholi", "Beja", "Nubian"],
    "Tai": ["Khon Muang", "Lao", "Shan", "Siamese", "Zhuang"],
    "Tatar": ["Astrakhani", "Bashkir", "Crimean", "Kazani", "Mishar", "Nogai", "Siberian"],
    "Tibetan": ["Bai", "Miao", "Tibetan", "Yi"],
    "Tupi": ["Guarani", "Tupinamba"],
    "Ugric": ["Ingrian", "Ostyak", "Samoyed", "Uralic"],
    "West African": ["Akan", "Dagomba", "Fon", "Mossi", "Nupe", "Yoruba"],
    "Western Aryan": ["Gujarati", "Malvi", "Marathi", "Parsi", "Rajasthani", "Saurashtri", "Sindhi"],
    "West Slavic": ["Czech", "Polish", "Silesian", "Slovak", "Sorbian"]
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