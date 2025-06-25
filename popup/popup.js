// DOM Elements
const wordInput = document.getElementById('word-input');
const searchBtn = document.getElementById('search-btn');
const wordEl = document.getElementById('word');
const definitionEl = document.getElementById('definition');
const translationEl = document.getElementById('translation');
const speakBtn = document.getElementById('speak-btn');
const saveBtn = document.getElementById('save-btn');

// Fetch Dictionary Definition
async function fetchDefinition(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) throw new Error("Word not found in the dictionary.");
    
    const data = await response.json();
    
    // Extract the first definition (with fallbacks)
    const definition = 
      data[0]?.meanings?.[0]?.definitions?.[0]?.definition || 
      data[0]?.meanings?.[0]?.synonyms?.[0] || 
      "No definition found.";

    return definition;
  } catch (error) {
    console.error("Dictionary API error:", error);
    return `Could not fetch definition. (${error.message})`;
  }
}

// Fetch Translation (using LibreTranslate)
async function fetchTranslation(word, targetLang = 'es') {
  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: word,
        source: 'en',
        target: targetLang
      })
    });
    const data = await response.json();
    return data.translatedText || "Translation failed.";
  } catch (error) {
    console.error("Translation API error:", error);
    return "Error fetching translation.";
  }
}

// Text-to-Speech
function speakWord(word) {
  if (!word) return;
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

// Save Word to Chrome Storage
async function saveWord(word) {
  if (!word) return;
  const { savedWords = [] } = await chrome.storage.local.get('savedWords');
  if (!savedWords.includes(word)) {
    savedWords.push(word);
    await chrome.storage.local.set({ savedWords });
    alert(`"${word}" saved!`);
  } else {
    alert(`"${word}" already saved!`);
  }
}

// Main Search Function
async function handleSearch() {
  const word = wordInput.value.trim();
  if (!word) return;

  // Show loading state
  wordEl.textContent = "Loading...";
  definitionEl.textContent = "";
  translationEl.textContent = "";

  // Fetch data in parallel
  const [definition, translation] = await Promise.all([
    fetchDefinition(word),
    fetchTranslation(word)
  ]);

  // Update UI
  wordEl.textContent = word;
  definitionEl.textContent = `Definition: ${definition}`;
  translationEl.textContent = `Spanish: ${translation}`;
}

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
wordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSearch();
});

speakBtn.addEventListener('click', () => {
  speakWord(wordInput.value.trim());
});

saveBtn.addEventListener('click', () => {
  saveWord(wordInput.value.trim());
});

// Load last saved word on popup open
chrome.storage.local.get('lastWord', ({ lastWord }) => {
  if (lastWord) {
    wordInput.value = lastWord;
    handleSearch();
  }
});

// Save word on input change (debounced)
let debounceTimer;
wordInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const word = wordInput.value.trim();
    if (word) chrome.storage.local.set({ lastWord: word });
  }, 500);
});