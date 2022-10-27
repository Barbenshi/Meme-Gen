'use strict'

const WORDS = ['baby', 'devil', 'Bibi', 'Tibi', 'steal', 'run', 'court', 'magnificent', 'jungle', 'god',
    'fear', 'love', 'hate', 'happiness', 'world']

var gKeywordSearchCountMap = {
    'funny': 12,
    'cat': 16,
    'baby': 2
}

var gMeme
createMeme()

function getMeme() {
    return gMeme
}

function getImg(imgId) {
    return gImgs.find(({ id }) => id === imgId)
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
    if(gMeme.lines.length === 1){
        createMeme(gMeme.selectedImgId)
        return
    }
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if(gMeme.selectedLineIdx > 0) gMeme.selectedLineIdx--
    
}

function addLine(size = 20,txt) {
    const line = {
        txt ,
        size,
        align: 'left',
    }

    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length-1
}

function createMeme(imgId=1){
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: []
    }
    addLine(30)
}

function getSelectedLineTxt(){
    return gMeme.lines[gMeme.selectedLineIdx].txt || ''
}
