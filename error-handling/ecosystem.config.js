module.exports = {
    apps : [
        {
            name : "App1",
            script : "./index-async.js"
        },
        {
            name : "App2",
            script : "./index-log-error.js",
            instances : 128
        }
    ]
}