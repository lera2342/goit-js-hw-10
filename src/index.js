import { fetchBreeds, fetchCatByBreed } from './cat-api';
import 'slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', () => {

  const selectedBreedId = breedSelect.value;
  
  let isLoading = false;
  
  if (selectedBreedId) {
    showLoader();
  
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        updateCatInfo(catData);
        hideLoader();
      })
      .catch(error => {
        console.error('Error fetching cat:', error);
          alert('Error',
          'Oops! Something went wrong! Try reloading the page!',
          )
      });
  }
});


fetchBreeds()
  .then(breeds => {
    breedsSelect(breeds);
    hideLoader();
  })
  .catch(error => {
        console.error('Error fetching cat:', error);
          alert('Error',
          'Oops! Something went wrong! Try reloading the page!',
          )
      });


showLoader();

function hideLoader() {
  breedSelect.style.display = 'block';
  loader.style.display = 'none';
  isLoading = false;
}

error.style.display = 'none';

function showLoader() {
  loader.style.display = 'block';
  error.style.display = 'none';
  catInfo.style.display = 'none';
  breedSelect.style.display = 'none';
  isLoading = true;
}

function breedsSelect(breeds) {
  const elements = breeds.map(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    return option;
  });
  breedSelect.append(...elements);
}

function imageElement(src) {
  const image = document.createElement('img');
  image.src = src;
  image.alt = 'Cat';
  image.classList.add('cat-image');
  return image;
}

function paragraphElement(text) {
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  return paragraph;
}

function updateCatInfo(catData) {
  catInfo.innerHTML = '';
  const catImage = imageElement(catData.url);
  const catName = paragraphElement(catData.breeds[0].name);
  catName.classList.add('breed-name');

  const catDescription = paragraphElement(catData.breeds[0].description);
  const catTemperament = paragraphElement(
    'Temperament: ' + catData.breeds[0].temperament
  );
  const informContainer = document.createElement('div');
  informContainer.append(catName, catDescription, catTemperament);
  informContainer.classList.add('inform-container');

  catDescription.classList.add('description');
  catTemperament.classList.add('temperament');

  catInfo.appendChild(catImage);
  catInfo.appendChild(informContainer);


  catInfo.style.display = 'flex';
}


