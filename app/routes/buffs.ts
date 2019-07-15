import express = require('express');

const buffRouter = express.Router();

buffRouter.get('/', async (req, res, next) => {
    console.log("buff get called");
    res.send("NOT YET IMPLEMENTED");
});

export { buffRouter };