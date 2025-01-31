// Initial Quotes Array
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    category: "Inspiration",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    category: "Leadership",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    category: "Hope",
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    category: "Motivation",
  },
  {
    text: "The best way to predict the future is to create it.",
    category: "Action",
  },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
let addQuoteForm; // To store the form element

function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

newQuoteButton.addEventListener("click", displayRandomQuote);

// Initial quote display on page load
displayRandomQuote();

function createAddQuoteForm() {
  addQuoteForm = document.createElement("div"); // Create the div

  addQuoteForm.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button>Add Quote</button>
    `;

  document.body.appendChild(addQuoteForm); // Add the form to the body

  // Event listener for the Add Quote button (inside the form)
  const addQuoteButton = addQuoteForm.querySelector("button");
  addQuoteButton.addEventListener("click", addQuote);
}

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory");

  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (text !== "" && category !== "") {
    const newQuote = { text: text, category: category };
    quotes.push(newQuote);

    newQuoteText.value = "";
    newQuoteCategory.value = "";

    displayRandomQuote(); // Optionally display the new quote
  } else {
    alert("Please enter both a quote and its category.");
  }
}

// Call createAddQuoteForm to add the form to the page:
createAddQuoteForm();
