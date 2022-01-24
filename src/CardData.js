const nameTemplate = '[num] of [suite]'
const imgTemplate = './cards/[num]_of_[suite].svg'

const cardNames = {
    0: 'ace',
    10: 'jack',
    11: 'queen',
    12: 'king',
}

const suites = [
    'clubs',
    'diamonds',
    'hearts',
    'spades',
]

const generateCardData = () => {
    // create number array filled with 1-13
    let numArray = new Array(13).fill(0).map((e,i)=>i+1)
    let deck = []
    // replace named number cards with their corresponding names
    Object.keys(cardNames).forEach(key => {
        numArray.splice(key, 1, cardNames[key])
    })
    // generate deck based on number and suites
    numArray.forEach((number,idx) => {
        suites.forEach(suite => {
            deck.push({
                suite: suite, value: idx+1,
                name: nameTemplate.replace('[num]', number).replace('[suite]', suite),
                img: imgTemplate.replace('[num]', number).replace('[suite]', suite)
            })
        })
    })
    return deck
}

export default generateCardData()