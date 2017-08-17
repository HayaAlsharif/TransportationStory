$(function() {
  
    function showSlide(n) {
        // n is relative position from current slide
      
        // unbind event listener to prevent retriggering
        $body.unbind("mousewheel");
      
        // increment slide number by n and keep within boundaries
        currSlide = Math.min(Math.max(0, currSlide + n), $slide.length-1);
        
        var displacment = window.innerWidth*currSlide;
        // translate slides div across to appropriate slide
        $slides.css('transform', 'translateX(-' + displacment + 'px)');
        // delay before rebinding event to prevent retriggering
        setTimeout(bind, 700);
        
        // change active class on link
        $('nav a.active').removeClass('active');
        $($('a')[currSlide]).addClass('active');
        
    }
  
    function bind() {
         $body.bind('mousewheel', mouseEvent);
      }
  
    function mouseEvent(e, delta) {
        // On down scroll, show next slide otherwise show prev slide
        showSlide(delta >= 0 ? -1 : 1);
        e.preventDefault();
    }
    
    $('nav a').click(function(e) {
        // When link clicked, find slide it points to
        var newslide = parseInt($(this).attr('href')[1]);
        // find how far it is from current slide
        var diff = newslide - currSlide - 1;
        showSlide(diff); // show that slide
        e.preventDefault();
    });
  
    $(window).resize(function(){
      // Keep current slide to left of window on resize
      var displacment = window.innerWidth*currSlide;
      $slides.css('transform', 'translateX(-'+displacment+'px)');
    });
    
    // cache
    var $body = $('body');
    var currSlide = 0;
    var $slides = $('.slides');
    var $slide = $('.slide');
  
    // give active class to first link
    $($('nav a')[0]).addClass('active');
    
    // add event listener for mousescroll
    $body.bind('mousewheel', mouseEvent);
})