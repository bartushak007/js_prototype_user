(function() {
  var popup = document.querySelectorAll('.pop-up-btn');
  popup.forEach = Array.prototype.forEach
  popup.forEach(function(elem) {
     elem.addEventListener('click', function(event) {
      document.querySelector('.pop-up').classList.remove('pop-up--hidden');
    });
  })
 

  document.querySelector('.pop-up').addEventListener('click', function(event) {
    if (
      event.target.className === 'pop-up' || event.target.className === 'pop-up__close-btn') {
      document.querySelector('.pop-up').classList += ' pop-up--hidden';
    }
  });
})();