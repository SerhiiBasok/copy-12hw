// render-functions.js
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImages(data) {
  const gallery = document.querySelector('.gallery');
  const markup = data.hits.map(templateImage).join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  const galleryLinks = document.querySelectorAll('.gallery-link');
  galleryLinks.forEach(link => {
    link.setAttribute('href', link.querySelector('img').getAttribute('src'));
  });

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  lightbox.refresh();
}

export function templateImage({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
      <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
    </a>
    <div class="item-text">
      <ul>Likes<li>${likes}</li></ul>
      <ul>Views<li>${views}</li></ul>
      <ul>Comments<li>${comments}</li></ul>
      <ul>Downloads<li>${downloads}</li></ul>
    </div>
  </li>`;
}

export function updateLoadMoreButton(totalHits, currentPage) {
  const loadMoreBtn = document.querySelector('.button-2');
  const endMessage = document.querySelector('.end-message');
  const maxPage = Math.ceil(totalHits / 15);

  if (currentPage >= maxPage) {
    loadMoreBtn.classList.add('hidden');
    endMessage.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.remove('hidden');
    endMessage.classList.add('hidden');
  }
}
