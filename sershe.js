pageID = 'https://ar.wikipedia.org/?curid=';
$(document).ready(function(){
  var search;
  $('.search-button').on('click', function(){
    search = $('.bo').val();
    getJSON(search);
    $('.clean-button').show(); // Ø¥Ø¸ÙØ§Ø± Ø²Ø± "ØªÙØ¸ÙÙ" Ø¨Ø¹Ø¯ Ø¹Ø±Ø¶ Ø§ÙÙØªØ§Ø¦Ø¬
  });
  $('.clean-button').on('click', function(){
    clean();
  });

  // Ø§ÙØªØ¹Ø§ÙÙ ÙØ¹ Ø§ÙØ¨Ø­Ø« Ø¹Ù Ø·Ø±ÙÙ Ø§ÙØ¶ØºØ· Ø¹ÙÙ ÙÙØªØ§Ø­ Enter
  $('.bo').on('keypress', function(event) {
    if (event.which === 13) { // ÙÙØ· Ø¥Ø°Ø§ ØªÙ Ø§ÙØ¶ØºØ· Ø¹ÙÙ ÙÙØªØ§Ø­ Enter
        event.preventDefault();
        $('.search-button').click(); // ØªØ´ØºÙÙ Ø§ÙØ¨Ø­Ø« Ø¹ÙØ¯ Ø§ÙØ¶ØºØ· Ø¹ÙÙ Enter
    }
  });
});

function getJSON(search){
  // ÙØ³Ø­ Ø§ÙÙØªØ§Ø¦Ø¬ Ø§ÙØ³Ø§Ø¨ÙØ© ÙØ¨Ù Ø§ÙØ¨Ø¯Ø¡ Ø¨Ø¹Ø±Ø¶ Ø§ÙÙØªØ§Ø¦Ø¬ Ø§ÙØ¬Ø¯ÙØ¯Ø©
  clean();

  $.ajax({
      type: "GET",
      url: "https://ar.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=5&srsearch="+search+"&callback=?",
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: "json",
      success: function (data, textStatus, jqXHR) {
        query = data.query.search;
        getArticles(query);
      },
    error: function (errorMessage) {
        }
  });
}

function getArticles(data){
  console.log(data);
  query.forEach(function(d){
    $('secton').append(
      '<div class="articles">'+
      '<a class="lolo" href="'+pageID+d.pageid+'">'+
      '<h2 class="ggttt">'+d.title+'</h2>'+
      '<p class="gtgth">'+d.snippet+'</p>'+
      '</a></div>');
  })
}

function clean(){
   $('.articles').remove();
   $('.clean-button').hide(); // Ø¥Ø®ÙØ§Ø¡ Ø²Ø± "ØªÙØ¸ÙÙ" Ø¨Ø¹Ø¯ ØªÙØ¸ÙÙ Ø§ÙÙØªØ§Ø¦Ø¬
}


