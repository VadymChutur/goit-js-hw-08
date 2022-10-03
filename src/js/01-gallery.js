// Add imports above this line
import galleryCArdTpl from '../templates/01-gallery.hbs';
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const imagTumbInGalery = document.querySelector('.gallery');

imagTumbInGalery.innerHTML = createGalleryItemsMarkup(galleryItems);

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

function createGalleryItemsMarkup(galleryItems) {
  return galleryCArdTpl(galleryItems);
}
