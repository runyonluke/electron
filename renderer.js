function submitNotes() {
  noteId = $("#note_id").val();
  title = $("#title").val();
  description = $("#description").val();
  if (noteId == "") window.electronAPI.createNote(title, description);
  else window.electronAPI.updateNote(noteId, title, description);
}

function fetchNotes() {
  window.electronAPI.fetchNotes();
}

window.electronAPI.readNotes((rows) => {
  rows.forEach((element) => {
    div = returnNotesDropdown(element);
    $("#accordion").append(div);
  });
});

function returnNotesDropdown(element) {
  return `<div class="panel panel-default" id="panel${element.id}">
    <div class="panel-heading">
      <span class="panel-title">
        <a
          data-toggle="collapse"
          data-parent="#accordion"
          href="#collapse${element.id}"
          id="title${element.id}"
          >${element.title}</a
        >
      </span>
      <button
        type="button"
        class="btn btn-info act-btns"
        data-toggle="modal"
        data-target="#myModal"
        onclick="openAddDialog(${element.id})"
      >
        <span class="glyphicon glyphicon-pencil"></span>
      </button>
      <button type="button" class="btn btn-danger act-btns" onclick="deleteNote(${element.id})">
        <span class="glyphicon glyphicon-trash"></span>
      </button>
    </div>
    <div id="collapse${element.id}" class="panel-collapse collapse">
      <div class="panel-body" id="description${element.id}">${element.description}</div>
    </div>
  </div>`;
}

function deleteNote(id) {
  window.electronAPI.deleteNote(id);
  $("#panel" + id).remove();
}
