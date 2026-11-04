const PROJECT_ID = 'e9b7f5cd-68f1-4c45-8adc-7efeedd7b3cd';
const API_BASE_URL = `https://traducila.vercel.app/api/translations/${PROJECT_ID}`;

export const LANGUAGES = {
  spanish: 'es',
  english: 'en'
};

const DEFAULT_LANGUAGE = LANGUAGES.spanish;
const SUPPORTED_LANGUAGES = Object.values(LANGUAGES);

const translationsCache = new Map();
const pendingRequests = new Map();

let currentLanguage = DEFAULT_LANGUAGE;

export function getCurrentLanguage() {
  return currentLanguage;
}

export function getPhrase(key) {
  if (currentLanguage === DEFAULT_LANGUAGE) {
    return key;
  }

  const words = translationsCache.get(currentLanguage);

  if (!Array.isArray(words)) {
    return key;
  }

  const translation = words.find((word) => word.key === key);

  return translation?.translate ? translation.translate : key;
}

export async function setLanguage(language) {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return false;
  }

  currentLanguage = language;

  if (language === DEFAULT_LANGUAGE || translationsCache.has(language)) {
    return true;
  }

  return fetchTranslations(language);
}

async function fetchTranslations(language) {
  if (pendingRequests.has(language)) {
    return pendingRequests.get(language);
  }

  const request = fetch(`${API_BASE_URL}/${language}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`TraduciLa respondió ${response.status}`);
      }

      return response.json();
    })
    .then((payload) => {
      const words = payload?.data?.words;

      if (!Array.isArray(words)) {
        throw new Error('Respuesta de TraduciLa sin traducciones');
      }

      translationsCache.set(language, words);
      return true;
    })
    .catch((error) => {
      if (currentLanguage === language) {
        currentLanguage = DEFAULT_LANGUAGE;
      }

      console.warn(`No se pudieron cargar las traducciones (${language}):`, error);
      return false;
    })
    .finally(() => {
      pendingRequests.delete(language);
    });

  pendingRequests.set(language, request);

  return request;
}
