var mysql = require("mysql");
const util = require("util");

module.exports = dbConfig => {
    const conn = mysql.createConnection(dbConfig);
    return {
        connect: function () {
            return conn.connect(err => {
                if (err) {
                    console.log("not connected");
                }
                else {
                    console.log("Connected to the database successfully!");
                }
            });
        },
        query: function (sql, args) {
            return util.promisify(conn.query).call(conn, sql, args);
        },
        close: function () {
            return util.promisify(conn.end).call(conn);
        },
        beginTransaction: function () {
            return util.promisify(conn.beginTransaction).call(conn);
        },
        commit: function () {
            return util.promisify(conn.commit).call(conn);
        },
        rollback: function () {
            return util.promisify(conn.rollback).call(conn);
        }
    }
}