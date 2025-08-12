$(function () {

  const modalEl = $('#editPlanModal');
  const modal = new bootstrap.Modal(modalEl);

  $('#admin-pacotes').on('click', '.btn-edit', async function () {

    const id = $(this).data('id');

    await axios.get(`${window.API}/plan?id=${id}`).then((response) => {

      const plan = response.data.plan;

      $('#PLAN_EDIT_FORM').data('edit-id', plan.id);
      $('#PLAN_EDIT_NAME').val(plan.name);
      $('#PLAN_EDIT_CONTENT').val(plan.content || '');
      $('#editMarkdownPreview').html(marked.parse(plan.content || ''));
      $('#PLAN_EDIT_ALWAYS').prop('checked', plan.always);
      $('#PLAN_EDIT_EXPIREAT').val(plan.EXPIRED || '');
      $('#PLAN_EDIT_PRICE').val(plan.price);

      $('#PLAN_EDIT_AULA_TEM').prop('checked', !!plan.HAS_CLASSES);

      const aulaTipos = plan.TYPE_CLASS ? JSON.parse(plan.TYPE_CLASS) : [];
      $('#PLAN_EDIT_AULA_TIPO').val(aulaTipos).trigger('change');

      $('#PLAN_EDIT_TEMA_TEM').prop('checked', !!plan.HAS_THEMES);
      $('#PLAN_EDIT_MATERIA_TEM').prop('checked', !!plan.HAS_MATERIALS);
      $('#PLAN_EDIT_CORRECAO_TEM').prop('checked', !!plan.HAS_CORRECTION);

      $('#PLAN_EDIT_CORRECAO_QTD').val(plan.QUANTITY_CORRECTION || '');

      $('#editExpireAtWrapper').toggle(!plan.always);
      $('#editAulaTipoWrapper').toggle(!!plan.HAS_CLASSES);
      $('#editCorrecaoQtdWrapper').toggle(!!plan.HAS_CORRECTION);

      modal.show();

    }).catch((err) => {
      alert(err.message);
    });

  });

  $('#PLAN_EDIT_CONTENT').on('input', function () {
    const md = $(this).val() || '';
    $('#editMarkdownPreview').html(marked.parse(md));
  });

  $('#PLAN_EDIT_ALWAYS').on('change', function () {
    if ($(this).is(':checked')) {
      $('#editExpireAtWrapper').hide();
      $('#PLAN_EDIT_EXPIREAT').val('');
      $('#editExpireAtError').hide();
    } else {
      $('#editExpireAtWrapper').show();
    }
  });

  $('#PLAN_EDIT_AULA_TEM').on('change', function () {
    if ($(this).is(':checked')) {
      $('#editAulaTipoWrapper').show();
    } else {
      $('#editAulaTipoWrapper').hide();
      $('#PLAN_EDIT_AULA_TIPO').val(null);
    }
  });

  $('#PLAN_EDIT_CORRECAO_TEM').on('change', function () {
    if ($(this).is(':checked')) {
      $('#editCorrecaoQtdWrapper').show();
    } else {
      $('#editCorrecaoQtdWrapper').hide();
      $('#PLAN_EDIT_CORRECAO_QTD').val('');
    }
  });

  $('#PLAN_EDIT_FORM').on('submit', async function (e) {
    e.preventDefault();

    $('#editExpireAtError').hide();
    $('#PLAN_EDIT_NAME')[0].classList.remove('is-invalid');
    $('#PLAN_EDIT_PRICE')[0].classList.remove('is-invalid');
    $('#PLAN_EDIT_CORRECAO_QTD')[0]?.classList.remove('is-invalid');

    const id = $(this).data('edit-id');
    if (!id) {
      alert('Erro: Nenhum plano selecionado para atualização.');
      return;
    }

    const nameVal = $('#PLAN_EDIT_NAME').val().trim();
    const priceVal = parseFloat($('#PLAN_EDIT_PRICE').val());
    const expireAtVal = $('#PLAN_EDIT_EXPIREAT').val().trim();
    const alwaysChecked = $('#PLAN_EDIT_ALWAYS').is(':checked');
    const hasAulas = $('#PLAN_EDIT_AULA_TEM').is(':checked');
    const aulaTipos = $('#PLAN_EDIT_AULA_TIPO').val() || [];
    const hasMaterias = $('#PLAN_EDIT_MATERIA_TEM').is(':checked');
    const hasThemes = $('#PLAN_EDIT_TEMA_TEM').is(':checked');
    const hasCorrecao = $('#PLAN_EDIT_CORRECAO_TEM').is(':checked');
    const correcaoQtdVal = parseInt($('#PLAN_EDIT_CORRECAO_QTD').val(), 10);

    let valid = true;

    if (nameVal.length < 3) {
      $('#PLAN_EDIT_NAME')[0].classList.add('is-invalid');
      valid = false;
    }

    if (!(priceVal > 0)) {
      $('#PLAN_EDIT_PRICE')[0].classList.add('is-invalid');
      valid = false;
    }

    const expireAtPattern = /^\d+d$/;
    if (!alwaysChecked && !expireAtPattern.test(expireAtVal)) {
      $('#editExpireAtError').show();
      valid = false;
    }

    if (hasAulas && !aulaTipos.length) {
      alert('Selecione ao menos um tipo de aula (Ao Vivo, Gravada ou Ambos).');
      valid = false;
    }

    if (hasCorrecao && !(correcaoQtdVal >= 1 && correcaoQtdVal <= 100)) {
      $('#PLAN_EDIT_CORRECAO_QTD')[0].classList.add('is-invalid');
      valid = false;
    }

    if (!hasThemes && !hasMaterias && !hasCorrecao && !hasAulas) {
      alert('Selecione pelo menos um item: Temas, Aulas, Matérias ou Correções.');
      valid = false;
    }

    if (!valid) return;

const payload = {
  UID: 'seu-uid-aqui',
  name: nameVal,
  content: $('#PLAN_EDIT_CONTENT').val(),
  always: alwaysChecked,
  EXPIRED: alwaysChecked ? null : expireAtVal,
  price: priceVal,
  HAS_CLASSES: hasAulas,
  TYPE_CLASS: hasAulas ? JSON.stringify(aulaTipos) : "[]",
  HAS_MATERIALS: hasMaterias,
  HAS_CORRECTION: hasCorrecao,
  QUANTITY_CORRECTION: hasCorrecao ? correcaoQtdVal : 0,
  HAS_THEMES: hasThemes
};

    const { data } = await axios.put(`${window.API}/plan/update?id=${id}`, payload).catch((err) => {
      return alert(err.message);
    });

    if (data.status) {
      alert('Plano atualizado com sucesso!');
      $('#editPlanModal').modal('hide');
      await LoadPlans();
      $('#PLAN_EDIT_FORM').removeData('edit-id');
      this.reset();
      $('#editExpireAtWrapper').show();
      $('#editAulaTipoWrapper').hide();
      $('#editCorrecaoQtdWrapper').hide();
      $('#editMarkdownPreview').html('');
    }

  });

});