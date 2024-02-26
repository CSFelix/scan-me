var slideIndex = 1;
showSlides(slideIndex);

// exibição do slide posterior/anterior
function plusSlides(n) { showSlides(slideIndex += n); }

// exibição do slide atual
function currentSlide(n) { showSlides(slideIndex = n); }

// exibição dos slides
function showSlides(n) {
  var posicao_slide;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (posicao_slide = 0; posicao_slide < slides.length; posicao_slide++) {
      slides[posicao_slide].style.display = "none";  
  }
  for (posicao_slide = 0; posicao_slide < dots.length; posicao_slide++) {
      dots[posicao_slide].className = dots[posicao_slide].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}