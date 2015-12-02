$(document).ready(function () {
  getIdeas();
  createIdea();
  deleteIdea();
});

function getIdeas(){
  $.getJSON('/api/v1/ideas', function(data) {
    $.each(data, function(index, idea){
      renderIdeas(idea)
    })
  });
};

function renderIdeas(idea) {
  $('#ideas-list').prepend(
    "<li class='collection-item idea' data-id='" + idea.id
    + "'><div class='row'>"
    + "<p>Title: "
    + idea.title
    + "</p><p>Description: "
    + idea.body
    + "</p><p>Quality: "
    + idea.quality
    + "</div><i class='material-icons' id='delete-idea'>delete</i></li>"
  )
};

function createIdea(){
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
      success: function(idea){
        renderIdeas(idea)
      }
    });
    $('form').trigger('reset');
  })
}

function deleteIdea() {
  $('#ideas-list').delegate('#delete-idea', 'click', function(){
    var $idea = $(this).closest('.idea')

    $.ajax({
      type: 'DELETE',
      url:  '/api/v1/ideas/'
      + $idea.attr('data-id')
      + '.json',
      success: function(){
        $idea.remove()
      },
      error: function(){
        $idea.remove()
        console.log('This Idea has already deleted')
      }
    })
  })
}