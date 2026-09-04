import React, { useState } from 'react';
import {
  Leaf, Users, ShieldCheck, Zap, Droplets, Trash2,
  CheckCircle, AlertCircle, TrendingDown, ArrowUpRight,
  Clock, ShieldAlert, FileText, CheckCircle2, ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid, LineChart, Line
} from 'recharts';

export default function ESGView({ data, onSelectTab }) {
  const [activePillar, setActivePillar] = useState('all'); // 'all', 'E', 'S', 'G'

  const { environmental, social, governance } = data.esg;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ESG Header Score Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 border border-emerald-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Leaf className="w-3.5 h-3.5" />
              Sustentabilidade Corporativa • Diretrizes ESG 2026
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Cockpit Integrado de Indicadores ESG
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Monitoramento dos pilares de <span className="text-emerald-400 font-semibold">Eficiência Ambiental</span>, <span className="text-blue-400 font-semibold">Responsabilidade Social & Segurança</span> e <span className="text-purple-400 font-semibold">Governança Corporativa</span>.
            </p>
          </div>

          {/* Quick Score Cards */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-4 text-center min-w-[100px]">
              <div className="text-[11px] font-medium text-emerald-400 uppercase tracking-wider">Ambiental</div>
              <div className="text-2xl font-black text-white mt-0.5">{environmental.score}<span className="text-xs text-slate-400 font-normal">/100</span></div>
              <div className="text-[10px] text-emerald-400 font-medium">Conforme</div>
            </div>
            <div className="bg-slate-950/80 border border-blue-500/30 rounded-xl p-4 text-center min-w-[100px]">
              <div className="text-[11px] font-medium text-blue-400 uppercase tracking-wider">Social</div>
              <div className="text-2xl font-black text-white mt-0.5">{social.score}<span className="text-xs text-slate-400 font-normal">/100</span></div>
              <div className="text-[10px] text-blue-400 font-medium">87% Trein.</div>
            </div>
            <div className="bg-slate-950/80 border border-purple-500/30 rounded-xl p-4 text-center min-w-[100px]">
              <div className="text-[11px] font-medium text-purple-400 uppercase tracking-wider">Governança</div>
              <div className="text-2xl font-black text-white mt-0.5">{governance.score}<span className="text-xs text-slate-400 font-normal">/100</span></div>
              <div className="text-[10px] text-purple-400 font-medium">8 Pilares Ok</div>
            </div>
          </div>
        </div>

        {/* Action Link to ESG Projects */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            Deseja acompanhar os investimentos e o cronograma das iniciativas de sustentabilidade?
          </span>
          <button
            onClick={() => onSelectTab('esgProjects')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors"
          >
            Acessar Portfólio de Projetos ESG →
          </button>
        </div>
      </div>

      {/* Pillar 1: ENVIRONMENTAL */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">E - Environmental (Eficiência e Custo Ambiental)</h3>
              <p className="text-xs text-slate-400">Gestão de recursos hídricos, eficiência energética e destinação correta de resíduos</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Energia Elétrica Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Energia Elétrica</h4>
                  <span className="text-[11px] text-slate-400">Custo médio por peça</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Abaixo da Meta
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-2">
              <div>
                <span className="text-3xl font-extrabold text-white">R$ {environmental.energia.mediaRealizadaPeca.toFixed(2)}</span>
                <span className="text-xs text-slate-400 ml-1">/peça</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Meta Teto</div>
                <div className="text-sm font-bold text-slate-300">R$ {environmental.energia.metaCustoPeca.toFixed(2)}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Gasto Médio Mensal:</span>
                <span className="font-semibold text-slate-200">{environmental.energia.gastoTotalMensalMedio}</span>
              </div>
              <div className="flex justify-between">
                <span>Consumo Médio:</span>
                <span className="font-semibold text-slate-200">{environmental.energia.consumoKwhMedio}</span>
              </div>
              <p className="pt-1 text-[11px] text-emerald-400/90">{environmental.energia.destaque}</p>
            </div>
          </div>

          {/* Consumo de Água Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Gestão Hídrica (Água)</h4>
                  <span className="text-[11px] text-slate-400">Custo médio por peça</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                -40% Economia
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-2">
              <div>
                <span className="text-3xl font-extrabold text-white">R$ {environmental.agua.mediaRealizadaPeca.toFixed(2)}</span>
                <span className="text-xs text-slate-400 ml-1">/peça</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Meta Teto</div>
                <div className="text-sm font-bold text-slate-300">R$ {environmental.agua.metaCustoPeca.toFixed(2)}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Custo Médio Mensal:</span>
                <span className="font-semibold text-slate-200">{environmental.agua.gastoTotalMensalMedio}</span>
              </div>
              <div className="flex justify-between">
                <span>Volume Médio:</span>
                <span className="font-semibold text-slate-200">{environmental.agua.consumoM3Medio}</span>
              </div>
              <p className="pt-1 text-[11px] text-emerald-400/90">{environmental.agua.destaque}</p>
            </div>
          </div>

          {/* Resíduos Perigosos & Sucatas */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Resíduos e Óleos</h4>
                  <span className="text-[11px] text-slate-400">Descarte e conformidade</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% Homologado
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-2">
              <div>
                <span className="text-3xl font-extrabold text-white">R$ {environmental.residuos.mediaRealizadaPeca.toFixed(2)}</span>
                <span className="text-xs text-slate-400 ml-1">/peça</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Meta</div>
                <div className="text-sm font-bold text-slate-300">R$ {environmental.residuos.metaCustoPeca.toFixed(2)}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Descarte Médio:</span>
                <span className="font-semibold text-slate-200">{environmental.residuos.descarteMedioLitros}</span>
              </div>
              <div className="flex justify-between">
                <span>Custo de Descarte:</span>
                <span className="font-semibold text-slate-200">{environmental.residuos.custoDescarteMedio}</span>
              </div>
              <p className="pt-1 text-[11px] text-emerald-400/90">{environmental.residuos.destaque}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pillar 2: SOCIAL */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">S - Social (Pessoas, Saúde & Segurança no Trabalho)</h3>
            <p className="text-xs text-slate-400">Clima organizacional, capacitação contínua e conformidade com NBR 14283:2023</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Absenteísmo */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Absenteísmo</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-white">{social.absenteismo.realizado}</span>
              <span className="text-xs text-emerald-400 font-semibold">Meta &lt; {social.absenteismo.meta}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '81%' }} />
            </div>
            <p className="text-[11px] text-slate-400 mt-2.5">{social.absenteismo.destaque}</p>
          </div>

          {/* Turnover */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Turnover (Rotatividade)</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-white">{social.turnover.realizado}</span>
              <span className="text-xs text-emerald-400 font-semibold">Meta &lt; {social.turnover.meta}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }} />
            </div>
            <p className="text-[11px] text-slate-400 mt-2.5">{social.turnover.destaque}</p>
          </div>

          {/* Horas de Treinamento */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Horas de Treinamento</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-emerald-400">{social.treinamento.realizadoHoras}h</span>
              <span className="text-xs text-slate-400 font-semibold">Meta {social.treinamento.metaHorasAno}h</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '86.7%' }} />
            </div>
            <p className="text-[11px] text-slate-400 mt-2.5">{social.treinamento.percentual} da meta anual já cumprida!</p>
          </div>

          {/* Segurança / NBR 14283 */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-400 font-semibold uppercase">Saúde e Segurança</span>
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">NBR 14283</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-bold text-white">{social.segurancaTrabalho.realizadoMedio}</span>
              <span className="text-xs text-slate-400">Meta ≤ {social.segurancaTrabalho.metaTaxaGravidade}</span>
            </div>
            <div className="text-[11px] text-amber-400 font-semibold mt-1">Taxa de Gravidade (dias perdidos)</div>
            <p className="text-[11px] text-slate-400 mt-2">{social.segurancaTrabalho.detalhe}</p>
          </div>
        </div>
      </div>

      {/* Pillar 3: GOVERNANCE */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">G - Governance (Governança, Conformidade & Transparência)</h3>
            <p className="text-xs text-slate-400">8 critérios estratégicos auditados mensalmente pelo conselho e diretoria</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {governance.pilares.map((pilar) => (
              <div
                key={pilar.id}
                className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center shrink-0">
                    {pilar.id}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    {pilar.progresso}%
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-200 leading-snug">
                    {pilar.nome}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {pilar.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
