'use strict'


function renderGallery(){
    const imgs = getImgs()
    const strHtmls = imgs.map(({url,id})=>`
    <article>
    <img src=${url} alt="meme-img"
    onclick="onImgSelect(${id})" data-id="${id}" class="gallery-image">
    </article>
    `)


    document.querySelector('.img-gallery').innerHTML = strHtmls.join('')
}

function onImgSelect(imgId){
    setImg(imgId)
    renderMeme()
}