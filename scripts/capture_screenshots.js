import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputDir = 'c:\\Users\\GabrielFlorêncioTI\\Desktop\\Projeto KPI\\screenshots';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1600,1050'],
    defaultViewport: { width: 1600, height: 1000 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.waitForSelector('h1');
  await new Promise(r => setTimeout(r, 1000));

  console.log('Capturing Visão Executiva...');
  await page.screenshot({ path: path.join(outputDir, '1_visao_executiva.png') });

  // Click Cockpit ESG
  console.log('Capturing Cockpit ESG...');
  const tabs = await page.$$('nav button');
  if (tabs[1]) {
    await tabs[1].click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, '2_cockpit_esg.png') });
  }

  // Click Projetos ESG
  console.log('Capturing Projetos ESG...');
  if (tabs[2]) {
    await tabs[2].click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, '3_projetos_esg.png') });

    // Open Cadastrar Projeto Modal
    const addBtn = await page.$('button.bg-teal-600');
    if (addBtn) {
      await addBtn.click();
      await new Promise(r => setTimeout(r, 500));
      await page.screenshot({ path: path.join(outputDir, '4_modal_novo_projeto.png') });
      // Close modal
      const closeBtn = await page.$('button.w-8.h-8');
      if (closeBtn) await closeBtn.click();
      await new Promise(r => setTimeout(r, 400));
    }
  }

  // Click Departamentos
  console.log('Capturing Departamentos...');
  if (tabs[3]) {
    await tabs[3].click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, '5_departamentos.png') });
  }

  // Click Plano de Ação 5W2H
  console.log('Capturing Plano de Ação 5W2H...');
  if (tabs[4]) {
    await tabs[4].click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outputDir, '6_plano_5w2h.png') });
  }

  // Click Atualizar Dados button in header
  console.log('Capturing Atualizar Dados modal...');
  const updateBtn = await page.$('button.bg-emerald-600');
  if (updateBtn) {
    await updateBtn.click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(outputDir, '7_atualizar_dados_modal.png') });
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
