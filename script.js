// clear the lists
let aliveList = document.getElementById("alive")
let deadList = document.getElementById("dead");
aliveList.innerHTML=""
deadList.innerHTML=""

// find all the pages
pages = []
function pushPages(){
  for (i=1; i<35; i++){
    pages.push(i);
  }
}
pushPages();

// search for names and call functions
function doAliveSearch (){
  for (p in pages) {
    let isAlive = 'https://www.anapioficeandfire.com/api/characters?page='+pages[p]+'&pageSize=50&isAlive=true';
    axios(isAlive).then(response => {loopAlive(response.data)})
  }
}

function doDeadSearch(){
  for (p in pages) {
    let notAlive = 'https://www.anapioficeandfire.com/api/characters?page='+pages[p]+'&pageSize=50&isAlive=false';
    axios(notAlive).then(response => {loopDead(response.data)})
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
