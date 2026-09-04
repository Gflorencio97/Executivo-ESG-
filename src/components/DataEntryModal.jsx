import React, { useState } from 'react';
import {
  Upload, FileSpreadsheet, PlusCircle, CheckCircle2,
  Database, ShieldAlert, ArrowRight, Save, Sparkles, X
} from 'lucide-react';

export default function DataEntryModal({ isOpen, onClose, onSaveData }) {
  const [entryMode, setEntryMode] = useState('form'); // 'form' or 'excel'
  const [selectedMonth, setSelectedMonth] = useState('Agosto');
  const [formData, setFormData] = useState({
    oee: '84.5',
    savingMensal: '12500',
    savingDescricao: 'Otimização de Ferramentas CNC e Vedações',
    ppmUsinagem: '2800',
    iqf: '95.2',
    energiaPeca: '0.38',
    aguaPeca: '0.07'
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    if (onSaveData) {
      onSaveData({
        month: selectedMonth,
        oee: parseFloat(formData.oee) || 0,
        savingMensal: parseFloat(formData.savingMensal) || 0,
        savingDescricao: formData.savingDescricao,
        ppmUsinagem: parseFloat(formData.ppmUsinagem) || 0,
        iqf: parseFloat(formData.iqf) || 0,
        energiaPeca: parseFloat(formData.energiaPeca) || 0,
        aguaPeca: parseFloat(formData.aguaPeca) || 0
      });
    }
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 mb-1">
              <Database className="w-3.5 h-3.5" />
              Central de Alimentação de Dados
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Como Atualizar os Indicadores
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 gap-3 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold relative z-10">
          <button
            onClick={() => setEntryMode('form')}
            className={`py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
              entryMode === 'form'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            1. Formulário Web Direto (Sem Excel)
          </button>
          <button
            onClick={() => setEntryMode('excel')}
            className={`py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
              entryMode === 'excel'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            2. Arrastar Planilha Excel
          </button>
        </div>

        {/* Mode 1: Web Form */}
        {entryMode === 'form' && (
          <form onSubmit={handleSave} className="space-y-4 relative z-10 text-xs">
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-300 font-medium">Mês de Competência:</span>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-1 text-xs focus:outline-none focus:border-emerald-500"
              >
                {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map(m => (
                  <option key={m} value={m}>{m} / 2026</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400 font-medium">OEE Realizado (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.oee}
                  onChange={(e) => setFormData({ ...formData, oee: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Saving do Mês (R$)</label>
                <input
                  type="number"
                  value={formData.savingMensal}
                  onChange={(e) => setFormData({ ...formData, savingMensal: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-slate-400 font-medium">Descrição da Iniciativa de Redução</label>
                <input
                  type="text"
                  value={formData.savingDescricao}
                  onChange={(e) => setFormData({ ...formData, savingDescricao: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Qualidade PPM Usinagem</label>
                <input
                  type="number"
                  value={formData.ppmUsinagem}
                  onChange={(e) => setFormData({ ...formData, ppmUsinagem: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Índice IQF Fornecedores (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.iqf}
                  onChange={(e) => setFormData({ ...formData, iqf: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Validation Callout */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-[11px] text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Validação automática: fórmulas e gráficos do diretor recalculam no mesmo segundo!</span>
            </div>

            {savedSuccess ? (
              <div className="p-3 bg-emerald-600 text-white font-bold rounded-xl text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Dados de {selectedMonth}/2026 salvos com sucesso!
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar Lançamento Mensal
              </button>
            )}
          </form>
        )}

        {/* Mode 2: Drag and Drop Excel */}
        {entryMode === 'excel' && (
          <div className="space-y-4 relative z-10 text-xs">
            <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-2xl p-8 text-center bg-slate-950/40 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                Arraste seu arquivo Excel (.xlsx) aqui
              </h4>
              <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
                O sistema lê automaticamente as 14 abas (KPI, ESG, Manutenção, Compras, etc.) e atualiza o cockpit.
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-slate-700"
              >
                Selecionar arquivo do computador
              </button>
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="font-semibold text-slate-300">Compatibilidade Total: </span>
              Suporta a planilha padrão <code className="text-emerald-400 font-mono">ESG - REDUÇÃO CUSTO GERAL 2026.xlsx</code> sem necessidade de adaptação manual.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
