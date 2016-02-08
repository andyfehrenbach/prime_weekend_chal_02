// Andy Fehrenbach - 2/7/2016

var index = 0; //this will be used to track every classmate and act as an index for accessing JSON objects
var timer;

$(document).ready(function(){
    setIndex(index);
    getData(index); //get Kris Szafranski's div to start the party

    timer = window.setInterval(advanceCassette, 5000);


    $('#next').on('click', advanceCassette); //yes, like the song by Spoon.
    $('#previous').on('click', rewindCassette);
});

//end document ready function

//we will pass 'index' into the counter parameter
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
                $el.append('<h2>' + 'Favorite Song: ' + data.people[counter].favoriteSong + '</h2>');

                $el.fadeIn(600, function(){});
        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }
    });
}

function setIndex (counter) {
    $.ajax({
        type: 'GET',
        url: '/data',
        success: function(data) {
            $.each(data.people, function(i, person) {
                counter++;
                $('ul').append('<li class="index-point" id=' + '"' + counter + '"' + '>' + counter + '</li>');
                $('#1').addClass('index-point-active');
            });
        },
        error: function() {
            console.log('oops, error!');
        }
    });
}


function advanceCassette() {
    index++;

    //this bit allows the slider to loop continuously forwards and adjusts the index accordingly
    // there's a bug when looping that selects the second index instead of the first
    // would prefer that the 18 was not hard-coded...how to access array.length on a JSON Object?
    if (index > 18) {
        $('li').last().removeClass('index-point-active');
        index = 0;
        $('#' + [index + 1]).addClass('index-point-active');
    }


    //this will append the data for an individual at the given index, and remove the previous div
    getData(index);
    console.log(index);
    $('#peopleContainer').children().first().remove().fadeOut();
    $('#' + [index + 1]).addClass('index-point-active');
    $('#' + index).removeClass('index-point-active');

    //clearInterval(timer);
}

function rewindCassette() {
    index--;
    if(index < 1) {
        $('#' + 1).removeClass('index-point-active');
        index = 18;
        $('#' + [index + 1]).addClass('index-point-active');
    }

    console.log(index);
    getData(index);
    $('#peopleContainer').children().last().remove();
    $('#' + [index + 2]).removeClass('index-point-active');
    $('#' + [index+1]).addClass('index-point-active');
}

