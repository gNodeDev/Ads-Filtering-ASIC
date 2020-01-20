import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantService } from 'src/app/service/constant.service';
import { ApiService } from 'src/app/service/api/api.service';
import { log } from 'util';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { element } from '@angular/core/src/render3';

import * as Highcharts from 'highcharts';

declare var google: any;
@Component({
  selector: 'app-ad-table',
  templateUrl: './ad-table.component.html',
  styleUrls: ['./ad-table.component.scss']
})
export class AdTableComponent implements OnInit {
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  @ViewChild('myGrid2') myGrid2: jqxGridComponent;
  @ViewChild('click_model') click_model: ElementRef<HTMLElement>;
  @ViewChild('click_model_Text_anootation') click_model_Text_anootation: ElementRef<HTMLElement>;
  @ViewChild('click_model_Audio_Annotation') click_model_Audio_Annotation: ElementRef<HTMLElement>;
  @ViewChild('click_model_text_coverage_Annotation') click_model_text_coverage_Annotation: ElementRef<HTMLElement>;
  protected map: any;
  markers: [];
  public indigiousMarker = [];
  public WeeklyData = [];
  public labourData = [];
  public IndegiosData = [];
  public nswData = [];
  public fileName: any = '';
  public adId: any = '';
  public brachesTable: any = [];
  public rowClickData: any = [];
  public BreachTableDatamodel: boolean = false;
  public RowclickImageFacialmodel: boolean = false;
  public faceAnotationData = [];
  public logoAnnotationsData = [];
  public lableAnnotaionData = [];
  public textAnnotationsData = [];
  public textAnnotationRowClickData = [];
  public analyzeSentimentData = [];
  public analyzeEntitiesData = [];
  public analyzeSentimentDataAudio = [];
  public analyzeEntitiesDataAudio = [];
  public audioTransitData = [];
  public AudioAnnotationRowClickData = [];
  public segmentAnalyzeData = [];
  public textCoverageModelData = [];
  public mapTitle = "Indigenous Population";
  public formattedAddressvalue = '';
  public postcodevalue = '';
  public dataTextcoverage:any ={};

  public lat: any = '';
  public lng: any = '';
  public tableview = true;
  public weeklychart = false;

