var pg = require('pg');
var conString = "postgres://postgres:123456Ab.@localhost:5432/postgres";
//var conString = "postgres://postgres:@127.0.0.1:5432/postgres";

var client = new pg.Client(conString);
async () => {
    await client.connect();
}

client.on('error', (err) => {
    console.error('something bad has happened!', err.stack)
})

async () => {
    const res = await client.query('SELECT NOW() as now')
    console.log(res.);
}

// async () => {
//     var query = await client.query('SELECT * FROM users');
//     console.log(query);
// }
// query.array.forEach(row => {
//     console.log(row);
// });

client.end;

module.exports = client;