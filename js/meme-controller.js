'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()

    addListeners()
    renderMeme()
}



function renderMeme() {
    const { lines, selectedImgId, selectedLineIdx } = getMeme()
    const line = lines[selectedLineIdx]
    const { url } = getImg(selectedImgId)

    const img = new Image()
    let imgAspect
    img.src = url
    img.onload = () => {
        imgAspect = img.naturalWidth / img.naturalHeight
        // gElCanvas.width =  300 * imgAspect
        const elCanvasDiv = document.querySelector('.canvas-container')
        gElCanvas.width = elCanvasDiv.offsetWidth
        // gElCanvas.width =  img.width
        // gElCanvas.height = img.naturalHeight * gElCanvas.width / img.naturalWidth
        gElCanvas.height = gElCanvas.width * (1 / imgAspect)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        // gCtx.drawImage(img, 0, 0, img.width, img.height)
        drawText(line)
    }
}

function resizeCanvas() {
    // const elCanvasDiv = document.querySelector('.canvas-container')
    // gElCanvas.width = elCanvasDiv.offsetWidth 
    // gElCanvas.height = elCanvasDiv.offsetHeight
}

function drawImageFromLocal() {
}

function drawText({ txt = document.querySelector('.img-editor input[type=text]').placeholder, size = 20, align = 'center', color = 'white', strokeColor = 'black' }) {
    gCtx.lineWidth = 2
    // while (txtWidth > gElCanvas.width){
    //     size = 
    // }
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    console.log(`strokeColor = `, strokeColor)
    console.log(`fillColor = `, color)
    let y = 50

    const midTextLength = txt.length / 2
    // x -= text.length * 2

    //Todo align text
    let x = midTextLength * 20
    switch (align) {
        case 'left':
            x = 10
            break
        case 'right':
            x = 140
            break
        case 'center':
            x = 70
            break
    }

    gCtx.font = `${size}px Impact`
    let txtWidth = gCtx.measureText(txt).width
    if ((txtWidth + x) >= gElCanvas.width && gElCanvas.width > 0) {
        size = 20
        resetTextSize(size)
    }
    gCtx.font = `${size}px Impact`

    gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function addListeners() {
    // addMouseListeners()
    // addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchend', onUp)
// }


function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onChangeColor(color) {
    changeColor(color)
    renderMeme()
}

function onUpdateFontSize(num) {
    updateFontSize(num)
    renderMeme()
}

function onSwitchLineFocus() {
    switchLineFocus()
    renderMeme()
    document.querySelector('input[type=text]').value = getSelectedLineTxt()
}

function onRemoveLine(){
    removeLine()
    renderMeme()
    const txt = getSelectedLineTxt()
    document.querySelector('input[type=text]').value = txt
}

function onAddLine(){
    addLine()
    renderMeme()
    document.querySelector('input[type=text]').value = ''
}

function onGoToGallery(){
    onShowGallery()
    createMeme()
}

function onDownloadImg(elLink){
        const imgContent = gElCanvas.toDataURL('image/jpeg')
        elLink.href = imgContent
}

function onSaveImg(){
    uploadImg()
}

function onImgInput(ev) {
    loadImageFromInput(ev, cb)
  }
  
  // CallBack func will run on success load of the img
  function loadImageFromInput(ev, drawImage) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
      let img = new Image() // Create a new html img element
      img.src = event.target.result // Set the img src to the img file we read
      // Run the callBack func, To render the img on the canvas
      img.onload = onImageReady.bind(null, img)
      // Can also do it this way:
      // img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
  }

  function drawImage(img){
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
  }
