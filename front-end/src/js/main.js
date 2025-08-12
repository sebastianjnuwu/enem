const USER = Cookies.get('USER');

const decode = (encoded) => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch {
    return false;
  }
};

$(document).ready(() => {
 
  if (USER) {
    $('#button-1').attr('href', 'aluno.html');
    $('#button-2').attr('hidden', false);
    $('#login_google').attr('hidden', true);
  };

  $('#section-plan').on('click', 'button.btn', () => {
    
    const ModalPlan = $('#ModalPackage')[0];
    const ModalPackage = new bootstrap.Modal(ModalPlan);

    if (!USER) {
       $('html, body').animate({
        scrollTop: $('#acesso').offset().top
      }, 600);
    } else {
      ModalPackage.show();
    }
  });

});