// clear the lists
let aliveList = document.getElementById("alive")
let deadList = document.getElementById("dead");
aliveList.innerHTML=""
deadList.innerHTML=""

// search for names and call functions
function doAliveSearch (){
  let page = 1;
  while (page < 35) {
    let isAlive = 'https://www.anapioficeandfire.com/api/characters?page='+page+'&pageSize=50&isAlive=true';
    axios(isAlive).then(response => {loopAlive(response.data)}).then(page ++);
  }
}

function doDeadSearch(){
  let page = 1;
  while (page < 15) {
    let notAlive = 'https://www.anapioficeandfire.com/api/characters?page='+page+'&pageSize=50&isAlive=false';
    axios(notAlive).then(response => {loopDead(response.data)}).then(page++)
  }
}

// loop through JSON and append names to lists
function loopAlive(data){
  for (person of data) {
    if (person.name) {
      aliveList.insertAdjacentHTML('beforeend', `<li class="alive-list list-group-item">${person.name}</li>`)
    }
    else {
      aliveList.insertAdjacentHTML('beforeend', `<li class="alive-list list-group-item">${person.aliases}</li>`)
    }
  }
}

function loopDead(data){
  for (person of data) {
    if (person.name){
      deadList.insertAdjacentHTML('beforeend', `<li class="list-group-item">${person.name}</li>`)
    }
    else {
      aliveList.insertAdjacentHTML('beforeend', `<li class="list-group-item">${person.aliases}</li>`)
    }
  }
}

// run functions
doAliveSearch()
doDeadSearch()
