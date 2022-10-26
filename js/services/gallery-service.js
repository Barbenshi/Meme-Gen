'use strict'

var gImgs = [
    {
        id: 1,
        url: 'img/diff-aspect/5.jpg',
        keywords: ['funny', 'politics']
    }
]

function getImgs(){
    return gImgs
}

function createImg(id,url,keywords){
    gImgs.push({
        id,
        url,
        keywords
    })
}

createImg(2,'img/2.jpg',['cute','animals'])