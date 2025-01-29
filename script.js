// Array to store quote objects
const quotes = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    category: "Motivation",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    category: "Life",
  },
  {
    text: "Do not watch the clock. Do what it does. Keep going.",
    category: "Inspiration",
  },
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerText = `"${quote.text}" - ${quote.category}`;
}

// Function to create and add a new quote form
function createAddQuoteForm() {
  const form = document.createElement("form");
  form.id = "addQuoteForm";

  const quoteInput = document.createElement("input");
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter quote text";
  quoteInput.id = "quoteText";
  form.appendChild(quoteInput);

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";
  categoryInput.id = "quoteCategory";
  form.appendChild(categoryInput);

  const submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.innerText = "Add Quote";
  submitButton.onclick = addQuote;
  form.appendChild(submitButton);

  document.body.appendChild(form);
}

// Function to add a new quote to the array and display it
function addQuote() {
  const quoteText = document.getElementById("quoteText").value;
  const quoteCategory = document.getElementById("quoteCategory").value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    alert("Quote added successfully!");
  } else {
    alert("Please fill in both fields.");
  }
}

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
  const quoteDisplay = document.createElement("div");
  quoteDisplay.id = "quoteDisplay";
  document.body.appendChild(quoteDisplay);

  const showQuoteButton = document.createElement("button");
  showQuoteButton.innerText = "Show Random Quote";
  showQuoteButton.onclick = showRandomQuote;
  document.body.appendChild(showQuoteButton);

  createAddQuoteForm();
});
