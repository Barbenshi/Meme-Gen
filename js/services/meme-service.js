'use strict'

const WORDS = ['baby', 'devil', 'Bibi', 'Tibi', 'steal', 'run', 'court', 'magnificent', 'jungle', 'god',
    'fear', 'love', 'hate', 'happiness', 'world']

var gKeywordSearchCountMap = {
    'funny': 12,
    'cat': 16,
    'baby': 2
}

var gSavedMemes = []
const STORAGE_KEY = 'savedMemes'

var gCanvasHeight

var gMeme
createMeme()

function getMeme() {
    return gMeme
}

function getImg(imgId) {
    return gImgs.find(({ id }) => id === imgId) || gSavedImgs.find(({ id }) => id === imgId)
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function changeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function updateFontSize(num) {
    gMeme.lines[gMeme.selectedLineIdx].size += num
}

function switchLineFocus() {
    gMeme.selectedLineIdx = gMeme.lines.length - 1 === gMeme.selectedLineIdx ? 0 : gMeme.selectedLineIdx + 1
    gMeme.lines[gMeme.selectedLineIdx].isFocused = true
}

function generateRandomMeme() {
    const randomImgId = gImgs[getRandomIntInclusive(0, gImgs.length - 1)].id
    gMeme.selectedImgId = randomImgId
    gMeme.lines.forEach(line => {
        let i = 0
        line.color = getRandomColor()
        line.strokeColor = getRandomColor()
        line.size = getRandomIntInclusive(5, 40)
        line.txt = ''
        while (i < 5) {
            line.txt += WORDS[getRandomIntInclusive(0, 14)] + ' '
            i++
        }
        line.txt = line.txt.charAt(0).toUpperCase() + line.txt.substring(1)
        // line.txt = WORDS.reduce((acc,word)=> acc + WORDS[getRandomIntInclusive(0,14)] + ' ' ,'')
        // line.txt = line.txt.charAt(0).toUpperCase() + line.txt.substring(1)
        // //TODO change substring to 1 if I want all 15 letters, too much space
    })
    console.log(gMeme);
}

function resetTextSize(size) {
    gMeme.lines[gMeme.selectedLineIdx].size = size
}

function removeLine() {
    if (gMeme.lines.length === 1) {
        createMeme(gMeme.selectedImgId)
        return
    }
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.selectedLineIdx > 0) gMeme.selectedLineIdx--

}

function addLine(txt) {
    const heightSpace = 50
    const line = {
        txt,
        size: 30,
        align: 'left',
        isDragged: false,
        pos: { x: 20, y: heightSpace },
        width: 300,
        height: 30,
        isFocused: false,
    }

    if (gMeme.lines.length >= 2) {
        line.pos.y = heightSpace * gMeme.lines.length
        line.size = 20
    } else if (gMeme.lines.length === 1) {
        line.pos.y = gCanvasHeight - heightSpace
    }

    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function createMeme(imgId = 1) {
    gMeme = {
        id: makeId(),
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: []
    }
    addLine()
}

function getSelectedLineTxt() {
    return gMeme.lines[gMeme.selectedLineIdx].txt || ''
}

function canvasClicked({ x: clickX, y: clickY }) {
    const clickedLineIdx = gMeme.lines.findIndex(({ pos, width, height }) => {
        // Check if the click coordinates are inside the line coordinates
        return clickX > pos.x && clickX < pos.x + width &&
            clickY < pos.y && clickY > pos.y - height
    })

    if (clickedLineIdx === -1) return gMeme.lines[gMeme.selectedLineIdx].isFocused = false
    gMeme.selectedLineIdx = clickedLineIdx
    gMeme.lines[gMeme.selectedLineIdx].isFocused = true
    if (gMeme.lines[gMeme.selectedLineIdx].isFocused) gMeme.lines[gMeme.selectedLineIdx].isDragged = true
    console.log(`focusssss = `, gMeme.lines[gMeme.selectedLineIdx].isFocused)
    gMeme.lines[gMeme.selectedLineIdx].isFocused
    console.log('im clicked');
}

function isLineDragged() {
    return gMeme.lines[gMeme.selectedLineIdx].isDragged
}

function isLineFocused() {
    return gMeme.lines[gMeme.selectedLineIdx].isFocused
}

function leaveLine() {
    gMeme.lines[gMeme.selectedLineIdx].isDragged = false
}

function getCurrLineIdx() {
    return gMeme.selectedLineIdx
}


function setLineSizes(idx, width, height) {
    gMeme.lines[idx].width = width
    gMeme.lines[idx].height = height
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function setCanvasHeight(height = gCanvasHeight) {
    gCanvasHeight = height
}

function alignText(num, canvasWidth) {
    if (num === 1) gMeme.lines[gMeme.selectedLineIdx].pos.x = 20
    else if (num === -1) gMeme.lines[gMeme.selectedLineIdx].pos.x = canvasWidth - gMeme.lines[gMeme.selectedLineIdx].width - 20
    else gMeme.lines[gMeme.selectedLineIdx].pos.x = canvasWidth / 2 - gMeme.lines[gMeme.selectedLineIdx].width / 2
}

function saveMeme(url) {
    const imgId = createSavedImg(url)
    gMeme.selectedImgId = imgId
    gSavedMemes.push(gMeme)
    _saveMemesToLocalStorage()
}


function _saveMemesToLocalStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}


function loadMemesFromLocalStorage() {
    gSavedMemes = loadFromStorage(STORAGE_KEY) || []
}

function getSavedMemes() {
    return gSavedMemes
}

function getMemeById(memeId) {
    return gSavedMemes.find(({ id }) => id === memeId)
}

function setMeme(meme) {
    gMeme = meme
}
