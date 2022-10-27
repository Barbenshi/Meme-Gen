'use strict'

const WORDS = ['baby','devil','Bibi','Tibi','steal','run','court','magnificent','jungle','god',
'fear','love','hate','happiness','world']

var gKeywordSearchCountMap = {
    'funny': 12,
    'cat': 16,
    'baby': 2
}



var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            align: 'left',
            color: 'white'
        },

        {
            txt: 'I sometimes eat Shnitzel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

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
    gMeme.selectedLineIdx = gMeme.lines.length-1 === gMeme.selectedLineIdx ? 0 : gMeme.selectedLineIdx + 1
}

function generateRandomMeme(){
    const randomImgId = gImgs[getRandomIntInclusive(0,gImgs.length-1)].id
    gMeme.selectedImgId = randomImgId
    gMeme.lines.forEach(line=>{
        line.color = getRandomColor()
        line.strokeColor = getRandomColor()
        line.size = getRandomIntInclusive(5,40)
        line.txt = WORDS.reduce((acc,word)=> acc + WORDS[getRandomIntInclusive(0,14)] + ' ' ,'')
        line.txt = line.txt.charAt(0).toUpperCase() + line.txt.substring(1)
    })
}

