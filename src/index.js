import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css'
import axios from "axios";
import Notiflix from 'notiflix'
axios.defaults.headers.common["x-api-key"] = "live_miOQ9IJmBTf4JhWdnWNTcaxj7nGrlgj5kYjUnmo8YzynBCK5HwOcOpOl4BaI5vhv";
import { fetchBreeds, fetchCatByBreed } from './cat-api';
const catInfoWrapEl = document.querySelector('.cat-info');
const selectorEl = document.querySelector('.breed-select');
const alert = document.querySelector('.error');
const loaderEl = document.querySelector(".loader")


let isLoaderActive = false;
toggleLoader()
  fetchBreeds()
  .then(breedsData => {
console.log(breedsData);
  const options = breedsData.map(breed => `<option value="${breed.id}">${breed.name}</option>`)
  .join("");
  selectorEl.innerHTML = options;
  
  new SlimSelect({
    select: selectorEl,
    settings: {
      allowDeselect: true,
      placeholderText: 'Виберіть породу',
      showSearch: false,
      searchHighlight: false,
    
    },
  
  });
})
  .catch(error => {
 console.log("Error!", error)
 catInfoWrapEl.classList.remove("is-hidden");
 Notiflix.Loading.remove()
  });

  const handleCatInfoSubmit = (event) =>{
    event.preventDefault()
    isLoaderActive=true;
   
    const selectedBreedId = event.target.value;
    console.log(selectedBreedId)

    toggleLoader()
    setTimeout(() => {
      
   fetchCatByBreed(selectedBreedId)
         .then(data => {
          console.log(data)
          renderCatData(data)
  })
  .catch(error => {
       console.log("Woops!", error)
           Notiflix.Notify.failure('❌Помилка');
alert.classList.remove("is-hidden")
  })
  .finally(() => {
    isLoaderActive = false;
toggleLoader()
  });
}, 5000)};
function renderCatData(data){
  
  const markup = `
    <div class="cat-info-css-settings">  <img src="${data[0].url}" class="cat-image" alt="Cat Image">
    <h1>Breed name: ${data[0].breeds[0].name}</h1>
    <p>Breed description: ${data[0].breeds[0].description}</p>
    <p>Temperament: ${data[0].breeds[0].temperament}</p></div>`
    catInfoWrapEl.innerHTML =  markup;
}
selectorEl.addEventListener('change', handleCatInfoSubmit)


  function toggleLoader() {
    if (isLoaderActive) {
      
      selectorEl.classList.add("is-hidden")
      loaderEl.classList.remove("is-hidden");
      catInfoWrapEl.classList.add("is-hidden");
      Notiflix.Loading.dots()
    } else {
      selectorEl.classList.remove("is-hidden");
      loaderEl.classList.add("is-hidden");
           catInfoWrapEl.classList.remove("is-hidden");
           Notiflix.Loading.remove()
    }
  }
  // function toggleLoader() {
  //   if (isLoaderActive = true) {
  //     selectorEl.classList.add("is-hidden")
  //     loaderEl.classList.remove("is-hidden")
        
  //     setTimeout(() => {
  //     loaderEl.classList.add("is-hidden")
  //     selectorEl.classList.remove("is-hidden")
  //     isLoaderActive = false;
  //   }, 5000) }
  //  if(isLoaderActive=false)
  //   { loaderEl.classList.add("is-hidden")
  //   selectorEl.classList.remove("is-hidden")}
  // }


  // fetch("https://api.thecatapi.com/v1/breeds")
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return response.json();
  // })
 
//   function renderBreedName(){
//     const markup = breeds
//     .map((breed) => {
//       return 
//           <p>${breed.name}</p>
//           });
//   userList.innerHTML = markup;
// }// const breedSelect = new SlimSelect({
//   select: selectorEl,
//   settings: {
//       allowDeselect: true,
//       placeholderText: 'Виберіть породу',
//       showSearch: false,
//       searchHighlight: true,
//     },   
// })