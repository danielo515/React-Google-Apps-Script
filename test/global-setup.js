// Playwright global setup for Vitest
// Launches a shared browser instance and exposes the wsEndpoint via filesystem

import fs from 'fs';
import os from 'os';
import path from 'path';
import { chromium } from 'playwright';

const fsPromises = fs.promises;
const DIR = path.join(os.tmpdir(), 'playwright_global_setup');

let browser;

export async function setup() {
  browser = await chromium.launch({
    headless: false,
    args: [
      '--force-color-profile=generic-rgb',
      '--font-render-hinting=none',
      '--disable-font-subpixel-positioning',
      '--enable-font-antialiasing',
      '--disable-gpu',
    ],
  });

  // use the file system to expose the wsEndpoint for test files
  await fsPromises.mkdir(DIR, { recursive: true });
  await fsPromises.writeFile(
    path.join(DIR, 'wsEndpoint'),
    browser.wsEndpoint()
  );
}

export async function teardown() {
  if (browser) {
    await browser.close();
  }

  // clean-up the wsEndpoint file
  await fsPromises.rm(DIR, { recursive: true, force: true });
}
