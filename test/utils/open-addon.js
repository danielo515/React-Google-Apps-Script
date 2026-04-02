export const openAddon = async (page) => {
  await page.goto(process.env.SHEET_URL);

  await page.waitForTimeout(5000);
  await page.locator('a:nth-child(2)').click(); // click on signin button

  await page.locator('input[name="identifier"]').waitFor({ state: 'visible' });
  await page.locator('input[name="identifier"]').fill(process.env.EMAIL);
  await page.locator('#identifierNext').click();

  await page.locator('input[name="Passwd"]').waitFor({ state: 'visible' });
  await page.locator('input[name="Passwd"]').fill(process.env.PASSWORD);
  await page.waitForTimeout(500);

  await page.locator('#passwordNext').click();
  await page.waitForTimeout(3000);

  const headingText = await page.evaluate(
    () =>
      document.querySelector('h1#headingText') &&
      document.querySelector('h1#headingText').innerText
  );

  if (headingText && headingText.includes('erify')) {
    try {
      await page.locator('li:nth-child(3)').click();
      await page.waitForTimeout(6000);
    } catch {
      // eslint-disable-next-line no-console
      console.log('The "choose account recovery method" page isn\'t shown');
    }

    await page
      .locator('input[name="knowledgePreregisteredEmailResponse"]')
      .fill(process.env.TEST_RECOVERY_EMAIL);
    await page.waitForTimeout(6000);
    await page.locator('div[data-primary-action-label] button').click();
    await page.waitForTimeout(5000);
  }

  const simplifyText = await page.evaluate(
    () =>
      document.querySelector('h1#headingText') &&
      document.querySelector('h1#headingText').innerText
  );

  if (simplifyText && simplifyText.includes('implify your sign')) {
    try {
      await page
        .locator(
          'div[data-secondary-action-label] > div > div:nth-child(2) button'
        )
        .click();
      await page.waitForTimeout(6000);
    } catch {
      // eslint-disable-next-line no-console
      console.log('The "Simplify your sign-in" page isn\'t shown');
    }
  }

  await page
    .locator('div.menu-button.goog-control.goog-inline-block:nth-child(10)')
    .waitFor({ state: 'visible' });

  // open new addon menubar item
  await page.evaluate(() => {
    const addOnMenuButton = document.querySelector(
      'div.menu-button.goog-control.goog-inline-block:nth-child(10)'
    );
    addOnMenuButton.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    );
    addOnMenuButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  });

  await page
    .locator(
      'div.goog-menu.goog-menu-vertical.apps-menu-hide-mnemonics:last-child > div:nth-child(2) > div'
    )
    .waitFor({ state: 'visible' });

  // open "bootstrap" menu item
  await page.evaluate(() => {
    const bootstrapMenuButton = document.querySelector(
      'div.goog-menu.goog-menu-vertical.apps-menu-hide-mnemonics:last-child > div:nth-child(2) > div'
    );
    bootstrapMenuButton.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    );
    bootstrapMenuButton.dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true })
    );
    bootstrapMenuButton.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    );
    bootstrapMenuButton.dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true })
    );
  });
  await page.locator('div[role="dialog"]').waitFor({
    state: 'visible',
    timeout: 10000,
  });

  await page.waitForTimeout(15000);
};
