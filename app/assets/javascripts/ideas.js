$(document).ready(function () {
  getIdeas()
  createIdeas()
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

function createIdeas(){
  $('#create-idea').on('click', function(){
    var ideaTitle = $('#idea-title').val();
    var ideaBody = $('#idea-body').val();
    var ideaParams      = {
      idea: {
        title: ideaTitle,
        body: ideaBody
      }
    }

    $.ajax({
      type: 'POST',
      url: '/api/v1/ideas',
      data: ideaParams,
      success: function(idea){
        getIdeas()
      }
    })
  })
}