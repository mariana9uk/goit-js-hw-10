const API_KEY = 'live_miOQ9IJmBTf4JhWdnWNTcaxj7nGrlgj5kYjUnmo8YzynBCK5HwOcOpOl4BaI5vhv'
 function fetchBreeds(){
  return fetch("https://api.thecatapi.com/v1/breeds")
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })}
  // const breedId = data.map(breed=>breed.id);
const fetchCatByBreed = (selectedBreedId) =>

fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`, {headers: {
  'x-api-key': API_KEY
}})
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })


  export {fetchBreeds, fetchCatByBreed}