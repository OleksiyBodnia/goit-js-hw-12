import { searchPixabay } from './js/pixabay-api.js';
import { renderPhotos } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const listOfPhotos = document.querySelector('.container ul');
const loader = document.querySelector('.loader');
const form = document.querySelector('.form');
const input = document.querySelector('input');

const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = "Load more";
loadMoreBtn.style.margin = "0 auto";
loadMoreBtn.style.marginTop = "15px";
loadMoreBtn.style.width = "150px";
loader.after(loadMoreBtn);
loadMoreBtn.style.display = 'none';

let inputValue = '';
let page = 1;
const perPage = 15;
let totalPages = 1;

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
            const response = await searchPixabay(inputValue, page, perPage);

            const totalHits = response.totalHits;
            totalPages = Math.ceil(totalHits / perPage);

            if (totalHits === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: "topRight",
                    icon: ""
                });
            } else {
                renderPhotos(response.hits, listOfPhotos);

                if (response.hits.length < perPage) {
                    loadMoreBtn.style.display = 'none';
                } else {
                    loadMoreBtn.style.display = 'block';
                }
            }

            loader.style.display = 'none';

        } catch (error) {
            loader.style.display = 'none';
            console.log(error);
        }
    }

    form.reset();
});

loadMoreBtn.addEventListener('click', async () => {
    loader.style.display = 'block';

    try {
        page++;
        const response = await searchPixabay(inputValue, page, perPage);
        loader.style.display = 'none';
        renderPhotos(response.hits, listOfPhotos);
        const cardHeight = listOfPhotos.firstElementChild.getBoundingClientRect().height;
        
        window.scrollBy({
            top: cardHeight * 3, 
            behavior: 'smooth'
        });

        const newTotalHits = response.totalHits;
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
