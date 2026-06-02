let numberOfIterations = 0;
const title = document.getElementById("title");
const mainButton = document.getElementById("textToChange");

mainButton.addEventListener("click", rotateNumber);

function rotateNumber()
{
    const changeNumberInt = setInterval(changeNumber, 10);
    const createEscapeInt = setInterval(createEscape, 200)
    mainButton.removeEventListener("click", rotateNumber);
    title.innerHTML = "WHAT HAVE YOU DONE";
    title.classList.toggle("titleChange");
}
function createEscape(){
    let escapeArr = ["You'll never unlock it", "It's un-openable", "We're not hiding anything", "Nothing hidden here", "What will happen when you click on me?", "Totally cooooool", "Escape rooms are so cool", "What a nice color palette", "Isn't this scary?"];
    const escapeText = document.createElement('h1');
    escapeText.innerHTML = escapeArr[Math.floor(Math.random() * escapeArr.length)];
    escapeText.classList.toggle("escape");
    escapeText.style.top = Math.floor(Math.random() * 100).toString() + '%';
    escapeText.style.right = Math.floor(Math.random() * 100).toString() + '%';
    escapeText.style.fontSize = Math.floor((Math.random() * 40) + 20).toString() + 'px';
    escapeText.addEventListener("mouseenter", (e) => {
        e.target.innerText = "13";
        e.removeEventListener("mouseenter");
    })
    document.body.appendChild(escapeText);
}
function changeNumber()
{
    mainButton.innerHTML = "";
    for(let i = 0; i < 10 + numberOfIterations; i++)
    {
        mainButton.innerHTML += String.fromCharCode(Math.floor(Math.random() * 25) + 65);
    }
    numberOfIterations++;
}