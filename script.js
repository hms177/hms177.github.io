/* Clock */
const time = document.getElementById("time");
function getTime(){
    const date = new Date();
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const currentTime = `${hour}:${minutes}:${seconds}`;
    time.textContent = currentTime;
}

getTime();
setInterval(getTime, 1000);



/* TO DO */
const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos";
let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(e){
    const li = e.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newToDo){
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    const btn = document.createElement("button");
    span.innerText = newToDo.text;
    btn.innerText = "X";
    btn.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(btn);
    toDoList.appendChild(li);
}

function handleToDoSumbit(e){
    e.preventDefault();
    const newToDo = toDoInput.value; 
    toDoInput.value = "";
    const newTodoObj = {
        text: newToDo,
        id: Date.now()
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSumbit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}



/* Random Background */
const images = ["1.jpg", "2.jpg", "3.jpg"];
const selectImage = images[Math.floor(Math.random() * images.length)];
const bgImage = `url(${selectImage})`;
document.body.style.backgroundImage = bgImage;
document.body.style.backgroundSize = "cover";
document.body.style.backgroundRepeat = "no-repeat";



/* Weather */
const API_KEY="0a1227c74eddddfc52f4443275bc0d0a";
function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
            city.innerText = data.name;
            weather.innerText = data.weather[0].main;
    });
}
function onGeoError (){
    alert("Can't find you! No weather for you.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
