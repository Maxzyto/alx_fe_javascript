const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Simulated server API

let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "Life is 10% what happens to us and 90% how we react to it.",
    category: "Life",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    category: "Success",
  },
  { text: "Happiness depends upon ourselves.", category: "Happiness" },
];

let selectedCategory = localStorage.getItem("selectedCategory") || "all";

// Function to save quotes to Local Storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to show a single random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  let filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((quote) => quote.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available in this category.</p>";
    return;
  }

  const randomQuote =
    filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];

  const quoteElement = document.createElement("p");
  quoteElement.innerHTML = `"${randomQuote.text}" <strong>— ${randomQuote.category}</strong>`;
  quoteDisplay.appendChild(quoteElement);
}

// Function to populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  const uniqueCategories = [...new Set(quotes.map((quote) => quote.category))];

  uniqueCategories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  categoryFilter.value = selectedCategory;
}

// Function to filter quotes based on selected category
function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter");
  selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  showRandomQuote(); // Show a new quote based on the selection
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuote = { text: newQuoteText, category: newQuoteCategory };
  quotes.push(newQuote);
  saveQuotes();

  populateCategories();
  showRandomQuote(); // Show the newly added quote immediately

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("New quote added successfully!");
}

// Function to fetch new quotes from a simulated server
async function syncQuotesWithServer() {
  try {
    const response = await fetch(API_URL);
    const serverQuotes = await response.json();

    if (serverQuotes.length > 0) {
      const newQuotes = serverQuotes.slice(0, 5).map((post) => ({
        text: post.title,
        category: "Server Data",
      }));

      newQuotes.forEach((quote) => {
        if (!quotes.some((q) => q.text === quote.text)) {
          quotes.push(quote);
        }
      });

      saveQuotes();
      populateCategories();
      showRandomQuote();
      notifyUser("New quotes synced from the server!");
    }
  } catch (error) {
    console.error("Error syncing quotes:", error);
  }
}

// Function to notify the user of updates
function notifyUser(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.remove(), 3000);
}

// Create UI elements dynamically
function createUI() {
  const container = document.createElement("div");
  container.innerHTML = `
        <select id="categoryFilter" onchange="filterQuotes()">
            <option value="all">All Categories</option>
        </select>
        <button id="newQuote">Show New Quote</button>
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button id="addQuoteButton">Add Quote</button>
        <button id="syncButton">Sync with Server</button>
    `;
  document.body.appendChild(container);

  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
  document.getElementById("addQuoteButton").addEventListener("click", addQuote);
  document
    .getElementById("syncButton")
    .addEventListener("click", syncQuotesWithServer);
}

// Attach event listeners on DOM load
document.addEventListener("DOMContentLoaded", () => {
  createUI();
  populateCategories();
  showRandomQuote();
  syncQuotesWithServer();

  // Periodically fetch new data every 30 seconds
  setInterval(syncQuotesWithServer, 30000);
});
