#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const budgets = {
  jsGzipKB: 250,
  cssGzipKB: 50,
  totalDistKB: 2000,
};

const toKB = (bytes) => Number((bytes / 1024).toFixed(2));

function buildApp() {
  console.log('Building production bundle...');
  execSync('npm run build', { stdio: 'inherit' });
}

function collectAssetMetrics() {
  const assetsDir = join(process.cwd(), 'dist', 'assets');
  const files = readdirSync(assetsDir);

  let jsBytes = 0;
  let cssBytes = 0;
  let jsGzipBytes = 0;
  let cssGzipBytes = 0;

  for (const file of files) {
    const fullPath = join(assetsDir, file);
    if (!statSync(fullPath).isFile()) continue;

    const raw = readFileSync(fullPath);

    if (file.endsWith('.js')) {
      jsBytes += raw.length;
      jsGzipBytes += gzipSync(raw).length;
    }

    if (file.endsWith('.css')) {
      cssBytes += raw.length;
      cssGzipBytes += gzipSync(raw).length;
    }
  }

  const totalDistBytes = Number(
    execSync('du -sb dist | cut -f1').toString().trim()
  );

  return {
    jsKB: toKB(jsBytes),
    cssKB: toKB(cssBytes),
    jsGzipKB: toKB(jsGzipBytes),
    cssGzipKB: toKB(cssGzipBytes),
    totalDistKB: toKB(totalDistBytes),
  };
}

function printReport(metrics) {
  console.log('\nPerformance snapshot');
  console.table(metrics);

  const checks = [
    ['JS gzip budget', metrics.jsGzipKB <= budgets.jsGzipKB, `${metrics.jsGzipKB} KB <= ${budgets.jsGzipKB} KB`],
    ['CSS gzip budget', metrics.cssGzipKB <= budgets.cssGzipKB, `${metrics.cssGzipKB} KB <= ${budgets.cssGzipKB} KB`],
    ['Total dist budget', metrics.totalDistKB <= budgets.totalDistKB, `${metrics.totalDistKB} KB <= ${budgets.totalDistKB} KB`],
  ];

  let failed = false;
  for (const [name, ok, message] of checks) {
    console.log(`${ok ? '✅' : '❌'} ${name}: ${message}`);
    if (!ok) failed = true;
  }

  if (failed) {
    process.exitCode = 1;
  }
}

buildApp();
const metrics = collectAssetMetrics();
printReport(metrics);
