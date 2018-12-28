#!/usr/bin/env node

const webdriverio = require('webdriverio');
const t = require('tap');
const casual = require('casual');
const axios = require('axios');
const config = require('../../config/webdriver');
const {sel} = require('./utils/global');

const Board = require('../../models/board');

t.test('Main page', async (t) => {
    const driver = webdriverio.remote(config.driver);
    const newBoardTitle = casual.title;

    await driver.init();

    await t.beforeEach(async (t) => {
        await driver
            .url('http://webx.com')
            .setValue(sel('login-input-username'), 'linus')
            .setValue(sel('login-input-password'), '123')
            .submitForm(sel('login-form'))
            .waitForExist(sel('header-btn-logout'), 15000);
    });

    await t.afterEach(async (t) => {
        await driver.click(sel('header-btn-logout'));
    });

    await t.test('Create new board', async (t) => {
        t.match(await driver.getUrl(), /http:\/\/webx.com\/(#\/)?$/);

        await driver
            .click(sel('header-btn-new-board'))
            .setValue(sel('header-modal-input'), newBoardTitle)
            .submitForm(sel('header-modal-form'))
            .waitForExist(sel('board-header-input-title'), 30000);

        const title = await driver.getValue(sel('board-header-input-title'));
        t.strictSame(title, newBoardTitle);

        await driver.getUrl()
            .then(url => url.split('/').slice(-1)[0])
            .then(async (boardId) => await axios.delete(`http://webx.com/api/boards/${boardId}`)
                .catch((err) => console.log(err)));
        // const boardId = url.split('/').slice(-1)[0];
        // await axios.delete(`http://webx.com/api/boards/${boardId}`)
        //     .then(() => console.log('then'))
        //     .catch((err) => console.log(err));
    });

    await driver.end();
});