'use strict'

const KEY_WORDS = [['funny', 'politics'], ['cute', 'animals'], ['cute', 'couples', 'dogs'], ['lazy', 'cats', 'sunday morning'], ['baby', 'win'], ['smart', 'clumzy'], ['baby', 'surprised'], ['not interested', 'You are Right'],
['evil', 'laugh'], ['politics', 'success'], ['wrestling', 'love'], ['saint', 'tv', 'see you try'], ['leonardo', 'cheers'],
['exterminator'], ['smart', 'funny'], ['star wars', 'science fiction'], ['politics', 'evil'], ['movies', 'smart'], ['funny', 'politics'], [['cute', 'animals']], ['cute', 'couples', 'dogs'], ['lazy', 'cats', 'sunday morning'], ['baby', 'win'], ['smart', 'clumzy'], ['baby', 'surprised'], ['not interested', 'You are Right'],
['evil', 'laugh'], ['politics', 'success'], ['wrestling', 'love'], ['saint', 'tv', 'see you try'], ['leonardo', 'cheers'],
['exterminator'], ['smart', 'funny'], ['star wars', 'science fiction'], ['politics', 'evil'], ['movies', 'smart'], ['funny', 'politics'], [['cute', 'animals']], ['cute', 'couples', 'dogs'], ['lazy', 'cats', 'sunday morning'], ['baby', 'win'], ['smart', 'clumzy'], ['baby', 'surprised'], ['not interested', 'You are Right'],
['evil', 'laugh'], ['politics', 'success'], ['smart', 'funny']]
const PAGE_SIZE = 11
var gPageIdx = 0

var gId = 1
var gImgs = []

var gFilterBy
var gImgsForDisplay

createImgs()

function createImg(url, keywords = ['funny, silly']) {
    gImgs.push({
        id: gId++,
        url,
        keywords
    })
}

function createImgs() {
    KEY_WORDS.forEach(keyword => createImg(`img/diff-aspect/${gId}.jpg`, keyword))
}

function getImgsForDisplay() {
    gImgsForDisplay = gImgs
    // Filter
    if (gFilterBy) {
        gImgsForDisplay = gImgsForDisplay.filter(({ keywords }) => keywords.find(keyword => keyword.includes(gFilterBy.toLowerCase())))
    }

    // Paging:
    const startIdx = gPageIdx * PAGE_SIZE
    gImgsForDisplay = gImgsForDisplay.slice(startIdx, startIdx + PAGE_SIZE)
    return gImgsForDisplay
}

function isFirstPage() {
    return gPageIdx === 0
}

function isLastPage() {
    return gPageIdx + 1 === getPageCount()
}

function updatePage(num) {
    gPageIdx += num
}

function setPage(num) {
    gPageIdx = num - 1
}

function getCurrPage() {
    return gPageIdx + 1
}

function getPageCount() {
    return Math.ceil(gImgs.length / PAGE_SIZE)
}

function setFilter(filter) {
    gFilterBy = filter
}


