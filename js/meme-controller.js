'use strict'

var gElCanvas
var gCtx
var gImg

var gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onEditorInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    loadMemesFromLocalStorage()
    addListeners()
    renderMeme()
}

function renderMeme() {
    const { lines, selectedImgId, selectedLineIdx } = getMeme()
    const { url } = getImg(selectedImgId)

    const img = new Image()
    const currImg = gImg ? gImg : img
    img.src = url
    img.onload = () => { drawMeme(currImg, lines, selectedLineIdx) }

}

function drawMeme(img, lines, selectedLineIdx) {
    const elCanvasDiv = document.querySelector('.canvas-container')
    const imgAspect = img.naturalWidth / img.naturalHeight
    gElCanvas.width = elCanvasDiv.offsetWidth
    gElCanvas.height = gElCanvas.width * (1 / imgAspect)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    lines.forEach((line, idx) => drawText(line, idx))
    if (isLineFocused()) drawRect(lines[selectedLineIdx])
}

function drawRect({ pos, width, height }) {
    gCtx.beginPath()
    gCtx.strokeStyle = '#ffffff80'
    gCtx.strokeRect(pos.x - 10, pos.y - height - 10, width + 20, height + 20)
    gCtx.stroke()
}

function drawText({ txt = document.querySelector('.img-editor input[type=text]').placeholder, size = 20, color = 'white', strokeColor = 'black', pos, font }, idx) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`

    gCtx.fillText(txt, pos.x, pos.y)
    gCtx.strokeText(txt, pos.x, pos.y)

    let txtMetrics = gCtx.measureText(txt)
    let txtWidth = txtMetrics.width
    let txtHeight = txtMetrics.actualBoundingBoxAscent + txtMetrics.actualBoundingBoxDescent;
    setLineSizes(idx, txtWidth, txtHeight)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', renderMeme)

    //Listen for writing on canvas
    window.addEventListener('keydown', handleKeyDown)
}

function handleKeyDown(ev) {
    // ev.preventDefault()
    if (!isLineFocused()) return
    let keynum
    keynum = ev.key
    if (keynum === ' ') ev.preventDefault()
    if (keynum.length === 1) addCharToCurrentLine(keynum)
    else if (keynum === 'Backspace') removeLastChar()
    else return
    setInputText()
    renderMeme()
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
    const pos = getEvPos(ev)
    canvasClicked(pos)
    gStartPos = pos
    document.querySelector('input[type=text]').value = getSelectedLineTxt()

    renderMeme()
    document.body.style.cursor = isLineFocused() ? 'grab' : 'auto'
}

function onUp() {
    if (!isLineDragged()) return
    leaveLine()
    document.body.style.cursor = 'grab'
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
    setInputText()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
    setInputText()
}

function onAddLine(txt) {
    setCanvasHeight(gElCanvas.height)
    addLine(txt)
    renderMeme()
    setInputText()
}

function onAlignText(num) {
    alignText(num, gElCanvas.width)
    renderMeme()
}

function onGoToGallery() {
    onShowGallery()
    // createMeme()
    // setInputText()
}

function setDefaultProps(imgId) {
    createMeme(imgId)
    setInputText()
    resetShareButton()
}

function resetShareButton() {
    const elShareContainer = document.querySelector('.share-container')
    const str = `<a class="btn" title="Upload to cloud and share" onclick="onSaveImg(this)"><i
    class="fa fa-cloud" aria-hidden="true"></i></a>`
    elShareContainer.innerHTML = str
    document.querySelector('.user-msg').innerHTML = ''
}

function setInputText() {
    document.querySelector('input[type=text]').value = getSelectedLineTxt()
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onSaveImg() {
    uploadImg()
    const imgData = gElCanvas.toDataURL('image/jpeg')
    saveMeme(imgData)
    removeFocus()
    renderMeme()
    renderSavedMemes()
}

function onImgInput(ev, elInput) {
    setDefaultProps()
    onEditorInit()

    loadImageFromInput(ev, setLocalImg)
    elInput.value = ''
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
        // Can also do it this way:
        // img.onload = () => onImageReady(img)
        onShowEditor()

    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function setLocalImg(img) {
    gImg = img
    renderMeme()
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

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function onShowGallery() {
    document.querySelector('.gallery-container').classList.remove('hide')
    document.querySelector('.gallery-link').classList.add('active')
    document.querySelector('.img-editor').classList.add('hide')
    document.querySelector('.main-footer').classList.remove('hide')
    document.querySelector('button.flexible').classList.remove('hide')
    document.querySelector('.memes').classList.add('hide')
    document.querySelector('.memes-link').classList.remove('active')
    document.querySelector('.secondary-header').classList.remove('hide')
    document.body.classList.remove('menu-open')
}