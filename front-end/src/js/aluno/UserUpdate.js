const decode = (encoded) => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch {
    return false;
  }
};

const encode = (data) =>
  btoa(unescape(encodeURIComponent(JSON.stringify(data))));

const prefix = "+55 "
const formatPhone = (raw) => {
  if (!raw) return '';
  let numbers = raw.replace(/\D/g, '');
  if (numbers.length > 11) numbers = numbers.slice(0, 11);
  let formatted = prefix;
  if (numbers.length > 0) formatted += '(' + numbers.slice(0, 2) + ') ';
  if (numbers.length >= 3) formatted += numbers.slice(2, 3) + ' ';
  if (numbers.length >= 7) {
    formatted += numbers.slice(3, 7) + '-' + numbers.slice(7);
  } else if (numbers.length > 3) {
    formatted += numbers.slice(3);
  }
  return formatted;
};

$('#USER_EDIT_MODAL').on('show.bs.modal', function () {
  $('#USER_INPUT_NAME').val(decode(Cookies.get('USER')).name);
  $('#USER_INPUT_EMAIL').val(decode(Cookies.get('USER')).email);
  $('#USER_INPUT_PHONE').val(formatPhone(decode(Cookies.get('USER')).phone || ''));
});

$("#USER_EDIT_SAVE").on('click', async () => {
  const UID = decode(Cookies.get('USER')).uid;
  const name = $("#USER_INPUT_NAME").val().trim();
  const email = $("#USER_INPUT_EMAIL").val().trim();
  const phone = $("#USER_INPUT_PHONE").val().trim().replace(/\D/g, "");

  await axios.post(window.API + '/user/update', { UID, name, email, phone }, {
    headers: { 'Content-Type': 'application/json' }
  }).then((response) => {
    const user = response.data.user;
    Cookies.set("USER", encode(user), { expires: 55 / (60 * 24) });
    $('#user_name').text(user.name);
    $('#user_picture').attr('src', user.picture);
    $('.profile-info li').eq(0).html(`<i class="fas fa-user"></i> ${user.name}`);
    $('.profile-info li').eq(1).html(`<i class="fas fa-envelope"></i> ${user.email}`);
    $('.profile-info li').eq(2).html(`<i class="fas fa-phone"></i> ${user.phone ? formatPhone(user.phone) : 'Não informado'}`);
  }).catch((err) => {
    alert(err.message);
  });

  $('#USER_EDIT_MODAL').modal('hide');
});