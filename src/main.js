import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const listOfPhotos = document.querySelector('.photos');
const renderingPhotos = data => {
    data.forEach(element => {

        const murkup = `<li class="photo">
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

        listOfPhotos.insertAdjacentHTML('beforeend', murkup);

    });

    const lightbox = new SimpleLightbox('.photos a', {});

    lightbox.refresh();
}

const loader = document.querySelector('.loader');
const form = document.querySelector('.form');
const input = document.querySelector('input');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputValue = input.value;

    if (!inputValue.trim()){
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term',
            position: 'topRight'
        });
    } else {
        loader.style.display = 'block';
        
        fetch(`https://pixabay.com/api/?key=42291336-b4c9ef387c9d7e209159058e7&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                loader.style.display = 'none';

                if (data.hits.length === 0){
                    iziToast.error({
                        message: 'Sorry, there are no images matching your search query. Please try again!',
                        position: "topRight",
                        icon: ""
                    });
                } else {
                    renderingPhotos(data.hits);
                }
            })
            .catch(error => {
                loader.style.display = 'none';
                console.log(error)
            });
        }

        form.reset();
        listOfPhotos.innerHTML = ''
});