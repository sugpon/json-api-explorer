
const postList = document.getElementById("postList");
const postForm = document.getElementById("postForm");
const fetchButton= document.getElementById("fetchButton");
const loadingMessage = document.getElementById('loadingMessage');

loadingMessage.style.display = 'none'; //hide loading screen

const renderPosts = (posts) => { //render data to postlist div
    postList.innerHTML="";
    posts.forEach((post) =>{
        const postElement = document.createElement("div");
        postElement.innerHTML= `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr/>
        `;
        postList.appendChild(postElement); //add postelement divs to postlist ddv
    })
}

    postForm.addEventListener("submit", (event) => {
        event.preventDefault(); //default action should not happen

        const title = document.getElementById("titleInput").value;
        const body = document.getElementById("bodyInput").value;

        fetch("https://jsonplaceholder.typicode.com/posts", { //send post form data in a post request
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ title, body })
        })
        .then(function(response){  //get response and set it to json
            const jsonResponse = response.json();
            return jsonResponse; 
        })
        .then((newPost) => {
            alert("Post submitted!");
            renderPosts([newPost]); //re-render with only new post
        })
        .catch((error) => console.error("Error submitting post:",error));// catch error if fetch fails
        });

fetchButton.addEventListener("click", ()=>{
    loadingMessage.style.display = 'block'; //show loading
    
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        .then(function(response){  //get response and set it to json format
            const jsonResponse = response.json();
            return jsonResponse; //must return
        })
        .then(function(data) { //redner json data to div postList
            renderPosts(data);
        })
        .catch((error) => console.error("Error fetching posts:", error)) // catch error if fetch fails
        .finally(()=>{
            loadingMessage.style.display = 'none'; //hide loading screen
        });
    
});
    