'use strict'



function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    const strHtmls = savedMemes.map((meme) => {
        const img = getImg(meme.selectedImgId)
        const { url, id } = img
        return `
    <article>
    <img src=${url} alt="meme-img"
    onclick="onSavedImgSelect('${meme.id}')" data-img-id="${id}" class="gallery-image">
    </article>
    `
    })
    document.querySelector('.memes').innerHTML = strHtmls.join('')
}

function onSavedImgSelect(memeId){
    const meme = getMemeById(memeId)
    setMeme(meme)
    onShowEditor()
    renderMeme()
}




