// Array to store quotes with categories
const quotes = [
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

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><strong>— ${randomQuote.category}</strong>`;
}

// Function to add a new quote
function addQuote() {
  const newQuoteTextElement = document.getElementById("newQuoteText");
  const newQuoteText = newQuoteTextElement
    ? newQuoteTextElement.value.trim()
    : "";
  const newQuoteCategoryElement = document.getElementById("newQuoteCategory");
  const newQuoteCategory = newQuoteCategoryElement
    ? newQuoteCategoryElement.value.trim()
    : "";

  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add the new quote to the array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("New quote added successfully!");
}

// Function to create the form for adding quotes dynamically
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button id="addQuoteButton">Add Quote</button>
    `;

  document.body.appendChild(formContainer);

  // Attach event listener to the button
  document.getElementById("addQuoteButton").addEventListener("click", addQuote);
}

// Attach event listeners when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
  createAddQuoteForm(); // Initialize the form dynamically
});
