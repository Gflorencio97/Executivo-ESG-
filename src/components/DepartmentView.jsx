import React, { useState } from 'react';
import {
  Factory, ShoppingBag, CheckCircle2, Wrench, Cpu,
  Boxes, TrendingUp, DraftingCompass, AlertTriangle,
  ArrowUpRight, BarChart2, ChevronRight, ChevronLeft,
  MousePointerClick
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from 'recharts';

export default function DepartmentView({ data }) {
  const [selectedDeptId, setSelectedDeptId] = useState('fabrica');
  const [selectedKpiIndex, setSelectedKpiIndex] = useState(0);

  const deptIcons = {
    fabrica: Factory,
    compras: ShoppingBag,
    qualidade: CheckCircle2,
    manutencao: Wrench,
    processos: Cpu,
    almoxarifado: Boxes,
    comercial: TrendingUp,
    engenharia: DraftingCompass,
  };

  const currentIndex = data.departments.findIndex(d => d.id === selectedDeptId);
  const selectedDept = data.departments[currentIndex >= 0 ? currentIndex : 0];
  const IconComponent = deptIcons[selectedDept.id] || Factory;

  const prevDept = data.departments[(currentIndex - 1 + data.departments.length) % data.departments.length];
  const nextDept = data.departments[(currentIndex + 1) % data.departments.length];

  const handleSelectDept = (id) => {
    setSelectedDeptId(id);
    setSelectedKpiIndex(0);
  };

  // Safe selected KPI card
  const currentKpi = selectedDept.kpis[selectedKpiIndex] || selectedDept.kpis[0];

  // Specific historical chart datasets for each KPI in each department
  const getKpiChartConfig = (deptId, kpiIdx) => {
    switch (deptId) {
      case 'fabrica': {
        if (kpiIdx === 0) {
          return {
            title: 'OEE Tecnologia (%)',
            unit: '%',
            data: data.monthlyMetrics.map(m => ({
              month: m.month,
              Realizado: m.oee,
              Meta: m.oeeMeta,
            }))
          };
        }
        if (kpiIdx === 1) {
          return {
            title: 'Redução de Custo Geral (R$)',
            unit: 'R$',
            data: data.savingsByMonth.map(m => ({
              month: m.month,
              Realizado: m.realizado,
              Meta: 73273.45,
            }))
          };
        }
        if (kpiIdx === 2) {
          return {
            title: 'Qualidade Interna Fabril (PPM)',
            unit: 'PPM',
            data: data.monthlyMetrics.map(m => ({
              month: m.month,
              Realizado: m.ppm,
              Meta: m.ppmMeta,
            }))
          };
        }
        return {
          title: 'Taxa de Gravidade (Dias Perdidos)',
          unit: 'Dias',
          data: [
            { month: 'Jan', Realizado: 0, Meta: 500 },
            { month: 'Fev', Realizado: 0, Meta: 500 },
            { month: 'Mar', Realizado: 0, Meta: 500 },
            { month: 'Abr', Realizado: 0, Meta: 500 },
            { month: 'Mai', Realizado: 533, Meta: 500 },
            { month: 'Jun', Realizado: 0, Meta: 500 },
            { month: 'Jul', Realizado: 0, Meta: 500 },
          ]
        };
      }

      case 'compras': {
        if (kpiIdx === 0) {
          return {
            title: 'Índice IQF Fornecedores (%)',
            unit: '%',
            data: data.monthlyMetrics.map(m => ({
              month: m.month,
              Realizado: m.iqf,
              Meta: m.iqfMeta,
            }))
          };
        }
        if (kpiIdx === 1) {
          return {
            title: 'Atendimento Pedido x Entrega (%)',
            unit: '%',
            data: [
              { month: 'Jan', Realizado: 71.2, Meta: 100 },
              { month: 'Fev', Realizado: 74.5, Meta: 100 },
              { month: 'Mar', Realizado: 78.0, Meta: 100 },
              { month: 'Abr', Realizado: 82.3, Meta: 100 },
              { month: 'Mai', Realizado: 75.1, Meta: 100 },
              { month: 'Jun', Realizado: 72.8, Meta: 100 },
              { month: 'Jul', Realizado: 73.6, Meta: 100 },
            ]
          };
        }
        return {
          title: 'Saving de Negociação em Compras (R$)',
          unit: 'R$',
          data: [
            { month: 'Jan', Realizado: 4200, Meta: 8333 },
            { month: 'Fev', Realizado: 5100, Meta: 8333 },
            { month: 'Mar', Realizado: 3800, Meta: 8333 },
            { month: 'Abr', Realizado: 3200, Meta: 8333 },
            { month: 'Mai', Realizado: 2900, Meta: 8333 },
            { month: 'Jun', Realizado: 2400, Meta: 8333 },
            { month: 'Jul', Realizado: 3029, Meta: 8333 },
          ]
        };
      }

      case 'qualidade': {
        if (kpiIdx === 0) {
          return {
            title: 'PPM Usinagem',
            unit: 'PPM',
            data: [
              { month: 'Jan', Realizado: 1850, Meta: 4000 },
              { month: 'Fev', Realizado: 5200, Meta: 4000 },
              { month: 'Mar', Realizado: 4800, Meta: 4000 },
              { month: 'Abr', Realizado: 1600, Meta: 4000 },
              { month: 'Mai', Realizado: 3900, Meta: 4000 },
              { month: 'Jun', Realizado: 2800, Meta: 4000 },
              { month: 'Jul', Realizado: 3468, Meta: 4000 },
            ]
          };
        }
        if (kpiIdx === 1) {
          return {
            title: 'PPM Montagem',
            unit: 'PPM',
            data: [
              { month: 'Jan', Realizado: 1184, Meta: 4000 },
              { month: 'Fev', Realizado: 4330, Meta: 4000 },
              { month: 'Mar', Realizado: 3900, Meta: 4000 },
              { month: 'Abr', Realizado: 1292, Meta: 4000 },
              { month: 'Mai', Realizado: 2734, Meta: 4000 },
              { month: 'Jun', Realizado: 1972, Meta: 4000 },
              { month: 'Jul', Realizado: 2459, Meta: 4000 },
            ]
          };
        }
        if (kpiIdx === 2) {
          return {
            title: 'Qualidade Cliente ZF/Varejo (PPM)',
            unit: 'PPM',
            data: [
              { month: 'Jan', Realizado: 750, Meta: 800 },
              { month: 'Fev', Realizado: 1200, Meta: 800 },
              { month: 'Mar', Realizado: 2100, Meta: 800 },
              { month: 'Abr', Realizado: 1850, Meta: 800 },
              { month: 'Mai', Realizado: 3200, Meta: 800 },
              { month: 'Jun', Realizado: 4100, Meta: 800 },
              { month: 'Jul', Realizado: 4892, Meta: 800 },
            ]
          };
        }
        return {
          title: 'Índice de Reclamação de Clientes (%)',
          unit: '%',
          data: [
            { month: 'Jan', Realizado: 0.012, Meta: 1.50 },
            { month: 'Fev', Realizado: 0.015, Meta: 1.50 },
            { month: 'Mar', Realizado: 0.018, Meta: 1.50 },
            { month: 'Abr', Realizado: 0.010, Meta: 1.50 },
            { month: 'Mai', Realizado: 0.022, Meta: 1.50 },
            { month: 'Jun', Realizado: 0.019, Meta: 1.50 },
            { month: 'Jul', Realizado: 0.016, Meta: 1.50 },
          ]
        };
      }

      case 'manutencao': {
        if (kpiIdx === 0) {
          return {
            title: 'Redução de Custo de Manutenção (R$)',
            unit: 'R$',
            data: [
              { month: 'Jan', Realizado: 12169, Meta: 20872 },
              { month: 'Fev', Realizado: 5200, Meta: 20872 },
              { month: 'Mar', Realizado: 1800, Meta: 20872 },
              { month: 'Abr', Realizado: 0, Meta: 20872 },
              { month: 'Mai', Realizado: 3350, Meta: 20872 },
              { month: 'Jun', Realizado: 0, Meta: 20872 },
              { month: 'Jul', Realizado: 0, Meta: 20872 },
            ]
          };
        }
        if (kpiIdx === 1) {
          return {
            title: 'Custo Manutenção / Faturamento (%)',
            unit: '%',
            data: [
              { month: 'Jan', Realizado: 2.10, Meta: 2.50 },
              { month: 'Fev', Realizado: 2.35, Meta: 2.50 },
              { month: 'Mar', Realizado: 2.40, Meta: 2.50 },
              { month: 'Abr', Realizado: 2.15, Meta: 2.50 },
              { month: 'Mai', Realizado: 2.28, Meta: 2.50 },
              { month: 'Jun', Realizado: 2.05, Meta: 2.50 },
              { month: 'Jul', Realizado: 2.19, Meta: 2.50 },
            ]
          };
        }
        return {
          title: 'Custo Manutenção por Peça Produzida (R$)',
          unit: 'R$/peça',
          data: [
            { month: 'Jan', Realizado: 0.28, Meta: 3.00 },
            { month: 'Fev', Realizado: 0.31, Meta: 3.00 },
            { month: 'Mar', Realizado: 0.26, Meta: 3.00 },
            { month: 'Abr', Realizado: 0.24, Meta: 3.00 },
            { month: 'Mai', Realizado: 0.27, Meta: 3.00 },
            { month: 'Jun', Realizado: 0.23, Meta: 3.00 },
            { month: 'Jul', Realizado: 0.25, Meta: 3.00 },
          ]
        };
      }

      case 'processos': {
        if (kpiIdx === 0) {
          return {
            title: 'Taxa de Refugo Geral (%)',
            unit: '%',
            data: data.monthlyMetrics.map(m => ({
              month: m.month,
              Realizado: m.refugo,
              Meta: m.refugoMeta,
            }))
          };
        }
        if (kpiIdx === 1) {
          return {
            title: 'Aprovação em Auditorias de Processo (%)',
            unit: '%',
            data: [
              { month: 'Jan', Realizado: 92.0, Meta: 90.0 },
              { month: 'Fev', Realizado: 90.5, Meta: 90.0 },
              { month: 'Mar', Realizado: 88.0, Meta: 90.0 },
              { month: 'Abr', Realizado: 91.2, Meta: 90.0 },
              { month: 'Mai', Realizado: 89.0, Meta: 90.0 },
              { month: 'Jun', Realizado: 90.2, Meta: 90.0 },
              { month: 'Jul', Realizado: 89.5, Meta: 90.0 },
            ]
          };
        }
        return {
          title: 'Saving em Ferramentas e Reúso (R$)',
          unit: 'R$',
          data: [
            { month: 'Jan', Realizado: 3354, Meta: 33532 },
            { month: 'Fev', Realizado: 5154, Meta: 33532 },
            { month: 'Mar', Realizado: 4625, Meta: 33532 },
            { month: 'Abr', Realizado: 5685, Meta: 33532 },
            { month: 'Mai', Realizado: 0, Meta: 33532 },
            { month: 'Jun', Realizado: 680, Meta: 33532 },
            { month: 'Jul', Realizado: 2977, Meta: 33532 },
          ]
        };
      }

      case 'almoxarifado': {
        if (kpiIdx === 0) {
          return {
            title: 'Acuracidade de Estoque (%)',
            unit: '%',
            data: [
              { month: 'Jan', Realizado: 94.2, Meta: 95.0 },
              { month: 'Fev', Realizado: 94.8, Meta: 95.0 },
              { month: 'Mar', Realizado: 95.1, Meta: 95.0 },
              { month: 'Abr', Realizado: 95.0, Meta: 95.0 },
              { month: 'Mai', Realizado: 95.3, Meta: 95.0 },
              { month: 'Jun', Realizado: 94.9, Meta: 95.0 },
              { month: 'Jul', Realizado: 95.0, Meta: 95.0 },
            ]
          };
        }
        if (kpiIdx === 1) {
          return {
            title: 'Ruptura de Estoque (Itens em Falta)',
            unit: 'Itens',
            data: [
              { month: 'Jan', Realizado: 0, Meta: 1 },
              { month: 'Fev', Realizado: 0, Meta: 1 },
              { month: 'Mar', Realizado: 0, Meta: 1 },
              { month: 'Abr', Realizado: 0, Meta: 1 },
              { month: 'Mai', Realizado: 0, Meta: 1 },
              { month: 'Jun', Realizado: 0, Meta: 1 },
              { month: 'Jul', Realizado: 0, Meta: 1 },
            ]
          };
        }
        return {
          title: 'Divergências no Recebimento Físico x Fiscal',
          unit: 'Casos',
          data: [
            { month: 'Jan', Realizado: 0, Meta: 1 },
            { month: 'Fev', Realizado: 0, Meta: 1 },
            { month: 'Mar', Realizado: 0, Meta: 1 },
            { month: 'Abr', Realizado: 0, Meta: 1 },
            { month: 'Mai', Realizado: 0, Meta: 1 },
            { month: 'Jun', Realizado: 0, Meta: 1 },
            { month: 'Jul', Realizado: 0, Meta: 1 },
          ]
        };
      }

      case 'comercial': {
        if (kpiIdx === 0) {
          return {
            title: 'Faturamento ZF Brasil (R$)',
            unit: 'R$',
            data: [
              { month: 'Jan', Realizado: 543737, Meta: 1000000 },
              { month: 'Fev', Realizado: 499033, Meta: 1000000 },
              { month: 'Mar', Realizado: 673087, Meta: 1000000 },
              { month: 'Abr', Realizado: 475431, Meta: 1000000 },
              { month: 'Mai', Realizado: 563135, Meta: 1000000 },
              { month: 'Jun', Realizado: 409454, Meta: 1000000 },
              { month: 'Jul', Realizado: 515155, Meta: 1000000 },
            ]
          };
        }
        if (kpiIdx === 1) {
          return {
            title: 'Vendas Varejo Mercado Aberto (R$)',
            unit: 'R$',
            data: [
              { month: 'Jan', Realizado: 146390, Meta: 416666 },
              { month: 'Fev', Realizado: 134355, Meta: 416666 },
              { month: 'Mar', Realizado: 181216, Meta: 416666 },
              { month: 'Abr', Realizado: 128000, Meta: 416666 },
              { month: 'Mai', Realizado: 151600, Meta: 416666 },
              { month: 'Jun', Realizado: 110200, Meta: 416666 },
              { month: 'Jul', Realizado: 138678, Meta: 416666 },
            ]
          };
        }
        return {
          title: 'Exportação / Mercado Externo (R$)',
          unit: 'R$',
          data: [
            { month: 'Jan', Realizado: 6970, Meta: 166666 },
            { month: 'Fev', Realizado: 6398, Meta: 166666 },
            { month: 'Mar', Realizado: 8630, Meta: 166666 },
            { month: 'Abr', Realizado: 6095, Meta: 166666 },
            { month: 'Mai', Realizado: 7233, Meta: 166666 },
            { month: 'Jun', Realizado: 5288, Meta: 166666 },
            { month: 'Jul', Realizado: 6200, Meta: 166666 },
          ]
        };
      }

      case 'engenharia': {
        if (kpiIdx === 0) {
          return {
            title: 'Projetos Implantados (Acumulado)',
            unit: 'Itens',
            data: [
              { month: 'Jan', Realizado: 3, Meta: 4 },
              { month: 'Fev', Realizado: 5, Meta: 8 },
              { month: 'Mar', Realizado: 8, Meta: 12 },
              { month: 'Abr', Realizado: 12, Meta: 16 },
              { month: 'Mai', Realizado: 15, Meta: 20 },
              { month: 'Jun', Realizado: 18, Meta: 24 },
              { month: 'Jul', Realizado: 21, Meta: 28 },
            ]
          };
        }
        if (kpiIdx === 1) {
          return {
            title: 'Tempo Médio de Desenvolvimento e Entrega',
            unit: 'Dias',
            data: [
              { month: 'Jan', Realizado: 89, Meta: 90 },
              { month: 'Fev', Realizado: 87, Meta: 90 },
              { month: 'Mar', Realizado: 86, Meta: 90 },
              { month: 'Abr', Realizado: 84, Meta: 90 },
              { month: 'Mai', Realizado: 85, Meta: 90 },
              { month: 'Jun', Realizado: 83, Meta: 90 },
              { month: 'Jul', Realizado: 82, Meta: 90 },
            ]
          };
        }
        return {
          title: 'Saving em Novos Produtos e Engenharia (R$)',
          unit: 'R$',
          data: [
            { month: 'Jan', Realizado: 8500, Meta: 33842 },
            { month: 'Fev', Realizado: 12000, Meta: 33842 },
            { month: 'Mar', Realizado: 15400, Meta: 33842 },
            { month: 'Abr', Realizado: 11200, Meta: 33842 },
            { month: 'Mai', Realizado: 9800, Meta: 33842 },
            { month: 'Jun', Realizado: 8200, Meta: 33842 },
            { month: 'Jul', Realizado: 9832, Meta: 33842 },
          ]
        };
      }

      default:
        return {
          title: 'Evolução Mensal',
          unit: '',
          data: data.savingsByMonth.map(m => ({
            month: m.month,
            Realizado: m.realizado,
            Meta: 10000,
          }))
        };
    }
  };

  const chartConfig = getKpiChartConfig(selectedDept.id, selectedKpiIndex);

  // Formatter helpers for Tooltip & Y-Axis
  const formatTooltipValue = (val) => {
    if (val === undefined || val === null) return '-';
    if (chartConfig.unit === 'R$') {
      return `R$ ${Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    if (chartConfig.unit === '%') {
      return `${Number(val).toFixed(val < 1 ? 3 : 1)}%`;
    }
    if (chartConfig.unit === 'PPM') {
      return `${Number(val).toLocaleString('pt-BR')} PPM`;
    }
    if (chartConfig.unit === 'R$/peça') {
      return `R$ ${Number(val).toFixed(2)}/peça`;
    }
    return `${Number(val).toLocaleString('pt-BR')} ${chartConfig.unit}`;
  };

  const formatYAxis = (val) => {
    if (chartConfig.unit === 'R$') {
      if (val >= 1000000) return `R$ ${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `R$ ${(val / 1000).toFixed(0)}k`;
      return `R$ ${val}`;
    }
    if (chartConfig.unit === '%') return `${val}%`;
    if (chartConfig.unit === 'PPM') {
      if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
      return val;
    }
    return val;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start animate-fadeIn">
      {/* Sticky Left Sidebar: Departments Navigation */}
      <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24 space-y-3">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-slate-800/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Departamentos
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {data.departments.length} Setores
            </span>
          </div>

          <nav className="space-y-1.5">
            {data.departments.map((dept) => {
              const Icon = deptIcons[dept.id] || Factory;
              const isSelected = dept.id === selectedDeptId;

              return (
                <button
                  key={dept.id}
                  onClick={() => handleSelectDept(dept.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all group ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 font-bold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent hover:border-slate-700/60'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-slate-400 group-hover:text-emerald-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="truncate">{dept.name}</span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'text-white translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="mt-4 pt-3 border-t border-slate-800/80 px-2 text-[11px] text-slate-500">
            Dica: O menu permanece fixo enquanto você rola a página.
          </div>
        </div>
      </aside>

      {/* Right Column: Main Department Content */}
      <div className="flex-1 w-full space-y-6">
        {/* Selected Department Overview Banner */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-400">Departamento Ativo</div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{selectedDept.name}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 flex items-center gap-1.5 font-medium">
                <MousePointerClick className="w-3.5 h-3.5" />
                Clique nos cartões para alterar o gráfico
              </span>
              <span className="text-xs text-slate-400 self-start sm:self-auto bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 hidden md:inline">
                Exercício 2026
              </span>
            </div>
          </div>

          {/* Interactive Department KPIs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {selectedDept.kpis.map((kpi, idx) => {
              const isSelected = idx === selectedKpiIndex;
              const isSuccess = kpi.status === 'success';
              const isWarning = kpi.status === 'warning';
              const isDanger = kpi.status === 'danger';

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedKpiIndex(idx)}
                  className={`relative text-left rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all duration-200 group cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900/95 border-2 border-emerald-500 ring-4 ring-emerald-500/20 shadow-xl shadow-emerald-500/10 -translate-y-1'
                      : 'bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Top Status & Badge */}
                  <div className="flex justify-between items-start gap-2 w-full">
                    <span className={`text-[11px] font-medium transition-colors ${
                      isSelected ? 'text-white font-bold' : 'text-slate-400 group-hover:text-slate-300'
                    }`}>
                      {kpi.label}
                    </span>
                    <div
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        isSuccess
                          ? 'bg-emerald-400 ring-4 ring-emerald-500/20'
                          : isWarning
                          ? 'bg-amber-400 ring-4 ring-amber-500/20'
                          : isDanger
                          ? 'bg-rose-400 ring-4 ring-rose-500/20'
                          : 'bg-blue-400 ring-4 ring-blue-500/20'
                      }`}
                    />
                  </div>

                  {/* Main Value */}
                  <div className={`text-2xl font-black tracking-tight ${
                    isSelected ? 'text-emerald-400' : 'text-white'
                  }`}>
                    {kpi.atual}
                  </div>

                  {/* Meta / Indicator Footer */}
                  <div className="w-full pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <div className="text-slate-400 flex items-center gap-1">
                      <span>Meta:</span>
                      <span className="font-semibold text-slate-300">{kpi.meta}</span>
                    </div>

                    {/* Active State Pill */}
                    {isSelected ? (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-500/30">
                        <BarChart2 className="w-3 h-3" /> No Gráfico
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 group-hover:text-emerald-400 transition-colors flex items-center gap-0.5">
                        Ver histórico →
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Historical Trend Chart linked to Selected KPI Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <BarChart2 className="w-4 h-4" />
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Desempenho Histórico Mensal • {selectedDept.name}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Visualizando indicador selecionado: <strong className="text-emerald-400 font-semibold">{currentKpi.label}</strong> (Realizado vs Meta oficial ao longo de 2026)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                Unidade: {chartConfig.unit || 'Valor'}
              </span>
              <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60 hidden sm:inline">
                Meta vs Realizado
              </span>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartConfig.data} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickFormatter={formatYAxis}
                />
                <Tooltip
                  formatter={(val, name) => [formatTooltipValue(val), name]}
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                  }}
                  labelStyle={{ color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px', paddingTop: '14px' }}
                />
                <Bar
                  dataKey="Realizado"
                  fill="#10b981"
                  name={`Realizado (${chartConfig.unit})`}
                  radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="Meta"
                  fill="#64748b"
                  name={`Meta Oficial (${chartConfig.unit})`}
                  radius={[5, 5, 0, 0]}
                  opacity={0.65}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Quick Navigation between Departments */}
        <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-xs">
          <button
            onClick={() => handleSelectDept(prevDept.id)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior: <strong>{prevDept.name}</strong></span>
          </button>

          <span className="text-slate-500 hidden sm:inline text-[11px]">
            {currentIndex + 1} de {data.departments.length} departamentos
          </span>

          <button
            onClick={() => handleSelectDept(nextDept.id)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <span>Próximo: <strong>{nextDept.name}</strong></span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

