'use strict'

const KEY_WORDS = [['funny', 'politics'], [['cute', 'animals']], ['cute', 'couples', 'dogs'], ['lazy', 'cats', 'sunday morning'], ['baby', 'win'], ['smart', 'clumzy'], ['baby', 'surprised'], ['not interested', 'You are Right'],
['evil', 'laugh'], ['politics', 'success'], ['wrestling', 'love'], ['saint', 'tv', 'see you try'], ['leonardo', 'cheers'],
['exterminator'], ['smart', 'funny'], ['star wars', 'science fiction'], ['politics', 'evil'], ['movies', 'smart']]
var gId = 1

var gImgs = [
    {
        id: 55,
        url: 'img/diff-aspect/5.jpg',
        keywords: ['baby', 'win']
    }
]

function getImgs() {
    return gImgs
}

function createImg(url, keywords) {
    gImgs.push({
        id: gId++,
        url,
        keywords
    })
}

createImgs()
// createImg('img/1.jpg', ['funny', 'politics'])

function createImgs() {
    KEY_WORDS.forEach(keyword => createImg(`img/${gId}.jpg`, keyword))
}