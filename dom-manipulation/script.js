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

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Show a single random quote
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

// Populate categories dynamically
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

// Filter quotes based on selected category
function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter");
  selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  showRandomQuote();
}

// Create and append the "Add Quote" form dynamically
function createAddQuoteForm() {
  const formContainer = document.getElementById("addQuoteForm");

  formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button id="addQuoteButton">Add Quote</button>
    `;

  document.getElementById("addQuoteButton").addEventListener("click", addQuote);
}

// Add a new quote
function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }
  syncQuotes();
  const newQuote = { text: newQuoteText, category: newQuoteCategory };
  quotes.push(newQuote);
  saveQuotes();

  populateCategories();
  showRandomQuote();

  postNewQuoteToServer(newQuote);

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("New quote added successfully!");
}

// Export quotes to JSON file
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Fetch new quotes from a simulated server (GET request)
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

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
      notifyUser("New quotes fetched from the server!");
    }
  } catch (error) {
    console.error("Error fetching quotes:", error);
  }
}

// Post a new quote to the server (POST request)
async function postNewQuoteToServer(quote) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote),
    });

    const result = await response.json();
    console.log("Quote successfully posted to server:", result);
  } catch (error) {
    console.error("Error posting quote:", error);
  }
}

// Notify user of updates
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
        <div id="addQuoteForm"></div>
        <button id="exportButton">Export Quotes</button>
        <button id="fetchServerButton">Fetch Quotes from Server</button>
    `;
  document.body.appendChild(container);

  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
  document
    .getElementById("exportButton")
    .addEventListener("click", exportQuotes);
  document
    .getElementById("fetchServerButton")
    .addEventListener("click", fetchQuotesFromServer);
}

// Attach event listeners on DOM load
document.addEventListener("DOMContentLoaded", () => {
  createUI();
  createAddQuoteForm();
  populateCategories();
  showRandomQuote();
  fetchQuotesFromServer();

  // Periodically fetch new data every 30 seconds
  setInterval(fetchQuotesFromServer, 30000);
});
// Sync quotes with the server
async function syncQuotes() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const serverQuotes = await response.json();

    if (serverQuotes.length > 0) {
      const newQuotes = serverQuotes.map((post) => ({
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
      notifyUser("Quotes synchronized with the server!");
    }
  } catch (error) {
    console.error("Error synchronizing quotes:", error);
  }
}
function syncQuotes() {
  throw new Error('Function not implemented.');
}

