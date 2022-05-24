//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
const fs = require('fs');

class LogError extends Error{
    constructor(message){
        super(message);
        this.init();
    }

    init(){
        const d = new Date();
        this.date = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}-${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}-${d.getMilliseconds()}`;
        this.time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        this.dir = './log/';
        this.file = `${this.date}.log`;
    }

    getFolder(){
        return `${this.dir}${this.file}`;
    }

    getMessage(){
        return `${this.date} ${this.time}: ${this.toString()}`+"\r\n";
    }

    log(){
        // Promisify
        let p = new Promise(async (res, rej) => 
        {
            await fs.appendFile(this.getFolder(), this.getMessage(), err => {
                if(!err){
                    res(this.getMessage());
                }
                else{
                    rej(new Error(err.message));
                }
            });
        });

        return p;
    }
}
module.exports = LogError;