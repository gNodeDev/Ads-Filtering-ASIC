
const master_credit_lic_201907 = require("../models").master_credit_lic_201907;
const compony = require("../models").compony;
const credit_repResentative = require("../models").master_credit_rep_201907;
const Afs_credit_lic = require("../models").master_afs_lic_201907s;
const Afs_credit_lic_rep = require("../models").master_afs_rep_201907s;
const WeeklyMapSheet = require("../models").weekly_map_data;
const labourMapSheet = require("../models").labour_status;
const Op = require("sequelize").Op;
const nswSheetMap = require("../models").nsw_qld;
const indegiousMapSheet = require("../models").indigious;

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

    getnodeData: async function (req, res) {
        if (req.body.nodeId !== '' && req.body.nodeId !== undefined) {
            requestValu = req.body.filename;
            var nodeData = await master_credit_lic_201907.findOne({
                where: {
                    credit_lic_num: req.body.nodeId
                },
                raw: true,
            });
            if (nodeData) {
                var NodeComponyData = await compony.findOne({
                    where: {
                        acn: nodeData.credit_lic_abn_acn
                    }
                });


                if (NodeComponyData == null) {
                    var NodeComponyData = await compony.findOne({
                        where: {
                            abn: nodeData.credit_lic_abn_acn
                        }
                    });
                }
            }

            var creditRepresentative = await credit_repResentative.findAll({
                where: {
                    cred_lic_no: req.body.nodeId
                },
                raw: true,
            });

            var AfcLicData = await Afs_credit_lic.findOne({
                where: {
                    afs_lic_no: req.body.nodeId
                },
                raw: true,
            });

            if (AfcLicData && AfcLicData.afs_lic_no != '') {
                var afclicrep = await Afs_credit_lic_rep.findAll({
                    where: {
                        afs_lic_no: '000' + AfcLicData.afs_lic_no
                    },
                    raw: true,
                });
            }

            var theVlaueForNode = {
                compony: NodeComponyData,
                Afs_lic_name: AfcLicData && AfcLicData.afs_lic_name ? AfcLicData.afs_lic_name : "",
                afc_lic_no: AfcLicData && AfcLicData.afs_lic_no ? AfcLicData.afs_lic_no : "",
                Afs_lic_represenatative: afclicrep,
                CrRep: creditRepresentative,
                AclName: nodeData && nodeData.credit_lic_name ? nodeData.credit_lic_name : '',
                AclNumber: nodeData && nodeData.credit_lic_num ? "ACL " + nodeData.credit_lic_num : AfcLicData && AfcLicData.afs_lic_no ? "AFS " + AfcLicData.afs_lic_no : "",
            }

            return res.send({
                status: true,
                code: 200,
                data: theVlaueForNode
            });
        } else {
            return res.send({
                status: false,
                code: 400,
            });
        }
    },


    getMapData: async function (req, res) {

        if (req.body.nodeId !== '' && req.body.nodeId !== undefined) {
            requestValu = req.body.filename;
            var MapData = await master_credit_lic_201907.findOne({
                where: {
                    credit_lic_num: req.body.nodeId
                },
                raw: true,
            });

            if (MapData) {

                if (MapData.credit_lic_pcode) {
                    var labour_data = await labourMapSheet.findOne({
                        where: {
                            Postcode_State: {
                                [Op.like]: "%" + MapData.credit_lic_pcode + "%"
                            }
                        },
                        raw: true,
                    });

                    var Weekly_data = await WeeklyMapSheet.findOne({
                        where: {
                            Postcode_State: {
                                [Op.like]: "%" + MapData.credit_lic_pcode + "%"
                            }
                        },
                        raw: true,
                    });

                    var nsw_data = await nswSheetMap.findOne({
                        where: {
                            Postcode_State: {
                                [Op.like]: "%" + MapData.credit_lic_pcode + "%"
                            }
                        },
                        raw: true,
                    });

                    var indegious_data = await indegiousMapSheet.findOne({
                        where: {
                            Postcode_State: {
                                [Op.like]: "%" + MapData.credit_lic_pcode + "%"
                            }
                        },
                        raw: true,
                    });
                }

                return res.send({
                    status: true,
                    code: 200,
                    data: MapData,
                    labourData: labour_data ? labour_data : '',
                    WeeklyData: Weekly_data ? Weekly_data : '',
                    nswData: nsw_data ? nsw_data : '',
                    IndegiosData: indegious_data ? indegious_data : ''
                });
            } else {
                return res.send({
                    status: false,
                    code: 400,
                });
            }
        }

    },


    GetIndigiousData: async function (req, res) {

        if (req.body.forType == 'ageTable') {
            var indegious_post_data = await nswSheetMap.findAll({
                where: {
                    Postcode_State: {
                        [Op.like]: "4%"
                    }
                },
                limit: 50,
                raw: true,
            });
        } else {
            var indegious_post_data = await indegiousMapSheet.findAll({
                where: {
                    Postcode_State: {
                        [Op.like]: "4%"
                    },
                },
                limit: 50,
                raw: true,
            });
        }


        if (indegious_post_data) {
            return res.send({
                status: true,
                code: 200,
                data: indegious_post_data,
            });
        } else {
            return res.send({
                status: false,
                code: 400,
            });
        }

    }






};