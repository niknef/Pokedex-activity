//Seleccionamos la card 
const card = document.querySelector(".card");

//Funcion para obtener datos de un pokemon especifico mediante su id
function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res)=> res.json())
        .then((data) => {
           
            console.log(data);
        });
}

//Funcion para obtener varios pokemon a la vez.
function fetchPokemons() {
    for (let i = 1; i <= 100; i++) { 
        fetchPokemon(i);
    }
}

fetchPokemons();