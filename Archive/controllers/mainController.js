const fs = require("fs");
const Op = require("sequelize").Op;
const path = require("path");
const f = require("../models").files;
const text_annotations = require("../models").text_annotations;
const text_fulltext_annotations = require("../models")
  .text_fulltext_annotations;
const text_label_annotations = require("../models").text_label_annotations;
const audios = require("../models").audios;
const video_detect_texts = require("../models").video_detect_texts;
const image_logo_annotations = require("../models").image_logo_annotations;
const t_text_logo_bound_points = require("../models").t_text_logo_bound_points;
const video_track_objects = require("../models").video_track_objects;
// For NLP
const nlp_analyze_entities = require("../models").nlp_analyze_entities;
const nlp_analyze_syntax = require("../models").nlp_analyze_syntax;
const nlp_analyze_entity_sentiment = require("../models")
  .nlp_analyze_entity_sentiment;
const nlp_analyze_sentiment = require("../models").nlp_analyze_sentiment;
const n_analyze_sentiment_sentence_data = require("../models")
  .n_analyze_sentiment_sentence_data;
const n_analyze_sentiment_mentions_data = require("../models")
  .n_analyze_sentiment_mentions_data;
const t_text_bound_points = require("../models").t_text_bound_points;
const adv_breaches = require("../models").adv_breaches;
const ads = require("../models").ads;
const image_attributes = require("../models").image_attributes
const text_coverage_area = require("../models").text_coverage_area;
const master_credit_lic_201907 = require("../models").master_credit_lic_201907;
const principle_breaches = require("../models").principle_breaches;

// For Lodash
var lodash = require("lodash");

