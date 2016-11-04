(function () {
  var form = document.getElementById("form");
  var result = document.getElementById("result");
  form.addEventListener('keyup', updateResult);
  form.addEventListener('change', updateResult);
  function updateResult(event) {
    var metadata = formToObject("form", { includeEmptyValuedElements: true });
    result.value = JSON.stringify(metadata, null, 2);
  }
  updateResult();
})();
