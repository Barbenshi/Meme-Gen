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
    toggleDisplay()
    resizeCanvas()
}

function toggleDisplay(){
    document.querySelector('.img-gallery').classList.toggle('hide')
    document.querySelector('.img-editor').classList.toggle('hide')
    document.querySelector('.main-footer').classList.toggle('hide')
    document.querySelector('button.flexible').classList.toggle('hide')
}

function onShowGallery(){
    document.querySelector('.img-gallery').classList.remove('hide')
    document.querySelector('.img-editor').classList.add('hide')
    document.querySelector('.main-footer').classList.remove('hide')
    document.querySelector('button.flexible').classList.remove('hide')
    elBtn
}

function onShowAbout(){
    document.querySelector('.main-footer').classList.remove('hide')
}

function onGenerateRandomMeme(elBtn){
    generateRandomMeme()
    renderMeme()
    toggleDisplay()
    elBtn.classList.add('hide')
}