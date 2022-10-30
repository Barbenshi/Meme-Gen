'use strict'



function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    if (!savedMemes) return
    const strHtmls = savedMemes.map((meme, idx) => {
        console.log(gSavedImgs[idx]);
        const { url, id } = gSavedImgs[idx]
        return `
    <article>
    <img src="${url}" alt="meme-img"    
    onclick="onSavedImgSelect('${meme.id}')" data-img-id="${id}" class="gallery-image">
    </article>
    `
    })
    document.querySelector('.memes').innerHTML = strHtmls.join('')
}

function onSavedImgSelect(memeId) {
    const meme = getMemeById(memeId)
    setMeme(meme)
    renderMeme()
    onShowEditor()
}




