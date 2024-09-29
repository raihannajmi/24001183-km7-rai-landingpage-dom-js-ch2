/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * */

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Initialize app instance
const app = new App();

// Add event listener to load button
app.loadButton.addEventListener("click", () => {
  app.clear();
  app.loadFilter().then(app.run());
});

// Initialize app
app.init();
