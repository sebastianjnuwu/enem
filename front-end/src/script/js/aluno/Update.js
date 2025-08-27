import $ from 'jquery';
import { Modal } from 'bootstrap';
import Cookies from 'js-cookie';
import { UserUpdate } from "@script/ts/axios";
import { LoadAluno } from  "@script/js/aluno/Get.js";

const decode = (encoded) => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch {
    return false;
  }
};
const formatPhone = (raw) => {
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

const EDIT_MODAL_EL = document.getElementById('USER_EDIT_MODAL');

const EDIT_MODAL = new Modal(EDIT_MODAL_EL);

EDIT_MODAL_EL.addEventListener('show.bs.modal', () => {
  
  const { name, email, phone }  = decode(Cookies.get('USER_DATE'));
  $('#USER_INPUT_NAME').val(name);
  $('#USER_INPUT_EMAIL').val(email);
  $('#USER_INPUT_PHONE').val(formatPhone(phone || ''));
  
});


$('#USER_EDIT_SAVE').on('click', async () => {
  const uid = decode(Cookies.get('USER_DATE')).uid;
  const name = $('#USER_INPUT_NAME').val().trim();
  const email = $('#USER_INPUT_EMAIL').val().trim();
  const phone = $('#USER_INPUT_PHONE').val().trim().replace(/\D/g, '');

  const updated = await UserUpdate(uid, name, email, phone);

  if (!updated) return alert("Erro ao atualizar!");
  
  Cookies.set("USER_DATE", btoa(JSON.stringify(updated.user)), { expires: 55 / (60 *
  24) });
  
  await LoadAluno();
  EDIT_MODAL.hide();
  
});