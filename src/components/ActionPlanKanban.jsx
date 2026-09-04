import React, { useState } from 'react';
import {
  Kanban, CheckCircle2, Clock, AlertCircle, Plus,
  DollarSign, User, Calendar, MapPin, HelpCircle,
  TrendingUp, Sparkles, Filter, ChevronRight, X, Save
} from 'lucide-react';

export default function ActionPlanKanban({ data }) {
  const [plans, setPlans] = useState(data.actionPlans || []);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isNewActionModalOpen, setIsNewActionModalOpen] = useState(false);

  // New Action Form State
  const [newAction, setNewAction] = useState({
    title: '',
    processo: 'Manutenção / Produção',
    quem: '',
    quando: '',
    onde: '',
    porQue: '',
    como: '',
    custo: '',
    savingPrevisto: '',
    status: 'Em Andamento'
  });

  const formatBRL = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const columns = [
    { id: 'A Fazer', title: 'A Fazer (Backlog)', color: 'border-slate-700 bg-slate-900/40 text-slate-300' },
    { id: 'Em Andamento', title: 'Em Andamento', color: 'border-blue-500/40 bg-blue-950/20 text-blue-400' },
    { id: 'Concluído', title: 'Concluído (Saving Capturado)', color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400' }
  ];

  const handleStatusChange = (id, newStatus) => {
    setPlans(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          status: newStatus,
          savingRealizado: newStatus === 'Concluído' ? (p.savingRealizado || p.savingPrevisto) : 0
        };
      }
      return p;
    }));
  };

  const handleCreateAction = (e) => {
    e.preventDefault();
    if (!newAction.title) return;

    const created = {
      id: `ACT-${String(plans.length + 1).padStart(2, '0')}`,
      title: newAction.title,
      processo: newAction.processo || 'Processos / Fábrica',
      status: newAction.status,
      savingRealizado: newAction.status === 'Concluído' ? Number(newAction.savingPrevisto) || 0 : 0,
      savingPrevisto: Number(newAction.savingPrevisto) || 0,
      quem: newAction.quem || 'Liderança de Área',
      quando: newAction.quando || 'Agosto/2026',
      onde: newAction.onde || 'Fábrica / Linha de Produção',
      porQue: newAction.porQue || 'Otimização de custos operacionais e redução de perdas.',
      como: newAction.como || 'Padronização do procedimento e acompanhamento diário.',
      custo: Number(newAction.custo) || 0
    };

    setPlans([...plans, created]);
    setIsNewActionModalOpen(false);
    setNewAction({
      title: '',
      processo: 'Manutenção / Produção',
      quem: '',
      quando: '',
      onde: '',
      porQue: '',
      como: '',
      custo: '',
      savingPrevisto: '',
      status: 'Em Andamento'
    });
  };

  const totalCapturedSaving = plans
    .filter(p => p.status === 'Concluído')
    .reduce((acc, p) => acc + (p.savingRealizado || p.savingPrevisto || 0), 0);

  const totalPipelineSaving = plans
    .filter(p => p.status !== 'Concluído')
    .reduce((acc, p) => acc + (p.savingPrevisto || 0), 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900 border border-blue-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Kanban className="w-3.5 h-3.5" />
              Metodologia 5W2H • Execução & Entrega de Savings
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Quadro de Iniciativas de Redução de Custos
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Gestão ágil das ações com atribuição de responsáveis, cronograma, método de execução e impacto financeiro direto no painel da diretoria.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex flex-wrap sm:flex-nowrap gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Saving Já Capturado</div>
                <div className="text-2xl font-black text-emerald-400">{formatBRL(totalCapturedSaving)}</div>
                <div className="text-[10px] text-emerald-400">Ações concluídas</div>
              </div>
              <div className="w-px bg-slate-800 hidden sm:block" />
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Potencial em Andamento</div>
                <div className="text-xl font-bold text-blue-400">{formatBRL(totalPipelineSaving)}</div>
                <div className="text-[10px] text-slate-400">Pipeline de melhorias</div>
              </div>
            </div>

            <button
              onClick={() => setIsNewActionModalOpen(true)}
              className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Ação 5W2H</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colPlans = plans.filter(p => p.status === col.id);

          return (
            <div
              key={col.id}
              className={`rounded-2xl border p-4 flex flex-col space-y-4 ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-bold text-sm text-slate-200">{col.title}</span>
                <span className="w-6 h-6 rounded-full bg-slate-800 text-xs font-bold flex items-center justify-center text-slate-300">
                  {colPlans.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-4 flex-1">
                {colPlans.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 text-xs italic">
                    Nenhuma iniciativa nesta etapa
                  </div>
                ) : (
                  colPlans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider bg-slate-800 px-2 py-0.5 rounded">
                          {plan.id}
                        </span>
                        <span className="text-xs font-bold text-emerald-400">
                          {formatBRL(plan.status === 'Concluído' ? (plan.savingRealizado || plan.savingPrevisto) : plan.savingPrevisto)}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white leading-snug">
                        {plan.title}
                      </h4>

                      <div className="text-[11px] text-slate-400 space-y-1 pt-2 border-t border-slate-800/80">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{plan.quem}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{plan.quando}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{plan.onde}</span>
                        </div>
                      </div>

                      {/* Quick Move Buttons */}
                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Mover para:</span>
                        <div className="flex gap-1">
                          {col.id !== 'A Fazer' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatusChange(plan.id, 'A Fazer'); }}
                              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                            >
                              Backlog
                            </button>
                          )}
                          {col.id !== 'Em Andamento' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatusChange(plan.id, 'Em Andamento'); }}
                              className="px-2 py-0.5 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-300"
                            >
                              Andamento
                            </button>
                          )}
                          {col.id !== 'Concluído' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatusChange(plan.id, 'Concluído'); }}
                              className="px-2 py-0.5 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300"
                            >
                              Concluir
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Nova Ação 5W2H */}
      {isNewActionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                  Nova Iniciativa
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Cadastrar Ação 5W2H</h3>
              </div>
              <button
                onClick={() => setIsNewActionModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAction} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">1. O que Fazer? (Título / Objetivo) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Eliminação de Vazamento de Ar Comprimido Linha 4"
                  value={newAction.title}
                  onChange={(e) => setNewAction({ ...newAction, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">2. Quem irá Fazer? (Responsável)</label>
                  <input
                    type="text"
                    placeholder="Ex: Carlos - Manutenção Pneumática"
                    value={newAction.quem}
                    onChange={(e) => setNewAction({ ...newAction, quem: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">3. Quando? (Cronograma)</label>
                  <input
                    type="text"
                    placeholder="Ex: Setembro/2026"
                    value={newAction.quando}
                    onChange={(e) => setNewAction({ ...newAction, quando: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">4. Onde Fazer? (Local / Setor)</label>
                  <input
                    type="text"
                    placeholder="Ex: Torno CNC 04 e Fresadora"
                    value={newAction.onde}
                    onChange={(e) => setNewAction({ ...newAction, onde: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Status Inicial</label>
                  <select
                    value={newAction.status}
                    onChange={(e) => setNewAction({ ...newAction, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="A Fazer">A Fazer (Backlog)</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">5. Por que Fazer? (Motivo / Justificativa)</label>
                <input
                  type="text"
                  placeholder="Ex: Reduzir tempo de funcionamento do compressor e economizar energia"
                  value={newAction.porQue}
                  onChange={(e) => setNewAction({ ...newAction, porQue: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">6. Como Fazer? (Método de Execução)</label>
                <textarea
                  rows="2"
                  placeholder="Ex: Troca de engates rápidos e vedações de mangueira pneumática..."
                  value={newAction.como}
                  onChange={(e) => setNewAction({ ...newAction, como: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">7. Quanto para Fazer? (Custo R$)</label>
                  <input
                    type="number"
                    placeholder="Ex: 800"
                    value={newAction.custo}
                    onChange={(e) => setNewAction({ ...newAction, custo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-emerald-400 font-medium">Saving Previsto (R$)</label>
                  <input
                    type="number"
                    placeholder="Ex: 7500"
                    value={newAction.savingPrevisto}
                    onChange={(e) => setNewAction({ ...newAction, savingPrevisto: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewActionModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Salvar Ação 5W2H
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5W2H Detail Drawer Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400">{selectedPlan.id} • Metodologia 5W2H</span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedPlan.title}</h3>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-400 block mb-1">1. O que Fazer? (Objetivo)</span>
                <p className="text-slate-200">{selectedPlan.title}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-400 block mb-1">2. Quem irá Fazer? (Responsável)</span>
                <p className="text-slate-200">{selectedPlan.quem}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-400 block mb-1">3. Quando? (Cronograma)</span>
                <p className="text-slate-200">{selectedPlan.quando}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-400 block mb-1">4. Onde Fazer? (Local)</span>
                <p className="text-slate-200">{selectedPlan.onde}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 col-span-2">
                <span className="font-bold text-slate-400 block mb-1">5. Por que Fazer? (Motivo / Justificativa)</span>
                <p className="text-slate-200">{selectedPlan.porQue}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 col-span-2">
                <span className="font-bold text-slate-400 block mb-1">6. Como Fazer? (Processo)</span>
                <p className="text-slate-200">{selectedPlan.como}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-slate-400 block mb-1">7. Quanto para Fazer? (Custo)</span>
                <p className="text-amber-400 font-bold">{formatBRL(selectedPlan.custo)}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">Saving Gerado:</span>
                <p className="text-emerald-400 font-bold">{formatBRL(selectedPlan.savingRealizado || selectedPlan.savingPrevisto)}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedPlan(null)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
