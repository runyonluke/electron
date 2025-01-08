function submitNotes() {
  title = $("#title").val();
  description = $("#description").val();

  window.electronAPI.createNote(title, description);
}

function fetchNotes() {
  window.electronAPI.fetchNotes();
}

window.electronAPI.readNotes((rows) => {
  console.log(rows);
});
