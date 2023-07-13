import SlimSelect from 'slim-select';
import axios from "axios";
import Notiflix from 'notiflix'
axios.defaults.headers.common["x-api-key"] = "live_miOQ9IJmBTf4JhWdnWNTcaxj7nGrlgj5kYjUnmo8YzynBCK5HwOcOpOl4BaI5vhv";
import { fetchBreeds, fetchCatByBreed } from './cat-api';
const catInfoWrapEl = document.querySelector('.cat-info');
const selectorEl = document.querySelector('.breed-select');
const errorEl = document.querySelector('.error')

  fetchBreeds()
  .then(data => {
console.log(data);
const breedSelect = new SlimSelect({
  select: selectorEl,
  settings: {
      allowDeselect: true,
      placeholderText: 'Виберіть породу',
      showSearch: false,
      searchHighlight: true,
    },   
})
const selectData = data.map(breed => ({
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
          if (data && data.length > 0){
       catInfoWrapEl.innerHTML = `
    <div>
      <img src="${data[0].url}" alt="Cat Image">
      <p>Назва породи: ${data[0].breeds[0].name}</p>
      <p>Опис: ${data[0].breeds[0].description}</p>
      <p>Темперамент: ${data[0].breeds[0].temperament}</p>
    </div>
  `;}
     else{
      console.log("No data")
     } // renderBreed(data)
  })
  .catch(error => {
    console.log("Woops!", error)
    Notiflix.Notify.failure('❌Помилка');
  });
};

  selectorEl.addEventListener('change', handleCatInfoSubmit)


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