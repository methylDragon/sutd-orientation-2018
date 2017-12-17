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


	document.getElementById("countdown").innerHTML = days + "D " + hours + "H " + minutes + "M " + seconds + "S ";

	if (distance < 0) {
		clearInterval(x);
	    document.getElementById("countdown").innerHTML = "THE JOURNEY BEGINS";
	}
}, 1000);

// ---- //

// Text-Scrambler ---- //

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-\\/[]{}—@$=+*^?#'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

const phrases = [
  'WELCOME TO',
  'NUCLEAR THRONE'
]

const el = document.querySelector('.title')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    if(counter && phrases.length){
      setTimeout(next, 800);
    }
  })
  counter = (counter + 1);
}
next();

// ---- //

// scroll to anchor ---- //
$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});
});

<!-- click to slide down-->
$( "#tricks" ).click(function() {
  $( ".skilllist" ).slideToggle( "slow", function() {
  });
});

$( "#blog" ).click(function() {
  $( ".recentposts" ).slideToggle( "slow", function() {
  });
});
// ---- //
