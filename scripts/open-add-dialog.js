function openAddDialog(id) {
  if (!id) $("#note_id").val("");
  else {
    $("#note_id").val(id);
    $("#title").val($("#title" + id).html());
    $("#description").val($("#description" + id).html());
  }
  $("#notemodal").modal("show");
}
