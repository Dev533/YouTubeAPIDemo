$(document).ready(function(){

    $('input').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
         {
           $('#searchBTN').click();
           return false;  
         }
    }); 

    $('#searchBTN').on('click', function(event){
        event.preventDefault();
        // clearing results
        $('#resultsList').empty();


        var userInput = $('input').val();
        console.log(userInput);
        $('input').val("");

        // GET Request
        $.get(
            "https://www.googleapis.com/youtube/v3/search", {
                part: 'snippet',
                q: userInput,
                type: 'video',
                maxResults: 25,
                key: 'AIzaSyA5ve0S6HY5zVywl9lK5YmXxZKOEGSeebo'},
            
                function(data) {
                   
                    for (var i = 0; i < data.items.length; i++) {
                        console.log(data.items[i]);
                        var title = data.items[i].snippet.title;
                        var channel = data.items[i].snippet.channelTitle;
                        var description = data.items[i].snippet.description;
                        var date = data.items[i].snippet.publishedAt;
                        var pic = data.items[i].snippet.thumbnails.high.url;

                        $('#resultsList').append(
                            "<li class='list-group-item list-group-item-action'><div class='row'><div class='col-sm-2'><img class='img-thumbnail' src='" + pic + "'></div><div class='col-sm-10'><h6 class='card-title'>" + title + "</h6><p class='card-text'>" + description + "</p><p class='card-text mr-5'>By: " + channel + "<span class='ml-5'>Posted: " + date + "</span></p></div></div></li>"
                        )
                    }
                }
        )
    });

    
});

