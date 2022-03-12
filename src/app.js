const express = require("express");
const pastes = require('./data/pastes-data');
const app = express();

app.use(express.json());
// TODO: Follow instructions in the checkpoint to implement ths API.


app.get('/pastes', (req,res) => {
  res.json({data:pastes});
})

app.get('/pastes/:pasteId', (req,res, next) => {
  const foundPaste = pastes.find(x => x.id === Number(req.params.pasteId));

  if(foundPaste) {
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
