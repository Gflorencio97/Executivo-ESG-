import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const inputPath = 'c:\\Users\\GabrielFlorêncioTI\\Desktop\\Projeto KPI\\public\\logo.jpg';
const outputPath = 'c:\\Users\\GabrielFlorêncioTI\\Desktop\\Projeto KPI\\public\\logo.png';
const srcOutputPath = 'c:\\Users\\GabrielFlorêncioTI\\Desktop\\Projeto KPI\\src\\assets\\logo.png';

async function processLogo() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const imgBase64 = fs.readFileSync(inputPath).toString('base64');
  const dataUrl = `data:image/jpeg;base64,${imgBase64}`;

  const transparentPngBase64 = await page.evaluate(async (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // If close to white, make transparent
          if (r > 235 && g > 235 && b > 235) {
            data[i + 3] = 0;
          } else {
            const x = (i / 4) % canvas.width;
            const y = Math.floor((i / 4) / canvas.width);
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }

        ctx.putImageData(imgData, 0, 0);

        // Crop to bounding box with padding
        const padding = 20;
        minX = Math.max(0, minX - padding);
        minY = Math.max(0, minY - padding);
        maxX = Math.min(canvas.width, maxX + padding);
        maxY = Math.min(canvas.height, maxY + padding);

        const cropW = maxX - minX;
        const cropH = maxY - minY;

        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = cropW;
        cropCanvas.height = cropH;
        const cropCtx = cropCanvas.getContext('2d');
        cropCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

        resolve(cropCanvas.toDataURL('image/png'));
      };
      img.src = src;
    });
  }, dataUrl);

  await browser.close();

  const base64Data = transparentPngBase64.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync(outputPath, Buffer.from(base64Data, 'base64'));
  fs.writeFileSync(srcOutputPath, Buffer.from(base64Data, 'base64'));
  console.log('Transparent cropped logo.png saved successfully!');
}

processLogo().catch(err => {
  console.error('Error processing logo:', err);
  process.exit(1);
});
