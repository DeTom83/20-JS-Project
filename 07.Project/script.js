const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const desc = document.getElementById('desc');
const figureParts = document.querySelectorAll('.figure-part');

/* const words = ['application', 'programming', 'interface','wizard']; */
const words = [];
const descriptions = [];

import myList from './data.json' assert{type: 'json'};
myList.forEach( (e) => {
  words.push(e.word);
  descriptions.push(e.description);
});

let randomNumber = Math.floor(Math.random()*words.length);
let selectedWord = words[randomNumber];
let description = descriptions[randomNumber];

const correctLetters = [];
const wrongLetters  = [];


//Show hidden word
function displayWord(){
  /* wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : letter===' ' ? ' ':''}
        </span>
        `
      )
      .join('')
    }
  `; */

  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(letter => `
          ${correctLetters.includes(letter) ? `<span class="letter">${letter}</span>`: letter===' ' ? '<span class="space"> </span>':'<span class="letter"></span>'}
        `
      )
      .join('')
    }
  `;

/* 
  let str="";
  let w = selectedWord.split('');
  w.forEach((letter)=>{
    if(correctLetters.includes(letter)){
      str+=`<span class="letter">${letter}</span>`;
    }else{
      if(letter === " "){
        str+='<span class="space"> </span>';
      }else{
        str+='<span class="letter"></span>';
      }
    }

  });
  wordEl.innerHTML = str; */

  desc.innerText = description;
  const innerWord = wordEl.innerText.replace(/\n/g,'');
  
  if(innerWord === selectedWord.replace(/\s/g, "")){
    finalMessage.innerText = 'Congratulation! You won! 😀' 
    popup.style.display = 'flex';
  }
}
//Notification handle
function showNotification(){
  notification.classList.add('show');
  setTimeout(()=>{
    notification.classList.remove('show');
  },2000);
}

//Update the wrong letters
function updateWrongLetterEl(){
  //Display wrond letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length>0 ? '<p>Wrong</p>': ''}
    ${wrongLetters.map(letter =>`<span>${letter}</span>`)}
  `;

  //Display parts
  figureParts.forEach((part,index) =>{
    const errors = wrongLetters.length; 
    if(index < errors) {
      /* part.style.display = 'block'; */
      part.classList.add('active');
    }else{
      /* part.style.display = 'none'; */
      part.classList.remove('active');
    }
  });


  //Check if lost
  if(wrongLetters.length===figureParts.length){
    finalMessage.innerText = `Unfortunately you lost.
      Solution was: ${selectedWord}` ;
    popup.style.display = 'flex';
  }
}




//Keydown letter press
window.addEventListener('keydown', e =>{
  if(e.keyCode >= 65 && e.keyCode <= 90){
    const letter = e.key;

    if(selectedWord.includes(letter)){
      if(!correctLetters.includes(letter)){
        correctLetters.push(letter);
        displayWord();
      }else{
        showNotification();
      }
    }else{
        if(!wrongLetters.includes(letter)){
          wrongLetters.push(letter);
          updateWrongLetterEl();
        }else{
          showNotification();
        }
    }
  }
  if( (e.keyCode==13)&&(popup.style.display==='flex')){
    playNext(); 
  }
});

//Restart game and play again
playAgainBtn.addEventListener('click',()=>{
  playNext();
});


function playNext(){
  //Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  randomNumber = Math.floor(Math.random()*words.length);
  selectedWord = words[randomNumber];
  description = descriptions[randomNumber];

  /* selectedWord = words[Math.floor(Math.random()*words.length)]; */
  displayWord();

  updateWrongLetterEl();

  popup.style.display = 'none';
}



displayWord();

