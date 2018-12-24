
$(document).ready(function () {

  $("#submit").on("click", function (event) {
    event.preventDefault();

    function validateInput() {
      let valid = true;
      $(".person-info").each(function () {
        // console.log($(this).val());
        if ($(this).val() === "") {
          valid = false;
        }
      });

      $(".chosen-select").each(function () {
        // console.log($(this).val());
        if ($(this).val() === "") {
          valid = false;
        }
      });
      return valid;
    }

    if (validateInput() === true) {
      var userData = {
        name: $("#name").val(),
        photo: $("#photo").val(),
        scores: [
          $("#q1").val(),
          $("#q2").val(),
          $("#q3").val(),
          $("#q4").val(),
          $("#q5").val(),
          $("#q6").val(),
          $("#q7").val(),
          $("#q8").val(),
          $("#q9").val(),
          $("#q10").val()
        ]
      };

      // AJAX post the data to the friends API.
      $.post("/api/friends", userData, function (data) {

        // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        $("#match-name").text(data.name);
        $("#match-img").attr("src", data.photo);
        $('#exampleModal').modal('show');

      });
    } else {
      alert("Please fill out all fields before submitting!");
    }
  });
});