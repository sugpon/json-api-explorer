// Get references to HTML elements
const postList = document.getElementById("postList");
const postForm = document.getElementById("postForm");
const fetchButton = document.getElementById("fetchButton");

// Create and insert a loading message div (hidden by default)
const loadingMessage = document.createElement('div');
loadingMessage.textContent = "Loading...";
loadingMessage.style.display = 'none'; // Hide initially
postList.parentNode.insertBefore(loadingMessage, postList);

// Function to display posts on the page
function renderPosts(posts) {
  postList.innerHTML = ""; // Clear previous posts

  posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <hr/>
    `;
    postList.appendChild(postElement);
  });
}

// When the fetch button is clicked
fetchButton.addEventListener("click", () => {// Fetch posts from API
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then(response => response.json())// Convert response to JSON
    .then(data => renderPosts(data)) // Show posts on page
    .catch(error => alert("Error fetching posts: " + error.message)) // Show error
});

// When the form is submitted
postForm.addEventListener("submit", event => {
  event.preventDefault(); // Prevent page from reloading

  const title = document.getElementById("titleInput").value.trim();
  const body = document.getElementById("bodyInput").value.trim();

  // Send the post data using POST request
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body })
  })
    .then(response => response.json()) // Get the created post back
    .then(newPost => {
      alert("Post submitted!");
      renderPosts([newPost]); // Show only the new post
    })
    .catch(error => {
      alert("Error submitting post: " + error.message);
    });
});
