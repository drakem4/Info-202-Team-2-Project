const searchForm = document.getElementById("searchForm");
const pokemonName = document.getElementById("pokemonName");
const pokemonInfo = document.getElementById("pokemonInfo");
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = pokemonName.value.trim().toLowerCase();

    pokemonInfo.textContent = "You searched for: " + name;
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => {
    if (!response.ok) {
        throw new Error("Pokémon not found!");
    }

    return response.json();
})
    .then(data => {
        pokemonInfo.textContent = "";

    const heading = document.createElement("h2");
    heading.textContent = data.name;

    const image = document.createElement("img");
    image.src = data.sprites.front_default;
    image.alt = "Picture of " + data.name;

    const type = document.createElement("p");

    const types = data.types.map(item => item.type.name).join(", ");

type.textContent = "Type: " + types;

 pokemonInfo.append(heading, image, type);
})
.catch(error => {
    pokemonInfo.textContent = error.message;
});
});