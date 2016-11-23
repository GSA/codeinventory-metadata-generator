$(document).ready(function() {
  var schema = {};
  var schemaLoaded = false;

  function parseForm() {
    var metadata = formToObject("form", { includeEmptyValuedElements: true });
    metadata.openSourceProject = parseInt(metadata.openSourceProject);
    metadata.governmentWideReuseProject = parseInt(metadata.governmentWideReuseProject);
    metadata.license = metadata.license == "" ? null : metadata.license;
    return metadata;
  }

  function validate(metadata) {
    var errorMapping = {
      ".name": "Enter a project name.",
      ".description": "Enter a description of the project.",
      ".license": "The license should be a URL (or blank if there is no license URL).",
      ".tags": "Enter at least one tag.",
      ".contact.email": "Enter a valid contact email address."
    };
    var ajv = new Ajv({ allErrors: true });
    var valid = ajv.validate(schema, metadata);
    if (!valid) {
      $("#validation li").remove();
      for (var i = 0; i < ajv.errors.length; i++) {
        var error = ajv.errors[i];
        $("#validation ul").append("<li>" + errorMapping[error.dataPath] + "</li>");
      }
    }
    $("#validation").toggle(!valid);
  }

  function updateResult(event) {
    var metadata = parseForm();
    if (schemaLoaded) {
      validate(metadata);
    }
    $("#json-result").val(JSON.stringify(metadata, null, 2));
    $("#yaml-result").val(YAML.dump(metadata));
  }

  $("#form").on("keyup", updateResult);
  $("#form").on("change", updateResult);

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

  $.getJSON("codeinventory-schema.json", function (data) {
    schema = data;
    schemaLoaded = true;
  });
});
