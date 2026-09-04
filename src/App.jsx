import React, { useState } from 'react';
import {
  BarChart3, Leaf, Globe2, Factory, Kanban,
  Upload, Monitor, Download, Calendar, ShieldCheck,
  Building2, Sparkles, CheckCircle2, ChevronDown
} from 'lucide-react';

import kpiData from './data/kpiData.json';
import ExecutiveView from './components/ExecutiveView.jsx';
import ESGView from './components/ESGView.jsx';
import ESGProjectsView from './components/ESGProjectsView.jsx';
import DepartmentView from './components/DepartmentView.jsx';
import ActionPlanKanban from './components/ActionPlanKanban.jsx';
import DataEntryModal from './components/DataEntryModal.jsx';

export default function App() {
  const [data, setData] = useState(kpiData);
  const [activeTab, setActiveTab] = useState('executive'); // 'executive', 'esg', 'esgProjects', 'dept', 'plano'
  const [selectedMonth, setSelectedMonth] = useState('Todos');
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isTvMode, setIsTvMode] = useState(false);

  const months = ['Todos (YTD)', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const monthMap = {
    'Janeiro': 'Jan', 'Fevereiro': 'Fev', 'Março': 'Mar', 'Abril': 'Abr',
    'Maio': 'Mai', 'Junho': 'Jun', 'Julho': 'Jul', 'Agosto': 'Ago',
    'Setembro': 'Set', 'Outubro': 'Out', 'Novembro': 'Nov', 'Dezembro': 'Dez'
  };

  const handleSaveData = (entry) => {
    const abbrev = monthMap[entry.month] || entry.month;

    setData((prev) => {
      // 1. Update savingsByMonth
      let runningTotal = 0;
      const updatedSavings = prev.savingsByMonth.map((item) => {
        if (item.month === abbrev) {
          const newVal = entry.savingMensal;
          runningTotal += newVal;
          return {
            ...item,
            realizado: newVal,
            acumulado: runningTotal,
            descricao: entry.savingDescricao || item.descricao
          };
        } else {
          runningTotal += item.realizado;
          return {
            ...item,
            acumulado: runningTotal
          };
        }
      });

      const newTotalSaving = runningTotal;
      const newPercent = ((newTotalSaving / prev.metaGeralEconomia) * 100).toFixed(2);

      // 2. Update monthlyMetrics
      const existingMetricIdx = prev.monthlyMetrics.findIndex(m => m.month === abbrev);
      let updatedMetrics = [...prev.monthlyMetrics];
      const metricObj = {
        month: abbrev,
        oee: entry.oee,
        oeeMeta: 90,
        ppm: entry.ppmUsinagem,
        ppmMeta: 4000,
        iqf: entry.iqf,
        iqfMeta: 90,
        refugo: 0.30,
        refugoMeta: 0.38,
        absenteismo: 2.1,
        turnover: 3.0,
        energiaCustoPeca: entry.energiaPeca || 0.38,
        aguaCustoPeca: entry.aguaPeca || 0.07,
        faturamento: 650000
      };

      if (existingMetricIdx >= 0) {
        updatedMetrics[existingMetricIdx] = { ...updatedMetrics[existingMetricIdx], ...metricObj };
      } else {
        updatedMetrics.push(metricObj);
      }

      // 3. Update executiveCards
      const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

      const updatedCards = prev.executiveCards.map((card) => {
        if (card.id === 'saving_geral') {
          return {
            ...card,
            realizado: formatCurrency(newTotalSaving),
            percentual: `${newPercent.replace('.', ',')}%`,
            trend: `+${formatCurrency(entry.savingMensal)} em ${abbrev}`
          };
        }
        if (card.id === 'oee' && entry.oee) {
          const isOk = entry.oee >= 90;
          return {
            ...card,
            realizado: `${entry.oee.toFixed(2).replace('.', ',')}%`,
            status: isOk ? 'success' : 'warning',
            statusLabel: isOk ? 'Meta Batida' : 'Abaixo da Meta',
            trend: `${abbrev}: ${entry.oee}% (Atualizado)`
          };
        }
        if (card.id === 'qualidade_ppm' && entry.ppmUsinagem) {
          const isOk = entry.ppmUsinagem <= 4000;
          return {
            ...card,
            realizado: `${entry.ppmUsinagem.toLocaleString('pt-BR')} PPM`,
            status: isOk ? 'success' : 'danger',
            statusLabel: isOk ? 'Meta Atingida' : 'Acima do Limite',
            trend: `${abbrev}: ${entry.ppmUsinagem} PPM (Atualizado)`
          };
        }
        if (card.id === 'iqf_fornecedores' && entry.iqf) {
          const isOk = entry.iqf >= 90;
          return {
            ...card,
            realizado: `${entry.iqf.toFixed(2).replace('.', ',')}%`,
            status: isOk ? 'success' : 'warning',
            statusLabel: isOk ? 'Acima da Meta' : 'Abaixo da Meta',
            trend: `${abbrev}: ${entry.iqf}% (Atualizado)`
          };
        }
        return card;
      });

      return {
        ...prev,
        realizadoEconomiaTotal: newTotalSaving,
        percentualAtingido: parseFloat(newPercent),
        savingsByMonth: updatedSavings,
        monthlyMetrics: updatedMetrics,
        executiveCards: updatedCards
      };
    });
  };

  const toggleTvMode = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsTvMode(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsTvMode(false);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${isTvMode ? 'p-4 sm:p-6' : ''}`}>
      {/* Top Corporate Executive Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Brand / Logo */}
            <div className="flex items-center gap-3.5">
              <div className="bg-white/95 px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-md flex items-center justify-center">
                <img src="/logo.png" alt="Evoluttion" className="h-7 w-auto object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-none">
                    Evoluttion - Executivo & ESG
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
                    2026
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">
                  Redução de Custo Geral • Conformidade & Eficiência Industrial
                </p>
              </div>
            </div>

            {/* Quick Actions (Month Selector, TV Mode, Data Entry) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Month Dropdown */}
              <div className="relative hidden md:block">
                <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="bg-transparent border-none text-xs text-white font-medium focus:outline-none cursor-pointer pr-1"
                  >
                    {months.map((m) => (
                      <option key={m} value={m} className="bg-slate-900 text-white">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* TV Mode Button */}
              <button
                onClick={toggleTvMode}
                title="Modo Apresentação / Telão TV"
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Monitor className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">{isTvMode ? 'Sair do Telão' : 'Modo TV'}</span>
              </button>

              {/* Update Data Button (Form / Excel) */}
              <button
                onClick={() => setIsDataModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition-all hover:scale-[1.02]"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Atualizar Dados</span>
              </button>
            </div>
          </div>

          {/* Navigation Bar (Tabs) */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 border-t border-slate-850 scrollbar-none text-xs font-medium">
            <button
              onClick={() => setActiveTab('executive')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'executive'
                  ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Visão Executiva (Diretoria)
            </button>

            <button
              onClick={() => setActiveTab('esg')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'esg'
                  ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-400" />
              Cockpit ESG
            </button>

            {/* NEW SECTION: PROJETOS ESG (Requested by user!) */}
            <button
              onClick={() => setActiveTab('esgProjects')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'esgProjects'
                  ? 'bg-teal-500/10 text-teal-300 font-bold border border-teal-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Globe2 className="w-4 h-4 text-teal-400" />
              Projetos ESG
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-teal-500/20 text-teal-300">
                Novo
              </span>
            </button>

            <button
              onClick={() => setActiveTab('dept')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'dept'
                  ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Factory className="w-4 h-4 text-blue-400" />
              Departamentos
            </button>

            <button
              onClick={() => setActiveTab('plano')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'plano'
                  ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Kanban className="w-4 h-4 text-amber-400" />
              Plano de Ação 5W2H
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'executive' && (
          <ExecutiveView
            data={data}
            selectedMonth={selectedMonth}
            onSelectTab={setActiveTab}
            onSelectMonth={setSelectedMonth}
          />
        )}

        {activeTab === 'esg' && (
          <ESGView
            data={data}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'esgProjects' && (
          <ESGProjectsView
            data={data}
          />
        )}

        {activeTab === 'dept' && (
          <DepartmentView
            data={data}
          />
        )}

        {activeTab === 'plano' && (
          <ActionPlanKanban
            data={data}
          />
        )}
      </main>

      {/* Corporate Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dados sincronizados com <strong className="text-slate-400">ESG - REDUÇÃO CUSTO GERAL 2026.xlsx</strong></span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Demonstração Executiva • TI & Diretoria</span>
            <span>Versão 1.0</span>
          </div>
        </div>
      </footer>

      {/* Data Entry & Import Modal */}
      <DataEntryModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        onSaveData={handleSaveData}
      />
    </div>
  );
}
