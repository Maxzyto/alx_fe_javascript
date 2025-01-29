// Initial Quotes Array
let quotes = [
  {
    text: "The best way to predict the future is to create it.",
    category: "Motivation",
  },
  {
    text: "Success is not the key to happiness. Happiness is the key to success.",
    category: "Success",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    category: "Inspiration",
  },
];
// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

if (quoteDisplay) {
  quoteDisplay.innerHTML = "Welcome! Click the button to see a quote.";
}

// Function to Display a Random Quote
function showRandomQuote() {
  let selectedCategory = categoryFilter.value;
  let filteredQuotes = quotes.filter(
    (quote) => selectedCategory === "all" || quote.category === selectedCategory
  );

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerText = "No quotes available for this category.";
    return;
  }

  let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.innerText = filteredQuotes[randomIndex].text;
}

// Function to Add a New Quote
function addQuote() {
  let text = newQuoteText.value.trim();
  let category = newQuoteCategory.value.trim();

  if (text === "" || category === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  quotes.push({ text, category });
  newQuoteText.value = "";
  newQuoteCategory.value = "";

  // Add new category to filter dropdown if it doesn't exist
  if (
    !Array.from(categoryFilter.options).some(
      (option) => option.value === category
    )
  ) {
    let newOption = document.createElement("option");
    newOption.value = category;
    newOption.innerText = category;
    categoryFilter.appendChild(newOption);
  }

  alert("Quote added successfully!");
}

// Populate Categories in Dropdown
function populateCategories() {
  let categories = new Set(quotes.map((q) => q.category));
  categories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category;
    option.innerText = category;
    categoryFilter.appendChild(option);
  });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  showRandomQuote();
});

newQuoteButton.addEventListener("click", showRandomQuote);
