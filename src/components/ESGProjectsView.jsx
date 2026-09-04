import React, { useState } from 'react';
import {
  Leaf, Users, ShieldCheck, Plus, Search, Filter,
  Calendar, CheckCircle2, Clock, AlertCircle, DollarSign,
  Globe2, ArrowUpRight, TrendingUp, Sparkles, Building, X, Save
} from 'lucide-react';

export default function ESGProjectsView({ data }) {
  const [projects, setProjects] = useState(data.esgProjects || []);
  const [filterPillar, setFilterPillar] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    pillar: 'Environmental',
    status: 'Em Implantação',
    progresso: 50,
    orcamento: '',
    savingPrevistoAnual: '',
    responsavel: '',
    prazo: '',
    descricao: '',
    impacto: '',
    ods: 'ODS 12 - Consumo Responsável'
  });

  const formatBRL = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title) return;

    const pilarLabels = {
      Environmental: 'Ambiental (E)',
      Social: 'Social (S)',
      Governance: 'Governança (G)'
    };

    const created = {
      id: `PRJ-ESG-${String(projects.length + 1).padStart(2, '0')}`,
      title: newProject.title,
      pillar: newProject.pillar,
      pilarLabel: pilarLabels[newProject.pillar] || 'ESG',
      ods: [newProject.ods],
      status: newProject.status,
      progresso: Number(newProject.progresso) || 0,
      orcamento: Number(newProject.orcamento) || 0,
      savingPrevistoAnual: Number(newProject.savingPrevistoAnual) || 0,
      responsavel: newProject.responsavel || 'Equipe ESG',
      prazo: newProject.prazo || 'Dezembro/2026',
      descricao: newProject.descricao || 'Iniciativa estratégica para redução de impacto e custos.',
      impacto: newProject.impacto || 'Otimização operacional e conformidade ESG.'
    };

    setProjects([created, ...projects]);
    setIsModalOpen(false);

    // Reset form
    setNewProject({
      title: '',
      pillar: 'Environmental',
      status: 'Em Implantação',
      progresso: 50,
      orcamento: '',
      savingPrevistoAnual: '',
      responsavel: '',
      prazo: '',
      descricao: '',
      impacto: '',
      ods: 'ODS 12 - Consumo Responsável'
    });
  };

  const filteredProjects = projects.filter((prj) => {
    const matchPillar = filterPillar === 'all' || prj.pillar === filterPillar;
    const matchStatus = filterStatus === 'all' || prj.status === filterStatus;
    const matchSearch = prj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        prj.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        prj.responsavel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPillar && matchStatus && matchSearch;
  });

  const totalOrcamento = projects.reduce((acc, p) => acc + (p.orcamento || 0), 0);
  const totalSavingPrevisto = projects.reduce((acc, p) => acc + (p.savingPrevistoAnual || 0), 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/30">
              <Globe2 className="w-3.5 h-3.5" />
              Iniciativas de Impacto Sustentável • Agenda 2030
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Portfólio de Projetos ESG
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Gestão executiva dos projetos de transição energética, conservação hídrica, economia circular, capacitação social e conformidade com metas globais da ONU.
            </p>
          </div>

          {/* Quick Metrics & Add Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex flex-wrap sm:flex-nowrap gap-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Projetos Ativos</div>
                <div className="text-2xl font-black text-white">{projects.length}</div>
                <div className="text-[10px] text-teal-400">100% monitorados</div>
              </div>
              <div className="w-px bg-slate-800 hidden sm:block" />
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Investimento Verde</div>
                <div className="text-xl font-bold text-slate-200">{formatBRL(totalOrcamento)}</div>
                <div className="text-[10px] text-slate-400">Orçado 2026</div>
              </div>
              <div className="w-px bg-slate-800 hidden sm:block" />
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Saving Anual</div>
                <div className="text-xl font-bold text-emerald-400">{formatBRL(totalSavingPrevisto)}/ano</div>
                <div className="text-[10px] text-emerald-400">Retorno estimado</div>
              </div>
            </div>

            {/* Button to Add New Project */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Projeto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Pillar Filters */}
          <button
            onClick={() => setFilterPillar('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterPillar === 'all'
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Todos ({projects.length})
          </button>
          <button
            onClick={() => setFilterPillar('Environmental')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              filterPillar === 'Environmental'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            Ambiental (E)
          </button>
          <button
            onClick={() => setFilterPillar('Social')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              filterPillar === 'Social'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-blue-400" />
            Social (S)
          </button>
          <button
            onClick={() => setFilterPillar('Governance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              filterPillar === 'Governance'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            Governança (G)
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar projeto, responsável..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const isOperational = project.status === 'Operacional';
          const isOngoing = project.status === 'Em Implantação' || project.status === 'Em Andamento';
          const isPlanned = project.status === 'Planejado';

          return (
            <div
              key={project.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:shadow-2xl transition-all duration-300"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    project.pillar === 'Environmental'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : project.pillar === 'Social'
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                  }`}>
                    {project.pilarLabel}
                  </span>

                  {/* Status Badge */}
                  <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    isOperational
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : isOngoing
                      ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {isOperational && <CheckCircle2 className="w-3 h-3" />}
                    {isOngoing && <Clock className="w-3 h-3" />}
                    {isPlanned && <AlertCircle className="w-3 h-3" />}
                    {project.status}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-slate-400">{project.id}</div>
                <h3 className="text-base font-bold text-white mt-1 leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {project.descricao}
                </p>

                {/* ODS Badges */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.ods && project.ods.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold bg-slate-800/90 text-slate-300 px-2 py-0.5 rounded border border-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress and Financials */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Progresso da Implantação</span>
                    <span className="font-bold text-white">{project.progresso}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-700"
                      style={{ width: `${project.progresso}%` }}
                    />
                  </div>
                </div>

                {/* Financial figures */}
                <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400">Investimento:</span>
                    <div className="font-semibold text-slate-200">{formatBRL(project.orcamento)}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400">Saving Anual:</span>
                    <div className="font-bold text-emerald-400">{formatBRL(project.savingPrevistoAnual)}</div>
                  </div>
                </div>

                {/* Impact callout */}
                <div className="text-[11px] text-slate-300 bg-slate-800/40 p-2 rounded-lg border border-slate-800">
                  <span className="font-semibold text-teal-400">Impacto Mensurável: </span>
                  {project.impacto}
                </div>

                {/* Meta details */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Resp: <span className="text-slate-300 font-medium">{project.responsavel}</span></span>
                  <span>Prazo: <span className="text-slate-300 font-medium">{project.prazo}</span></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Cadastrar Novo Projeto ESG */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                  Novo Projeto
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Cadastrar Projeto ESG</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Nome do Projeto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Instalação de Usina Solar no Galpão 3"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Pilar ESG</label>
                  <select
                    value={newProject.pillar}
                    onChange={(e) => setNewProject({ ...newProject, pillar: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Environmental">Ambiental (E)</option>
                    <option value="Social">Social (S)</option>
                    <option value="Governance">Governança (G)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Planejado">Planejado</option>
                    <option value="Em Implantação">Em Implantação</option>
                    <option value="Operacional">Operacional</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Progresso Atual (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProject.progresso}
                    onChange={(e) => setNewProject({ ...newProject, progresso: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Orçamento de Investimento (R$)</label>
                  <input
                    type="number"
                    placeholder="Ex: 50000"
                    value={newProject.orcamento}
                    onChange={(e) => setNewProject({ ...newProject, orcamento: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Saving Anual Estimado (R$/ano)</label>
                  <input
                    type="number"
                    placeholder="Ex: 24000"
                    value={newProject.savingPrevistoAnual}
                    onChange={(e) => setNewProject({ ...newProject, savingPrevistoAnual: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Responsável / Departamento</label>
                  <input
                    type="text"
                    placeholder="Ex: Facilities / Manutenção"
                    value={newProject.responsavel}
                    onChange={(e) => setNewProject({ ...newProject, responsavel: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Prazo / Previsão</label>
                  <input
                    type="text"
                    placeholder="Ex: Dezembro/2026"
                    value={newProject.prazo}
                    onChange={(e) => setNewProject({ ...newProject, prazo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Descrição da Iniciativa</label>
                <textarea
                  rows="2"
                  placeholder="Explique resumidamente o que será feito..."
                  value={newProject.descricao}
                  onChange={(e) => setNewProject({ ...newProject, descricao: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Impacto Mensurável (Ganhos ambientais / sociais)</label>
                <input
                  type="text"
                  placeholder="Ex: Redução de 20 toneladas de CO2 e -15% na conta de energia"
                  value={newProject.impacto}
                  onChange={(e) => setNewProject({ ...newProject, impacto: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Objetivo de Desenvolvimento Sustentável (ODS)</label>
                <select
                  value={newProject.ods}
                  onChange={(e) => setNewProject({ ...newProject, ods: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="ODS 7 - Energia Limpa e Acessível">ODS 7 - Energia Limpa e Acessível</option>
                  <option value="ODS 6 - Água Potável e Saneamento">ODS 6 - Água Potável e Saneamento</option>
                  <option value="ODS 12 - Consumo e Produção Responsáveis">ODS 12 - Consumo e Produção Responsáveis</option>
                  <option value="ODS 13 - Ação Contra a Mudança Global do Clima">ODS 13 - Ação Climática</option>
                  <option value="ODS 4 - Educação de Qualidade">ODS 4 - Educação de Qualidade</option>
                  <option value="ODS 8 - Trabalho Decente e Crescimento Econômico">ODS 8 - Trabalho Decente</option>
                  <option value="ODS 9 - Indústria, Inovação e Infraestrutura">ODS 9 - Indústria e Inovação</option>
                  <option value="ODS 16 - Paz, Justiça e Instituições Eficazes">ODS 16 - Governança e Ética</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-lg shadow-teal-600/30 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Salvar Projeto ESG
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
