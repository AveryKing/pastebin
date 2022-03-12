const express = require("express");
const pastes = require('./data/pastes-data');
const app = express();

app.use(express.json());
// TODO: Follow instructions in the checkpoint to implement ths API.


app.get('/pastes', (req, res) => {
    res.json({data: pastes});
})

// New middleware function to validate the request body

function bodyHasTextProperty(req, res, next) {

    const {data: {text} = {}} = req.body;

    if (text) {

        return next(); // Call `next()` without an error message if the result exists

    }

    next("A 'text' property is required.");

}


// Variable to hold the next ID

// Because some IDs may already be used, find the largest assigned ID

let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);

app.post("/pastes",
    bodyHasTextProperty,
    (req, res, next) => {
        const {data: {name, syntax, exposure, expiration, text, user_id} = {}} = req.body;
        const newPaste = {
            id: ++lastPasteId, // Increment last ID, then assign as the current ID
            name,
            syntax,
            exposure,
            expiration,
            text,
            user_id,
        };
            
        pastes.push(newPaste);

        res.status(201).json({data: newPaste});

    });


app.get('/pastes/:pasteId', (req, res, next) => {
    const foundPaste = pastes.find(x => x.id === Number(req.params.pasteId));

    if (foundPaste) {
        return res.json(foundPaste)
    } else {
        next("paste not found")
    }

})

// Not found handler
app.use((request, response, next) => {
    next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
    console.error(error);
    response.send(error);
});

module.exports = app;