function dataChunk(arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

function IsJsonString(str) {
  try {
    var tru = JSON.parse(str);
  } catch (e) {
    return false;
  }
  return tru;
}

module.exports = {
  textImageProcessing: function (req, res) {
    try {
      const directoryPath = path.join(__dirname, "../");
      const mainDirectory = path.join(directoryPath, "json/");
      var dirName = req.body.dirName;

      if (!dirName || typeof dirName == "undefined") {
        return res.json({
          status: false,
          message: "Directory Name is Required Field"
        });
      } else {
        // For Text File
        if (dirName == "textImage_json") {
          directoryToScan = path.join(mainDirectory, dirName, "/");
        }

        if (directoryToScan && typeof directoryToScan !== "undefined") {
          const newArrayLa = [];
          const boundPointsTa = [];
          const newArrayFullTxt = [];
          const boundPointsImgLogo = [];
          fs.readdir(directoryToScan, async function (err, files) {
            if (err) {
              console.log("Unable to scan directory: " + err);
            }

            for (let index = 0; index < files.length; index++) {
              const file = files[index];
              console.log(file);
              var fileContent = fs.readFileSync(directoryToScan + file, {
                encoding: "utf-8"
              });

              var finalFileContent = IsJsonString(fileContent);
              if (!finalFileContent) {
                continue;
              }

              if (!finalFileContent.responses) {
                continue;
              }
              var fileData = {
                file_name: file
              };
              var fileInserted = await f.create(fileData);
              var id = fileInserted.dataValues.id;

              // For Logo Annotations
              var logoAnnotations =
                finalFileContent.responses[0].logoAnnotations;
              if (logoAnnotations && typeof logoAnnotations !== "undefined") {
                for (let index = 0; index < logoAnnotations.length; index++) {
                  var newData = {
                    file_id: id,
                    mid: logoAnnotations[index].mid,
                    description: logoAnnotations[index].description
                  };

                  var fileInserted = await image_logo_annotations.create(
                    newData
                  );

                  var imgLogoId = fileInserted.dataValues.id;
                  var boundDataArray =
                    logoAnnotations[index].boundingPoly.vertices;
                  if (boundDataArray) {
                    boundDataArray.forEach(function (vertex) {
                      var boundPoints = {
                        img_logo_ann_id: imgLogoId,
                        point_x: vertex.x,
                        point_y: vertex.y
                      };
                      boundPointsImgLogo.push(boundPoints);
                    });
                  }
                }
              }

              var labelAnnotations =
                finalFileContent.responses[0].labelAnnotations;
              // For Label Annotations
              if (labelAnnotations && typeof labelAnnotations !== "undefined") {
                for (let index = 0; index < labelAnnotations.length; index++) {
                  var newData = {
                    file_id: id,
                    mid: labelAnnotations[index].mid,
                    description: labelAnnotations[index].description,
                    score: labelAnnotations[index].score,
                    topicality: labelAnnotations[index].topicality
                  };
                  newArrayLa.push(newData);
                }
              }

              var textAnnotations =
                finalFileContent.responses[0].textAnnotations;
              // For Text Annotations
              if (textAnnotations && typeof textAnnotations !== "undefined") {
                for (let index = 0; index < textAnnotations.length; index++) {
                  var newData = {
                    file_id: id,
                    locale: textAnnotations[index].locale,
                    description: textAnnotations[index].description
                  };

                  var fileInserted = await text_annotations.create(newData);
                  var textAnnId = fileInserted.dataValues.id;
                  var boundDataArray =
                    textAnnotations[index].boundingPoly.vertices;
                  if (boundDataArray) {
                    boundDataArray.forEach(function (vertex) {
                      var boundPoints = {
                        text_ann_id: textAnnId,
                        point_x: vertex.x,
                        point_y: vertex.y
                      };
                      boundPointsTa.push(boundPoints);
                    });
                  }
                }
              }

              var fullTextAnnotation =
                finalFileContent.responses[0].fullTextAnnotation;
              // For Full Text Annotation
              if (
                fullTextAnnotation &&
                typeof fullTextAnnotation !== "undefined"
              ) {
                var newData = {
                  file_id: id,
                  text: fullTextAnnotation.text
                };
                newArrayFullTxt.push(newData);
              }

              await text_label_annotations.bulkCreate(newArrayLa);

              var ret = dataChunk(boundPointsTa, 5000);
              for (let index = 0; index < ret.length; index++) {
                await t_text_bound_points.bulkCreate(ret[index]);
              }
              await text_fulltext_annotations.bulkCreate(newArrayFullTxt);
              await t_text_logo_bound_points.bulkCreate(boundPointsImgLogo);
              console.log("loop ends");
            }
            return res.json({
              message: "Data Inserted"
            });
          });
        }
      }
    } catch (err) {
      console.log("Main Catch " + err);
    }
  },

  audioProcessing: function (req, res) {
    try {
      const directoryPath = path.join(__dirname, "../");
      const mainDirectory = path.join(directoryPath, "json/");
      var dirName = req.body.dirName;

      if (!dirName || typeof dirName == "undefined") {
        return res.json({
          status: false,
          message: "Directory Name is Required Field"
        });
      } else {
        if (dirName == "audio_json") {
          directoryToScan = path.join(mainDirectory, dirName, "/");
        }

        if (directoryToScan && typeof directoryToScan !== "undefined") {
          var newArrayAudio = [];
          fs.readdir(directoryToScan, async function (err, files) {
            if (err) {
              console.log("Unable to scan directory: " + err);
            }

            for (let index = 0; index < files.length; index++) {
              const file = files[index];
              var fileContent = fs.readFileSync(directoryToScan + file, {
                encoding: "utf-8"
              });
              var finalFileContent = IsJsonString(fileContent);
              if (!finalFileContent) {
                continue;
              }
              var fileData = { file_name: file };
              var fileInserted = await f.create(fileData);
              var id = fileInserted.dataValues.id;

              var newData = {
                file_id: id,
                transcript: finalFileContent.transcript,
                confidence: finalFileContent.confidence
              };
              newArrayAudio.push(newData);
            }

            if (newArrayAudio.length > 0) {
              audios
                .bulkCreate(newArrayAudio)
                .then(success => {
                  return res.json({
                    message: "Data inserted"
                  });
                })
                .catch(err => {
                  return res.json({
                    message: "Error1"
                  });
                });
            }
          });
        }
      }
    } catch (err) {
      console.log(err);
      process.exit();
    }
  },

  videoProcessing: function (req, res) {
    try {
      const directoryPath = path.join(__dirname, "../");
      const mainDirectory = path.join(directoryPath, "json/");
      var dirName = req.body.dirName;

      if (!dirName || typeof dirName == "undefined") {
        return res.json({
          status: false,
          message: "Directory Name is Required Field"
        });
      } else {
        newArrayVideo = [];
        newArrayTrackObjects = [];
        if (dirName == "video_json") {
          directoryToScan = path.join(mainDirectory, dirName, "/");
        }

        if (directoryToScan && typeof directoryToScan !== "undefined") {
          var newArrayVideo = [];
          fs.readdir(directoryToScan, async function (err, files) {
            if (err) {
              console.log("Unable to scan directory: " + err);
            }

            for (let index = 0; index < files.length; index++) {
              const file = files[index];
              var fileContent = fs.readFileSync(directoryToScan + file, {
                encoding: "utf-8"
              });

              var finalFileContent = IsJsonString(fileContent);
              if (!finalFileContent) {
                continue;
              }

              var fileData = { file_name: file };
              var fileInserted = await f.create(fileData);
              var id = fileInserted.dataValues.id;

              finalFileContent.forEach(function (index) {
                // For Track Objects
                var tobjts = index.track_objects;
                tobjts.forEach(tobj => {
                  var newData = {
                    file_id: id,
                    description: tobj.description,
                    confidence: tobj.confidence
                  };
                  newArrayTrackObjects.push(newData);
                });

                // For video_detect_text
                var vdt = index.video_detect_text;
                vdt.forEach(function (index2) {
                  var newData = {
                    file_id: id,
                    text: index2.text,
                    confidence: index2.confidence
                  };
                  newArrayVideo.push(newData);
                });
              });
            }

            video_detect_texts
              .bulkCreate(newArrayVideo)
              .then(final => {
                video_track_objects
                  .bulkCreate(newArrayTrackObjects)
                  .then(success => {
                    return res.json({
                      message: "Data inserted"
                    });
                  })
                  .catch(err => {
                    return res.json({
                      message: "Error1"
                    });
                  });
              })
              .catch(err => {
                return res.json({
                  message: "Error2"
                });
              });
          });
        }
      }
    } catch (err) {
      return res.json({
        message: "Error3"
      });
    }
  },

  nlpProcessing: function (req, res) {
    try {
      const directoryPath = path.join(__dirname, "../");
      const mainDirectory = path.join(directoryPath, "json/");
      var dirName = req.body.dirName;

      if (!dirName || typeof dirName == "undefined") {
        return res.json({
          status: false,
          message: "Directory Name is Required Field"
        });
      } else {
        if (dirName == "nlp_json") {
          directoryToScan = path.join(mainDirectory, dirName, "/");
        }

        if (directoryToScan && typeof directoryToScan !== "undefined") {
          const newArrayAnalyzeEntities = [];
          const newArraySentenceData = [];
          const newArrayAnalyzeSyntax = [];
          const newArrayMentionsData = [];
          fs.readdir(directoryToScan, async function (err, files) {
            if (err) {
              console.log("Unable to scan directory: " + err);
            }

            // Using Foreach for reading file content
            for (let index = 0; index < files.length; index++) {
              const file = files[index];
              var fileContent = fs.readFileSync(directoryToScan + file, {
                encoding: "utf-8"
              });

              var finalFileContent = JSON.parse(fileContent);
              var fileData = { file_name: file };
              var fileInserted = await f.create(fileData);
              var id = fileInserted.dataValues.id;

              // For Analyze Entities
              finalFileContent.forEach(async dataObj => {
                if (dataObj.analyze_entities.length > 0) {
                  var analyze_entities = dataObj.analyze_entities;
                  analyze_entities.forEach(index => {
                    var newData = {
                      file_id: id,
                      name: index.name,
                      type: index.type,
                      salience: index.salience
                    };
                    newArrayAnalyzeEntities.push(newData); // Done
                  });
                }

                if (dataObj.analyze_sentiment) {
                  var document_sentiment =
                    dataObj.analyze_sentiment.document_sentiment;
                  var newData = {
                    file_id: id,
                    magnitude: document_sentiment.magnitude,
                    score: document_sentiment.score
                  };

                  var dataAnalyzeSentiment = await nlp_analyze_sentiment.create(
                    newData
                  );
                  var lastId = dataAnalyzeSentiment.dataValues.id;
                  var sentences_data = dataObj.analyze_sentiment.sentences_data;
                  if (sentences_data.length > 0) {
                    sentences_data.forEach(function (sentence) {
                      var newData = {
                        analyze_sentiment_id: lastId,
                        text: sentence.text
                      };
                      newArraySentenceData.push(newData); // Done
                    });
                  }
                }

                // For Analyze Syntax
                if (dataObj.analyze_syntax) {
                  var tokens_data = dataObj.analyze_syntax.tokens_data;
                  tokens_data.forEach(function (index4) {
                    var newData = {
                      file_id: id,
                      lemma: index4.lemma,
                      tag: index4.part_of_speech.tag,
                      mood: index4.part_of_speech.mood,
                      number: index4.part_of_speech.number,
                      person: index4.part_of_speech.person,
                      tense: index4.part_of_speech.tense,
                      aspect: index4.part_of_speech.aspect,
                      gender: index4.part_of_speech.gender,
                      case: index4.part_of_speech.case,
                      form: index4.part_of_speech.form,
                      proper: index4.part_of_speech.proper,
                      reciprocity: index4.part_of_speech.reciprocity,
                      voice: index4.part_of_speech.voice
                    };
                    newArrayAnalyzeSyntax.push(newData); // Done
                  });
                }

                if (dataObj.analyze_entity_sentiment.length > 0) {
                  var analyze_entity_sentiment =
                    dataObj.analyze_entity_sentiment;
                  analyze_entity_sentiment.forEach(async function (index) {
                    var newData = {
                      file_id: id,
                      name: index.name,
                      type: index.type,
                      salience: index.salience
                    };

                    var analyzeEntitySentiment = await nlp_analyze_entity_sentiment.create(
                      newData
                    );
                    var lastId = analyzeEntitySentiment.dataValues.id;
                    console.log(lastId);
                    var mentions_data = index.mentions_data;

                    if (mentions_data.length > 0) {
                      mentions_data.forEach(function (obj) {
                        var newData = {
                          analyze_entity_sent_id: lastId,
                          text: obj.text,
                          type: obj.type,
                          magnitude: obj.sentiment.magnitude,
                          score: obj.sentiment.magnitude
                        };
                        newArrayMentionsData.push(newData);
                      });
                      console.log(newArrayMentionsData);
                    }
                  });
                }

                nlp_analyze_entities
                  .bulkCreate(newArrayAnalyzeEntities)
                  .then(success => {
                    n_analyze_sentiment_sentence_data
                      .bulkCreate(newArraySentenceData)
                      .then(success => {
                        nlp_analyze_syntax
                          .bulkCreate(newArrayAnalyzeSyntax)
                          .then(success => {
                            n_analyze_sentiment_mentions_data
                              .bulkCreate(newArrayMentionsData)
                              .then(success => {
                                return res.json({ message: "Data Inserted" });
                              })
                              .catch(err => {
                                console.log(err);
                              });
                          })
                          .catch(err => {
                            console.log(err);
                          });
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
            }
          });
        }
      }
    } catch (err) {
      console.log(err);
      process.exit();
    }
  },

  ruleProcessing: async function (req, res) {
    var fileData = {
      file_name: req.body.filename
    };
    var data = await f.findOne({
      where: fileData
    });
    var fileId = data.dataValues.id;
    var descriptionData = await text_annotations.findAll({
      // Taking Latest Data // Text Annotations Data
      where: {
        file_id: [fileId]
      },
      order: [["id", "ASC"]],
      limit: 1,
      attributes: ["id", "description"],
      raw: true
    });
    var onlyFileName = req.body.filename.slice(0, 3);
    // For Ad Data
    var adData = await ads.findAll({
      where: {
        file_name: [onlyFileName]
      },
      limit: 1,
      attributes: [
        "id",
        "entity_name",
        "file_name",
        "pro_or_service_type",
        "medium_type"
      ],
      raw: true
    });
    var description = descriptionData[0].description;

    // for abn/acl/afsl; // For rule 2
    var origName = "GIPPSREAL LIMITED";
    var orgData = await master_credit_lic_201907.findOne({
      where: {
        credit_lic_name: origName
      },
      raw: true
    });

    if (orgData) {
      var acn = orgData.credit_lic_abn_acn;
      var afslOrAbn = orgData.credit_lic_afsl_num;
      var acnRegex = (regexNoValidate = /Australian credit licence\s\d{6}/gi);
      var acnSatis = acn.match(acnRegex);
      var afslOrAbnRegex = /(ABN(\s(\d{2})\s(\d{3})\s(\d{3})\s(\d{3})))/gi;
      var afslOrAbnSatis = afslOrAbn.match(afslOrAbnRegex);

      if (!acnSatis || !afslOrAbnSatis) {
        var data = {
          file_name: fileData.file_name,
          entity_name: adData[0]["entity_name"],
          product_type: adData[0]["pro_or_service_type"],
          medium_type: adData[0]["medium_type"],
          rule_id: "2", //Breach For Rule 2
          isBreached: 101
        };
        var data1 = await adv_breaches.create(data);
      }
    } else {
      var data = {
        file_name: fileData.file_name,
        entity_name: adData[0]["entity_name"],
        product_type: adData[0]["pro_or_service_type"],
        medium_type: adData[0]["medium_type"],
        rule_id: "2", //Breach For Rule 2
        isBreached: 101
      };
      var data1 = await adv_breaches.create(data);
    }

    var regexForRule3 = /((payment|repayment|installments|regular|week|fortnight|month|year)|([\$][\d*,.]+)|(aud[\d*,]+)| (dollars\s[\d*,]+)|(\d.*%\s(comparison\srate)|\d.*%\s))/gi;
    var satisfiedRule3 = description.match(regexForRule3);
    console.log("satis3", satisfiedRule3);

    if (satisfiedRule3.length > 0) {
      // var val = satisfiedRule3.toString();
      console.log(satisfiedRule3.join(","));
      process.exit();

      var iuiu = /(\d.*%|\scomparison\srate)/gi;
      var e = val.match(iuiu);
      var ef = e.toString();
      var numberRegex = /\d.\d*%/gi;
      var t = ef.match(numberRegex);
      var compValue = t[0];
      // console.log(compValue);

      var ar = compValue.split(""); // empty string separator

      console.log(ar);

      var regexForRuleFor4ValueCr = /(comparison rate)/gi;
      var satisfiedRule4Cr = description.match(regexForRuleFor4ValueCr);

      if (!satisfiedRule4Cr || satisfiedRule4Cr == "null") {
        var data = {
          file_name: fileData.file_name,
          entity_name: adData[0]["entity_name"],
          product_type: adData[0]["pro_or_service_type"],
          medium_type: adData[0]["medium_type"],
          rule_id: "4", //Breach For Rule 4
          isBreached: 101
        };
        var data1 = await adv_breaches.create(data);
      } else {
        if (satisfiedRule4Cr) {
          var regexForRuleFor4ValueApr = /(apr)/gi;
          var satisfiedRule4Apr = description.match(regexForRuleFor4ValueApr);
          if (!satisfiedRule4Apr || satisfiedRule4Apr == "null") {
            var data = {
              file_name: fileData.file_name,
              entity_name: adData[0]["entity_name"],
              product_type: adData[0]["pro_or_service_type"],
              medium_type: adData[0]["medium_type"],
              rule_id: "4", //Breach For Rule 4
              isBreached: 101
            };
            var data1 = await adv_breaches.create(data);
          } else {
            var regexForRuleFor5 = /(warning)/gi;
            var satisfiedRule5 = description.match(regexForRuleFor5);
            console.log(satisfiedRule5);
            if (!satisfiedRule5 || satisfiedRule5 == "null") {
              var data = {
                file_name: fileData.file_name,
                entity_name: adData[0]["entity_name"],
                product_type: adData[0]["pro_or_service_type"],
                medium_type: adData[0]["medium_type"],
                rule_id: "5", //Breach For Rule 5
                isBreached: 101
              };
              var data1 = await adv_breaches.create(data);
            } else {
              var longFormat =
                "WARNING: This comparison rate applies only to the example or examples given. Different amounts and terms will result in different comparison rates. Costs such as redraw fees or early repayment fees, and cost savings such as fee waivers, are not included in the comparison rate but may influence the cost of the loan.";
              var countLf = longFormat.length;
              var shortFormat =
                "WARNING: This comparison rate is true only for the examples given and may not include all fees and charges. Different terms, fees or other loan amounts might result in a different comparison rate.";
              var countSf = shortFormat.length;

              var regexForRuleFor6 = /(warning.*\.)/gi;
              var satisfiedRule6 = description.match(regexForRuleFor6);
              console.log(satisfiedRule6);
              if (satisfiedRule6) {
                if (
                  satisfiedRule6[0].length != countSf ||
                  satisfiedRule6[0].length != countLf ||
                  (satisfiedRule6[0].length != countSf &&
                    satisfiedRule6[0].length != countLf)
                ) {
                  var data = {
                    file_name: fileData.file_name,
                    entity_name: adData[0]["entity_name"],
                    product_type: adData[0]["pro_or_service_type"],
                    medium_type: adData[0]["medium_type"],
                    rule_id: "6", //Breach For Rule 6
                    isBreached: 101
                  };
                  var data1 = await adv_breaches.create(data);
                }
              } else {
                var textCoverageData = await text_coverage_area.findOne({
                  where: {
                    file_name: {
                      [Op.like]: "%" + fileData.file_name + "%"
                    }
                  },
                  raw: true
                });
                var desc = textCoverageData.text_details;
                var regexedData = desc.replace(/'/g, '"');
                var get = JSON.parse(regexedData);

                let indexOne = c.findIndex(x => x.description === d[0]);
                let indexTwo = c.findIndex(x => x.description === e[0]);

                if (indexOne != indexTwo) {
                  var data = {
                    file_name: fileData.file_name,
                    entity_name: adData[0]["entity_name"],
                    product_type: adData[0]["pro_or_service_type"],
                    medium_type: adData[0]["medium_type"],
                    rule_id: "7", //Breach For Rule 8
                    isBreached: 101
                  };
                  var data1 = await adv_breaches.create(data);
                  console.log("Breach detected");
                }
              }

              // From Rule 8
              var regex = /((apr|Annual\sPercentage\srate|Comparision\sRate|Comparison\sRate)|(\$\d*.\d*%)|(p.a.)|(per\sannum))/gi;
              var satisfiedRule8 = description.match(regex);
              if (!satisfiedRule8 || satisfiedRule8 == "null") {
                var data = {
                  file_name: fileData.file_name,
                  entity_name: adData[0]["entity_name"],
                  product_type: adData[0]["pro_or_service_type"],
                  medium_type: adData[0]["medium_type"],
                  rule_id: "8", //Breach For Rule 8
                  isBreached: 101
                };
                var data1 = await adv_breaches.create(data);
              } else {
                var prohibitedTermsRegex = /(independent|impartial|unbiased|reverse mortgage|negative equity)/gi;
                var satisfiedRule9 = description.match(prohibitedTermsRegex);
                if (satisfiedRule9) {
                  var data = {
                    file_name: fileData.file_name,
                    entity_name: adData[0]["entity_name"],
                    product_type: adData[0]["pro_or_service_type"],
                    medium_type: adData[0]["medium_type"],
                    rule_id: "8", //Breach For Rule 8
                    isBreached: 101
                  };
                  var data1 = await adv_breaches.create(data);
                } else {
                  var riskyTermsRegex = /(free|secure|guaranteed|high|low|everyday|cheapest|lowest|trusted|fastest|certainty|assure|assured|real|trading is easy|easy|trading|no negative equity|stress-free|no credit check|zero credit check |pre-approved|preapproved|zero waiting|no exceptions|no fineprint|no exclusions|no conditions|flexible|sure|forever|everyday|no repayments|no need |dont repay|upto |from|regulator|courts|government|state|federal|financial difficulty|difficult|unemployed|underemployed|lifestyle|Health|Debt|fixed|family issues|tax free|no application refused|no-doc|no documentation|instant|very fast approval |guaranteed|acceptance|top of the world|out of the world|Aboriginal |Torres|cultural |religious|ASIC|APRA|RBA|ACCC|extraordinary|most trusted |Australia|no1|number 1|number one|secs|seconds|minutes|denied|refused|affordable|stress free|stress|lifetime|overseas|high growth|no plans|wellbeing|future|win-win|surprise|5 star|outstanding|freedom|fairgo|wishes|dreams|easy fulfill|risk free |centrelink|usd|us dollar |treasury|backed|dependents|dependable)/gi;
                  var satisfiedRule10 = description.match(riskyTermsRegex);
                  console.log(satisfiedRule10);
                  if (satisfiedRule10) {
                    var data = {
                      file_name: fileData.file_name,
                      entity_name: adData[0]["entity_name"],
                      product_type: adData[0]["pro_or_service_type"],
                      medium_type: adData[0]["medium_type"],
                      rule_id: "10", //Breach For Rule 10
                      isBreached: 101
                    };
                    var data1 = await adv_breaches.create(data);
                    console.log("true");
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  test: async function (req, res) {
    console.log("fsdfsfsfsdfsdfsdfffffffffffffffff----------");

  },

  allAdsToShowTable: async function (req, res) {
    var TableData = await ads.findAll({
      raw: true,
    });

    if (TableData.length > 0) {
      return res.send({
        status: true,
        code: 200,
        data: TableData
      });
    } else {
      return res.send({
        status: flase,
        code: 400,
        data: TableData
      });
    }
  },

  GetAdvBreaches: async function (req, res) {
    if (req.body.filename != '') {
      let filename = req.body.filename;
      if (req.body.type == "1") {

        var TableData = await adv_breaches.findAll({
          where: {
            file: {
              [Op.like]: "%" + filename + "%"
            }
          },
          raw: true
        });

        var principle_breaches_data = await principle_breaches.findAll({
          where: {
            file: {
              [Op.like]: "%" + filename + "%"
            }
          },
          raw: true
        });
        console.log(principle_breaches_data, TableData);

        var mergeData = principle_breaches_data.concat(TableData);
      } else if (req.body.type == "2") {
        var mergeData = await adv_breaches.findAll({
          where: {
            file: {
              [Op.like]: "%" + filename + "%"
            }
          },
          raw: true
        });
      } else if (req.body.type == "3") {
        var mergeData = await principle_breaches.findAll({
          where: {
            file: {
              [Op.like]: "%" + filename + "%"
            }
          },
          raw: true
        });
      }


      if (mergeData.length > 0) {
        return res.send({
          status: true,
          code: 200,
          data: mergeData
        });
      } else {
        return res.send({
          status: false,
          code: 400,
          data: TableData
        });
      }
    } else {
      return
    }
  },

  GetAdvBreachesAll: async function (req, res) {
    if (req.body.type == "1") {
      var principle_breaches_data = await principle_breaches.findAll({
        raw: true
      });
      var TableData = await adv_breaches.findAll({
        raw: true
      });
      var mergeData = principle_breaches_data.concat(TableData);
    } else if (req.body.type == "2") {
      var mergeData = await adv_breaches.findAll({
        raw: true
      });
    } else if (req.body.type == "3") {
      var mergeData = await principle_breaches.findAll({
        raw: true
      });
    }

    if (mergeData.length > 0) {
      return res.send({
        status: true,
        code: 200,
        data: mergeData
      });
    } else {
      return res.send({
        status: flase,
        code: 400,
        data: TableData
      });
    }

  },

  GetAudioTranscript: async function (req, res) {
    if (req.body.filename != '') {
      requestValu = req.body.filename;
      var TableDatas = await audios.findAll({
        where: {
          file_id: requestValu
        },
        raw: true,
      });
      if (TableDatas.length > 0) {
        return res.send({
          status: true,
          code: 200,
          data: TableDatas
        });
      } else {
        return res.send({
          status: false,
          code: 400,
        });
      }
    }
  }

};
