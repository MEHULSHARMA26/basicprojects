const wordEl = document.getElementById("word");
const wrongLettersEl=document.getElementById("wrong-letters");
const playAgainBtn=document.getElementById("playagain");
const popup = document.getElementById("pop-up-container");
const notification = document.getElementById("message-here");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".the_stick");

const words = [
    "transformers",
    "brimestone",
    "heaven",
    "bebop",
    "champloo",
]; 
let selectedWord = 
    words[Math.floor(Math.random() * words.length)];
    //point to remeber that Math.random function generates value between 0-1 but it can't generate 1;
const correctLetters=[];
const wrongLetters=[];

//display word function
function displayWord(){

    wordEl.innerHTML=`${selectedWord.split("").map(alphabet => `<span class="alphabet">${correctLetters.includes(alphabet) ? alphabet : ""}</span>`)
.join("")}
`;
const innerWord = wordEl.innerText.replace(/\n/g,"");


    if(innerWord===selectedWord)
    {
        finalMessage.innerText = "Congrats! You Win!😊";
        popup.style.display="flex";
    }
}

//wrong letter functions
function updateWrongLettersEl(){
    wrongLettersEl.innerHTML=`${wrongLetters.length > 0 ? "<p>Wrong</p>":""}
    ${wrongLetters.map((letter)=>`<span>${letter}</span>`)}
    `;

    //display stick man
    figureParts.forEach((part,index)=>{
        const errors = wrongLetters.length;
        if(index < errors){
            part.style.display="block";
        }
        else
        {
            part.style.display="none";
        }
    });
    //check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText="Unfortunately you lost!😔";
        popup.style.display="flex";
    }
} 

//show notification

function showNotification()
{
    notification.classList.add("show");
    setTimeout(()=> {notification.classList.remove("show")},2000);
}



//keyDown letter press
window.addEventListener("keydown", (e) => {
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
            else{
                showNotification();
            }
        }
        else
        {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLettersEl();
            }
            else
            {
                showNotification();
            }
        }
    }
});
//playagain 
playAgainBtn.addEventListener("click",()=>{
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord=
    words[
        Math.floor(Math.random()*words.length)
    ];
    displayWord();
    updateWrongLettersEl();
    popup.style.display="none";
});

displayWord();


