
const fetchBreeds = () =>
    fetch("https://api.thecatapi.com/v1/breeds")
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  export {fetchBreeds};