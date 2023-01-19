'use strict';


// // шукаю елементи
const galleryCardList = document.querySelector('gallery__card-list');



// // створюю рзмітку карток фільмів для галереї (приймає results: відповідь сервера > response.data.results)
createGallery = (results)=>{

    return results.map( el => {
        const {id, poster_path, title, genre_ids, release_date} = el;
        // console.log( id, poster_path, title, genre_ids, release_date );
        return `
            <li class="card-list__item">
                <img class="card-list__img" data-id="${id}" src=" ${poster_path} " alt=" ${title} ">
                <h3 class="card-list__info card-list__title">${title}</h1>
                <p class="card-list__info card-list__text">${genre_ids} |  ${release_date} </p>
            </li>`
    } ).join('')
}



// // встановлюю axios https://axios-http.com/uk/docs/intro
// // $ npm install axios
// // рефакторю >> const axios = require('axios').default; << в:
import axios from 'axios';

// Запрос для отримання списку найпопулярніших фільмів на сьогодні
// https://api.themoviedb.org/3/trending/movie/day?api_key=a95ff59f8d48ac961c2785119723c43c

const BASE_URL = 'https://api.themoviedb.org/';
const API_KEY = 'a95ff59f8d48ac961c2785119723c43c';

const request = () =>{
  return axios.get(`${BASE_URL}3/trending/movie/day`, {
    params: {
      api_key: API_KEY,
    }
  })
}



// // активую запит на сервер >> формую html картки фільмів >> записую в галерею
request()
.then( response => {
    const movies = response.data.results;
    // console.log( movies );

    galleryCardList.innerHTML = createGallery(movies)
})


// // НЕОБХІДНО ЗРОБИТИ:
// // отримати з сервера масив індексів жанрів * записати їх в локальне сховищє * підставити в картку фільму