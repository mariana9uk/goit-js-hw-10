import SlimSelect from 'slim-select';
import axios from "axios";
import Notiflix from 'notiflix'
axios.defaults.headers.common["x-api-key"] = "live_miOQ9IJmBTf4JhWdnWNTcaxj7nGrlgj5kYjUnmo8YzynBCK5HwOcOpOl4BaI5vhv";
import { fetchBreeds, fetchCatByBreed } from './cat-api';
const catInfoWrapEl = document.querySelector('.cat-info');
const selectorEl = document.querySelector('.breed-select');
const alertPopup = document.querySelector('.error')
let isAlertVisible = false
  fetchBreeds()
  .then(breedsData => {
console.log(breedsData);
const breedSelect = new SlimSelect({
  select: selectorEl,
  settings: {
      allowDeselect: true,
      placeholderText: 'Виберіть породу',
      showSearch: false,
      searchHighlight: true,
    },   
})
const selectData = breedsData.map(breed => ({
  text: breed.name,
  value: breed.id
}))
breedSelect.setData(selectData);
  })
  .catch(error => {
 console.log("Error!", error)
  });


  const handleCatInfoSubmit = (event) =>{
    event.preventDefault()
    const selectedBreedId = event.target.value;
    console.log(selectedBreedId)

   fetchCatByBreed(selectedBreedId)
         .then(data => {
          console.log(data)
          renderCatData(data)
  })
  .catch(error => {
       console.log("Woops!", error)
           Notiflix.Notify.failure('❌Помилка');
  });
};
function renderCatData(data){
  
  const markup = `
      <img src="${data[0].url}" alt="Cat Image">
    <p>Назва породи: ${data[0].breeds[0].name}</p>
    <p>Опис: ${data[0].breeds[0].description}</p>
    <p>Темперамент: ${data[0].breeds[0].temperament}</p>`
    catInfoWrapEl.insertAdjacentHTML("beforeend", markup);
}
  selectorEl.addEventListener('change', handleCatInfoSubmit)

  function toggleAlertPopup() {
    if (isAlertVisible) {
      return;
    }
    isAlertVisible = true;
    alertPopup.classList.add("is-visible");
    setTimeout(() => {
      alertPopup.classList.remove("is-visible");
      isAlertVisible = false;
    }, 3000)}


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
// }