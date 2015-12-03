$(document).ready(function () {
  getIdeas();
  createIdea();
  deleteIdea();
  searchIdeas();
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
    "<div class='card idea' data-id='" + idea.id
    + "' data-quality='" + idea.quality
    + "'><div class='card-content'>"
    + "<span class='card-title'><p contentEditable='true' class='idea-title'>"
    + idea.title
    + "</p></span>"
    + "<p contentEditable='true' class='idea-body'>"
    + idea.body
    + "</p><p>Quality: "
    + idea.quality
    + "</p>"
    + "<i class='material-icons' id='increase-quality'>thumb_up</i>"
    + "<i class='material-icons' id='decrease-quality'>thumb_down</i>"
    + "<i class='material-icons' id='delete-idea'>delete</i></a></div></div>"
  )
  editTitle();
  editBody();
  increaseQuality();
  decreaseQuality();
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

function searchIdeas() {
  $('#search').keyup(function() {
    var input = $('#search').val().toLowerCase();

    $('.idea').each(function (index, idea) {
      var title = $(idea).find('p').text().toLowerCase();
      var body = $(idea).find('p').text().toLowerCase();

      var isMatching = (title + body).indexOf(input) !== -1;
      $(idea).toggle(isMatching);
    });
  });
}

function editTitle() {
  $('.idea-title').keydown(function (event) {
    if(event.keyCode == 13) {
      event.preventDefault();
      var $input = event.currentTarget.textContent;
      var $idea = $(this).closest('.idea');
      var ideaParams  = {
        idea: {
          title: $input
        }
      }

      $.ajax({
        type: 'PUT',
        url:  '/api/v1/ideas/'
        + $idea.attr('data-id')
        + '.json',
        data: ideaParams,
        success: function(idea){
          $(event.target).blur();
          updateTitle($idea, idea.title);
        },
        error: function(){
          console.log('You title cannot be blank.');
        }
      });
    }
  });
}

function updateTitle(idea, title){
  $(idea).find('.idea-title').html(title);
}

function editBody() {
  $('.idea-body').keydown(function (event) {
    if(event.keyCode == 13) {
      event.preventDefault();
      var $input = event.currentTarget.textContent;
      var $idea = $(this).closest('.idea');
      var ideaParams  = {
        idea: {
          body: $input
        }
      }

      $.ajax({
        type: 'PUT',
        url:  '/api/v1/ideas/'
        + $idea.attr('data-id')
        + '.json',
        data: ideaParams,
        success: function(idea){
          $(event.target).blur();
          updateBody($idea, idea.body);
        },
        error: function(){
          console.log('There was an error with your input. Try again.')
        }
      })
    }
  })
}

function updateBody(idea, body){
  $(idea).find('.idea-body').html(body);
}

function increaseQuality() {
  $('#increase-quality').on('click', function(event){
    var $idea = $(this).closest('.idea');
    var $quality = $($idea).attr('data-quality');
    var thumbsUpMap = {
      Genius: "Genius",
      Plausible: "Genius",
      Swill: "Plausible"
    }

    var ideaParams = {
      idea: {
        quality: thumbsUpMap[$quality]
      }
    }

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/'
      + $idea.attr('data-id')
      + '.json',
      data: ideaParams,
      success: function(idea){
        $idea.remove();
        renderIdeas(idea);
      }
    });
  });
}

function decreaseQuality() {
  $('#decrease-quality').on('click', function(event){
    var $idea = $(this).closest('.idea');
    var $quality = $($idea).attr('data-quality');
    var thumbsDownMap = {
      Genius: "Plausible",
      Plausible: "Swill",
      Swill: "Swill"
    }

    var ideaParams = {
      idea: {
        quality: thumbsDownMap[$quality]
      }
    }

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/'
      + $idea.attr('data-id')
      + '.json',
      data: ideaParams,
      success: function(idea){
        $idea.remove();
        renderIdeas(idea);
      }
    });
  });
}