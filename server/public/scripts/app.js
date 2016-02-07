$(document).ready(function(){
    var index = 0; //this will be used to track every classmate and act as an index for accessing JSON objects

    getData(index); //get Kris Szafranski's div to start the party

     $('#next').on('click', function advanceCassette() {
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
    });

    // this function does the opposite of the previous function
    $('#previous').on('click', function rewindCassette(){
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
    });
   // window.setInterval(advanceCassette, 5000);

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


                //$el.data("classMateNumber", counterId);

                //console.log($el.data("classMateNumber"));


            //console.log(data);
        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }

    });
}




