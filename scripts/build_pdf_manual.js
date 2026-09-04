import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const baseDir = 'c:\\Users\\GabrielFlorêncioTI\\Desktop\\Projeto KPI';
const screenshotDir = path.join(baseDir, 'screenshots');
const pdfOutputFile = path.join(baseDir, 'MANUAL_DE_USO_COCKPIT_KPI_ESG_2026.pdf');

function getBase64Image(filename) {
  const filePath = path.join(screenshotDir, filename);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return `data:image/png;base64,${data.toString('base64')}`;
  }
  return '';
}

const imgExec = getBase64Image('1_visao_executiva.png');
const imgEsg = getBase64Image('2_cockpit_esg.png');
const imgProjects = getBase64Image('3_projetos_esg.png');
const imgDept = getBase64Image('5_departamentos.png');
const imgKanban = getBase64Image('6_plano_5w2h.png');
const imgModal = getBase64Image('7_atualizar_dados_modal.png');

const logoBase64 = fs.existsSync(path.join(baseDir, 'public', 'logo.png'))
  ? `data:image/png;base64,${fs.readFileSync(path.join(baseDir, 'public', 'logo.png')).toString('base64')}`
  : '';

const htmlContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Manual de Uso - Evoluttion - Executivo & ESG 2026</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    @page {
      size: A4 portrait;
      margin: 15mm 15mm 18mm 15mm;
      @bottom-right {
        content: counter(page);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.5;
      font-size: 10pt;
    }

    .page {
      page-break-after: always;
      position: relative;
      min-height: 250mm;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* Cover Page */
    .cover-page {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 255mm;
      padding: 24mm 15mm 20mm 15mm;
      background: linear-gradient(145deg, #090d16 0%, #0f172a 60%, #4c0519 100%);
      color: #ffffff;
      border-radius: 12px;
    }

    .badge-cover {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(225, 29, 72, 0.15);
      border: 1px solid rgba(225, 29, 72, 0.35);
      color: #fb7185;
      font-weight: 700;
      font-size: 9pt;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .cover-title {
      font-size: 28pt;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.02em;
      margin-bottom: 15px;
      color: #ffffff;
    }

    .cover-subtitle {
      font-size: 13pt;
      font-weight: 500;
      color: #94a3b8;
      max-width: 90%;
      line-height: 1.5;
      margin-bottom: 40px;
    }

    .cover-highlights {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-top: 30px;
      padding-top: 25px;
      border-top: 1px solid rgba(255,255,255,0.15);
    }

    .highlight-box {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 14px;
      border-radius: 8px;
    }

    .highlight-box .num {
      font-size: 18pt;
      font-weight: 800;
      color: #fb7185;
    }

    .highlight-box .desc {
      font-size: 8.5pt;
      color: #cbd5e1;
      margin-top: 4px;
      font-weight: 500;
    }

    .cover-footer {
      margin-top: auto;
      padding-top: 25px;
      border-top: 1px solid rgba(255,255,255,0.1);
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 8.5pt;
      color: #94a3b8;
    }

    /* Content Headers */
    .section-header {
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .section-title {
      font-size: 16pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.01em;
    }

    .section-tag {
      font-size: 8pt;
      font-weight: 700;
      color: #e11d48;
      background: #fff1f2;
      padding: 3px 10px;
      border-radius: 999px;
      border: 1px solid #fecdd3;
      text-transform: uppercase;
    }

    .screenshot-frame {
      width: 100%;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      margin: 12px 0 16px 0;
      background: #0f172a;
    }

    .screenshot-frame img {
      width: 100%;
      display: block;
    }

    .caption {
      font-size: 8pt;
      color: #64748b;
      font-style: italic;
      text-align: center;
      margin-top: -8px;
      margin-bottom: 14px;
    }

    p {
      margin-bottom: 10px;
      color: #334155;
      line-height: 1.55;
    }

    ul, ol {
      margin-left: 20px;
      margin-bottom: 12px;
      color: #334155;
    }

    li {
      margin-bottom: 5px;
    }

    .callout {
      background: #f8fafc;
      border-left: 4px solid #e11d48;
      padding: 10px 14px;
      border-radius: 0 6px 6px 0;
      margin: 12px 0;
      font-size: 9pt;
      color: #1e293b;
    }

    .callout-title {
      font-weight: 700;
      color: #be123c;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .callout-warning {
      background: #fffbeb;
      border-left-color: #f59e0b;
    }
    .callout-warning .callout-title {
      color: #b45309;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin: 12px 0;
    }

    .card-info {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 12px;
    }

    .card-info h4 {
      font-size: 9.5pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }

    .card-info p {
      font-size: 8.5pt;
      color: #475569;
      margin-bottom: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 8.5pt;
    }

    th, td {
      border: 1px solid #e2e8f0;
      padding: 7px 10px;
      text-align: left;
    }

    th {
      background: #f1f5f9;
      font-weight: 700;
      color: #1e293b;
    }

    .badge-green {
      display: inline-block;
      background: #dcfce7;
      color: #166534;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 7.5pt;
    }
  </style>
</head>
<body>

  <!-- CAPA -->
  <div class="page cover-page">
    <div>
      <div style="background: #ffffff; display: inline-flex; align-items: center; justify-content: center; padding: 10px 22px; border-radius: 14px; margin-bottom: 24px; box-shadow: 0 4px 14px rgba(0,0,0,0.25);">
        <img src="${logoBase64}" style="height: 46px; width: auto; display: block;" alt="Evoluttion" />
      </div>
      <div class="badge-cover">Documento Oficial • TI & Diretoria</div>
      <h1 class="cover-title">Evoluttion - Executivo & ESG 2026</h1>
      <p class="cover-subtitle">
        Manual completo de operação, navegação e governança do painel corporativo integrado de Redução de Custos, Desempenho Industrial e Sustentabilidade.
      </p>

      <div class="cover-highlights">
        <div class="highlight-box">
          <div class="num">R$ 1,53M</div>
          <div class="desc">Meta Anual de Redução de Custos monitorada em tempo real.</div>
        </div>
        <div class="highlight-box">
          <div class="num">14 Áreas</div>
          <div class="desc">Substituição de 14 abas fragmentadas por um painel unificado.</div>
        </div>
        <div class="highlight-box">
          <div class="num">100% Web</div>
          <div class="desc">Alimentação rápida sem risco de quebra de fórmulas Excel.</div>
        </div>
      </div>
    </div>

    <div class="cover-footer">
      <div>
        <strong>Departamento:</strong> Tecnologia da Informação (TI)<br>
        <strong>Aplicação:</strong> Cockpit Industrial & ESG • Versão 1.0<br>
        <strong>Ambiente:</strong> Produção Interna / Demonstração
      </div>
      <div style="text-align: right;">
        <strong>Data de Emissão:</strong> Setembro / 2026<br>
        <strong>Classificação:</strong> Uso Interno Corporativo
      </div>
    </div>
  </div>

  <!-- PÁGINA 2: VISÃO GERAL E COMPARAÇÃO EXCEL -->
  <div class="page">
    <div class="section-header">
      <h2 class="section-title">1. Visão Geral: Por que o Cockpit Substitui o Excel?</h2>
      <span class="section-tag">Estratégia</span>
    </div>

    <p>
      Historicamente, o acompanhamento dos indicadores corporativos e da meta anual de redução de custos dependia da planilha <strong><code>ESG - REDUÇÃO CUSTO GERAL 2026.xlsx</code></strong>. Embora rica em dados, a planilha gerava gargalos operacionais e perda de dinamismo em reuniões de diretoria.
    </p>

    <div class="callout">
      <div class="callout-title">💡 Diagnóstico do Excel vs. Cockpit Web</div>
      No Excel antigo, 14 abas acumulavam linhas manuais e fórmulas repetidas. No Cockpit Web, o responsável preenche apenas os números brutos do mês e o sistema recalcula médias, acumulações e faróis em milissegundos.
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Critério</th>
          <th style="width: 37%;">Planilha Excel Anterior</th>
          <th style="width: 38%;">Novo Cockpit Web Executivo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Experiência da Diretoria</strong></td>
          <td>Navegação lenta entre 14 abas com tabelas densas e poluição visual.</td>
          <td><span class="badge-green">Cockpit Centralizado</span> com farol de status, cards executivos e gráficos interativos.</td>
        </tr>
        <tr>
          <td><strong>Segurança de Dados</strong></td>
          <td>Alto risco de alguém apagar ou corromper fórmulas de soma e média.</td>
          <td><span class="badge-green">100% Seguro</span>: Fórmulas protegidas e executadas via código.</td>
        </tr>
        <tr>
          <td><strong>Tempo de Fechamento</strong></td>
          <td>Horas para consolidar abas, copiar valores e atualizar gráficos.</td>
          <td><span class="badge-green">Menos de 5 minutos</span> por mês via formulário web limpo ou arraste de arquivo.</td>
        </tr>
        <tr>
          <td><strong>Apresentação em Reuniões</strong></td>
          <td>Projeção estática e desfavorável para telas grandes.</td>
          <td><span class="badge-green">Modo TV / Telão</span> integrado para Smart TVs e salas de reunião com 1 clique.</td>
        </tr>
        <tr>
          <td><strong>Plano de Ação 5W2H</strong></td>
          <td>Aba em branco devido à burocracia do preenchimento em células.</td>
          <td><span class="badge-green">Kanban Ágil</span> que calcula a soma financeira das ações concluídas na hora.</td>
        </tr>
      </tbody>
    </table>

    <div class="grid-2" style="margin-top: 15px;">
      <div class="card-info">
        <h4>🚀 Acesso Rápido ao Sistema</h4>
        <p>O sistema funciona em qualquer navegador na rede corporativa acessando <strong><code>http://localhost:5173</code></strong>.</p>
      </div>
      <div class="card-info">
        <h4>🖥️ Compatibilidade</h4>
        <p>Compatível com telas de notebooks, monitores ultrawide, tablets e televisores corporativos.</p>
      </div>
    </div>
  </div>

  <!-- PÁGINA 3: VISÃO EXECUTIVA -->
  <div class="page">
    <div class="section-header">
      <h2 class="section-title">2. Visão Executiva (Diretoria)</h2>
      <span class="section-tag">Painel Principal</span>
    </div>

    <p>
      A <strong>Visão Executiva</strong> é o cockpit principal da alta administração. Ela consolida os números mais críticos da operação industrial e financeira em um só olhar.
    </p>

    <div class="screenshot-frame">
      <img src="${imgExec}" alt="Visão Executiva">
    </div>
    <div class="caption">Figura 1: Visão Executiva com termômetro da meta de R$ 1,53M, faróis de status e evolução mensal de savings.</div>

    <div class="grid-2">
      <div class="card-info">
        <h4>🌡️ Termômetro de Redução de Custo Geral</h4>
        <p>Barra de progresso visual demonstrando o acumulado de <strong>R$ 44.997,56</strong> contra a meta anual de <strong>R$ 1.529.281,38</strong> e meta fabril de <strong>R$ 879.281,38</strong>.</p>
      </div>
      <div class="card-info">
        <h4>🚦 Cards de Farol (Status Verde/Amarelo)</h4>
        <p>Indicadores inteligentes: <strong>PPM Qualidade (2.964)</strong> no verde; <strong>IQF Compras (94,1%)</strong> no verde; e <strong>OEE (78,1%)</strong> em alerta com justificativa da queda de julho.</p>
      </div>
      <div class="card-info">
        <h4>📊 Gráfico Interativo de Savings</h4>
        <p>Demonstra os valores poupados mês a mês (R$), destacando picos como o de Janeiro (R$ 15.523,75 com unidade hidráulica e ferramentas).</p>
      </div>
      <div class="card-info">
        <h4>🏢 Origem dos Savings por Área</h4>
        <p>Evidencia a participação de cada departamento: Manutenção (50%), Processos (29,8%), Compras (13,9%) e Insumos (6,3%).</p>
      </div>
    </div>
  </div>

  <!-- PÁGINA 4: COCKPIT ESG -->
  <div class="page">
    <div class="section-header">
      <h2 class="section-title">3. Cockpit ESG (Ambiental, Social & Governança)</h2>
      <span class="section-tag">Sustentabilidade</span>
    </div>

    <p>
      O módulo <strong>ESG</strong> traduz as exigências do mercado e de grandes clientes (como a ZF Brasil) em métricas práticas e auditáveis, organizadas nos 3 pilares globais.
    </p>

    <div class="screenshot-frame">
      <img src="${imgEsg}" alt="Cockpit ESG">
    </div>
    <div class="caption">Figura 2: Cockpit ESG detalhando métricas de energia, água, resíduos, NBR 14283 e os 8 pilares de governança.</div>

    <div style="margin-top: 10px;">
      <h3 style="font-size: 11pt; color: #0f172a; margin-bottom: 6px;">Detalhamento dos Pilares:</h3>
      <ul>
        <li><strong>E - Environmental (Ambiental)</strong>: Monitora o custo de Energia Elétrica por peça produzida (média de R$ 0,40 vs teto de R$ 0,50), gestão de Água com 40% de economia (R$ 0,09 vs R$ 0,15) e 100% de regularidade no descarte de Resíduos Perigosos/Óleos com homologação CADRI.</li>
        <li><strong>S - Social & Segurança</strong>: Acompanha o Absenteísmo (2,44% vs meta 3,0%), Turnover estável em 4,78%, cumprimento de 86,7% da meta de Treinamentos (624h de 720h) e conformidade com a <strong>NBR 14283:2023</strong> de Saúde e Segurança.</li>
        <li><strong>G - Governance (Governança)</strong>: Checklist interativo dos 8 pilares auditados pelo conselho (Organograma, Políticas Trabalhistas, Código de Conduta, Prevenção à Corrupção e IQF de Fornecedores).</li>
      </ul>
    </div>
  </div>

  <!-- PÁGINA 5: PROJETOS ESG -->
  <div class="page">
    <div class="section-header">
      <h2 class="section-title">4. Portfólio de Projetos ESG & Sustentabilidade</h2>
      <span class="section-tag">Novo Módulo</span>
    </div>

    <p>
      Atendendo à necessidade de gerenciar ações de sustentabilidade de médio e longo prazo, este módulo reúne o portfólio de projetos estratégicos vinculados aos <strong>Objetivos de Desenvolvimento Sustentável (ODS) da ONU</strong>.
    </p>

    <div class="screenshot-frame">
      <img src="${imgProjects}" alt="Projetos ESG">
    </div>
    <div class="caption">Figura 3: Gestão do portfólio de projetos sustentáveis com filtros por pilar, ODS da ONU e botão de cadastro.</div>

    <div class="callout">
      <div class="callout-title">➕ Como Cadastrar um Novo Projeto ESG</div>
      <ol style="margin-left: 16px; margin-top: 4px;">
        <li>Clique no botão verde <strong>"+ Cadastrar Projeto"</strong> no canto superior direito.</li>
        <li>Informe o Nome do Projeto, Pilar (E, S ou G), Status, Orçamento e Saving Previsto.</li>
        <li>Defina o Responsável, Prazo, Descrição e selecione a ODS da ONU correspondente.</li>
        <li>Ao clicar em <strong>"Salvar Projeto ESG"</strong>, o card entra instantaneamente na grade e os contadores de Investimento Verde e Saving Anual se recalculam sozinhos.</li>
      </ol>
    </div>

    <div class="grid-2">
      <div class="card-info">
        <h4>☀️ Projetos já Cadastrados</h4>
        <p>Transição Solar (ODS 7), Reúso de Água em Usinagem (ODS 6), Programa Aterro Zero (ODS 12), Escola de Fábrica (ODS 4) e Certificação ISO 14001.</p>
      </div>
      <div class="card-info">
        <h4>💰 Retorno Financeiro dos Projetos</h4>
        <p>Investimento total previsto de <strong>R$ 347.000</strong> gerando um retorno ambiental e financeiro estimado em <strong>R$ 222.000/ano</strong>.</p>
      </div>
    </div>
  </div>

  <!-- PÁGINA 6: DEPARTAMENTOS & 5W2H -->
  <div class="page">
    <div class="section-header">
      <h2 class="section-title">5. Visão Departamental & Plano de Ação 5W2H</h2>
      <span class="section-tag">Operação</span>
    </div>

    <p>
      O sistema permite descer do nível executivo para o operacional com total facilidade através do drill-down departamental e do quadro Kanban.
    </p>

    <div class="screenshot-frame" style="margin-bottom: 8px;">
      <img src="${imgDept}" alt="Departamentos">
    </div>
    <div class="caption">Figura 4: Drill-Down departamental com métricas e gráfico histórico mês a mês.</div>

    <div class="screenshot-frame" style="margin-bottom: 8px;">
      <img src="${imgKanban}" alt="Plano de Ação 5W2H">
    </div>
    <div class="caption">Figura 5: Kanban interativo do Plano de Ação 5W2H com cálculo automático de economias capturadas.</div>

    <div class="grid-2">
      <div class="card-info">
        <h4>🏢 8 Áreas Mapeadas</h4>
        <p>Acesso individualizado para: Gestão Fábrica, Compras, Qualidade, Manutenção, Processos, Almoxarifado, Comercial e Engenharia.</p>
      </div>
      <div class="card-info">
        <h4>📋 Metodologia 5W2H</h4>
        <p>Clique em qualquer card do Kanban para visualizar: <em>O que, Quem, Quando, Onde, Por que, Como, Custo</em> e o <em>Saving</em> gerado.</p>
      </div>
    </div>
  </div>

  <!-- PÁGINA 7: ALIMENTAÇÃO DE DADOS -->
  <div class="page">
    <div class="section-header">
      <h2 class="section-title">6. Guia Prático de Alimentação dos Indicadores</h2>
      <span class="section-tag">Rotina Mensal</span>
    </div>

    <p>
      O botão <strong>"Atualizar Dados"</strong> no cabeçalho permite que qualquer usuário autorizado atualize os números em menos de 5 minutos, sem encostar nas células do Excel.
    </p>

    <div class="screenshot-frame">
      <img src="${imgModal}" alt="Central de Atualização">
    </div>
    <div class="caption">Figura 6: Modal com as opções de formulário web direto e área de arraste da planilha Excel.</div>

    <div class="grid-2">
      <div class="card-info">
        <h4>Opção 1: Formulário Web Direto (Recomendado)</h4>
        <p>1. Selecione o Mês de Competência (ex: <em>Agosto / 2026</em>).<br>
        2. Digite apenas os números finais: OEE, Saving do mês, PPM e IQF.<br>
        3. Clique em <strong>"Salvar Lançamento Mensal"</strong>. O sistema valida os campos e atualiza todos os gráficos instantaneamente.</p>
      </div>
      <div class="card-info">
        <h4>Opção 2: Arrastar Planilha Excel (.xlsx)</h4>
        <p>1. Caso o setor ainda preencha o arquivo Excel tradicional, basta arrastar o arquivo para a área pontilhada.<br>
        2. O sistema lê as 14 abas em 1 segundo e sincroniza todo o banco de dados sem complicação.</p>
      </div>
    </div>

    <div class="callout callout-warning">
      <div class="callout-title">⚠️ Fim do Retrabalho Manual</div>
      O responsável não precisa preencher 14 abas. Como a maior parte dos dados do Excel são fórmulas repetidas, preenchem-se apenas as 4 a 6 variáveis do mês.
    </div>
  </div>

  <!-- PÁGINA 8: ROTEIRO DE APRESENTAÇÃO -->
  <div class="page">
    <div class="section-header">
      <h2 class="section-title">7. Roteiro de Apresentação para a Diretoria</h2>
      <span class="section-tag">Guia do Apresentador</span>
    </div>

    <p>
      Utilize o roteiro abaixo para conduzir uma apresentação executiva de <strong>5 a 10 minutos</strong> com máximo impacto perante a Diretoria:
    </p>

    <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; margin-bottom: 15px;">
      <h4 style="color: #047857; font-size: 10pt; margin-bottom: 8px;">🎤 Passo a Passo da Reunião:</h4>
      <ol style="margin-left: 18px; font-size: 9pt;">
        <li style="margin-bottom: 8px;">
          <strong>Abertura (1 minuto)</strong>: Clique no botão <strong>"Modo TV"</strong> para deixar a tela cheia. Diga: <em>"Diretores, modernizamos o acompanhamento dos nossos KPIs. Substituímos a navegação burocrática em 14 abas do Excel por este Cockpit Executivo em tempo real."</em>
        </li>
        <li style="margin-bottom: 8px;">
          <strong>Foco no Termômetro de Custos (2 minutos)</strong>: Mostre a barra de progresso da economia de <strong>R$ 1,53M</strong>. Destaque que já capturamos <strong>R$ 44.997,56</strong> e aponte no gráfico que a maior parte veio de Manutenção Mecânica e Ferramentas.
        </li>
        <li style="margin-bottom: 8px;">
          <strong>Faróis de Alerta e Sucesso (2 minutos)</strong>: Mostre que a Qualidade PPM (2.964 vs 4.000) e os Fornecedores IQF (94,1%) superaram a meta, enquanto o OEE de Julho exigiu plano de contenção.
        </li>
        <li style="margin-bottom: 8px;">
          <strong>Demonstração de Projetos ESG (2 minutos)</strong>: Entre na aba <strong>Projetos ESG</strong> e mostre as iniciativas conectadas às ODS da ONU. Clique em <strong>"+ Cadastrar Projeto"</strong> para mostrar que qualquer nova ideia é adicionada em 30 segundos.
        </li>
        <li style="margin-bottom: 8px;">
          <strong>Plano de Ação 5W2H Vivo (1 minuto)</strong>: Mostre o quadro Kanban e explique que cada ação concluída soma a economia diretamente no bolso da fábrica.
        </li>
        <li>
          <strong>Fechamento Prático (1 minuto)</strong>: Abra o botão <strong>"Atualizar Dados"</strong> e enfatize que a equipe agora gasta menos de 5 minutos por mês para alimentar o sistema.
        </li>
      </ol>
    </div>

    <div class="callout">
      <div class="callout-title">🎯 Respostas Prontas para Dúvidas Comuns da Diretoria:</div>
      <p style="font-size: 8.5pt; margin-top: 4px;">
        • <strong>"E se alguém quiser os dados em Excel?"</strong> ➔ <em>"O sistema possui exportação rápida de relatórios para Excel e PDF."</em><br>
        • <strong>"Podemos integrar com o nosso ERP?"</strong> ➔ <em>"Sim, a arquitetura moderna em React/Node permite conectar direto no banco de dados do ERP no futuro."</em><br>
        • <strong>"Onde esses dados ficam salvos?"</strong> ➔ <em>"Em ambiente corporativo seguro da empresa, com backup automático."</em>
      </p>
    </div>
  </div>

</body>
</html>
`;

async function generatePdf() {
  console.log('Generating PDF from HTML template with embedded screenshots...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfOutputFile,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '12mm',
      bottom: '12mm',
      left: '12mm',
      right: '12mm'
    }
  });

  await browser.close();
  console.log('PDF generated successfully at:', pdfOutputFile);
}

generatePdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
