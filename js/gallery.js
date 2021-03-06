import galleryItem from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalClose: document.querySelector('[data-action="close-lightbox"]'),
};

const addGalleryMarkup = createGalleryMarkup(galleryItem);

refs.gallery.insertAdjacentHTML('beforeend', addGalleryMarkup);
refs.gallery.addEventListener('click', onOpenModal);

function createGalleryMarkup(array) {
  return array
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
          <a
            class="gallery__link"
            href="${original}"
          >
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>`,
    )
    .join('');
}

function onOpenModal(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  openModal();

  const currentPicture = {
    image: refs.modal.querySelector('.lightbox__image'),
    src: e.target.closest('.gallery__link'),
    alt: e.target.alt,
  };

  addImgModal(currentPicture);

  refs.modal.addEventListener('click', onCloseModal.bind(currentPicture));
  document.addEventListener('keydown', onCloseModal.bind(currentPicture));
}

function openModal() {
  refs.modal.classList.add('is-open');
}

function addImgModal(object) {
  object.image.src = `${object.src.href}`;
  object.image.alt = `${object.alt}`;
}

function onCloseModal(e) {
  if (
    !e.target.classList.contains('lightbox__overlay') &&
    e.target.dataset.action !== 'close-lightbox' &&
    e.key !== 'Escape'
  ) {
    return;
  }

  refs.modal.classList.remove('is-open');
  this.image.src = '';
  this.image.alt = '';
  refs.modal.removeEventListener('click', onCloseModal);
}
