import React, { useState } from 'react';
import {
  Factory, ShoppingBag, CheckCircle2, Wrench, Cpu,
  Boxes, TrendingUp, DraftingCompass, AlertTriangle,
  ArrowUpRight, BarChart2, ChevronRight, ChevronLeft
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from 'recharts';

export default function DepartmentView({ data }) {
  const [selectedDeptId, setSelectedDeptId] = useState('fabrica');

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

  // Department specific chart datasets
  const getDeptChartData = (deptId) => {
    switch (deptId) {
      case 'fabrica':
        return data.monthlyMetrics.map(m => ({
          month: m.month,
          Realizado: m.oee,
          Meta: m.oeeMeta,
          name: 'OEE (%)'
        }));
      case 'qualidade':
        return data.monthlyMetrics.map(m => ({
          month: m.month,
          Realizado: m.ppm,
          Meta: m.ppmMeta,
          name: 'PPM Fabril'
        }));
      case 'compras':
        return data.monthlyMetrics.map(m => ({
          month: m.month,
          Realizado: m.iqf,
          Meta: m.iqfMeta,
          name: 'IQF Fornecedores (%)'
        }));
      case 'processos':
        return data.monthlyMetrics.map(m => ({
          month: m.month,
          Realizado: m.refugo,
          Meta: m.refugoMeta,
          name: 'Refugo (%)'
        }));
      case 'comercial':
        return data.monthlyMetrics.map(m => ({
          month: m.month,
          Realizado: m.faturamento,
          Meta: 1583333,
          name: 'Faturamento Mensal (R$)'
        }));
      default:
        return data.savingsByMonth.map(m => ({
          month: m.month,
          Realizado: m.realizado,
          Meta: 10000,
          name: 'Saving (R$)'
        }));
    }
  };

  const chartData = getDeptChartData(selectedDept.id);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start animate-fadeIn">
      {/* Sticky Left Sidebar: Departments Navigation (Option 1) */}
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
                  onClick={() => setSelectedDeptId(dept.id)}
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
            <span className="text-xs text-slate-400 self-start sm:self-auto bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              Exercício 2026 • Apuração Mensal
            </span>
          </div>

          {/* Department KPIs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {selectedDept.kpis.map((kpi, idx) => {
              const isSuccess = kpi.status === 'success';
              const isWarning = kpi.status === 'warning';
              const isDanger = kpi.status === 'danger';

              return (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-medium text-slate-400">{kpi.label}</span>
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
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

                  <div className="text-2xl font-extrabold text-white">
                    {kpi.atual}
                  </div>

                  <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 flex justify-between">
                    <span>Meta:</span>
                    <span className="font-semibold text-slate-300">{kpi.meta}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Historical Trend Chart for the Department */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-400" />
                Desempenho Histórico Mensal • {selectedDept.name}
              </h3>
              <p className="text-xs text-slate-400">
                Comparativo de Realizado vs Meta oficial ao longo do ano de 2026
              </p>
            </div>
            <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-lg">
              Meta vs Realizado
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Realizado" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Meta" fill="#64748b" radius={[4, 4, 0, 0]} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Quick Navigation between Departments */}
        <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-xs">
          <button
            onClick={() => setSelectedDeptId(prevDept.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior: <strong>{prevDept.name}</strong></span>
          </button>

          <span className="text-slate-500 hidden sm:inline text-[11px]">
            {currentIndex + 1} de {data.departments.length} departamentos
          </span>

          <button
            onClick={() => setSelectedDeptId(nextDept.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <span>Próximo: <strong>{nextDept.name}</strong></span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
