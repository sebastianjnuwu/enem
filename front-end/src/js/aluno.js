
if (!Cookies.get('USER')) {
  location.href = '/';
};

const decode = (encoded) => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch {
    return false;
  }
};

$(document).ready(async () => {

  $('#logout').on('click', () => {
    Cookies.remove('USER');
    Cookies.remove('accessToken');
    location.href = '/';
  });

  await fetch(window.API + '/user?UID=' + decode(Cookies.get('USER')).uid, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(async (api) => {

      const USER = await api.json();

      $('#user_name').text(USER.name);
      $('#user_picture').attr('src', USER.picture);

      const PROFILE = $('.profile-info li');
      PROFILE.eq(0).html(`<i class="fas fa-user"></i> ${USER.name}`);
      PROFILE.eq(1).html(`<i class="fas fa-envelope"></i> ${USER.email}`);
      PROFILE.eq(2).html(`<i class="fas fa-phone"></i> ${USER.phone || 'Não informado'}`);

 });


});