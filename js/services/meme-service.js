'use strict'

var gKeywordSearchCountMap = {
    'funny': 12,
    'cat': 16,
    'baby': 2
}

var gImgs = [
    {
        id: 1,
        url: 'img/2.jpg',
        keywords: ['funny', 'cat']
    }
]

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