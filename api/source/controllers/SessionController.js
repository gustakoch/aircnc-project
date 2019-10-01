// index => retorna lista de sessions (baseia pelo nome do controller)
// show => retorna uma única session
// store => quando eu quero criar uma session
// update => quando eu quero alterar uma session, atualizar
// destroy => quando eu quero remover uma session

const userModel = require('../models/User');

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({ email });
    }

    return res.json(user);
  }
};
