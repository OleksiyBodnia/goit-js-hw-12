import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const renderPhotos = (data, listOfPhotos) => {
    data.forEach(element => {

        const markup = `<li class="photo">
            <a href="${element.largeImageURL}" data-lightbox="photos">
                <img src="${element.webformatURL}" alt="${element.tags}" title="${element.tags}" class="img">
            </a>
            <ul class="list">
                <li class="item"><h2>Likes <span>${element.likes}</span></h2></li>
                <li class="item"><h2>Views <span>${element.views}</span></h2></li>
                <li class="item"><h2>Comments <span>${element.comments}</span></h2></li>
                <li class="item"><h2>Downloads <span>${element.downloads}</span></h2></li>
            </ul>
        </li>`;

        listOfPhotos.insertAdjacentHTML('beforeend', markup);

    });

    const lightbox = new SimpleLightbox('.photos a', {});

    lightbox.refresh();
}

