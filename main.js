// Seleccionamos el contenedor HTML con la clase "cardContainer"
const cardContainer = document.querySelector(".row");

// Función para obtener datos de un Pokémon específico mediante su ID
function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data);
        });
}

// Función para obtener varios Pokémon a la vez
function fetchPokemons() {
    for (let i = 1; i <= 100; i++) { 
        fetchPokemon(i);
    }   
}

// Función para crear y mostrar un elemento visual para un Pokémon
function createPokemon(pokemon){
    // Creamos los elementos que van dentro de la tarjeta (card)
    const col = document.createElement('div');
    col.classList.add('col');

    const card = document.createElement('div');
    card.classList.add('card', 'h-100');
    
    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;
    sprite.classList.add('card-img-top');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const name = document.createElement('h5');
    name.classList.add('card-title', 'text-secondary');
    name.textContent = pokemon.name + ` #${pokemon.id}`; 

    const url = document.createElement('p');
    url.classList.add('card-text', 'text-secondary');
    url.textContent = pokemon.species.url;

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary'); 
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#pokemonModal');
    button.textContent = 'Stats';

    //agregamos los elementos que van dentro del body de nuestra tarjeta
    cardBody.appendChild(name);
    cardBody.appendChild(url);
    cardBody.appendChild(button);

    //agregamos el contenido a nustra tarjeta
    card.appendChild(sprite);
    card.appendChild(cardBody);

    //agregamos el contenido de la card al div col  
    col.appendChild(card);
    // Agregamos la tarjeta al contenedor
    cardContainer.appendChild(col);
};

//modal



// Llamamos a la función fetchPokemons para comenzar a obtener datos de Pokémon
fetchPokemons();