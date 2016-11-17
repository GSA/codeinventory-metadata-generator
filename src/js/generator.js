$(document).ready(function() {
  $("#form").on("keyup", updateResult);
  $("#form").on("change", updateResult);
  function updateResult(event) {
    var metadata = formToObject("form", { includeEmptyValuedElements: true });
    $("#json-result").val(JSON.stringify(metadata, null, 2));
    $("#yaml-result").val(YAML.dump(metadata));
  }
  updateResult();

  $(".download").click(function (event) {
    event.preventDefault();
    var format = $(this).data("format");
    var content = $("#" + format + "-result").val();
    var data = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(data, $(this).attr("download"));
  });

  $.fn.select2.defaults.set("theme", "bootstrap");
  $("#tags").select2({
    tags: true,
    width: null,
    tokenSeparators: [',', ' ']
  });
});
