import postgres from "postgres";

const sql = postgres({
    host: '/var/run/postgresql',
    database: 'rana_parliament_vote',
    username: 'rana'
});

export default sql;