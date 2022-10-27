'use strict'


function renderGallery() {
    const imgs = getImgs()
    const strHtmls = imgs.map(({ url, id }) => `
    <article>
    <img src=${url} alt="meme-img"
    onclick="onImgSelect(${id})" data-id="${id}" class="gallery-image">
    </article>
    `)


    document.querySelector('.img-gallery').innerHTML = strHtmls.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
    onShowEditor()
}

function onShowEditor() {
    document.querySelector('.img-gallery').classList.add('hide')
    document.querySelector('.img-editor').classList.remove('hide')
    document.querySelector('.main-footer').classList.add('hide')
    document.querySelector('button.flexible').classList.add('hide')
}

function onShowGallery() {
    document.querySelector('.img-gallery').classList.remove('hide')
    document.querySelector('.img-editor').classList.add('hide')
    document.querySelector('.main-footer').classList.remove('hide')
    document.querySelector('button.flexible').classList.remove('hide')
    document.body.classList.remove('menu-open')
}

function onShowAbout() {
    document.querySelector('.main-footer').classList.remove('hide')
    document.body.classList.remove('menu-open')
}

function onGenerateRandomMeme(elBtn) {
    generateRandomMeme()
    renderMeme()
    onShowEditor()
    elBtn.classList.add('hide')
}