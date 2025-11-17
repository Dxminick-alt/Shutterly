/**
 * Performance Testing with Lighthouse
 * 
 * This test measures the performance, accessibility, best practices, and SEO
 * of the Shutterly application using Google Lighthouse.
 * 
 * To run this test:
 * 1. Install lighthouse: npm install -g lighthouse
 * 2. Start the dev server: npm run dev
 * 3. Run lighthouse: lighthouse http://localhost:3000 --output html --output-path ./tests/performance/report.html
 * 
 * Or run the automated test below:
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runLighthouse() {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };
  
  const runnerResult = await lighthouse('http://localhost:3000', options);

  // Generate report
  const reportHtml = runnerResult.report;
  const reportPath = path.join(__dirname, 'lighthouse-report.html');
  fs.writeFileSync(reportPath, reportHtml);

  // Print scores
  console.log('Lighthouse Performance Report:');
  console.log('Performance score:', runnerResult.lhr.categories.performance.score * 100);
  console.log('Accessibility score:', runnerResult.lhr.categories.accessibility.score * 100);
  console.log('Best Practices score:', runnerResult.lhr.categories['best-practices'].score * 100);
  console.log('SEO score:', runnerResult.lhr.categories.seo.score * 100);
  console.log(`\nFull report saved to: ${reportPath}`);

  await chrome.kill();
}

// Run if executed directly
if (require.main === module) {
  runLighthouse().catch(console.error);
}

module.exports = runLighthouse;
