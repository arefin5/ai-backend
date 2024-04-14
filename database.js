const {createPool}=require("mysql");
const poll=createPool({
    port:3306,
    user: "root",
    database: "study-webApplication",
    password: '',
    connectionLimit: 10

})
module.exports =poll;



