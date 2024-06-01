const characters = {
    Astaroth: {
        name: "Astaroth",
        description: "",
        token: "Astaroth.png"
    },
    Baltazar: {
        name: "Baltazar",
        description: "",
        token: "Baltazar.png"
    },
    Cadman: {
        name: "Cadman",
        description: "",
        token: "Cadman.png"
    },
    Diego: {
        name: "Diego",
        description: "",
        token: "Diego.png"
    },
    Dorian: {
        name: "Dorian",
        description: "",
        token: "Dorian.png"
    },
    Hakon: {
        name: "Baltazar",
        description: "",
        token: "Baltazar.png"
    },
    Henri: {
        name: "Henri",
        description: "",
        token: "Henri.png"
    },
    Irene: {
        name: "Irene",
        description: "",
        token: "Irene.png"
    },
    Isabelle: {
        name: "Isabelle",
        description: "",
        token: "Isabelle.png"
    },
    Ivor: {
        name: "Ivor",
        description: "",
        token: "Ivor.png"
    },
    JackCooper: {
        name: "Jack Cooper",
        description: "",
        token: "Jack_Cooper.png"
    },
    James: {
        name: "James",
        description: "",
        token: "James.png"
    },
    Jane: {
        name: "Jane",
        description: "",
        token: "Jane.png"
    },
    Lina: {
        name: "Lina",
        description: "",
        token: "Lina.png"
    },
    LordeDoSubmundo: {
        name: "Lorde do Submundo",
        description: "",
        token: "Lorde_do_submundo.png"
    },
    Lucas: {
        name: "Lucas",
        description: "",
        token: "Lucas.png"
    },
    Magnus: {
        name: "Magnus",
        description: "",
        token: "Magnus.png"
    },
    Mary: {
        name: "Mary",
        description: "",
        token: "Mary.png"
    },
    Matiza: {
        name: "Matiza",
        description: "",
        token: "Matiza.png"
    },
    Rebeca: {
        name: "Rebeca",
        description: "",
        token: "Rebeca.png"
    },
    Sabnock: {
        name: "Sabnock",
        description: "",
        token: "Sabnock.png"
    },
    Spamton: {
        name: "Spamton",
        description: "",
        token: "Spamton.png"
    },
    Spike: {
        name: "Spike",
        description: "",
        token: "Spike.png"
    },
    Tyrion: {
        name: "Tyrion",
        description: "",
        token: "Tyrion.png"
    },
    Willian: {
        name: "Willian",
        description: "",
        token: "Willian.png"
    },
    Yareth: {
        name: "Yareth",
        description: "",
        token: "Yareth.png"
    },
    Zotikotita: {
        name: "Zotikotita",
        description: "",
        token: "Zotikotita.png"
    }
}

let charList = []

const Game = {
    score: 0, // pontos acumulados por vitórias
    numberOfCards: 8,
    uncollectedList: [], // cartas em jogo, ainda não descobertas
    collectedList: [] // cartas descobertas
}

for(character in characters){
    console.log(character)
    charList.push(character)
}

function generateRandomGame(){
    let temp = [...charList]
    let randomIterable
    let selection = []
    for(i = 0; i < Game.numberOfCards; i++){
        randomIterable = parseInt(Math.random() * temp.length)
        selection.push(temp[randomIterable])
        selection.push(temp[randomIterable])
        temp.splice(randomIterable, 1)

    }
    console.log(selection)
    console.log(temp)
    Game.uncollectedList = [...selection]
}
function shuffle(){
    // criar uma função que embaralhe a lista duplicada de personagens selecionados
    let temp = [...Game.uncollectedList]
    let shuffledList = []
    for(i = 0; i < Game.uncollectedList.length; i++){
        let randomNum = parseInt(Math.random() * temp.length)
        shuffledList.push(temp[randomNum])
        temp.splice(randomNum, 1)
    }
    console.log(temp) // must be empty
    console.log(shuffledList)

    Game.uncollectedList = [...shuffledList]
}

function fillGameArea(){
    let gameArea = document.querySelector('.cardsArea')
    gameArea.innerHTML = ''
    let id = 0
    for(character of Game.uncollectedList){
        console.log(character)
        gameArea.innerHTML += `
        <div class="card ${character}" id="card-${id}" onclick="selectCard(${id})">
            <div class="card-image" style="background-image: url('./img/${characters[character].token}');"></div>
            <div class="card-text">${characters[character].name}</div>
        </div>
        `
        id++
    }
}

function initialize(){
    generateRandomGame()
    shuffle()
    fillGameArea()
}
initialize()

let flippedNumber = 0

function selectCard(id){
    let selectedCard = document.getElementById(`card-${id}`)
    
    console.log(selectedCard)
    if (flippedNumber < 2 && !selectedCard.classList.contains("flipped")) {
        
        selectedCard.classList.add("flipped")
        
        flippedNumber++
        pair.push(selectedCard.classList[1])
        if (flippedNumber >= 2){
            setTimeout(unflipAll, 1000)
        }
    }
    
}

let pair = []

function unflipAll(){
    let last = document.querySelector(".last")
    flippedNumber = 0
    let flippedCards = document.querySelectorAll(".flipped")
    console.log(flippedCards)
    for(i = 0; i < flippedCards.length; i++){
        console.log(flippedCards[i])
        if(flippedCards[i].classList.contains("flipped")){
            if (pair[0] == pair[1]){
                flippedCards[i].classList.add("hidden-card")
            }
            flippedCards[i].classList.remove("flipped")
        }
        
    }
    last.innerHTML = `
    <div class="card-image" style="background-image: url('./img/${characters[pair[0]].token}');"></div>
    <div class="card-image" style="background-image: url('./img/${characters[pair[1]].token}');"></div>
    `
    if (pair[0] == pair[1]){
        Game.collectedList.push(pair[0])
    }

    renderCollected()
    
    pair = []
}

function renderCollected(){
    let collectedArea = document.querySelector(".collectedArea")
    collectedArea.innerHTML = ''
    for(index in Game.collectedList){
        let temp = characters[Game.collectedList[index]]
        collectedArea.innerHTML += `
        <div class="cardCollected">
            <div class="cardCollected-image" style="background-image: url('./img/${temp.token}');"></div>
            <div class="cardCollected-text">${temp.name}<br>${temp.description}</div>
        </div>
        `
    }
}