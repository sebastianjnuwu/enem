$(function () {
  $('#PLAN_CONTENT_TITLE').on('input', function () {
    const md = $(this).val() || '';
    $('#markdownPreview').html(marked.parse(md));
  });

  $('#PLAN_ALWAYS_TITLE').on('change', function () {
    if ($(this).is(':checked')) {
      $('#expireAtWrapper').hide();
      $('#PLAN_EXPIREAT_TITLE').val('');
      $('#expireAtError').hide();
    } else {
      $('#expireAtWrapper').show();
    }
  });

  $('#PLAN_AULA_TEM_TITLE').on('change', function () {
    if ($(this).is(':checked')) {
      $('#aulaTipoWrapper').show();
    } else {
      $('#aulaTipoWrapper').hide();
      $('#PLAN_AULA_TIPO_TITLE').val(null);
    }
  });

  $('#PLAN_CORRECAO_TEM_TITLE').on('change', function () {
    if ($(this).is(':checked')) {
      $('#correcaoQtdWrapper').show();
    } else {
      $('#correcaoQtdWrapper').hide();
      $('#PLAN_CORRECAO_QTD_TITLE').val('');
    }
  });

  $('#PLAN_FORM').on('submit', async function (e) {
    e.preventDefault();

    $('#expireAtError').hide();
    $('#PLAN_NAME_TITLE')[0].classList.remove('is-invalid');
    $('#PLAN_PRICE_TITLE')[0].classList.remove('is-invalid');
    $('#PLAN_CORRECAO_QTD_TITLE')[0]?.classList.remove('is-invalid');

    const nameVal = $('#PLAN_NAME_TITLE').val().trim();
    const priceVal = parseFloat($('#PLAN_PRICE_TITLE').val());
    const expireAtVal = $('#PLAN_EXPIREAT_TITLE').val().trim();
    const alwaysChecked = $('#PLAN_ALWAYS_TITLE').is(':checked');
    const hasAulas = $('#PLAN_AULA_TEM_TITLE').is(':checked');
    const aulaTipos = $('#PLAN_AULA_TIPO_TITLE').val() || [];
    const hasMaterias = $('#PLAN_MATERIA_TEM_TITLE').is(':checked');
    const hasThemes = $('#PLAN_TEMA_TEM_TITLE').is(':checked');
    const hasCorrecao = $('#PLAN_CORRECAO_TEM_TITLE').is(':checked');
    const correcaoQtdVal = parseInt($('#PLAN_CORRECAO_QTD_TITLE').val(), 10);

    let valid = true;

    if (nameVal.length < 3) {
      $('#PLAN_NAME_TITLE')[0].classList.add('is-invalid');
      valid = false;
    }

    if (!(priceVal > 0)) {
      $('#PLAN_PRICE_TITLE')[0].classList.add('is-invalid');
      valid = false;
    }

    const expireAtPattern = /^\d+d$/;
    if (!alwaysChecked && !expireAtPattern.test(expireAtVal)) {
      $('#expireAtError').show();
      valid = false;
    }

    if (hasAulas && !aulaTipos.length) {
      alert('Selecione ao menos um tipo de aula (Ao Vivo, Gravada ou Ambos).');
      valid = false;
    }


    if (hasCorrecao && !(correcaoQtdVal >= 1 && correcaoQtdVal <= 100)) {
      $('#PLAN_CORRECAO_QTD_TITLE')[0].classList.add('is-invalid');
      valid = false;
    }
   
    if (!hasThemes && !hasMaterias && !hasCorrecao && !hasAulas) {
    alert('Selecione pelo menos um item: Temas, Aulas, Matérias ou Correções.');
    valid = false;
  }
  
    if (!valid) return;

    const data = {
      UID: 'seu-uid-aqui',
      name: nameVal,
      content: $('#PLAN_CONTENT_TITLE').val(),
      always: alwaysChecked,
      price: priceVal,
      EXPIRED: alwaysChecked ? null : expireAtVal,
      HAS_CLASSES: hasAulas,
      TYPE_CLASS: hasAulas ? JSON.stringify(aulaTipos) : "[]",
      HAS_MATERIALS: hasMaterias,
      HAS_CORRECTION: hasCorrecao,
      QUANTITY_CORRECTION: hasCorrecao ? correcaoQtdVal : 0,
      HAS_THEMES: hasThemes
    };

    
    const response = await axios.put(window.API + '/plan/create', data).catch((err) => {
      alert(err.message);
    });
    
      if (response.data.status) {
        alert('Plano criado com sucesso!');
        this.reset();
        await LoadPlans();
        $('#expireAtWrapper').show();
        $('#aulaTipoWrapper').hide();
        $('#correcaoQtdWrapper').hide();
        $('#markdownPreview').html('');
        $('#addPlanModal').modal('hide');
      }
    
  });
});