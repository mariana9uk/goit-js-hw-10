import SlimSelect from 'slim-select';
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_miOQ9IJmBTf4JhWdnWNTcaxj7nGrlgj5kYjUnmo8YzynBCK5HwOcOpOl4BaI5vhv";
import { fetchBreeds } from './cat-api';

const catInfoEl = document.querySelector('.cat-info');
const selectorEl = document.querySelector('.breed-select');

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