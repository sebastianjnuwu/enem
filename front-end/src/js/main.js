//alert(true)


$('#filterPendentes').on('change', function() {
  if ($(this).is(':checked')) {
    $('.redacao-item').each(function() {
      const status = $(this).find('.status').text().trim().toLowerCase();
      if (status === 'pendente') {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  } else {
    $('.redacao-item').show();
  }
});