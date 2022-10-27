'use strict'

var gElCanvas
var gCtx

var gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()

    addListeners()
    renderMeme()
}



function renderMeme() {
    const { lines, selectedImgId, selectedLineIdx } = getMeme()
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
        lines.forEach((line, idx) => drawText(line, idx))
        drawRect (lines[selectedLineIdx])
    }
}

function resizeCanvas() {
    // const elCanvasDiv = document.querySelector('.canvas-container')
    // gElCanvas.width = elCanvasDiv.offsetWidth 
    // gElCanvas.height = elCanvasDiv.offsetHeight
}

function drawImageFromLocal() {
}

function drawRect({pos, width, height}) {
    console.log(pos, width, height);
    gCtx.beginPath()
    gCtx.strokeStyle = '#ffffff80'
    gCtx.strokeRect(pos.x - 10, pos.y - height - 10, width + 20, height + 20)
    gCtx.stroke()
}

function drawText({ txt = document.querySelector('.img-editor input[type=text]').placeholder, size = 20, align = 'center', color = 'white', strokeColor = 'black', pos }, idx) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    // gCtx.font = `${size}px Impact`

    // let txtHeight = txtMetrics.fontBoundingBoxAscent + txtMetrics.fontBoundingBoxDescent;

    // if ((txtWidth + pos.x) >= gElCanvas.width && gElCanvas.width > 0) {
    //     size = 20
    //     resetTextSize(size)
    // }
    gCtx.font = `${size}px Impact`

    gCtx.fillText(txt, pos.x, pos.y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, pos.x, pos.y) // Draws (strokes) a given text at the given (x, y) position.

    let txtMetrics = gCtx.measureText(txt)
    let txtWidth = txtMetrics.width
    let txtHeight = txtMetrics.actualBoundingBoxAscent + txtMetrics.actualBoundingBoxDescent;
    console.log('curr Text Width:',txtWidth);
    setLineSizes(idx, txtWidth, txtHeight)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onMove(ev) {
    if (!isLineDragged()) return
    const pos = getEvPos(ev)
    console.log('moving text');
    const idx = getCurrLineIdx()
    //Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    //Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    //The canvas is render again after every move
    renderMeme()

    document.body.style.cursor = 'grabbing'
}

function onDown(ev) {
    if (!canvasClicked(ev)) return false
    const pos = getEvPos(ev)
    gStartPos = pos
    document.querySelector('input[type=text]').value = getSelectedLineTxt()

    renderMeme()
    document.body.style.cursor = 'grab'
}

function onUp() {
    if (isLineDragged()) leaveLine()
    document.body.style.cursor = 'auto'
}


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

function onRemoveLine() {
    removeLine()
    renderMeme()
    const txt = getSelectedLineTxt()
    document.querySelector('input[type=text]').value = txt
}

function onAddLine() {
    setCanvasHeight(gElCanvas.height)
    addLine()
    renderMeme()
    document.querySelector('input[type=text]').value = ''
}

function onGoToGallery() {
    onShowGallery()
    createMeme()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onSaveImg() {
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

function drawImage(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function getEvPos(ev) {

    //Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

