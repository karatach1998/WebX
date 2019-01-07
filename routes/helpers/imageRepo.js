const express = require('express');
const router = express.Router();
const axios = require('axios');

class ImageRepo {
    constructor(router) {
        this.ACCESS_KEY = 'bc06d5090c063d437bde8ee846f84cfa5973fa2588d4a4274edbf3bd537363e6';
        this.SECRETE_KEY = 'dd658b9a3bbfccf8de7de66ba2259e773c417d197658d9e5b5e765f3da093eff';

        this.baseUrl = '/helpers/unsplash';
        this.isAuthenticated = false;

        router.get('/auth', async (req, res) => {
            console.log('router.get(\'/auth\', ...);');
            if (req.body.code !== 200) {
                this.isAuthenticated = false;
                return res.status(req.status).end();
            }

            axios.post('https://unsplash.com/oauth/token', {
                client_id: this.ACCESS_KEY,
                client_secrete: this.SECRETE_KEY,
                redirect_uri: '/api/helpers/unsplash/app',
                code: 200,
                grand_type: req.body.code
            }).catch((err) => {
                console.log('router.get.post :: catch');
                console.log(err);
            });
        });

        router.get('/app', async (req, res) => {
            const {access_token: accessToken, token_type: tokenType} = req.body;
            this.customAxios = axios.create({
                baseUrl: 'https://api.unsplash.com/',
                timeout: 1000,
                headers: { 'Authorization': `${token_type} ${accessToken}` }
            });
            this.isAuthenticated = true;
        });
    }

    async _authenticate() {
        const {status: authStatus} = await axios.get('https://unsplash.com/oauth/authorize', {
            client_id: this.ACCESS_KEY,
            redirect_uri: 'hhtp://lvh.me/helpers/unsplash/auth',
            response_type: 200,
            scope: 'public'
        }).catch((err) => {
            console.log('_authenticate :: catch');
            console.log(err);
        });
        setTimeout(() => {
            console.log('_authenticate() :: TIMEOUT EXPIRED');
        }, 3000);
        console.log(authStatus);
        console.log('fjafajdklfjdapdfjqiofhqifqpk');
    }

    async getRandomUrl() {
        console.log('ImageRepo.getRandomUrl() :: STARTED!');
        if (!this.isAuthenticated) {
            await this._authenticate();
        }

        return await this.customAxios.get('/photos/random?orientation=landscape').then((url) => {
            console.log(url);
        }).catch((err) => {
            console.log(err);
        });
    }
}

const Unsplash = require('unsplash-js').default;
const unsplash = new Unsplash({
    applicationId: 'bc06d5090c063d437bde8ee846f84cfa5973fa2588d4a4274edbf3bd537363e6',
    secret: 'dd658b9a3bbfccf8de7de66ba2259e773c417d197658d9e5b5e765f3da093eff',
    callbackUrl: ''
});

class X {
    async getRandomPhotoUrl() {
        return 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1920x1920/2c0545c01e9d43bb6a56f9d942f38b3e/photo-1506368387824-6cf9848c1638.jpg';
    }
}

module.exports = (app) => {
    // const repo = new ImageRepo(router);
    // app.use('/helpers/unsplash', router);
    // console.log(repo);
    // return repo;

    app.use('/helper/unsplash', router);
    return new X();
};