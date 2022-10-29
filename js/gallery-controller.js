'use strict'


function onGalleryInit(){
    getPaginationNumbers()
    handlePagination()
    renderGallery()
}

function renderGallery() {
    const imgs = getImgsForDisplay()
    const strHtmls = imgs.map(({ url, id }) => `
    <article>
    <img src=${url} alt="meme-img"
    onclick="onImgSelect(${id})" data-id="${id}" class="gallery-image">
    </article>
    `)


    document.querySelector('.img-gallery').innerHTML = strHtmls.join('')
}

function onImgSelect(imgId) {
    onEditorInit()
    gImg = null
    setImg(imgId)
    onShowEditor()
    renderMeme()
}

function onShowEditor() {
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.img-editor').classList.remove('hide')
    document.querySelector('.main-footer').classList.add('hide')
    document.querySelector('button.flexible').classList.add('hide')
    document.querySelector('.memes').classList.add('hide')
}

function onShowGallery() {
    document.querySelector('.gallery-container').classList.remove('hide')
    document.querySelector('.img-editor').classList.add('hide')
    document.querySelector('.main-footer').classList.remove('hide')
    document.querySelector('button.flexible').classList.remove('hide')
    document.querySelector('.memes').classList.add('hide')
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

function onShowMemes() {
    document.querySelector('.gallery-container').classList.add('hide')
    document.querySelector('.img-editor').classList.add('hide')
    document.querySelector('button.flexible').classList.add('hide')
    document.body.classList.remove('menu-open')
    document.querySelector('.memes').classList.remove('hide')
}

function onUpdatePage(num) {
    updatePage(num)
    handlePagination()
    renderGallery()
}

function appendPageNumber(index) {
    const pageNumber = document.createElement("button")
    pageNumber.className = "pagination-number"
    pageNumber.innerHTML = index
    pageNumber.setAttribute("page-index", index)
    pageNumber.setAttribute("aria-label", "Page " + index)
    pageNumber.addEventListener("click", onSetPage)
    document.querySelector('.pagination-numbers').appendChild(pageNumber)
}

function getPaginationNumbers() {
    for (let i = 1; i <= getPageCount(); i++) {
        appendPageNumber(i);
    }
}

function onSetPage() {
    const page = this.getAttribute('page-index')
    setPage(page)
    handlePagination()
    renderGallery()
}

function handlePagination(){
    // Handling next-prev btns
    const prevBtn = document.querySelector('.pagination .btn-prev')
    prevBtn.disabled = isFirstPage()

    const nextBtn = document.querySelector('.pagination .btn-next')
    nextBtn.disabled = isLastPage()

    //Handling active pages
    const elBtns = document.querySelectorAll('.pagination-number')
    elBtns.forEach(button => button.classList.remove('active'))
    const currPage = document.querySelector(`[page-index="${getCurrPage()}"]`)
    currPage.classList.add('active')
}
