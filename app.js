
fetch("Text.txt")
  .then((res) => res.text())
  .then((text) => {
    // Split the text into an array of lines
    var lines = text.split('\n');

    // Get the <ul> element by its ID
    var ul = document.getElementById("myUL");

    // Iterate over the lines and create <li> elements with anchor elements
    lines.forEach((line) => {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#'; // Set the link URL here if needed
      a.appendChild(document.createTextNode(line));
      li.appendChild(a);
      ul.appendChild(li);
    });
  })
  .catch((e) => console.error(e));


ul = document.querySelector('.myUL');
ul.addEventListener("click", movieSelect);

function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');
  ul.style.display = "";
  console.log(input)
  
  if(filter.length == 0){
    ul.style["visibility"] = "hidden";
    //document.getElementById("movieRecommendations").innerHTML = "";
    document.getElementById("card-deck").innerHTML = "";
    console.log(filter.length);
  }
  else{
      // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      ul.style["visibility"] = "";
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }

  }

}


var input = document.getElementById("myInput");
var clearButton = document.getElementById("clearButton");

// Add a click event listener to the clear button
clearButton.addEventListener("click", function() {
  // Clear the input field
  input.value = "";
  // Call your search function (myFunction in this case) to reset the search results
  myFunction();
});

function movieSelect(event) {

    var selectMovie = event.target.innerHTML;
    var url = "https://movierec.lukesnexus.com/" + selectMovie
    var movieList = document.getElementById("movieRecommendations");


    document.getElementById("card-deck").innerHTML = "";
    myFunction()

    ul = document.getElementById("myUL");
    ul.style.display = "none";

    var loaders = document.getElementById("loader-container");
    loaders.style.display = "";

    document.getElementById('myInput').value = selectMovie
    console.log("You selected " + selectMovie + ".");

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        loadCards(data);

        /*
        for (var movie of data){

            console.log(movie.movieId);
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(movie.movieId));
            movieList.appendChild(li);
        }
        */
        loaders.style.display = "none";
    })
    .catch(error => {
        // handle the error
        console.log(error)
    });

}

function loadCards(data){

  const container = document.getElementById('card-deck');
  let cardArray = [];

  data.forEach((result, idx) => {
    // Create card element
    const card = document.createElement('div');
    card.classList = 'card-body';

    content = `
    <div class="card">
      <img class="card-img-top" src="https://image.tmdb.org/t/p/original/${result.metadata.poster_path}" alt="Card image">
      <div class="card-body"">
        <h4 class="card-title" style="color: white;">${result.movieId}</h4>
        <hr/>
        <p class="card-text">${result.metadata.overview}</p>
  </div>
</div>
    `;
    // add contant to array
    cardArray.push(content);
  })

  const cardDeck = `
  <div class="row">
  <div class="col d-flex">
    ${cardArray[0]}
  </div>
  <div class="col d-flex">
  ${cardArray[1]}
  </div>
  <div class="col d-flex">
  ${cardArray[2]}
  </div>
<!--</div>
<div class="row"> -->
  <div class="col d-flex">
  ${cardArray[3]}
  </div>
  <div class="col d-flex">
  ${cardArray[4]}
  </div>
  <div class="col d-flex">
  ${cardArray[5]}
  </div>
<!-- </div>
<div class="row"> -->
  <div class="col d-flex">
  ${cardArray[6]}
  </div>
  <div class="col d-flex">
  ${cardArray[7]}
  </div>
  <div class="col d-flex">
  ${cardArray[8]}
  </div>
</div>
  `;

  container.innerHTML += cardDeck;
}

