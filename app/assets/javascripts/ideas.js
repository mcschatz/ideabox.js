$(document).ready(function () {
  getIdeas()
});

function getIdeas() {
  $.ajax({
    type: 'GET',
    url: '/api/v1/ideas',
    success: function(response) {
      var ideaElements = $.map (response, function (idea, index) {
        var ideaProperties = $('<li></li>')
        .append("<h3>" + idea.title + "</h3>")
        .append("<h5>" + idea.body + "</h5>")
        .append("<h5>" + idea.quality + "</h5>");
        return ideaProperties;
      });
      $(".ideas-list").html(ideaElements);
    }
  });
};