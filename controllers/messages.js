const Message = require("../models/messages.js");

const messageController = {
  getAllMessages: async (req, res) => {
    const { user_id, client_user_id } = req.query;
    try {
      const query = {
        from_userId: user_id,
        to_userId: client_user_id,
      };
      const foundMessages = await Message.find(query);
      res.send(foundMessages);
    } catch (e) {
      res.status(400).send(e.message);
      console.log(e.message);
    }
  },

  postMessage: async (req, res) => {
    const { message } = req.body;
    try {
      const insertedMessage = await Message.create(message);
      res.send(insertedMessage);
    } catch (e) {
      console.log(e.message);
    }
  },
};
module.exports = messageController;
