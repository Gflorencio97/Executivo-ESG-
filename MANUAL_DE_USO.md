# Manual de Uso: Evoluttion - Executivo & ESG 2026

Este manual foi elaborado para orientar gestores, diretores e equipes operacionais no uso do **Evoluttion - Executivo & ESG 2026**. O sistema substitui a navegação fragmentada em planilhas Excel por uma interface centralizada, moderna e interativa.

---

## Sumário
1. [Visão Geral e Objetivos](#1-visão-geral-e-objetivos)
2. [Como Iniciar o Sistema](#2-como-iniciar-o-sistema)
3. [Guia de Navegação pelas Abas](#3-guia-de-navegação-pelas-abas)
   - [3.1 Visão Executiva (Diretoria)](#31-visão-executiva-diretoria)
   - [3.2 Cockpit ESG](#32-cockpit-esg)
   - [3.3 Projetos ESG (Novo Módulo)](#33-projetos-esg-novo-módulo)
   - [3.4 Visão Departamental (Drill-Down)](#34-visão-departamental-drill-down)
   - [3.5 Plano de Ação 5W2H (Kanban)](#35-plano-de-ação-5w2h-kanban)
4. [Como Alimentar e Atualizar os Dados](#4-como-alimentar-e-atualizar-os-dados)
   - [Método 1: Formulário Web Mensal (Sem Excel)](#método-1-formulário-web-mensal-sem-excel)
   - [Método 2: Importação via Arraste da Planilha (.xlsx)](#método-2-importação-via-arraste-da-planilha-xlsx)
5. [Recursos de Apresentação (Modo TV / Reuniões)](#5-recursos-de-apresentação-modo-tv--reuniões)
6. [Roteiro Sugerido para Apresentação à Diretoria](#6-roteiro-sugerido-para-apresentação-à-diretoria)

---

## 1. Visão Geral e Objetivos

O Cockpit consolida em tempo real os indicadores das **14 áreas industriais** que anteriormente estavam dispersas na planilha `ESG - REDUÇÃO CUSTO GERAL 2026.xlsx`.

### Principais Benefícios:
* **Fim das fórmulas manuais quebradas**: Médias, somas acumuladas e percentuais de meta são calculados automaticamente.
* **Farol Executivo Instantâneo**: Identificação imediata do que está no **Verde** (atingido), **Amarelo** (alerta) e **Vermelho** (crítico).
* **Gestão Integrada ESG**: Indicadores ambientais, sociais e de governança conectados às metas da ONU (ODS).
* **Plano de Ação 5W2H Vivo**: Conexão direta entre iniciativas operacionais e a captura real de economia financeira (savings).

---

## 2. Como Iniciar o Sistema

1. Abra o terminal (PowerShell) na pasta do projeto:
   ```powershell
   cd "C:\Users\GabrielFlorêncioTI\Desktop\Projeto KPI"
   ```
2. Execute o comando:
   ```powershell
   npm run dev
   ```
3. Abra seu navegador em: **`http://localhost:5173`**

---

## 3. Guia de Navegação pelas Abas

### 3.1 Visão Executiva (Diretoria)
É a tela de entrada do sistema, projetada para consumo rápido da alta administração.
* **Termômetro da Meta Anual**: Barra de progresso destacando quanto já foi economizado em relação à meta de **R$ 1.529.281,38**.
* **Cards de Farol com Status**:
  * *Redução de Custo Geral*: Economia acumulada no ano.
  * *OEE Geral da Fábrica*: Eficiência operacional vs meta de 90%.
  * *Qualidade Interna (PPM)*: Nível de defeitos na usinagem e montagem (meta: < 4.000 PPM).
  * *IQF Fornecedores*: Índice de conformidade no recebimento de materiais (meta: > 90%).
  * *Capacitação ESG*: Horas acumuladas de treinamento da fábrica.
  * *Faturamento Comercial*: Total faturado com destaque para ZF Brasil e Varejo.
* **Gráfico de Evolução Mensal de Savings**: Demonstração mês a mês de quanto foi poupado e a linha de acumulação.
* **Origem dos Savings**: Gráfico de rosca/barras que evidencia quais áreas mais geraram redução (Manutenção, Processos, Compras, etc.).
* **Painel Integrado por Área**: Tabela executiva com status instantâneo de cada setor e botão para drill-down.

---

### 3.2 Cockpit ESG
Espaço dedicado às exigências de sustentabilidade corporativa, compliance e clientes de grande porte:
* **E - Ambiental**:
  * Custo por peça e consumo de Energia Elétrica (kWh).
  * Gestão Hídrica: Custo por peça e volume de Água (m³).
  * Resíduos Industriais: Destinação com certificado CADRI, controle de óleos solúveis e sucatas.
* **S - Social & Segurança**:
  * Taxa de Absenteísmo (faltas) e Turnover (rotatividade).
  * Saúde e Segurança do Trabalho conforme **NBR 14283:2023** (Taxa de Gravidade e dias perdidos).
  * Treinamentos operacionais e capacitação técnica em NR-12 e 5S.
* **G - Governança Corporativa**:
  * Checklist dos 8 critérios estratégicos (Organograma, Políticas de Conformidade, Código de Conduta, Prevenção à Corrupção, Auditorias Financeiras e Homologação de Fornecedores).

---

### 3.3 Projetos ESG (Novo Módulo)
Gestão de iniciativas sustentáveis de médio e longo prazo:
* **Filtros por Pilar**: Alterne facilmente entre iniciativas *Ambientais (E)*, *Sociais (S)* ou de *Governança (G)*.
* **Detalhamento do Card**:
  * Identificador único (ex: `PRJ-ESG-01`).
  * Barra de progresso da implantação (% concluído).
  * Comparativo financeiro: Orçamento de Investimento vs Saving Anual Estimado.
  * Badges de **ODS da ONU** (ex: *ODS 7 Energia Limpa*, *ODS 12 Consumo Responsável*).
* **Como Cadastrar um Novo Projeto**:
  1. Clique no botão verde **"+ Cadastrar Projeto"** no topo da tela.
  2. Preencha os dados no formulário (Nome, Pilar, Status, Orçamento, Saving, Responsável, Prazo e ODS).
  3. Clique em **"Salvar Projeto ESG"**. O projeto aparecerá instantaneamente na grade e recalculará os totais de investimento.

---

### 3.4 Visão Departamental (Drill-Down)
Permite que os gerentes de área e diretores analisem cada setor de forma aprofundada:
* Selecione o departamento desejado nos botões superiores:
  * **Gestão Fábrica** | **Compras** | **Qualidade** | **Manutenção** | **Processos** | **Almoxarifado** | **Comercial** | **Engenharia**.
* O painel exibe:
  * Todos os KPIs específicos daquela área.
  * Gráfico histórico mensal comparando **Realizado vs Meta**.

---

### 3.5 Plano de Ação 5W2H (Kanban)
Substitui a antiga planilha estática por um quadro ágil de execução:
* **Colunas de Fluxo**:
  * `A Fazer (Backlog)` ➔ `Em Andamento` ➔ `Concluído (Saving Capturado)`.
* **Movimentação de Cards**: É possível transitar cards entre as etapas com 1 clique.
* **Contador Financeiro**: Conforme ações são movidas para "Concluído", o sistema soma automaticamente o saving financeiro capturado.
* **Detalhamento 5W2H**: Clique em qualquer card para abrir o pop-up com as 7 respostas completas (*O que, Quem, Quando, Onde, Por que, Como e Quanto*).

---

## 4. Como Alimentar e Atualizar os Dados

Para atualizar os números no final de cada mês, clique no botão **"Atualizar Dados"** no topo da página. O sistema oferece dois caminhos:

### Método 1: Formulário Web Mensal (Sem Excel)
* **Indicado para**: Quem deseja velocidade e segurança contra erros de fórmula.
* **Tempo estimado**: 3 a 5 minutos por mês.
* **Passo a passo**:
  1. No modal, selecione a aba **"1. Formulário Web Direto"**.
  2. Escolha o **Mês de Competência** (ex: *Agosto / 2026*).
  3. Preencha os campos com os dados finais do mês (OEE, Saving capturado, PPM, IQF, etc.).
  4. Clique em **"Salvar Lançamento Mensal"**.
  5. O cockpit recalcula instantaneamente as médias, acumulados e os faróis coloridos.

### Método 2: Importação via Arraste da Planilha (.xlsx)
* **Indicado para**: Equipes que preferem continuar preenchendo a planilha padrão durante o período de transição.
* **Passo a passo**:
  1. No modal, selecione a aba **"2. Arrastar Planilha Excel"**.
  2. Arraste o arquivo `ESG - REDUÇÃO CUSTO GERAL 2026.xlsx` para a área indicada (ou clique para selecionar o arquivo).
  3. O sistema lê as 14 abas em 1 segundo e atualiza todos os gráficos.

---

## 5. Recursos de Apresentação (Modo TV / Reuniões)

No canto superior direito, há o botão **"Modo TV"**:
* Ao clicar, a interface entra em modo de tela cheia (Fullscreen), ocultando barras do navegador.
* Elementos visuais ficam ampliados para projeção em projetores de sala de reunião ou smart TVs de gestão à vista.
* Para sair, basta clicar em **"Sair do Telão"** ou pressionar a tecla `ESC`.

---

## 6. Roteiro Sugerido para Apresentação à Diretoria

Para fazer uma apresentação de alto impacto em 5 a 10 minutos, siga esta sequência:

1. **Abertura (O Problema do Excel)**:
   > *"Diretores, nossa gestão de KPIs era excelente em dados, mas pesada para tomada de decisão: tínhamos 14 abas no Excel, com risco de fórmulas quebradas e dificuldade de visualização executiva."*

2. **Apresentação do Cockpit (A Solução)**:
   > *"Desenvolvemos este Cockpit Executivo & ESG que consolida 100% dos dados da nossa fábrica em uma interface limpa, dinâmica e com atualização em tempo real."*

3. **Demonstração da Visão Geral**:
   * Mostre o **Termômetro da Redução de Custo Geral** (meta de R$ 1,52M vs economia realizada de ~R$ 45k).
   * Destaque os **Faróis de Status**: PPM da Qualidade batido com folga (2.964 vs 4.000), fornecedores IQF acima de 94%, e o alerta no OEE de julho.

4. **Demonstração do Módulo ESG e Projetos**:
   * Abra a aba **Cockpit ESG** para mostrar a conformidade de água, energia, NBR 14283 e os 8 critérios de governança.
   * Abra a aba **Projetos ESG** e mostre o portfólio de projetos com metas da ONU (ODS), clicando no botão **"+ Cadastrar Projeto"** para mostrar como novas ideias são inseridas em segundos.

5. **Demonstração do Plano de Ação 5W2H**:
   * Abra a aba de Plano de Ação e explique que as ações da planilha (como compressor e unidade hidráulica) agora viraram cards interativos que somam a economia capturada.

6. **Fechamento e Praticidade Operacional**:
   * Abra o botão **"Atualizar Dados"** e mostre que o responsável gasta menos de 5 minutos por mês preenchendo um formulário limpo ou arrastando o Excel antigo, sem risco de corromper dados.

---

*Manual elaborado pelo Departamento de Tecnologia da Informação (TI) • Versão 1.0 (2026).*
