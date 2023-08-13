import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedsListElement = document.querySelector('.breed-select');
const catInfoElement = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');

const errorMessage = 'Oops! Something went wrong! Try reloading the page!';

breedsListElement.addEventListener('change', onClickCatInfo);

fetchBreeds()
  .then(breeds => {
    renderBreedsList(breeds);
    breedsListElement.classList.remove('visually-hidden');
    loaderElement.classList.add('visually-hidden');
  })
  .catch(() => {
    loaderElement.classList.add('visually-hidden');
    Notify.failure(errorMessage);
  });

function renderBreedsList(breeds) {
  const markup = breeds
    .map(({ name, id }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join();

    breedsListElement.innerHTML = markup;
  new SlimSelect({
    select: breedsListElement,
  });
}

function onClickCatInfo(event) {
    catInfoElement.style.opacity = 0.3;
  loaderElement.classList.remove('visually-hidden');
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(breeds => {
        catInfoElement.style.opacity = 1;
      renderCardCat(breeds);
      loaderElement.classList.add('visually-hidden');
    })
    .catch(() => {
      loaderElement.classList.add('visually-hidden');
      Notify.failure(errorMessage);
    });
}

function renderCardCat(breeds) {
  const markup = breeds
    .map(
      ({
        url,
        breeds: [{ name, temperament, description, wikipedia_url }],
      }) => {
        return `
      <img class="cat-info-cat-img" src="${url}" alt="cat ${name}" width="500px>
      <div class="cat-info-box">
        <h2 class="cat-info-tittle">${name}</h2>
        <p class="cat-info-description">${description}</p>
        <p class="cat-info-temperament"><span class="cat-info-subtitle">Temperament:</span> ${temperament}</p>
        <p class="cat-info-subtitle">Wikipedia: <a href="${wikipedia_url}" target="blank">${wikipedia_url}</a></p>
      </div>`;
      }
    )
    .join();

    catInfoElement.innerHTML = markup;
}