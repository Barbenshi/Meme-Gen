'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()

    addListeners()
}



function renderMeme() {
    const {lines,selectedImgId,selectedLineIdx} = getMeme()
    const line = lines[selectedLineIdx]
    const {url} = getImg(selectedImgId)

    const img = new Image()
    img.src = url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(line)
    }
}

function resizeCanvas() {
    const elCanvasDiv = document.querySelector('.canvas-container')
    gElCanvas.width = elCanvasDiv.offsetWidth
    gElCanvas.height = elCanvasDiv.offsetHeight
}

function drawImageFromLocal() {
}

function drawText({txt = document.querySelector('input').placeholder,size = 20, align = 'center',color = 'white'}) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    let y = 40

    const midTextLength = txt.length / 2
    // x -= text.length * 2

    //Todo align text
    let x = midTextLength *20
    switch(align){
        case 'left':
            x=10
            break
        case 'right':
            x=140
            break
        case 'center':
            x= 70
            break        
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


function onSetLineTxt(txt){
    setLineTxt(txt)
    renderMeme()
}

function onChangeColor(color){
    changeColor(color)
    renderMeme()
}

function onUpdateFontSize(num){
    updateFontSize(num)
    renderMeme()
}

function onSwitchLineFocus(){
    switchLineFocus()
    renderMeme()
}
