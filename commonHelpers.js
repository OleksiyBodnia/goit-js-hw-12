import{i as l,S as h}from"./assets/vendor-7659544d.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const u=document.querySelector(".photos"),p=r=>{r.forEach(e=>{const i=`<li class="photo">
            <a href="${e.largeImageURL}" data-lightbox="photos">
                <img src="${e.webformatURL}" alt="${e.tags}" title="${e.tags}" class="img">
            </a>
            <ul class="list">
                <li class="item"><h2>Likes <span>${e.likes}</span></h2></li>
                <li class="item"><h2>Views <span>${e.views}</span></h2></li>
                <li class="item"><h2>Comments <span>${e.comments}</span></h2></li>
                <li class="item"><h2>Downloads <span>${e.downloads}</span></h2></li>
            </ul>
        </li>`;u.insertAdjacentHTML("beforeend",i)}),new h(".photos a",{}).refresh()},a=document.querySelector(".loader"),c=document.querySelector(".form"),f=document.querySelector("input");c.addEventListener("submit",r=>{r.preventDefault();const s=f.value;s.trim()?(a.style.display="block",fetch(`https://pixabay.com/api/?key=42291336-b4c9ef387c9d7e209159058e7&q=${s}&image_type=photo&orientation=horizontal&safesearch=true`).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>{a.style.display="none",e.hits.length===0?l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",icon:""}):p(e.hits)}).catch(e=>{a.style.display="none",console.log(e)})):l.error({title:"Error",message:"Please enter a search term",position:"topRight"}),c.reset(),u.innerHTML=""});
//# sourceMappingURL=commonHelpers.js.map
