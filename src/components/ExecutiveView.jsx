import {
  TrendingDown, TrendingUp, AlertTriangle, CheckCircle2,
  DollarSign, Activity, Award, Users, ChevronRight,
  ShieldCheck, ArrowUpRight, Flame, BarChart3, Wrench,
  Cpu, ShoppingBag, Building2, Calendar
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, AreaChart, Area, Legend, Cell
} from 'recharts';

export default function ExecutiveView({ data, selectedMonth, onSelectTab, onSelectMonth }) {
  const iconMap = {
    Wrench: Wrench,
    Cpu: Cpu,
    ShoppingBag: ShoppingBag,
    Building2: Building2
  };

  // Format currency
  const formatBRL = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const isSpecificMonth = selectedMonth && selectedMonth !== 'Todos' && selectedMonth !== 'Todos (YTD)';
  const currentMonthMetric = isSpecificMonth
    ? data.monthlyMetrics.find(m => m.month === selectedMonth)
    : null;
  const currentMonthSaving = isSpecificMonth
    ? data.savingsByMonth.find(s => s.month === selectedMonth)
    : null;

  // Compute displayed cards dynamically based on selectedMonth
  const cardsToDisplay = isSpecificMonth ? [
    {
      id: 'saving_geral',
      title: `Saving em ${selectedMonth}`,
      category: 'Financeiro / Redução',
      meta: 'Meta Mensal: R$ 74.592',
      realizado: currentMonthSaving ? formatBRL(currentMonthSaving.realizado) : 'R$ 0,00',
      unit: 'R$',
      percentual: currentMonthSaving ? `${((currentMonthSaving.realizado / 74592) * 100).toFixed(1)}%` : '0%',
      status: currentMonthSaving && currentMonthSaving.realizado > 0 ? 'success' : 'warning',
      statusLabel: currentMonthSaving && currentMonthSaving.realizado > 0 ? 'Economia Registrada' : 'Sem Saving',
      trend: currentMonthSaving?.descricao || 'Ações operacionais',
      detalhe: `Acumulado até ${selectedMonth}: ${formatBRL(currentMonthSaving ? currentMonthSaving.acumulado : 0)}`
    },
    {
      id: 'oee',
      title: `OEE em ${selectedMonth}`,
      category: 'Produtividade Fabril',
      meta: '90,0%',
      realizado: currentMonthMetric ? `${currentMonthMetric.oee.toFixed(2)}%` : '78,12%',
      unit: '%',
      percentual: currentMonthMetric ? `${((currentMonthMetric.oee / 90) * 100).toFixed(1)}% da meta` : '86,8%',
      status: currentMonthMetric && currentMonthMetric.oee >= 90 ? 'success' : currentMonthMetric && currentMonthMetric.oee < 75 ? 'danger' : 'warning',
      statusLabel: currentMonthMetric && currentMonthMetric.oee >= 90 ? 'Meta Atingida' : 'Abaixo da Meta',
      trend: currentMonthMetric && currentMonthMetric.oee < 60 ? 'Parada programada / manutenção' : 'Operação estável',
      detalhe: `Meta OEE mensal é 90%`
    },
    {
      id: 'qualidade_ppm',
      title: `Qualidade PPM em ${selectedMonth}`,
      category: 'Qualidade Fabril',
      meta: '4.000 PPM',
      realizado: currentMonthMetric ? `${currentMonthMetric.ppm.toLocaleString('pt-BR')} PPM` : '2.964 PPM',
      unit: 'PPM',
      percentual: currentMonthMetric && currentMonthMetric.ppm <= 4000 ? 'Dentro do Limite' : 'Acima do Limite',
      status: currentMonthMetric && currentMonthMetric.ppm <= 4000 ? 'success' : 'danger',
      statusLabel: currentMonthMetric && currentMonthMetric.ppm <= 4000 ? 'Conforme' : 'Alerta Qualidade',
      trend: currentMonthMetric && currentMonthMetric.ppm <= 4000 ? 'Excelente conformidade' : 'Lotes com não-conformidade',
      detalhe: 'Limite máximo: 4.000 PPM'
    },
    {
      id: 'iqf_fornecedores',
      title: `IQF Fornecedores em ${selectedMonth}`,
      category: 'Suprimentos / Compras',
      meta: '90,0%',
      realizado: currentMonthMetric ? `${currentMonthMetric.iqf.toFixed(2)}%` : '94,13%',
      unit: '%',
      percentual: currentMonthMetric ? `${((currentMonthMetric.iqf / 90) * 100).toFixed(1)}%` : '104,6%',
      status: currentMonthMetric && currentMonthMetric.iqf >= 90 ? 'success' : 'warning',
      statusLabel: currentMonthMetric && currentMonthMetric.iqf >= 90 ? 'Meta Atingida' : 'Atenção',
      trend: 'Conformidade de materiais recebidos',
      detalhe: 'Meta de recebimento sem defeito: 90%'
    },
    data.executiveCards[4], // ESG
    {
      id: 'faturamento',
      title: `Faturamento em ${selectedMonth}`,
      category: 'Comercial & Vendas',
      meta: 'R$ 1.583.333',
      realizado: currentMonthMetric ? formatBRL(currentMonthMetric.faturamento) : 'R$ 650.000',
      unit: 'R$',
      percentual: currentMonthMetric ? `${((currentMonthMetric.faturamento / 1583333) * 100).toFixed(1)}%` : '41%',
      status: 'info',
      statusLabel: 'Faturamento Mensal',
      trend: `Vendas apuradas em ${selectedMonth}`,
      detalhe: 'ZF Brasil, Varejo e Exportação'
    }
  ] : data.executiveCards;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner: Saving Progress Bar */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950/40 border border-slate-700/60 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Flame className="w-3.5 h-3.5 text-emerald-400" />
              Meta Corporativa 2026 • Redução de Custo Geral
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Cockpit Estratégico de Redução de Custos
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Acompanhamento integrado das iniciativas de saving fabril, conformidade ESG e produtividade industrial com foco na meta anual de <span className="text-white font-semibold">{formatBRL(data.metaGeralEconomia)}</span>.
            </p>
          </div>

          {/* Quick Metrics Badge in Hero */}
          <div className="flex flex-wrap sm:flex-nowrap gap-4 bg-slate-950/60 backdrop-blur-md p-4 rounded-xl border border-slate-700/50">
            <div>
              <div className="text-xs font-medium text-slate-400">Total Economizado</div>
              <div className="text-2xl font-extrabold text-emerald-400">
                {formatBRL(data.realizadoEconomiaTotal)}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Acumulado Jan - Jul</div>
            </div>
            <div className="w-px bg-slate-800 hidden sm:block" />
            <div>
              <div className="text-xs font-medium text-slate-400">Meta Anual</div>
              <div className="text-xl font-bold text-slate-200">
                {formatBRL(data.metaGeralEconomia)}
              </div>
              <div className="text-xs text-amber-400 font-medium mt-0.5">2,94% realizado</div>
            </div>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="mt-8 space-y-2">
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-slate-300">Progresso do Saving Anual</span>
            <span className="text-emerald-400 font-bold">{formatBRL(data.realizadoEconomiaTotal)} de {formatBRL(data.metaGeralEconomia)}</span>
          </div>
          <div className="w-full h-4 bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-1000 shadow-lg shadow-emerald-500/30 relative"
              style={{ width: `${Math.max(4, (data.realizadoEconomiaTotal / data.metaGeralEconomia) * 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>R$ 0,00</span>
            <span>Meta Fábrica: {formatBRL(data.metaFabrica)}</span>
            <span>Meta Geral: {formatBRL(data.metaGeralEconomia)}</span>
          </div>
        </div>
      </div>

      {/* Active Month Filter Alert */}
      {isSpecificMonth && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-teal-500/10 border border-teal-500/30 rounded-2xl text-xs text-teal-300 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
            <span>Filtro Ativo: Exibindo fotografia pontual do mês de <strong>{selectedMonth} / 2026</strong>.</span>
          </div>
          <button
            onClick={() => onSelectMonth && onSelectMonth('Todos')}
            className="px-3 py-1.5 rounded-xl bg-teal-600/30 hover:bg-teal-600/50 text-teal-200 font-bold transition-colors text-[11px] self-start sm:self-auto"
          >
            Restaurar Visão Anual Consolidada (YTD) ✕
          </button>
        </div>
      )}

      {/* KPI Cards Grid (Faróis Executivos) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cardsToDisplay.map((card) => {
          const isSuccess = card.status === 'success';
          const isWarning = card.status === 'warning';
          const isDanger = card.status === 'danger';

          return (
            <div
              key={card.id}
              className="group relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    {card.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5 group-hover:text-emerald-400 transition-colors">
                    {card.title}
                  </h3>
                </div>
                {/* Status Indicator Pill */}
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    isSuccess
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : isWarning
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : isDanger
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {isSuccess && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {isWarning && <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>{card.statusLabel}</span>
                </div>
              </div>

              {/* Numbers */}
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {card.realizado}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Meta: <span className="text-slate-300 font-semibold">{card.meta}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-sm font-bold ${isSuccess ? 'text-emerald-400' : isWarning ? 'text-amber-400' : 'text-slate-300'}`}>
                    {card.percentual}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">atingimento</div>
                </div>
              </div>

              {/* Footer insight */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate pr-2">{card.trend}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors shrink-0" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Monthly Savings Trend (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                Evolução Mensal de Redução de Custo (Savings)
              </h3>
              <p className="text-xs text-slate-400">
                Valores realizados mês a mês em Reais (R$) e linha de acumulação
              </p>
            </div>
            <span className="text-xs font-medium text-slate-400 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
              Período: Jan - Dez / 2026
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.savingsByMonth} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }}
                  formatter={(value) => [formatBRL(value), 'Economia']}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Bar dataKey="realizado" name="Saving Mensal" radius={[4, 4, 0, 0]}>
                  {data.savingsByMonth.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={isSpecificMonth && entry.month === selectedMonth ? '#38bdf8' : '#10b981'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Highlights beneath chart */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-400">Maior Saving Mensal:</span>
              <p className="font-semibold text-emerald-400">R$ 15.523,75 (Jan)</p>
            </div>
            <div>
              <span className="text-slate-400">Média Mensal (Jan-Jul):</span>
              <p className="font-semibold text-white">R$ 6.428,22</p>
            </div>
            <div>
              <span className="text-slate-400">Ações em Andamento:</span>
              <p className="font-semibold text-blue-400">6 iniciativas 5W2H</p>
            </div>
            <div>
              <span className="text-slate-400">Previsão 2º Semestre:</span>
              <p className="font-semibold text-amber-400">R$ 74.592/mês</p>
            </div>
          </div>
        </div>

        {/* Right: Savings by Department Breakdown */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-blue-400" />
              Origem dos Savings
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Participação de cada departamento nas reduções capturadas
            </p>

            <div className="space-y-4">
              {data.savingsByDept.map((item) => {
                const IconComponent = iconMap[item.icon] || Wrench;
                return (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${item.color}20`, color: item.color }}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium text-slate-200">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-white">{formatBRL(item.valor)}</span>
                        <span className="text-slate-400 text-[11px] ml-1.5">({item.percent}%)</span>
                      </div>
                    </div>
                    {/* Tiny bar */}
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => onSelectTab('plano')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors border border-slate-700"
            >
              Ver Detalhes no Plano de Ação 5W2H
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Executive Summary Table: All Departments At a Glance */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">
              Painel Integrado de Governança por Área
            </h3>
            <p className="text-xs text-slate-400">
              Visão consolidada dos principais indicadores de cada departamento
            </p>
          </div>
          <button
            onClick={() => onSelectTab('dept')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 self-start sm:self-auto"
          >
            Abrir Visão Departamental Completa <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="pb-3 pl-2">Departamento</th>
                <th className="pb-3">KPI Principal</th>
                <th className="pb-3">Meta Anual</th>
                <th className="pb-3">Realizado (YTD)</th>
                <th className="pb-3">Status do Farol</th>
                <th className="pb-3 pr-2 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 pl-2 font-semibold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  Gestão Fábrica
                </td>
                <td className="py-3.5 text-slate-300">OEE Tecnologia</td>
                <td className="py-3.5 text-slate-400">90,0%</td>
                <td className="py-3.5 font-semibold text-amber-400">78,12%</td>
                <td className="py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Atenção (Queda Julho)
                  </span>
                </td>
                <td className="py-3.5 pr-2 text-right">
                  <button onClick={() => onSelectTab('dept')} className="text-slate-400 hover:text-white">Detalhar →</button>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 pl-2 font-semibold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  Qualidade Fabril
                </td>
                <td className="py-3.5 text-slate-300">PPM Usinagem + Montagem</td>
                <td className="py-3.5 text-slate-400">4.000 PPM</td>
                <td className="py-3.5 font-semibold text-emerald-400">2.964 PPM</td>
                <td className="py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Meta Batida (-26%)
                  </span>
                </td>
                <td className="py-3.5 pr-2 text-right">
                  <button onClick={() => onSelectTab('dept')} className="text-slate-400 hover:text-white">Detalhar →</button>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 pl-2 font-semibold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  Compras & Suprimentos
                </td>
                <td className="py-3.5 text-slate-300">Índice IQF Fornecedores</td>
                <td className="py-3.5 text-slate-400">90,0%</td>
                <td className="py-3.5 font-semibold text-emerald-400">94,13%</td>
                <td className="py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Excelente Desempenho
                  </span>
                </td>
                <td className="py-3.5 pr-2 text-right">
                  <button onClick={() => onSelectTab('dept')} className="text-slate-400 hover:text-white">Detalhar →</button>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 pl-2 font-semibold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  Manutenção Industrial
                </td>
                <td className="py-3.5 text-slate-300">Custo Manutenção / Faturamento</td>
                <td className="py-3.5 text-slate-400">2,50%</td>
                <td className="py-3.5 font-semibold text-emerald-400">2,19%</td>
                <td className="py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Controlado (R$ 22,5k saving)
                  </span>
                </td>
                <td className="py-3.5 pr-2 text-right">
                  <button onClick={() => onSelectTab('dept')} className="text-slate-400 hover:text-white">Detalhar →</button>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 pl-2 font-semibold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  Processos
                </td>
                <td className="py-3.5 text-slate-300">Taxa de Refugo (%)</td>
                <td className="py-3.5 text-slate-400">0,38%</td>
                <td className="py-3.5 font-semibold text-emerald-400">0,30%</td>
                <td className="py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Abaixo do Limite Máximo
                  </span>
                </td>
                <td className="py-3.5 pr-2 text-right">
                  <button onClick={() => onSelectTab('dept')} className="text-slate-400 hover:text-white">Detalhar →</button>
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 pl-2 font-semibold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                  Comercial
                </td>
                <td className="py-3.5 text-slate-300">Faturamento Vendas</td>
                <td className="py-3.5 text-slate-400">R$ 19.000.000</td>
                <td className="py-3.5 font-semibold text-blue-400">R$ 4.716.287</td>
                <td className="py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    ZF Brasil: R$ 3,68M
                  </span>
                </td>
                <td className="py-3.5 pr-2 text-right">
                  <button onClick={() => onSelectTab('dept')} className="text-slate-400 hover:text-white">Detalhar →</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
