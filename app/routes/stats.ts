import express = require('express');

const statRouter = express.Router();

statRouter.get('/', async (req, res, next) => {
    console.log("get stat called");
    res.send("NOT YET IMPLEMENTED");
});

export { statRouter };