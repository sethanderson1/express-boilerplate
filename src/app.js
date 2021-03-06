require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
const { CLIENT_ORIGIN } = require('./config');
const jsonParser = express.json();
const app = express();

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';
app.use(morgan(morganOption));
app.use(helmet());
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

// figure out how to seed and do other things with knex

// app.get('/', async (req, res) => {
//     const knex = req.app.get('db')
//     const datesFromSeeds = await knex
//     .select('*')
//     .from('dates')

//     console.log('datesFromSeeds', datesFromSeeds)

//     // res.send(JSON.stringify({ datesFromSeeds }));
//     res.send(datesFromSeeds);
// })


app.get('/', async (req, res) => {
    const knex = req.app.get('db')

    // const dateNow = dayjs()
    // const dateNow = dayjs().format() //result: timestamp = 

    const dateNow = dayjs().utc().format()
    // const dateNow = new Date()
    console.log('dateNow', dateNow)

    const newDate = {
        timestamp: dateNow,
        timestamptz: dateNow
    }

    datesReturnedFromInsert = await knex
        .insert(newDate)
        .into('dates')
        .returning('*')
        .then(rows => {
            return rows[0]
        });


    console.log('datesReturnedFromInsert', datesReturnedFromInsert)

    res.send(datesReturnedFromInsert);
})



app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app