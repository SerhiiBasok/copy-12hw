// main.js
import { giveImages } from './pixabay-api.js';
import { renderImages, updateLoadMoreButton } from './render-functions.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const loader = document.querySelector('.loader');
  let page = 1;
  let query = '';

  form.addEventListener('submit', onCreateFormSubmit);

  async function onCreateFormSubmit(event) {
    event.preventDefault();
    query = event.target.elements.query.value.trim();

    if (query === '') {
      return iziToast.error({
        message: 'Введіть вірне значення!',
        position: 'topRight',
      });
    }

    loader.style.display = 'inline-block';

    try {
      page = 1;
      const data = await giveImages(query, page);
      renderImages(data);
      updateLoadMoreButton(data.totalHits, page);
    } catch (error) {
      console.error('Error:', error);
      iziToast.error({
        message: 'No images found.',
        position: 'topRight',
      });
    } finally {
      loader.style.display = 'none';
    }

    event.target.reset();
  }
});
