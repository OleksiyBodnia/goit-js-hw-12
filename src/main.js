import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from 'axios';


const listOfPhotos = document.querySelector('.container ul');
const loader = document.querySelector('.loader');
const form = document.querySelector('.form');
const input = document.querySelector('input');

const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = "Load more"
loadMoreBtn.style.margin = "0 auto";
loadMoreBtn.style.marginTop = "15px";
loadMoreBtn.style.width = "150px";
loader.after(loadMoreBtn);
loadMoreBtn.style.display = 'none';

let inputValue = '';
let page = 1;
const perPage = 15;

const searchDefaultParam = {
    key: '42291336-b4c9ef387c9d7e209159058e7',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
}
axios.defaults.baseURL = 'https://pixabay.com/api/';

const getTotalHits = async () => {
    try{
        const response = await axios.get('?', {
            params: {
                q: inputValue,
                ...searchDefaultParam,
                page: 1,
                per_page: perPage,
            }
        });
        return response.data.totalHits;
    } catch (error){
        console.log(error);
        return 0;
    }
}

const totalHits = getTotalHits();
let totalPages = Math.ceil(totalHits/perPage);

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    page = 1;
    listOfPhotos.innerHTML = '';
    inputValue = input.value.trim();

    if (!inputValue){
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term',
            position: 'topRight'
        });
    } else {
        loader.style.display = 'block';
        loadMoreBtn.style.display = 'none';

        try {
            const response = await axios.get(`?`, {
                params: {
                    q: inputValue,
                    ...searchDefaultParam,
                    page: page,
                    per_page: perPage
                }
            })
            if (!response.data.hits || response.data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: "topRight",
                    icon: ""
                });
            } else {
                renderingPhotos(response.data.hits);
                loadMoreBtn.style.display = 'block';
            }

            loader.style.display = 'none';
        } catch (error) {
            loader.style.display = 'none';
            loadMoreBtn.style.display = 'none';
            console.log(error);
        }
    }

    form.reset();
});

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

loadMoreBtn.addEventListener('click', async (event) => {
    loader.style.display = 'block';

    try {
        page++;
        const response = await axios.get(`?`, {
            params: {
                q: inputValue,
                ...searchDefaultParam,
                page: page,
                per_page: perPage
            }
        });
        loader.style.display = 'none';
        renderingPhotos(response.data.hits);
        const cardHeight = listOfPhotos.firstElementChild.getBoundingClientRect().height;
        
        window.scrollBy({
            top: cardHeight * 3, 
            behavior: 'smooth'
        });

        const newTotalHits = response.data.totalHits;
        totalPages = Math.ceil(newTotalHits / perPage);

        if (page >= totalPages) {
            loadMoreBtn.style.display = 'none';
            iziToast.error({
                position: "topRight",
                message: "We're sorry, but you've reached the end of search results."
            });
        }
    } catch (error) {
        loader.style.display = 'none';
        console.log(error);
    }
});




