//When the page loads, show the first 50 monsters. 
//Each monster's name, age, and description should be shown.

/* Psuedocode
DOMContentLoaded - is this necessary if just text?
Show the first 50? - make a GET request and limit the number of monsters using an API method
Place the 50 in the monster-container id
    monsters.name   .age    .description

*/
let form = document.createElement('form')
let pageNum = 1
let monsterContainer = document.querySelector('#monster-container')

document.addEventListener('DOMContentLoaded', ()=> {
    
    fetchMonsterData ()
    createForm()
    postMonsters()
    // monsterContainer.innerHTML = ""
    forwardAndBack()
    
    }
)

function fetchMonsterData () {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`) 
    .then(response => response.json())
    .then(response => response.map(monsters => monsterInfo(monsters)))
}

function monsterInfo(monsters) {
    const monsterContainer = document.querySelector('#monster-container')
    let newDiv = document.createElement('div')

    let h2 = document.createElement('h2')
    h2.innerText = monsters.name

    let h4 = document.createElement('h4')
    h4.innerText = `Age: ${monsters.age}`

    let p = document.createElement("p")
    p.innerText = `Bio: ${monsters.description}`

    newDiv.append(h2, h4, p)
    monsterContainer.appendChild(newDiv)

}

function createForm() {
    let createMonster = document.querySelector("#create-monster")
    
    createMonster.appendChild(form)

    let input1 = document.createElement('input')
    input1.setAttribute('id', 'name')
    input1.setAttribute('placeholder', 'name')

    let input2 = document.createElement('input')
    input2.setAttribute('id', "age")
    input2.setAttribute('placeholder', 'age')

    let input3 = document.createElement('input')
    input3.setAttribute('id', 'description')
    input3.setAttribute('placeholder', 'description')

    let btn = document.createElement('button')
    btn.innerText = "Create"
    
    form.append(input1, input2, input3, btn)
    form.addEventListener('submit', clickCreate)
}

function clickCreate(e) {
    e.preventDefault()
    let nameMonster = e.target[0].value
    let ageMonster = e.target[1].value
    let descriptMonster = e.target[2].value
    postMonsters(nameMonster, ageMonster, descriptMonster)
    form.reset()
    //Originally placed form.reset() on line 70 and none of the rest of the code ran.
}

function postMonsters(name, age, description) {
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
    body: JSON.stringify({
        "name": name,
        "age": age,
        "description": description
    })
    })
    .then(response => response.json())
    .then(monsterObj => monsterInfo(monsterObj))
    //line 89 renders to the DOM -- not in the instructions 
}

function forwardAndBack () {
    const forwardButton = document.querySelector('#forward')
    const backButton = document.querySelector('#back')

    backButton.addEventListener('click', goBack)

    forwardButton.addEventListener('click', goForward)
}

function goBack () {
    if (pageNum === 1) {
        window.alert("No more monsters!")
    } else { 
    pageNum -= 1
    
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`) 
    .then(response => response.json())
    .then(response => {
        monsterContainer.innerHTML = ""
        response.map(monsters => monsterInfo(monsters))
    })
}
}

function goForward () {
    // const monsterContainer = document.querySelector('#monster-container')
    pageNum += 1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`) 
    .then(response => response.json())
    .then(response => {
        console.log(monsterContainer)
        monsterContainer.innerHTML = ""
        response.map(monsters => monsterInfo(monsters))
    })
}








