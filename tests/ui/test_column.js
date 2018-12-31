#!/usr/bin/env node

const webdriverio = require('webdriverio');
const t = require('tap');
const casual = require('casual');
const axios = require('axios');
const config = require('../../config/webdriver');
const {sel} = require('./utils/global');

t.test('Column', async (t) => {
    const driver = webdriverio.remote(config.driver);
    const boardName = casual.title;
    const columnName = casual.title;

    await driver.init();

    await t.beforeEach(async (t) => {
        await driver
            .url('http://webx.com')
            .setValue(sel('login-input-username'), 'linus')
            .setValue(sel('login-input-password'), '123')
            .click(sel('login-btn-submit'))
            .waitForExist(sel('header-btn-logout'), 10000)
            .click(sel('header-btn-new-board'))
            .setValue(sel('header-modal-input'), boardName)
            .submitForm(sel('header-modal-form'))
            .waitForExist(sel('board-header-input-title'), 10000);
    });

    await t.afterEach(async (t) => {
        await driver.getUrl()
            .then(url => url.split('/').slice(-1)[0])
            .then(async (boardId) => await axios.delete(`http://webx.com/api/boards/${boardId}`)
                .catch((err) => console.log(err)));
        await driver.click(sel('header-btn-logout'));
    });

    await t.test('create by button', async (t) => {
        await driver
            .click(sel('board-btn-new-column'))
            .setValue(sel('board-input-new-column-title'), columnName)
            .click(sel('board-btn-new-board-submit'))
            .waitForExist(sel('board-input-column-title'), 10000);

        const title = await driver.getValue(sel('board-input-column-title'));
        t.same(title, columnName);
    });

    await t.test('create by enter', async (t) => {
        await driver
            .click(sel('board-btn-new-column'))
            .setValue(sel('board-input-new-column-title'), columnName)
            // .click(sel('board-input-new-column-title'))
            .keys(["Enter"])
            .waitForExist(sel('board-input-column-title'), 10000);

        const title = await driver.getValue(sel('board-input-column-title'));
        t.same(title, columnName);
    });

    await t.test('rename', async (t) => {
        const newTitle = casual.title;

        await driver
            .click(sel('board-btn-new-column'))
            .setValue(sel('board-input-new-column-title'), columnName)
            .click(sel('board-btn-new-board-submit'))
            .waitForExist(sel('board-input-column-title'));

        await driver
            .click(sel('board-input-column-title'))
            .clearElement(sel('board-input-column-title'));

        t.ok((await driver.getValue(sel('board-input-column-title'))).length === 0);

        await driver
            // .setValue(sel('board-input-column-title'), '')
            // .click(sel('board-input-column-title'))
            // .$(sel('board-input-column-title'))
            // .keys(newTitle)
            .setValue(sel('board-input-column-title'), newTitle)
            // .click(sel('board-input-column-title'))
            .keys(['Enter']);

        const title = await driver.getValue(sel('board-input-column-title'));
        t.same(title, columnName);
    });

    await t.test('delete', async (t) => {
        await driver
            .click(sel('board-btn-new-column'))
            .setValue(sel('board-input-new-column-title'), columnName)
            .click(sel('board-btn-new-board-submit'))
            .waitForExist(sel('board-input-column-title'));

        await driver
            .click(sel('board-btn-delete-column'));

        const columnElements = await driver.$$(sel('board-column'));
        t.ok(columnElements.length === 0);
    });

    await driver.end();
});