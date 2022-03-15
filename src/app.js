const express = require("express");
const pastes = require('./data/pastes-data');
const pastesRouter = require("./pastes/pastes.router");
const app = express();

app.use(express.json());
// TODO: Follow instructions in the checkpoint to implement ths API.

app.use("/pastes", pastesRouter);


app.get('/pastes/:pasteId', (req, res, next) => {
    const foundPaste = pastes.find(x => x.id === Number(req.params.pasteId));
    if (foundPaste) {
        return res.json(foundPaste)
    } else {
        next({ status: 404, message: `Paste id not found: ${pasteId}` });
    }

})

// Not found handler
app.use((request, response, next) => {
    next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
});

module.exports = app;
