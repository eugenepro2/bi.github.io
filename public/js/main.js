$(function() {

	$('.header__nav').scrollToFixed();

    //Мобильное меню
    var menu = $('.menu');
    $('.mobile-menu').on('click', function(){
        menu.addClass('open-menu');
    });
    $('.close').on('click', function(){
        menu.removeClass('open-menu');
    })

    $(".header__slider a, .consultation a").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top - 100}, 1500);
    });

    $('.input-hidden').val(window.location.href);


});
baguetteBox.run('.gallery');
new WOW().init();


var swiper = new Swiper('#header-slider', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay: 5000,
    speed: 700,
});

var swiper = new Swiper('#partnership', {
    slidesPerView: 4,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    autoplay: 3000,
    speed: 700,
    loop: true,
    breakpoints: {
        767: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        }
      }
});

//Ajax отправка формы
  document.querySelectorAll('form').forEach(function(item) {
  item.addEventListener('submit', function(event) {
    sendAjaxForm(this, event);
  })});
  function sendAjaxForm(form, event) {
    var fields = form.querySelectorAll('input, textarea')

    var formHasError =  Array.prototype.reduce.call(fields, function(invalidCount, currentItem) {
      if (currentItem.matches(':invalid')) invalidCount++;
    }, 0);

    if (formHasError) {
      return true;
    } else {
      event.preventDefault();

      var formData = new FormData(form);
      var xhr = new XMLHttpRequest();

      xhr.open('POST', 'send.php');
      xhr.onreadystatechange = function() {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
          data = xhr.responseText;
          form.outerHTML = '<h3 style="color: #fff; text-align: center;">Спасибо, ваша заявка отправлена</h3><p style="color: #fff; text-align: center">Наши менеджеры свяжутся с вами в течение дня</p>';
        }
      }
      xhr.send(formData);

      return false;
    }
  }