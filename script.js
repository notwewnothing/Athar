const userCardtemplate = document.querySelector("[data-user-template]");
const userCardcontainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase(); // Convert input to lowercase for case-insensitive search
    users.forEach(user => {
        const userLowercase = user.name.toLowerCase(); // Convert user name to lowercase
        const isVisible = userLowercase.includes(value);
        user.element.style.display = isVisible ? "block" : "none"; // Set display style directly
    })
})

fetch("list.json")
.then(res => res.json())
.then(data => {
   users = data.map(user => {
        const card = userCardtemplate.content.cloneNode(true).children[0];
        const type = card.querySelector("[data-type]");
        const support = card.querySelector("[data-with]");
        const name = card.querySelector("[data-name]");
        const image = card.querySelector("img"); // Select the img element
        support.textContent = user.supports_israel
        name.textContent = user.name
        type.textContent = user.type
        image.src = user.logo; // Set the src attribute to the logo URL
        userCardcontainer.appendChild(card)
        return { name: user.name, element: card}
    })
})
