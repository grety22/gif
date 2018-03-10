//Homework 6 - GIPHY API
//vars

var queryURLpart1 = 'http://api.giphy.com/v1/gifs/search?q=';
var queryURLpart2 = '&api_key=dc6zaTOxFJmzC&limit=12';
var queryURL = '';

//TO BUILD THE IMAGE URL
var imgURLpart1 = 'https://media.giphy.com/media/';
var imgGivenCode = ''; // example : B1CrvUCoMxhy8
var imgURLpart2 = '/200_s.';
var imgExtensionGif = 'gif';
var imgExtensionJpg = 'jpg';

//TO SELECT FROM WHICH COMPANY DO WE WANT TO SEE MOVIE's Gif
var animationCompany = ['pixar','dreamworks','disney'];
//JUST BUTTONs COLORS
var buttonColor = ['bttn-royal','bttn-success','bttn-primary','bttn-danger','bttn-warning'];
var colorIndex = 0;

var pixarDreamWorksDisney = [
//    PIXAR
    {
        animCompany: 'pixar',
        movieName: 'cars'
    },
    {
        animCompany: 'pixar',
        movieName: 'toy story'
    },
    {
        animCompany: 'pixar',
        movieName: 'finding nemo'
    },
    {
        animCompany: 'pixar',
        movieName: 'ratatouille'
    },
    {
        animCompany: 'pixar',
        movieName: 'the incredibles'
    },
    {
        animCompany: 'pixar',
        movieName: 'wall-e'
    },
    {
        animCompany: 'pixar',
        movieName: 'inside out'
    },
    {
        animCompany: 'pixar',
        movieName: 'monsters university'
    },
    {
        animCompany: 'pixar',
        movieName: 'the good dinosaur'
    },
    {
        animCompany: 'pixar',
        movieName: 'coco'
    },
    {
        animCompany: 'pixar',
        movieName: 'a bug’s life'
    },
    {
        animCompany: 'pixar',
        movieName: 'monsters inc.'
    },
    {
        animCompany: 'pixar',
        movieName: 'up'
    },
    {
        animCompany: 'pixar',
        movieName: 'finding dory'
    },
//    DREAM WORK
    {
        animCompany: 'dreamworks',
        movieName: 'shrek'
    },
    {
        animCompany: 'dreamworks',
        movieName: 'shark tale'
    },
    {
        animCompany: 'dreamworks',
        movieName: 'madagascar'
    },
    {
        animCompany: 'dreamworks',
        movieName: 'bee movie'
    },
    {
        animCompany: 'dreamworks',
        movieName: 'how to train your dragon'
    },
    {
        animCompany: 'dreamworks',
        movieName: 'megamind'
    },
    {
        animCompany: 'dreamworks',
        movieName: 'kun fu panda'
    },
    {
        animCompany: 'dreamworks',
        movieName: 'the croods'
    },
    {
        animCompany: 'dreamworks',
        movieName: 'the boss baby'
    },
    {
        animCompany: 'dreamworks',
        movieName: 'home'
    },
    {
        animCompany: 'dreamworks',
        movieName: 'turbo'
    },
//    DISNEY
    {
        animCompany: 'disney',
        movieName: 'bambi'
    },
    {
        animCompany: 'disney',
        movieName: 'the jungle book'
    },
    {
        animCompany: 'disney',
        movieName: 'cinderella'
    },
    {
        animCompany: 'disney',
        movieName: 'peter pan'
    },
    {
        animCompany: 'disney',
        movieName: 'the little mermaid'
    },
];    
 
var chosenMovie = {
        animCompany: '',
        movieName: ''
}

$(document).ready(function(){
    
    start();
    addMovies();
    
 function start(){
   
     $("#btn-container" ).on( "click", "button", function() {
       console.log( $( this ).text() );
       $('#gif-container').empty();
       var passToAjax = $(this).attr("company") +'+'+ $(this).attr("movie");
       queryURL = queryURLpart1+passToAjax+queryURLpart2;
       ajaxCall();
     });
   
     showButtons(); 
 }  
    
function ajaxCall(){
    $.ajax({
              url: queryURL,
              method: 'GET'
              }).then(function(response){
                  console.log(response);
                  var usefulData = response.data; 
                  for (var i = 0; i<usefulData.length; i++){
                      createGifContainer(usefulData[i]);
                  }
                  
              });
}

function createGifContainer(array){
    var gifContainer = $('#gif-container');
    var div = $('<div class="divColor col-lg-3 col-md-4 col-xs-6">');
    var a = $('<a href="#" target="_blank" class="d-block mb-4 h-100">');
    
    imgGivenCode = array.id;
    
    var all = imgURLpart1+imgGivenCode+imgURLpart2+imgExtensionGif;
    
    a.attr('href', all);
    var img = $('<img class="img-fluid img img-thumbnail" src="" alt="">');
    img.attr("src", all);
//    alert(all);
    var p = $("<p>").text("Rating: " + array.rating);
    a.append(img);
    a.prepend(p);
    div.append(a);
    gifContainer.append(div);
}    
    
function showButtons(){
    $('#btn-container').empty();
    for (var i = 0; i<pixarDreamWorksDisney.length; i++){
        createButtons(i);
        colorIndex++;
    }
}

function createButtons(index){
    var container = $('#btn-container');
    var button = $('<button>');
    button.addClass('flip animated bttn-unite bttn-md');
//    To differents buttons colors
    if (colorIndex >= buttonColor.length){
        colorIndex = 0;
        button.addClass(buttonColor[colorIndex]);
    }else {
        button.addClass(buttonColor[colorIndex]);
    }
//   END  To differents buttons colors    
    button.text(pixarDreamWorksDisney[index].movieName);
    button.attr('movie',pixarDreamWorksDisney[index].movieName);
    button.attr('company',pixarDreamWorksDisney[index].animCompany);
    container.append(button);
}

function addMovies(){
    $("#add-movie").on("click", function(event) {
            event.preventDefault();
            var movie = $("#movie-input").val().trim();
//            var company = $("#company-input").val().trim();
            var company = "";
            chosenMovie.animCompany = company;
            chosenMovie.movieName = movie;
            pixarDreamWorksDisney.push(chosenMovie); 
            start();
            chosenMovie = {};
            console.dir(pixarDreamWorksDisney);
    }); 
    
}

function toggleGifStatus(){
    
}
    
    
    
    
    
});