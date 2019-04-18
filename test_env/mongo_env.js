const NodeEnvironment = require('jest-environment-node');

class MongooseEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context);
        console.log("We made it boys.")
    }
}

module.exports = MongooseEnvironment;