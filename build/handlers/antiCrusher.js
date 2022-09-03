module.exports = (client) => {
    process.on('unhandledRejection', (reason, p) => {
         client.log(reason, p);
     });
     process.on("uncaughtException", (err, origin) => {
        client.log(err);
     }) 
     process.on('uncaughtExceptionMonitor', (err, origin) => {
        client.log(err, origin);
     });
     process.on('multipleResolves', (type, promise, reason) => {
        client.log(type, promise, reason);
     });
 }