const pastes = require("../data/pastes-data");

const list = (req, res) => {

    res.json({ data: pastes });

}

module.exports = {

    list,

};