  highcharts = Highcharts;
  public entity_type: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Data Chart'
    },
    xAxis: {
      categories: ["dummy"],
      crosshair: true
    },
    yAxis: {
      min: 0,
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: '',
        color: '#51b051',
        data: ['0']
      }
    ]
  }


  constructor(
    public paramRouter: ActivatedRoute,
    public router: Router,
    private constantSvc: ConstantService,
    private apiSvc: ApiService,
    config: NgbModalConfig,
    private modalService: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.paramRouter.params.subscribe(params => {
      if (params && params.adId || params.fileId) {
        this.fileName = atob(params.fileId);
        this.adId = atob(params.adId);
      } else {
        this.router.navigate(['/dashboard'])
      }
    })
    this.BreachTable("1");
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }


  ChangeBreachesData(event) {
    this.BreachTable(event.target.value)
  }

  BreachTable(value) {
    this.audioTransitData = [];
    let body = {
      filename: this.fileName,
      type: value
    }
    this.apiSvc.postService(this.constantSvc.APIConfig.GET_BREACHES_DATA, body).subscribe((response) => {
      if (response.code == 200 && response.status == true) {
        this.audioTransitData = response.data;
        this.source.localdata = this.audioTransitData;
        this.dataAdapter.dataBind();
      } else {
        this.audioTransitData = [];
      }
    });
  }

  ImageFacialExpression() {
    this.apiSvc.getJson(this.fileName).subscribe((response) => {
      this.faceAnotationData = [];
      this.logoAnnotationsData = [];
      this.lableAnnotaionData = [];
      this.textAnnotationsData = [];

      response.responses.forEach(element => {
        if (element.faceAnnotations) {
          element.faceAnnotations.forEach(faceDetection => {
            this.faceAnotationData.push(faceDetection)
          });
          this.source2.localdata = this.faceAnotationData;
          this.dataAdapter2.dataBind();
        }

        if (element.logoAnnotations) {
          element.logoAnnotations.forEach(logoDetection => {
            this.logoAnnotationsData.push(logoDetection)
          });
          this.source3.localdata = this.logoAnnotationsData;
          this.dataAdapter3.dataBind();
        }

        if (element.labelAnnotations) {
          element.labelAnnotations.forEach(labelDeteection => {
            this.lableAnnotaionData.push(labelDeteection)
          });
          this.source4.localdata = this.lableAnnotaionData;
          this.dataAdapter4.dataBind();
        }

        if (element.textAnnotations) {
          element.textAnnotations.forEach(TextAtotation => {
            this.textAnnotationsData.push(TextAtotation)
          });
          this.source5.localdata = this.textAnnotationsData;
          this.dataAdapter5.dataBind();
        }
      });
    });
  }

  nlpDocument() {
    this.analyzeSentimentData = [];
    this.analyzeEntitiesData = [];
    this.apiSvc.getNlpJson(this.fileName).subscribe((response) => {
      if (response) {
        response.forEach(element => {
          console.log(element);
          if(element.analyze_sentiment.document_sentiment){
            if(element.analyze_sentiment.document_sentiment.score < 0){
              element.analyze_sentiment.document_sentiment.score  = element.analyze_sentiment.document_sentiment.score * -1
            }
            this.analyzeSentimentData.push(element.analyze_sentiment.document_sentiment);
          } 
          if (element.analyze_entities) {
              element.analyze_entities.forEach(elem => {
               if((elem.type == "ORGANIZATION" || elem.type == "LOCATION" || elem.type == "NUMBER") && (elem.name!="5")  ){
                  this.analyzeEntitiesData.push(elem)
                }
              });
          }
        });
        this.source6.localdata = this.analyzeSentimentData;
        this.dataAdapter6.dataBind();
        this.source7.localdata = this.analyzeEntitiesData;
        this.dataAdapter7.dataBind();
      }
    });

    this.apiSvc.getNlpAudioJson(this.fileName).subscribe((response) => {
      if (response) {
        response.forEach(element => {
          this.analyzeSentimentDataAudio.push(element.analyze_sentiment.document_sentiment);
          if (element.analyze_entities) {
            element.analyze_entities.forEach(elem => {
              if(elem.type == "ORGANIZATION" || elem.type == "LOCATION" || elem.type == "NUMBER"){
                this.analyzeEntitiesDataAudio.push(elem)
              }
            });
          }
        });
        this.source15.localdata = this.analyzeSentimentDataAudio;
        this.dataAdapter15.dataBind();
        this.source16.localdata = this.analyzeEntitiesDataAudio;
        this.dataAdapter16.dataBind();
      }
    });
  }

  videoIntelligence() {
    this.segmentAnalyzeData = [];
    var frameLabelsData = [];
    this.apiSvc.getVideoanalyze(this.fileName).subscribe((response) => {
      if (response) {
        response.forEach(element => {
          console.log(element.speech_transcription);

          if (element.analyze_labels) {
            element.analyze_labels.forEach(element_analyze => {
              this.segmentAnalyzeData = element_analyze.segment_labels_data;
              frameLabelsData = element_analyze.frame_labels_data;
            });
          }


          if (element.video_detect_text) {
            this.source11.localdata = element.video_detect_text;
            this.dataAdapter11.dataBind();
          }

          if (element.speech_transcription) {
            this.source12.localdata = element.speech_transcription;
            this.dataAdapter12.dataBind();
          }

        });

        var frameLabel = [];
        frameLabelsData.forEach(element => {
          var frameData = {
            frame_label_description: element.frame_label_description,
            frame_category_entity_data: element.category_entity_data.length > 0 ? element.category_entity_data[0].description : ''
          }
          frameLabel.push(frameData)
        });
        this.source10.localdata = frameLabel;
        this.dataAdapter10.dataBind();

        var segment = [];
        this.segmentAnalyzeData.forEach(element => {
          var datas = {
            segment_labels_description: element.segment_labels_description,
            category_entity_data: element.category_entity_data.length > 0 ? element.category_entity_data[0].description : ''
          }
          segment.push(datas);
        });
        this.source9.localdata = segment;
        this.dataAdapter9.dataBind();
      }
    });
  }

  changeViewInfo(event) {
    this.tableview = false;
    this.weeklychart = false;
    if (event.target.value == "weekly") {
      this.weeklychart = true;
      let a = Number((this.WeeklyData["799_pct"] * 100).toFixed(2));
      let b = Number((this.WeeklyData["800_1499_pct"] * 100).toFixed(2));
      let c = Number((this.WeeklyData["1500_2999_pct"] * 100).toFixed(2));
      let d = Number((this.WeeklyData["3000_pct"] * 100).toFixed(2));
      let e = Number((this.WeeklyData["NA_NS_pct"] * 100).toFixed(2));
      this.entity_type.xAxis.categories = ["$799", "$800-$1499", "$1500-$2999", "$3000+", "NA/NS"];
      this.entity_type.series[0].data = [a, b, c, d, e];
      this.entity_type.series[0].name = 'Weekly Income';
      Highcharts.chart('charts', this.entity_type);
    } else if (event.target.value == "demographics") {
      this.weeklychart = true;
      let a = Number((this.nswData["0_19_pct"] * 100).toFixed(2));
      let b = Number((this.nswData["20_39_pct"] * 100).toFixed(2));
      let c = Number((this.nswData["40_59_pct"] * 100).toFixed(2));
      let d = Number((this.nswData["60_plus_pct"] * 100).toFixed(2));
      this.entity_type.xAxis.categories = ["0y-19y", "20y-39y", "40y-59y", "60y+"];
      this.entity_type.series[0].data = [a, b, c, d];
      this.entity_type.series[0].color = '#d69262';
      this.entity_type.series[0].name = 'Age Demographics';
      Highcharts.chart('charts', this.entity_type);
    } else if (event.target.value == "employment") {
      this.weeklychart = true;
      let a = Number((this.labourData["Employed_full_part_away_pct"] * 100).toFixed(2));
      let b = Number((this.labourData["Unemployed_pct"] * 100).toFixed(2));
      let c = Number((this.labourData["NS_NA_NILA_pct"] * 100).toFixed(2));
      this.entity_type.xAxis.categories = ["Employed Part Away", "Unemployed", "NS NA NILA"];
      this.entity_type.series[0].data = [a, b, c];
      this.entity_type.series[0].color = '#ce7bd1';
      this.entity_type.series[0].name = 'Employment';
      Highcharts.chart('charts', this.entity_type);
    } else if (event.target.value == "indegious") {
      this.weeklychart = true;
      let a = Number((this.IndegiosData["Non_Indigenous_pct"] * 100).toFixed(2));
      let b = Number((this.IndegiosData["AB_TI_Both_pct"] * 100).toFixed(2));
      this.entity_type.xAxis.categories = ["Non-Indigenous", "AB TI Both"];
      this.entity_type.series[0].data = [a, b];
      this.entity_type.series[0].name = 'Indegious';
      this.entity_type.series[0].color = '#967a48';
      Highcharts.chart('charts', this.entity_type);

    } else if (event.target.value == "tableview") {
      this.tableview = true;
      this.weeklychart = false;
    }

  }



  mapDataCreditLic() {
    let body = {
      nodeId: "384674"
    }

    this.apiSvc.postService(this.constantSvc.APIConfig.GET_CREDIT_LIC_MAP_DATA, body).subscribe((response) => {
      if (response.status == true && response.code == 200) {
        if (response.data) {
          let postcode = response.data.credit_lic_pcode ? response.data.credit_lic_pcode : 2000;
          let Url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + postcode + ",australia&key=AIzaSyBTyjNROkVUD_GbDrFI21GX1K0HLjogn1k";
          this.apiSvc.mapService(Url).subscribe((respone) => {
            this.formattedAddressvalue = respone.results[0].formatted_address,
              this.postcodevalue = postcode
            this.lat = respone.results[0].geometry.location.lat;
            this.lng = respone.results[0].geometry.location.lng;
          });
        }
        if (response.WeeklyData) {
          this.WeeklyData = response.WeeklyData
        }
        if (response.labourData) {
          this.labourData = response.labourData
        }
        if (response.nswData) {
          this.nswData = response.nswData
        }
        if (response.IndegiosData) {
          this.IndegiosData = response.IndegiosData
        }
      }
    });
    this.indigiousmap("indegious");
    Highcharts.chart('charts', this.entity_type);
  }

  indigiousmap(event) {
    let body = {
      forType: event == "indegious" ? event : event.target.value
    }

    if (event == "indegious" || event.target.value == "indegious") {
      this.mapTitle = "Indigenous Population";
    } else {
      this.mapTitle = "Age Demographics";
    }
    this.indigiousMarker = [];
    this.apiSvc.postService(this.constantSvc.APIConfig.GET_INDIGIOUS_DATA, body).subscribe((response) => {
      if (response.status == true && response.code == 200) {
        if (response.data) {
          if (event == "indegious" || event.target.value == "indegious") {
            response.data.forEach(element => {
              let on_Indigenous_pct = (element.Non_Indigenous_pct * 100).toFixed(2);
              let postcode = element.Postcode_State.split(",")[0];
              let Url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + postcode + ",australia&key=AIzaSyBTyjNROkVUD_GbDrFI21GX1K0HLjogn1k";
              this.apiSvc.mapService(Url).subscribe((respone) => {
                let indigLat = respone.results[0].geometry.location.lat;
                let indigLng = respone.results[0].geometry.location.lng;
                let ActualMarker = {
                  formattedAddress: respone.results[0].formatted_address,
                  postcodes: postcode,
                  on_Indigenous_pct: on_Indigenous_pct + '%',
                  indigLat: indigLat,
                  indigLng: indigLng,
                }
                if (on_Indigenous_pct != '0.00') {
                  this.indigiousMarker.push(ActualMarker);
                }
              });
            });
          } else {
            response.data.forEach(element => {
              let postcode = element.Postcode_State.split(",")[0];
              let Url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + postcode + ",australia&key=AIzaSyBTyjNROkVUD_GbDrFI21GX1K0HLjogn1k";
              this.apiSvc.mapService(Url).subscribe((respone) => {
                let indigLat = respone.results[0].geometry.location.lat;
                let indigLng = respone.results[0].geometry.location.lng;
                let ActualMarker = {
                  formattedAddress: respone.results[0].formatted_address,
                  postcodes: postcode,
                  // on_Indigenous_pct: (element['60_plus_pct']*100).toFixed(2)+'%',
                  "0_19_pct": (element['0_19_pct'] * 100).toFixed(2),
                  "20_39_pct": (element['20_39_pct'] * 100).toFixed(2),
                  "40_59_pct": (element['40_59_pct'] * 100).toFixed(2),
                  "60_plus_pct": (element['60_plus_pct'] * 100).toFixed(2),
                  indigLat: indigLat,
                  indigLng: indigLng,
                }
                if (ActualMarker["0_19_pct"] != '0.00' || ActualMarker["20_39_pct"] != '0.00' || ActualMarker["40_59_pct"] != '0.00' || ActualMarker["60_plus_pct"] != '0.00') {
                  this.indigiousMarker.push(ActualMarker);
                }
              });
            });
          }

          console.log(this.indigiousMarker);

        }
      }
    });
  }

  mouseOver(event) {
    event.open();
  }

  onMouseOut(event) {
    event.close();
  }


  fixedAfterDot(value) {
    return value.toFixed(2);
  }

  TextAnootationData() {
    this.apiSvc.gettextAnnotation(this.fileName).subscribe((response) => {
      this.source13.localdata = response;
      this.dataAdapter13.dataBind();
    });

    this.apiSvc.gettextCoverageAnnotation(this.fileName).subscribe((response) => {
      console.log(response);
      
      if(response){
          var responseData = response.filter(res => (res.file_name === 'raw_img/'+this.fileName+'.jpg'));
          if(responseData.length == 0 ){
            var responseData = response.filter(res => (res.file_name === 'raw_img/'+this.fileName+'.png'));
            if(responseData.length == 0 ){
              var responseData = response.filter(res => (res.file_name === 'raw_img/frames/'+this.fileName+'.jpg'));
              if(responseData.length == 0 ){
                var responseData = response.filter(res => (res.file_name === 'raw_img/frames'+this.fileName+'.png'));
              }
            }
          }
      } 


      let  a =responseData[0]['text_details'];
      var regexedData = a.replace(/'/g, '"').replace(/"""/g, '""');
      var getArrayOfTextCov = JSON.parse(regexedData);

      console.log(getArrayOfTextCov);
      

      this.dataTextcoverage = {
        img_area: responseData[0]['img_area']? responseData[0]['img_area']: '',
        text_coverage: responseData[0]['text_coverage']? responseData[0]['text_coverage']: '',
        word_area: responseData[0]['word_area']? responseData[0]['word_area']: '',
      }
      this.source14.localdata = getArrayOfTextCov;
      this.dataAdapter14.dataBind();
    });
  }

  AudioTransit() {
    this.audioTransitData = [];
    let body = {
      filename: this.fileName
    }
    this.apiSvc.postService(this.constantSvc.APIConfig.GET_AUDIO_TRANSIT, body).subscribe((response) => {
      if (response.code == 200 && response.status == true) {
        this.brachesTable = response.data;
        this.source8.localdata = this.brachesTable;
        this.dataAdapter8.dataBind();
      } else {
        this.brachesTable = [];
      }
    });
  }



  RowclickBreachtable(event) {
    let el: HTMLElement = this.click_model.nativeElement;
    el.click();
    this.rowClickData = event.args.row.bounddata;
    this.BreachTableDatamodel = true;
    this.RowclickImageFacialmodel = false;
  }


  RowclickTextAnnotationData(event) {
    let el: HTMLElement = this.click_model_Text_anootation.nativeElement;
    el.click();
    this.textAnnotationRowClickData = event.args.row.bounddata;
  }

  RowclickAudioTransitData(event) {
    let el: HTMLElement = this.click_model_Audio_Annotation.nativeElement;
    el.click();
    this.AudioAnnotationRowClickData = event.args.row.bounddata;
  }

  RowclicktextCoverage(event) {
    let el: HTMLElement = this.click_model_text_coverage_Annotation.nativeElement;
    el.click();
    this.textCoverageModelData = event.args.row.bounddata;
    console.log(event.args.row.bounddata);
    
  }

  openModel(content) {
    this.modalService.open(content);
  }

  openModeltextAnnotations(contentsss) {
    this.modalService.open(contentsss, { size: 'lg', windowClass: 'modal-xl' });
  }

  openModelAudioannotation(contentss) {
    this.modalService.open(contentss);
  }

  openModelTextannotation(contents) {
    this.modalService.open(contents);
  }





  source14: any = {
    localdata: [],
    datafields: [
      { name: 'description', type: 'string' },
      { name: 'area', type: 'string' },
      { name: 'width', type: 'string' },
      { name: 'height', type: 'string' },
    ],
    datatype: 'array',
  };
  dataAdapter14: any = new jqx.dataAdapter(this.source14);
  columns14: any[] = [
    // { text: 'file name',  datafield: 'file_name' },
    { text: 'Word', datafield: 'description' },
    { text: 'Area', datafield: 'area' },
    { text: 'Width', datafield: 'width' },
    { text: 'Height', datafield: 'height' },
  ];


  source13: any = {
    localdata: [],
    datafields: [
      { name: 'ARI', type: 'number' },
      { name: 'Coleman_Liau', type: 'number' },
      { name: 'DaleChallIndex', type: 'number' },
      { name: 'FleschReadingEase', type: 'number' },
      { name: 'GunningFogIndex', type: 'number' },
      { name: 'Kincaid', type: 'number' },
      { name: 'LIX', type: 'number' },
      { name: 'SMOGIndex', type: 'number' },
      { name: 'complex_words', type: 'string' },
    ],
    datatype: 'array',
  };
  dataAdapter13: any = new jqx.dataAdapter(this.source13);
  columns13: any[] = [
    { text: 'ARI', datafield: 'ARI', cellsformat: 'f4' },
    { text: 'Coleman Liau', datafield: 'Coleman_Liau', cellsformat: 'f4' },
    { text: 'Dale Chall Index', datafield: 'DaleChallIndex', cellsformat: 'f4' },
    { text: 'Flesch Reading Ease', datafield: 'FleschReadingEase', cellsformat: 'f4' },
    { text: 'Gunning Fog Index', datafield: 'GunningFogIndex', cellsformat: 'f4' },
    { text: 'Kincaid', datafield: 'Kincaid', cellsformat: 'f4' },
    { text: 'LIX', datafield: 'LIX', cellsformat: 'f4' },
    { text: 'SMOG Index', datafield: 'SMOGIndex', cellsformat: 'f4' },
    { text: 'complex words', datafield: 'complex_words' },
  ];


  source12: any = {
    localdata: [],
    datafields: [
      { name: 'transcript', type: 'string' },
      { name: 'confidence', type: 'number' },
    ],
    datatype: 'array',
  };
  dataAdapter12: any = new jqx.dataAdapter(this.source12);
  columns12: any[] = [
    { text: 'Transcript', datafield: 'transcript' },
    { text: 'Confidence', datafield: 'confidence', cellsformat: 'f4' },
  ];

  source11: any = {
    localdata: [],
    datafields: [
      { name: 'text', type: 'string' },
      { name: 'confidence', type: 'number' },
    ],
    datatype: 'array',
  };
  dataAdapter11: any = new jqx.dataAdapter(this.source11);
  columns11: any[] = [
    { text: 'Text', datafield: 'text' },
    { text: 'Confidence', datafield: 'confidence', cellsformat: 'f4' },
  ];

  source10: any = {
    localdata: [],
    datafields:
      [
        { name: 'frame_label_description', type: 'string' },
        { name: 'frame_category_entity_data', type: 'string' },
      ],
    datatype: 'array',
  };
  dataAdapter10: any = new jqx.dataAdapter(this.source10);
  columns10: any[] = [
    { text: 'Frame Labels Description', datafield: 'frame_label_description' },
    { text: 'Frame Category Entity Data', datafield: 'frame_category_entity_data' },
  ];

  source9: any = {
    localdata: [],
    datafields:
      [
        { name: 'category_entity_data', type: 'string' },
        { name: 'segment_labels_description', type: 'string' },
      ],
    datatype: 'array',
  };
  dataAdapter9: any = new jqx.dataAdapter(this.source9);
  columns9: any[] = [
    { text: 'Segment Labels Description', datafield: 'segment_labels_description' },
    { text: 'Category Entity Data', datafield: 'category_entity_data' },
  ];


  source8: any = {
    localdata: [],
    datafields:
      [
        { name: 'transcript', type: 'string' },
        { name: 'confidence', type: 'number' },
      ],
    datatype: 'array',
  };
  dataAdapter8: any = new jqx.dataAdapter(this.source8);
  columns8: any[] = [
    { text: 'Transcript', datafield: 'transcript' },
    { text: 'Confidence', datafield: 'confidence', cellsformat: 'f4' },
  ];

  source16: any = {
    localdata: [],
    datafields:
      [
        { name: 'name', type: 'string' },
        { name: 'salience', type: 'number' },
        { name: 'type', type: 'string' },
      ],
    datatype: 'array',
  };
  dataAdapter16: any = new jqx.dataAdapter(this.source16);
  columns16: any[] = [
    { text: 'Name', datafield: 'name' },
    { text: 'Salience', datafield: 'salience', cellsformat: 'f4' },
    { text: 'Type', datafield: 'type' },
  ];

  source15: any = {
    localdata: [],
    datafields:
      [
        { name: 'magnitude', type: 'number' },
        { name: 'score', type: 'number' },
      ],
    datatype: 'array',
  };
  dataAdapter15: any = new jqx.dataAdapter(this.source15);
  columns15: any[] = [
    { text: 'Magnitude', datafield: 'magnitude', cellsformat: 'f4' },
    { text: 'Score', datafield: 'score', cellsformat: 'f4' },
  ];

  source7: any = {
    localdata: [],
    datafields:
      [
        { name: 'name', type: 'string' },
        { name: 'salience', type: 'number' },
        { name: 'type', type: 'string' },
      ],
    datatype: 'array',
  };
  dataAdapter7: any = new jqx.dataAdapter(this.source7);
  columns7: any[] = [
    { text: 'Name', datafield: 'name' },
    { text: 'Salience', datafield: 'salience', cellsformat: 'f4' },
    { text: 'Type', datafield: 'type', },
  ];

  source6: any = {
    localdata: [],
    datafields:
      [
        { name: 'magnitude', type: 'number' },
        { name: 'score', type: 'number' },
      ],
    datatype: 'array',
  };
  dataAdapter6: any = new jqx.dataAdapter(this.source6);
  columns6: any[] = [
    { text: 'Magnitude', datafield: 'magnitude', cellsformat: 'f4' },
    { text: 'Score', datafield: 'score', cellsformat: 'f4' },
  ];

  // image document labels start 
  source5: any = {
    localdata: [],
    datafields:
      [
        { name: 'description', type: 'string' },
      ],
    datatype: 'array',
  };
  dataAdapter5: any = new jqx.dataAdapter(this.source5);
  columns5: any[] = [
    { text: 'Description', datafield: 'description' },
  ];
  // image document labels end table

  // image labels end table
  source4: any = {
    localdata: [],
    datafields:
      [
        { name: 'description', type: 'string' },
        { name: 'score', type: 'number' },
        { name: 'topicality', type: 'number' }
      ],
    datatype: 'array',
  };
  dataAdapter4: any = new jqx.dataAdapter(this.source4);
  columns4: any[] = [
    { text: 'Description', datafield: 'description' },
    { text: 'Score', datafield: 'score', cellsformat: 'f4' },
    { text: 'Topicality', datafield: 'topicality', cellsformat: 'f4' }
  ];
  // image  labels end table

  source3: any = {
    localdata: [],
    datafields:
      [
        { name: 'description', type: 'string' },
        { name: 'score', type: 'number' },
      ],
    datatype: 'array',
  };
  dataAdapter3: any = new jqx.dataAdapter(this.source3);
  columns3: any[] = [
    { text: 'Description', datafield: 'description' },
    { text: 'Score', datafield: 'score', cellsformat: 'f4' },
  ];

  source2: any = {
    localdata: [],
    datafields:
      [
        { name: 'detectionConfidence', type: 'number' },
        { name: 'landmarkingConfidence', type: 'number' },
        { name: 'joyLikelihood', type: 'string' },
        { name: 'sorrowLikelihood', type: 'string' },
        { name: 'angerLikelihood', type: 'string' },
        { name: 'surpriseLikelihood', type: 'string' },
        { name: 'underExposedLikelihood', type: 'string' },
        { name: 'blurredLikelihood', type: 'string' },
        { name: 'headwearLikelihood', type: 'string' },
      ],
    datatype: 'array',
  };
  dataAdapter2: any = new jqx.dataAdapter(this.source2);
  columns2: any[] = [
    { text: 'Detect Confidence', datafield: 'detectionConfidence', cellsformat: 'f4' },
    { text: 'Landmark Confidence', datafield: 'landmarkingConfidence', cellsformat: 'f4' },
    { text: 'Joy Likelihood', datafield: 'joyLikelihood' },
    { text: 'Sorrow Like Lihood', datafield: 'sorrowLikelihood' },
    { text: 'Anger Like Lihood', datafield: 'angerLikelihood' },
    { text: 'Surprise Like Lihood', datafield: 'surpriseLikelihood' },
    { text: 'Under Exposed Like Lihood', datafield: 'underExposedLikelihood' },
    { text: 'Blurred Like Lihood', datafield: 'blurredLikelihood' },
    { text: 'Headwear Like Lihood', datafield: 'headwearLikelihood' },
  ];

  source: any = {
    localdata: [],
    datafields:
      [
        { name: 'hit_value', type: 'string' },
        { name: 'entity_type', type: 'date' },
        { name: 'medium_type', type: 'string' },
        { name: 'entity_name', type: 'string' },
        { name: 'product_type', type: 'date' },
        { name: 'rule_id', type: 'string' },
        { name: 'isBreached', type: 'date' },
      ],
    datatype: 'array',
  };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any[] = [
    { text: 'Entity Name', datafield: 'entity_name' },
    { text: 'Product Type', datafield: 'product_type' },
    { text: 'Medium Type', datafield: 'medium_type' },
    { text: 'Rule Id', datafield: 'rule_id' },
    { text: 'Breach by Word', datafield: 'hit_value' },
  ];

}
