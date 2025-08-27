import { User } from "@script/ts/axios.ts";
import Cookies from "js-cookie";
import $ from "jquery";

const decode = (encoded) => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch {
    return false;
  }
};

const Phone = (raw) => {
  if (!raw) return '';
  let numbers = raw.replace(/\D/g, '');
  if (numbers.length > 11) numbers = numbers.slice(0, 11);
  let formatted = "+55 ";
  if (numbers.length > 0) formatted += '(' + numbers.slice(0, 2) + ') ';
  if (numbers.length >= 3) formatted += numbers.slice(2, 3) + ' ';
  if (numbers.length >= 7) {
    formatted += numbers.slice(3, 7) + '-' + numbers.slice(7);
  } else if (numbers.length > 3) {
    formatted += numbers.slice(3);
  }
  return formatted;
};

export async function LoadAluno() {

  const USER = await User(decode(Cookies.get('USER_DATE')).uid);

  $('#user_name').text(USER.name);
  $('#user_picture').attr('src', USER.picture);
  $('.profile-info li').eq(0).html(`<i class="fas fa-user"></i> ${USER.name}`);
  $('.profile-info li').eq(1).html(`<i class="fas fa-envelope"></i>
${USER.email}`);
  $('.profile-info li').eq(2).html(`<i class="fas fa-phone"></i> ${Phone(USER.phone) || 'Não informado'}`);
  $('.profile-info li').eq(3).html(`
  <i class="fas fa-layer-group" ${USER?.userPlans?.[0]?.plan ? "" : 'style="color:red;"'}></i>
  <span ${USER?.userPlans?.[0]?.plan ? "" : 'style="color:red;"'}>
    ${USER?.userPlans?.[0]?.plan?.name ?? "Nenhum plano ativo"}
  </span>
`);

  if (!USER?.userPlans?.[0]?.plan?.name) {
    $(".plan-expired").attr("hidden", false);
  };

};