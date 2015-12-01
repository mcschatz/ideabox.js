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
        var ideaProperties = $(".ideas-list").prepend(
          "<h3>" + idea.title + "</h3>"
          + "<h5>" + idea.body + "</h5>"
          + "<h5>" + idea.quality + "</h5>"
          + "<input class='btn btn-default' id='delete-idea' type='button' name='submit' value='Delete Idea'>"
        )
        return ideaProperties;
      });
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

  $('idea-title').val('')
  $('idea-body').val('')

    $.ajax({
      type: 'POST',
      url: '/api/v1/ideas.json',
      data: ideaParams,
      success: function(){
        getIdeas()
      }
    });
    $('form').trigger('reset');
  })
}