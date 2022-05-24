//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
const fs = require('fs');

class LogError extends Error{
    constructor(message){
        super(message);
        this.init();
    }

    init(){
        const d = new Date();
        this.date = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`;
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
        return new Promise(async (resolve, reject) => {
            await fs.appendFile(this.getFolder(), this.getMessage(), err =>{
                    if(!err){
                        resolve(this.getMessage());
                    }
                    else{
                        reject(new Error(err.message));
                    }
                }
            );
        });
    }
}
module.exports = LogError;