
let Note = document.querySelector("#notesRow");
let textarea = Array.from(document.querySelectorAll(".row .user_text"));
let add = document.querySelector(".add");

let colorChanger = Array.from(
  document.querySelectorAll(".row span[data-index]")
);


//* ======================================================

existNotes().forEach((note) => {
   createNote(note.id, note.content);
});

add.addEventListener("click", addNote);

function existNotes() {
  return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function createNote(id, content) {
  let newNote = document.createElement("div");
  newNote.className = "col-sm-2";
  newNote.innerHTML = `
    <div class="note text-wrap" data-set>
      <textarea class="user_text" placeholder="type your thoughts">${content}</textarea>
    </div>
  `;

  let textarea = newNote.querySelector(".user_text");
  textarea.addEventListener("input", () => {
    updateNote(id, textarea.value);
  });

  let note = newNote.querySelector(".note");
  note.addEventListener("dblclick", () => {
    let askForDelete = confirm("Are you sure you want to delete this message?");
    if (askForDelete) {
      deleteNoteAndElement(id, note);
      
    }
  });

  notesRow.insertBefore(newNote, notesRow.firstChild);
}

function addNote() {
  let allNotes = existNotes();

  let noteObj = {
    id: Date.now(),
    content: ""
  }

  createNote(noteObj.id, noteObj.content);

  allNotes.push(noteObj);

  saveNotes(allNotes);
}

function updateNote(id, newText) {
  let allnotesAvailable = existNotes();

  let handleNotes = allnotesAvailable.find((note) => note.id == id);

  if(handleNotes){
    handleNotes.content = newText;
    saveNotes(allnotesAvailable);    
  }


}

function deleteNoteAndElement(id, ele) {
  let allNotes = existNotes();

  // Find the index of the note with the given id
  let noteIndex = allNotes.findIndex(note => note.id === id);

  if (noteIndex !== -1) {
      // Remove the note from the array
      allNotes.splice(noteIndex, 1);

      // Save the updated notes array to localStorage
      saveNotes(allNotes);

      // Remove the note's HTML element from the DOM
      renderNotes()
      
  }
  
}

function renderNotes() {
  // Clear the notesRow
  notesRow.innerHTML = "";

  // Fetch notes from localStorage
  let allNotes = existNotes();

  // Render each note
  allNotes.forEach(note => {
      createNote(note.id, note.content);
  });
}

//* ======================================================
