import express from 'express';
var router = express.Router();

router.post('/', function (req, res) {
  if (req.body.org === 'testError') {
    res.status(500).json({
      "status": "error",
      "message": "Invalid Subscription request."
    });
  } else {

    res.json({
      "status": "success",
      "message": "Thank you. You are now subscribed."
    });
  }

});

export default router;