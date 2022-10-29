'use strict'


var gSavedImgs = []

function getSavedImgs() {
    return gSavedImgs
}

function createSavedImg(url) {
    gSavedImgs.push({
        id: gId++,
        url,
    })
    return gSavedImgs[gSavedImgs.length - 1].id
}