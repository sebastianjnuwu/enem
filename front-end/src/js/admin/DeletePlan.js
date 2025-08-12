const decode = (encoded) => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch {
    return false;
  }
};

$(function(){
 
  let ID_DELETE = null;
  const UID = decode(Cookies.get('USER')).uid;
  modal = new bootstrap.Modal($('#CONFIRM_DELETE_MODAL')[0]);

  $('#admin-pacotes').on('click', '.btn-delete', function(){
    ID_DELETE = $(this).data('id');
    modal.show();
  });

  $('#CONFIRM_DELETE_BUTTON').click(async () => {
  
   if (!ID_DELETE) return;

   await axios.delete(window.API + '/plan/delete', { 
     params: { 
      id: ID_DELETE, 
      UID
     } 
   }).then(async (response) => {
     await LoadPlans();
     modal.hide();
     ID_DELETE = null;
   }).catch((err) => {
     alert(err.message);
   });
});

});