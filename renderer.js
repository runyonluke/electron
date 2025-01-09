function submitNotes() {
  title = $("#title").val();
  description = $("#description").val();

  window.electronAPI.createNote(title, description);
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
                >${element.title}</a
              >
            </span>
            <button
              type="button"
              class="btn btn-info act-btns"
              data-toggle="modal"
              data-target="#myModal"
            >
              <span class="glyphicon glyphicon-pencil"></span>
            </button>
            <button type="button" class="btn btn-danger act-btns">
              <span class="glyphicon glyphicon-trash"></span>
            </button>
          </div>
          <div id="collapse${element.id}" class="panel-collapse collapse">
            <div class="panel-body">
              ${element.description}
            </div>
          </div>
        </div>`;
}
