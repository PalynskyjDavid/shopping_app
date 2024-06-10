//import pg from 'pg'
var pg = require('pg');
const { Pool, Client } = pg

const pool = new Pool({
    user: 'postgres',
    password: '123456Ab.',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
})

async () => {
    await client.connect()
}

async () => {
    console.log(await pool.query('SELECT NOW()'))
}

const client = new Client({
    user: 'postgres',
    password: '123456Ab.',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
})



async () => {
    console.log(await client.query('SELECT NOW()'))
}

async () => {
    await client.end()
}