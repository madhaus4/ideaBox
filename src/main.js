//queryselectors
//inputs
var inputTitle = document.querySelector('#userTitle');
var inputDescription = document.querySelector('#userBody');
var ideaBox = document.querySelector('.container-top');
var ideaCard = document.querySelector('#ideaCard');

//buttons
var buttonSave = document.querySelector('#saveButton');


//event listeners
buttonSave.addEventListener('click', function(event) {
  generateIdeaCard(event);
});
ideaBox.addEventListener('keyup', buttonValidity);

//global variables
var ideaCardList = [];

//functions
function buttonValidity() {
  if(!inputTitle.value || !inputDescription.value) {
    buttonSave.disabled = true;
  } else if (inputTitle.value && inputDescription.value) {
    buttonSave.classList.add('save-button-2');
    buttonSave.disabled = false;
  }
}

function generateIdeaCard(event) {
  event.preventDefault();

  var newCard = new Idea(inputTitle.value, inputDescription.value);
  ideaCardList.push(newCard);

  renderIdeaCard();
  clearInputFields();
}

function renderIdeaCard() {

  ideaCard.innerHTML = '';

  for(var i=0; i < ideaCardList.length; i++) {
  ideaCard.innerHTML += `<article id="${ideaCardList[i].id}" class="idea-card">
    <nav class="idea-nav">
      <img class="card-icon" id="favoriteIcon" src="${ideaCardList[i].image}" alt="favorite idea star">
      <img class="card-icon" id="deleteIcon" src="assets/delete.svg" alt="delete idea icon">
    </nav>
    <div class="idea-content">
      <h2 class="idea-title">${ideaCardList[i].title}</h2>
      <p class="idea-body">${ideaCardList[i].body}</p>
    </div>
    <footer class="idea-comment">
      <img class="card-icon" src="assets/comment.svg" alt="add comment button">
      <label>Comment</label>
    </footer>
  </article>`;
  }
}

function clearInputFields() {
  inputTitle.value = '';
  inputDescription.value = '';
  buttonSave.classList.remove('save-button-2');

  buttonValidity();
}

ideaCard.addEventListener('click', function(event) {
  favoriteIdeaCard(event);
  deleteIdeaCard(event);
});

function deleteIdeaCard(event) {
  var closestIdea = event.target.closest('article');
  if (event.target.id === 'deleteIcon') {
    for (var i = 0; i < ideaCardList.length; i++) {
      if (ideaCardList[i].id === Number(closestIdea.id)) {
        ideaCardList.splice(i, 1);
      }
    }
  }
  renderIdeaCard();
}

function favoriteIdeaCard(event) {
  var closestIdea = event.target.closest('article');
  if (event.target.id === 'favoriteIcon');
    for (var i = 0; i < ideaCardList.length; i++) {
      if (ideaCardList[i].id === Number(closestIdea.id)) {
        console.log('where you', ideaCardList[i]);
        ideaCardList[i].updateIdea();
      }
    }
}


/*
Edge cases
- verify the 'title' and 'body' have information
--- error checking function will have a return to prevent additional methods from firing
*/
