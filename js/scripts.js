// Magic Menu ----

var prev = 0;
var $window = $(window);
var nav = $('.nav-bar');

$window.on('scroll', function() {
    var scrollTop = $window.scrollTop();
    nav.toggleClass('hidden', scrollTop > prev);
    prev = scrollTop;
});

// ---- //

// Countdown ----

var countDownDate = new Date("May 9, 2018 00:00:00").getTime();


var x = setInterval(function() {
	var now = new Date().getTime();
	var distance = countDownDate - now;

	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);


	document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

	if (distance < 0) {
		clearInterval(x);
	    document.getElementById("countdown").innerHTML = "THE JOURNEY BEGINS";
	}
}, 1000);

// ---- //
