'use strict'

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

function setLineTxt(txt){
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId){
    gMeme.selectedImgId = imgId
}

function changeColor(color){
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function updateFontSize(num){
    gMeme.lines[gMeme.selectedLineIdx].size += num
}

