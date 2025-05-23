const express = require('express');
const app = express();
const axiosHelper = require('./axios');
require('dotenv').config();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here
app.get('/', async (req, res) => {
    try {
        //call API
        const data = await axiosHelper.getCustomObject('2-44144198', 100, 'name,favorite_character,description,hs_object_id', PRIVATE_APP_ACCESS);
        res.render('homepage', { title: 'Favorite Anime | Integrating With HubSpot I Practicum', data: data?.results || [] });
    } catch (error) {
        console.error(error);
    }
});
// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here
app.get('/update-cobj/:id?', async (req, res) => {
    try {
        let data = null;
        if(req.params?.id){
            data = await axiosHelper.getCustomObjectById('2-44144198', req.params.id, 'name,favorite_character,description,hs_object_id', PRIVATE_APP_ACCESS);
        }
        res.render('updates', { title: 'Update Favorite Anime Form | Integrating With HubSpot I Practicum', data: data });
    } catch (error) {
        console.error(error);
    }
});


// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here
app.post('/update-cobj/:id?', async (req, res) => {
    try {
        //call API
        if(req.params?.id){
            await axiosHelper.updateCustomObject('2-44144198', req.params.id, req.body, PRIVATE_APP_ACCESS);
        }else{
            await axiosHelper.addCustomObject('2-44144198', req.body, PRIVATE_APP_ACCESS);
        }
        res.redirect('/');
        // res.render('homepage', { title: 'Favorite Anime | Integrating With HubSpot I Practicum', data });
    } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 4 - Create a new app.get route for the custom objects to delete your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 4 goes here
app.get('/delete-cobj/:id', async (req, res) => {
    try {
        //call API
        if(req.params?.id){
            await axiosHelper.deleteCustomObject('2-44144198', req.params.id, PRIVATE_APP_ACCESS);
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));