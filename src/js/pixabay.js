// pixabay-api.js
export async function giveImages(nameImage, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '?key=42272316-28c697ce0580eb37211383c7d';
  const Q = `&q=${nameImage}`;
  const IMAGE_TYPE = '&image_type=photo';
  const ORIENTATION = '&orientation=horizontal';
  const SAFESEARCH = '&safesearch=true';
  const PER_PAGE = '&per_page=15';
  const PAGE = `&page=${page}`;
  const url =
    BASE_URL +
    KEY +
    Q +
    IMAGE_TYPE +
    ORIENTATION +
    SAFESEARCH +
    PER_PAGE +
    PAGE;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();

    if (data && data.hits && data.hits.length > 0) {
      return data;
    } else {
      throw new Error('No images found.');
    }
  } catch (error) {
    throw error;
  }
}

// Додайте інші функції, які вам потрібні для роботи з HTTP-запитами
