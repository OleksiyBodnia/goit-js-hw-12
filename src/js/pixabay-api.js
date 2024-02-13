import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {renderingPhotos, listOfPhotos} from "./render-functions";

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

export default File;





