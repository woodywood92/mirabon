// Function to update content based on selected language
function updateContent(langData) {
	document.querySelectorAll('[data-i18n]').forEach((element) => {
		const key = element.getAttribute('data-i18n');
		element.innerHTML = langData[key];
	});
}

// Function to set the language preference
function setLanguagePreference(lang) {
	localStorage.setItem('language', lang);
	location.reload();
}

// Function to fetch language data
async function fetchLanguageData(lang) {
	const response = await fetch(`languages/${lang}.json`);
	return response.json();
}

// Function to change language
async function changeLanguage(lang) {
	await setLanguagePreference(lang);

	const langData = await fetchLanguageData(lang);
	updateContent(langData);
}

/**
 * Methode de changement de country flag
 **/
function changeCountryFlag(lang) {
	if (lang === 'fr') {
		document.querySelectorAll('[id=country_flag_text]').forEach((flag) => {
			flag.innerText = 'FR';
		});
		document.querySelectorAll('[id=country_flag]').forEach((element) => {
			element.src = '../img/flagFrench.jpg';
		});
	} else if (lang === 'en') {
		document.querySelectorAll('[id=country_flag]').forEach((element) => {
			element.src = '../img/flagEnglish.jpg';
		});
		document.querySelectorAll('[id=country_flag_text]').forEach((flag) => {
			flag.innerText = 'EN';
		});
	}
}

// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
	const userPreferredLanguage = localStorage.getItem('language') || 'fr';
	const langData = await fetchLanguageData(userPreferredLanguage);
	updateContent(langData);
	changeCountryFlag(userPreferredLanguage);
});
