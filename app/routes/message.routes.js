const { authJwt } = require("../middleware");
const controller = require("../controllers/message.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.put(
    "/api/countDisagreed",
    [
      authJwt.verifyToken,
    ],
    controller.countDisagreed
  );

  

  app.put(
    "/api/countAgreed",
    [
      authJwt.verifyToken,
    ],
    controller.countAgreed
  );

  app.post(
    "/api/message",
    [
        authJwt.verifyToken
    ],
    controller.saveMessage
  );
  app.get(
    "/api/message",
    [
        authJwt.verifyToken
    ],
    controller.getMessages
  );

  
};
