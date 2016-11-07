$(document).ready(function() {
  $("#form").on("keyup", updateResult);
  $("#form").on("change", updateResult);
  function updateResult(event) {
    var metadata = formToObject("form", { includeEmptyValuedElements: true });
    $("#result").val(JSON.stringify(metadata, null, 2));
  }
  updateResult();
});
