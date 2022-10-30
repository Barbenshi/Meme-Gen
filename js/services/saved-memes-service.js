<<<<<<< HEAD
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
=======
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
>>>>>>> c7d4ce8edc9bc60a8e80690e8eede67bd8a211dc
