#!/usr/bin/env node

const webdriverio = require('webdriverio');
const t = require('tap');
const casual = require('casual');
const axios = require('axios');
const config = require('../../config/webdriver');
const {sel} = require('./utils/global');

t.test('Element', async (t) => {
    const driver = webdriverio.remote(config.driver);
    const boardName = casual.title;
    const columnName = casual.title;
    const taskTitle = casual.title;
    const taskText = casual.sentence;

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
            .waitForExist(sel('board-header-input-title'), 10000)
            .click(sel('board-btn-new-column'))
            .setValue(sel('board-input-new-column-title'), columnName)
            .click(sel('board-btn-new-board-submit'))
            .waitForExist(sel('board-input-column-title'));
    });

    await t.afterEach(async (t) => {
        await driver.getUrl()
            .then(url => url.split('/').slice(-1)[0])
            .then(async (boardId) => await axios.delete(`http://webx.com/api/boards/${boardId}`)
                .catch((err) => console.log(err)));
        await driver.click(sel('header-btn-logout'));
    });

    await t.test('create', async (t) => {
        await driver
            .click(sel('board-btn-new-task'))
            .setValue(sel('board-input-new-task-title'), taskTitle);
        await driver.keys(['Enter']);
        await driver.waitForExist(sel('board-elem'));

        const title = await driver.getValue(sel('board-input-elem'));
        t.same(title, taskTitle);
    });

    await t.test('modify', async (t) => {
        const newTaskTitle = casual.title;
        const newTaskText = casual.sentence;

        await driver
            .click(sel('board-btn-new-task'))
            .setValue(sel('board-input-new-task-title'), taskTitle)
            .keys(['Enter'])
            .waitForExist(sel('board-elem'));

        await driver
            .click(sel('board-elem'))
            .waitForExist(sel('task-input-title'))
            .setValue(sel('task-input-title'), newTaskTitle)
            .setValue(sel('task-input-text'), newTaskText)
            .click(sel('task-btn-save'));

        const elemText = await driver.getValue(sel('board-input-elem'));
        t.same(elemText, newTaskTitle);

        await driver
            .click(sel('board-elem'))
            .waitForExist(sel('task-input-title'));

        const title = await driver.getValue(sel('task-input-title'));
        t.same(title, newTaskTitle);

        const text = await driver.getValue(sel('task-input-text'));
        t.same(text, newTaskText);

        await driver.$(sel('task-btn-close')).click();
    });

    await t.test('delete', async (t) => {
        await driver
            .click(sel('board-btn-new-task'))
            .setValue(sel('board-input-new-task-title'), taskTitle)
            .keys(['Enter'])
            .waitForExist(sel('board-elem'));

        await driver
            .click(sel('board-elem'))
            .waitForExist(sel('task-input-title'))
            .click(sel('task-btn-delete'))
            .waitForVisible(sel('board-btn-new-task'));

        const taskElements = await driver.$$(sel('board-elem'));
        t.ok(taskElements.length === 0);
    });

    await driver.end();
});