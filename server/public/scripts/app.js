// Andy Fehrenbach - 2/7/2016

var index = 0; //this will be used to track every classmate and act as an index for accessing JSON objects
var timer;

$(document).ready(function(){
    getData(index); //get Kris Szafranski's div to start the party

    timer = window.setInterval(advanceCassette, 5000);


     $('#next').on('click', advanceCassette); //yes, like the song by Spoon.
    $('#previous').on('click', rewindCassette);
});

//end document ready function

//we will pass in the counterId into the counter parameter
function getData(counter){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {
                $('#peopleContainer').append('<div class="classmate col-md-8 text-center">' + '</div>');
                var $el = $('#peopleContainer').children().last();

                $el.append('<h1>' + data.people[counter].name + '</h1>');
                $el.append('<h2>' + 'Favorite Movie #1: ' + data.people[counter].favoriteMovie1 + '</h2>');
                $el.append('<h2>' + 'Favorite Movie #2: ' + data.people[counter].favoriteMovie2 + '</h2>');
                $el.append('<h2>' + 'Favortie Song: ' + data.people[counter].favoriteSong + '</h2>');
        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }
    });
}


function advanceCassette() {
    index++;

    //this bit allows the slider to loop continuously forwards and adjusts the index accordingly
    // there's a bug when looping that selects the second index instead of the first
    // would prefer that the 18 was not hard-coded...how to access array.length on a JSON Object?
    if (index > 18) {
        index = 0;
    }
    $('li.index-point').first().addClass('index-point-active');
    $('li').last().removeClass('index-point-active');

    //this will append the data for an individual at the given index, and remove the previous div
    getData(index);
    console.log(index);
    $('#peopleContainer').children().first().remove();
    $('li.index-point-active').next().addClass('index-point-active');  //advance the nav index--this is buggy
    $('li.index-point-active').prev().removeClass('index-point-active');




}

function rewindCassette() {
    index--;
    if(index < 0) {
        index = 18;
    }
    $('li.index-point').first().removeClass('index-point-active');
    $('li').last().addClass('index-point-active');
    console.log(index);
    getData(index);
    $('#peopleContainer').children().last().remove();
    $('.index-point-active').prev().addClass('index-point-active');
    $('.index-point-active').next().removeClass('index-point-active');
}

