let content = document.querySelector("#content");
let accessKey = "xJdNLhtsPLzJsxpAySvrfGcUoUeF23yJyvuhbgdBMeQ";
let page = 1;
let perPage = 16;
let currentQuery = ""; // Store the current search query

const getData = () => {
  const inputText = document.querySelector("#messageInput").value;
  // Clear previous results only if the new input is different
  if (inputText !== currentQuery) {
    content.innerHTML = "";
    page = 1; // Reset page for new search
  }
  currentQuery = inputText; // Update currentQuery
  axios.get(`https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${currentQuery}&client_id=${accessKey}`)
    .then((res) => {
      console.log("res--->", res.data.results);
      const results = res.data.results;
      for (let i = 0; i < results.length; i++) {
        content.innerHTML += `
          <div class="col- col-sm-6 col-md-4 col-lg-3 mb-3">
            <img src="${results[i].urls.regular}" class="card-img-top" width="300px" height="200px"
              alt="Loading...">
          </div>
        `
      }
      loadMore.style.display = results.length === perPage ? "block" : "none";
    })
    .catch((rej) => {
      console.log("rej--->", rej);
      alert("Please try again.");
    })
}

sendButton.addEventListener('click', getData);

loadMore.addEventListener('click', () => {
  page++;
  getData();
})
