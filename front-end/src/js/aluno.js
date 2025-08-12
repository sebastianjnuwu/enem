/*
if (!Cookies.get('USER')) {
  location.href = '/';
};
*/

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
  
$(document).ready(async () => {

  $('#logout').on('click', () => {
    Cookies.remove('USER');
    Cookies.remove('accessToken');
    location.href = '/';
  });

 await axios.get(window.API + '/user', {
  params: { UID: decode(Cookies.get('USER')).uid },
  headers: { 'Content-Type': 'application/json' }
})
.then(response => {
  const USER = response.data;
  $('#user_name').text(USER.name);
  $('#user_picture').attr('src', USER.picture);
  $('.profile-info li').eq(0).html(`<i class="fas fa-user"></i> ${USER.name}`);
  $('.profile-info li').eq(1).html(`<i class="fas fa-envelope"></i> ${USER.email}`);
  $('.profile-info li').eq(2).html(`<i class="fas fa-phone"></i>
  ${formatPhone(USER.phone) || 'Não informado'}`);
}).catch((err) => {
  alert(err.message)
});
  

});