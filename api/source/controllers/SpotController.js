const spotModel = require('../models/Spot');

module.exports = {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await spotModel.find({ techs: tech });

    return res.json(spots);
  },

  async store(req, res) {
    const { company, price, techs } = req.body;
    const { filename } = req.file;
    const { user_id } = req.headers;

    const spot = await spotModel.create({
      user: user_id,
      thumbnail: filename,
      company,
      price,
      techs: techs.split(',').map(tech => tech.trim()),
     });

    return res.json(spot);
  }
};
