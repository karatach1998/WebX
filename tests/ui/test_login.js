#!/usr/bin/env node

const webdriverio = require('webdriverio');
const t = require('tap');
const config = require('../../config/webdriver');
const {sel} = require('./utils/global');

t.test('Test login page', async (t) => {
    const driver = webdriverio.remote(config.driver);

    await driver.init();

    await t.afterEach(async () => {
        await driver.click(sel('header-btn-logout'));
    });

    await t.test('sign in with button', async (t) => {
        await driver.url('http://webx.com');
        await driver
            .setValue(sel('login-input-username'), 'linus')
            .setValue(sel('login-input-password'), '123')
            .click(sel('login-btn-submit'))
            .waitForExist(sel('header-btn-logout'));

        const location = await driver.getUrl();
        t.match(location, /http:\/\/webx.com\/(#\/)?$/);
    });

    await t.test('sign in with form submit', async (t) => {
        await driver.url('http://webx.com');
        await driver
            .setValue(sel('login-input-username'), 'linus')
            .setValue(sel('login-input-password'), '123')
            .submitForm(sel('login-form'))
            .waitForExist(sel('header-btn-new-board'));

        const location = await driver.getUrl();
        t.match(location, /http:\/\/webx.com\/(#\/)?$/);
    });

    await driver.end();
});