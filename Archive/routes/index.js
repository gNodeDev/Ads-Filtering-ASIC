var express = require("express");
var router = express.Router();
var controller = require("../controllers/mainController");
var nodecontroller = require("../controllers/nodeData");



router.post("/textImage", controller.textImageProcessing);
router.post("/audio", controller.audioProcessing);
router.post("/video", controller.videoProcessing);
router.post("/nlp", controller.nlpProcessing);
router.post("/rules", controller.ruleProcessing);
router.post("/test", controller.test);
router.get("/allAdsToShowTable", controller.allAdsToShowTable);
router.post("/GetAdvBreaches", controller.GetAdvBreaches);
router.post("/GetAudioTranscript", controller.GetAudioTranscript);
router.post("/GetAdvBreachesAll", controller.GetAdvBreachesAll);
router.post("/GetNodeDetail", nodecontroller.getnodeData);
router.post("/GetMapData", nodecontroller.getMapData);
router.post("/GetIndigiousData", nodecontroller.GetIndigiousData);







module.exports = router;
