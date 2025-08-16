import { PlanAll } from "@script/ts/axios";
import $ from "jquery";

export async function LoadPlans() {

  const plan = await PlanAll();
  
  if (!plan?.status) {
    $('#admin-pacotes').html(`
      <div class="alert alert-danger text-center" role="alert">
        <b><i class="fas fa-exclamation-triangle"></i> Erro ao carregar planos:</b> ${plan} 
      </div>
    `);
    return;
  }

  const pacotes = $('#admin-pacotes');
  pacotes.empty(); 

  if (!plan.plans || plan.plans.length === 0) {
    pacotes.html(`
      <div class="alert alert-warning text-center" role="alert">
        <b><i class="fas fa-info-circle"></i> Nenhum plano cadastrado.</b>
      </div>
    `);
    return;
  }

  plan.plans.forEach(plan => {
    const html = `
      <article class="card">
        <h3 class="text-center card-title mb-4">
          <i class="fas fa-book"></i> ${plan.name}
        </h3>
        ${plan.content || ''}
        <p class="fw-bold text-primary mb-3">
          R$${plan.price.toFixed(2).replace('.', ',')} 
          ${plan.always ? '(vitalício)' : `(${plan.EXPIRED || '—'})`}
        </p>
        <div class="admin-pacotes-actions">
          <button class="btn-view" data-id="${plan.id}"><i class="fas fa-eye"></i></button>
          <button class="btn-edit" data-id="${plan.id}"><i class="fas fa-edit"></i></button>
          <button class="btn-delete" data-id="${plan.id}"><i class="fas fa-trash"></i></button>
        </div>
      </article>`;
    pacotes.append(html);
  });
  
}
