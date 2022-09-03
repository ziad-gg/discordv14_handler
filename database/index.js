const { Schema } = require('./settings/schemas/schema');
const { connect } = require('./settings/connection/connect.js');
const {  connection, Model  } = require('./settings/Models/Moldels.js');
module.exports.quickfirebase = {
    connect,
    Schema,
    connection,
    Model,
   
};
//# sourceMappingURL=index.js.map