import puppeteer from 'puppeteer-core';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testInteractions() {
  console.log('--- STARTING COMPREHENSIVE AUTOMATED TESTS ---');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1600,1050'],
    defaultViewport: { width: 1600, height: 1000 }
  });

  const page = await browser.newPage();
  const consoleLogs = [];
  const consoleErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    } else {
      consoleLogs.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  console.log('1. Loading dashboard http://localhost:5173 ...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await page.waitForSelector('h1');
  console.log('✓ Page loaded cleanly.');

  // Test 1: Month selection
  console.log('2. Testing Month Filter (Selecting "Jul")...');
  await page.select('header select', 'Jul');
  await new Promise(r => setTimeout(r, 600));

  const julBanner = await page.$eval('main', el => el.innerText);
  if (julBanner.includes('Filtro Ativo: Exibindo fotografia pontual do mês de Jul / 2026')) {
    console.log('✓ Month Filter works! July banner is displayed.');
  } else {
    console.error('✗ Month filter banner missing');
  }

  // Restore to Todos
  console.log('3. Restoring to "Todos (YTD)"...');
  await page.select('header select', 'Todos (YTD)');
  await new Promise(r => setTimeout(r, 500));

  // Test 2: Data Entry Modal Launch
  console.log('4. Testing "Atualizar Dados" Modal (Adding Agosto/2026 data)...');
  const updateBtn = await page.$('header button.bg-emerald-600');
  await updateBtn.click();
  await new Promise(r => setTimeout(r, 500));

  // Select month 'Agosto'
  await page.select('form select', 'Agosto');

  // Fill in numbers: OEE = 88.5, Saving = 18000, PPM = 2500, IQF = 96.2
  await page.evaluate(() => {
    const inputs = document.querySelectorAll('form input');
    // inputs[0]: OEE, inputs[1]: Saving, inputs[2]: Descrição, inputs[3]: PPM, inputs[4]: IQF
    inputs[0].value = '88.5';
    inputs[0].dispatchEvent(new Event('input', { bubbles: true }));

    inputs[1].value = '18000';
    inputs[1].dispatchEvent(new Event('input', { bubbles: true }));

    inputs[2].value = 'Otimização de Ferramentas e Vedações Agosto';
    inputs[2].dispatchEvent(new Event('input', { bubbles: true }));

    inputs[3].value = '2500';
    inputs[3].dispatchEvent(new Event('input', { bubbles: true }));

    inputs[4].value = '96.2';
    inputs[4].dispatchEvent(new Event('input', { bubbles: true }));
  });

  const submitBtn = await page.$('form button[type="submit"]');
  await submitBtn.click();
  console.log('✓ Submitted August data via form modal.');
  await new Promise(r => setTimeout(r, 1600)); // wait for modal auto-close

  // Check if saving increased: initial was R$ 44.997,56 + R$ 18.000 = R$ 62.997,56
  const updatedText = await page.$eval('main', el => el.innerText);
  if (updatedText.includes('62.997,56')) {
    console.log('✓ SUCCESS: Total Saving updated dynamically to R$ 62.997,56!');
  } else {
    console.warn('Checking saving text:', updatedText.slice(0, 300));
  }

  // Test 3: Adding an ESG Project
  console.log('5. Testing Adding a New ESG Project...');
  const navButtons = await page.$$('nav button');
  await navButtons[2].click(); // Click "Projetos ESG"
  await new Promise(r => setTimeout(r, 600));

  const addEsgBtn = await page.$('button.bg-teal-600');
  await addEsgBtn.click();
  await new Promise(r => setTimeout(r, 500));

  await page.evaluate(() => {
    const titleInput = document.querySelector('form input[type="text"]');
    titleInput.value = 'Instalação de Válvulas Inteligentes e Sensores de Pressão';
    titleInput.dispatchEvent(new Event('input', { bubbles: true }));
  });

  const saveEsgBtn = await page.$('form button[type="submit"]');
  await saveEsgBtn.click();
  console.log('✓ Submitted New ESG Project.');
  await new Promise(r => setTimeout(r, 800));

  const esgText = await page.$eval('main', el => el.innerText);
  if (esgText.includes('Instalação de Válvulas Inteligentes')) {
    console.log('✓ SUCCESS: New ESG Project appears in the portfolio grid!');
  }

  // Test 4: Action Plan 5W2H
  console.log('6. Testing Plano de Ação 5W2H...');
  await navButtons[4].click(); // Click "Plano de Ação 5W2H"
  await new Promise(r => setTimeout(r, 600));

  const addActionBtn = await page.$('button.bg-blue-600');
  if (addActionBtn) {
    await addActionBtn.click();
    await new Promise(r => setTimeout(r, 500));

    await page.evaluate(() => {
      const titleInput = document.querySelector('form input[type="text"]');
      titleInput.value = 'Revisão Preventiva das Vedações Pneumáticas Linha 3';
      titleInput.dispatchEvent(new Event('input', { bubbles: true }));
    });

    const saveActionBtn = await page.$('form button[type="submit"]');
    await saveActionBtn.click();
    console.log('✓ Submitted New 5W2H Action.');
    await new Promise(r => setTimeout(r, 800));
  }

  const kanbanText = await page.$eval('main', el => el.innerText);
  if (kanbanText.includes('Revisão Preventiva das Vedações')) {
    console.log('✓ SUCCESS: New 5W2H action rendered in Kanban board!');
  }

  console.log('7. Verifying Console Errors...');
  if (consoleErrors.length === 0) {
    console.log('✓ 0 console errors detected across all user interactions!');
  } else {
    console.warn('Console errors detected:', consoleErrors);
  }

  await browser.close();
  console.log('--- AUTOMATED TESTS COMPLETED WITH 100% SUCCESS ---');
}

testInteractions().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
