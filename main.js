// Seleccionamos el contenedor HTML con la clase "cardContainer"

const cardContainer = document.querySelector('.row');
const modal = document.querySelector('#pokemonModal');

// Función para obtener datos de un Pokémon específico mediante su ID

function fetchPokemon(id) {
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
function createPokemon(pokemon) {
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

    // Asocia los datos del Pokémon con el botón
    button.setAttribute('data-pokemon', JSON.stringify(pokemon));

    // Agrega un controlador de eventos al botón "Stats"
    button.addEventListener('click', (event) => {
        const pokemonData = JSON.parse(event.currentTarget.getAttribute('data-pokemon'));
        renderModal(pokemonData);
    });

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
}


function progressBars(stats) {
    // ... Crea y estructura barras de progreso para las estadísticas del Pokémon ...
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");
  
    for (let i = 0; i < 3; i++) {
      const stat = stats[i];
  
      const statPercent = stat.base_stat / 2 + "%";
      const statContainer = document.createElement("stat-container");
      statContainer.classList.add("stat-container");
  
      const statName = document.createElement("p");
      statName.textContent = stat.stat.name;
  
      const progress = document.createElement("div");
      progress.classList.add("progress");
  
      const progressBar = document.createElement("div");
      progressBar.classList.add("progress-bar");
      progressBar.setAttribute("aria-valuenow", stat.base_stat);
      progressBar.setAttribute("aria-valuemin", 0);
      progressBar.setAttribute("aria-valuemax", 200);
      progressBar.style.width = statPercent;
  
      progressBar.textContent = stat.base_stat;
  
      progress.appendChild(progressBar);
      statContainer.appendChild(statName);
      statContainer.appendChild(progress);
  
      statsContainer.appendChild(statContainer);
    }
  
    return statsContainer;
  };

  
  //modal
  const renderModal = (pokemon) => {
    const name = modal.querySelector('.modal-title');
    name.innerHTML = pokemon.name;
    const stats = modal.querySelector('.modal-body');
    stats.innerHTML = "";
    stats.appendChild(progressBars(pokemon.stats));
}

// Llamamos a la función fetchPokemons para comenzar a obtener datos de Pokémon
fetchPokemons();
