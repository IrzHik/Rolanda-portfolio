// "dzīvā" rakstīšana titullapā
const dynamicText = document.getElementById("dynamic-text");
const roles = ["Inženieris", "Dizaineris", "Zinātnieks", "Programmētājs"];
let roleIndex = 0;
let letterIndex = 0;

function type() {
  if (letterIndex < roles[roleIndex].length) {
    dynamicText.textContent += roles[roleIndex].charAt(letterIndex);
    letterIndex++;
    setTimeout(type, 150);
  } else {
    setTimeout(deleteText, 2000);
  }
}

function deleteText() {
  if (letterIndex > 0) {
    dynamicText.textContent = roles[roleIndex].substring(0, letterIndex - 1);
    letterIndex--;
    setTimeout(deleteText, 100);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 500);
  }
}


type();

// Animācijas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});


const sections = document.querySelectorAll('.section');

const options = {
  root: null,
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});

window.onload = function() { 
  // Callback function to hide the error message when CAPTCHA is verified
  window.captchaVerified = function() {
      document.getElementById('captcha-error').style.display = 'none';
  };

  // Show error if CAPTCHA is not verified on form submission
  document.getElementById('contact-form').addEventListener('submit', function(event) {
      const responseField = document.getElementById('g-recaptcha-response');
      if (responseField && responseField.value === "") {
          document.getElementById('captcha-error').style.display = 'inline-block';
          event.preventDefault(); // Novērš lapas nosūtīšanu
      }
  });
};
