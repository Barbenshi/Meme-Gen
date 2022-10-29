'use strict'
const IMG_STORAGE_KEY = 'imgsDB'

var gSavedImgs = loadFromStorage(IMG_STORAGE_KEY) || []

function getSavedImgs() {
    return gSavedImgs
}

function createSavedImg(url) {
    gSavedImgs.push({
        id: makeId(),
        url,
    })
    _saveImgsToLocalStorage()
}

function _saveImgsToLocalStorage() {
    saveToStorage(IMG_STORAGE_KEY, gSavedImgs)
}
