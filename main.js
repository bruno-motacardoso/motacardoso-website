document.addEventListener('DOMContentLoaded', () => {
  // NAVBAR HIDE/REVEAL ON SCROLL
  const nav = document.querySelector('nav');
  const hero = document.getElementById('hero');
  
  nav.classList.add('nav-hidden');

  if (hero) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          nav.classList.remove('nav-visible');
          nav.classList.add('nav-hidden');
        } else {
          nav.classList.remove('nav-hidden');
          nav.classList.add('nav-visible');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-80px 0px 0px 0px'
    });

    navObserver.observe(hero);
  }

  // ROTATING TEXT ANIMATION
  let words = document.querySelectorAll(".word");
  words.forEach(word => {
    let wordParts = word.textContent.split(" ");
    word.textContent = "";
    wordParts.forEach(part => {
      let span = document.createElement("span");
      span.textContent = part;
      span.className = "letter";
      word.append(span);
    });
  });

  let currentWordIndex = 0;
  let maxWordIndex = words.length - 1;
  words[currentWordIndex].style.opacity = "1";

  let rotateText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord =
      currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
    Array.from(currentWord.children).forEach((letter, i) => {
      setTimeout(() => {
        letter.className = "letter out";
      }, i * 80);
    });
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
      letter.className = "letter behind";
      setTimeout(() => {
        letter.className = "letter in";
      }, 340 + i * 80);
    });
    currentWordIndex =
      currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
  };

  rotateText();
  let rotateInterval = setInterval(rotateText, 4000);

  // Pause when tab is hidden to save resources
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(rotateInterval);
    } else {
      rotateInterval = setInterval(rotateText, 4000);
    }
  });

  // SCROLL-TRIGGERED CARD ANIMATION
  const animateCards = document.querySelectorAll('.card-animate');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger: 100ms delay per card
        setTimeout(() => {
          entry.target.classList.add('card-visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animateCards.forEach(card => {
    observer.observe(card);
  });

  // SVG CURVE ANIMATION
  var $curve = document.getElementById("curve");
  var last_known_scroll_position = 0;
  var defaultCurveValue = 100;
  var curveRate = 3;
  var ticking = false;
  var curveValue;

  function scrollEvent(scrollPos) {
    if (scrollPos >= 0 && scrollPos < defaultCurveValue) {
      curveValue = defaultCurveValue - parseFloat(scrollPos / curveRate);
      $curve.setAttribute(
        "d",
        "M 800 0 Q 400 " + curveValue + " 0 0 L 0 0 L 800 0 L 800 0 Z"
      );
    }
  }

  window.addEventListener("scroll", function(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        scrollEvent(last_known_scroll_position);
        ticking = false;
      });
    }

    ticking = true;
  });
});
