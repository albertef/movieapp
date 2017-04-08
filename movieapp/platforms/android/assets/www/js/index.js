window.onload = function() {
	moviefeed();
	document.addEventListener('deviceready', onDeviceReady, false);
	
	var grid = document.querySelector('.grid');
	var msnry = new Masonry( grid, {
	  columnWidth: 160,
	  percentPosition: true
	});

	grid.addEventListener( 'click', function( event ) {
	  // don't proceed if item was not clicked on
	  if ( !matchesSelector( event.target, '.grid-item' ) ) {
		return;
	  }
	  // change size of item via class
	  event.target.classList.toggle('grid-item--gigante');
	  // trigger layout
	  msnry.layout();
	});

	msnry.on( 'layoutComplete', function( laidOutItems ) {
	  console.log( 'Masonry layout complete with ' + laidOutItems.length + ' items' );
	});
	
	
}

function onDeviceReady() {
	//alert("Device Ready");
}

function moviefeed() {
	var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
            if (xmlhttp.status == 200) {
			    var jsonout = JSON.parse(xmlhttp.responseText);
				var jsonoutput = "";
				for(var i=0;i<jsonout.results.length;i++){
					jsonoutput += "<div class='grid-item grid-item--height2'><img src='http://image.tmdb.org/t/p/w500" + jsonout.results[i].poster_path + "'></div>";
				}
				document.getElementById('moviefeed').innerHTML = jsonoutput;
				//$(".grid-item:even").addClass('grid-item--height2');
				//$(".grid-item:odd").addClass('grid-item--width2');
			}
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('Please check your internet connectivity');
           }
        }
    };

    xmlhttp.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=2b5aa5030d2a9da3d764bd1cc757f1c4", true);
    xmlhttp.send();
	//https://api.themoviedb.org/3/movie/550?api_key=2b5aa5030d2a9da3d764bd1cc757f1c4
}

function openinappbrowser(newsurl) {
	var ref = window.open(newsurl, '_blank', 'location=yes');
	ref.addEventListener('loadstart', function(event) { });
	ref.addEventListener('exit', detailclose);
}