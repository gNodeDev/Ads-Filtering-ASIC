import { Component, OnInit, ViewChild } from '@angular/core';
import { ConstantService } from 'src/app/service/constant.service';
import { ApiService } from 'src/app/service/api/api.service';
import * as Highcharts from 'highcharts';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { Router, ActivatedRoute } from '@angular/router';
import { log } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('myGrid') myGrid: jqxGridComponent;
    
  public TableAdsData:any = [];
  public tableDatalength:number = 0;
  public TableBreachesData:any = [];
  public tableBreachesDatalength:number = 0;
  public advChartshow:any = 'block';
  public advChartshowpie:any = 'none';
  public productChartshowpie:any = 'block';
  public productChartshow:any = 'none';
  public EntityvChartshow:any = 'block';
  public PieEntityChartshowpie:any = 'none';
  public EntityTypeChart:any = 'block';
  public PieEntityTypeChart:any = 'none';
 
  // name:any= '';
highcharts = Highcharts;
public Advertisement:any= {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Advertising Medium'
  },
  xAxis: {
    categories: [ "Billboard", "Print", "Radio", "Television", "Twitter", "Web banner", "Vimeo", "Youtube"],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Quantity'
    }
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
  series: [ {
    name: 'Advertise',
    data: [15,118,7,2,1,47,1,2]
  }]
}

public Product_service:any= {
  chart: {
    type: 'column'
  },
  title: {
    text: 'product Service'
  },
  xAxis: {
    categories: ["Car Finance","Comparison Service","Credit Brokers","Credit Card","Debt Management ","Deposit Product ","Financial Investments","GI-Home and Contents","GI-Landlord Insurance","GI-Motor Vehicle","GI-Pet Insurance","GI-Travel","Home Loan","Life Insurance-Funeral","Personal Loan","Other"],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Quantity'
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{red};padding:0">{series.name}: </td>'+'<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
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
      name: 'Product & service',
      color: '#f55143',
      data:  [89,3,1,23,2,3,1,2,1,7,1,1,53,1,2,3]
    }]
}

public entity_name:any= {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Entity Name'
  },
  xAxis: {
    categories: ["Mantello Nissan ","Adelaide Drive","AFD Loans","Allianz","Alto Holden Chatswood","Alto Hyundai","American Express","American Express / Qantas","AMH Auto Group","ANZ","Audi Centre Cairns","Australia Car Finance Company","Australian Finance Advocates","Australian Seniors Insurance Agency","Auto Zone Superior Vehicles","Bananacoast Community Credit Union","bank","Bank Australia","Bank of Melbourne","Bank SA","BankSA","Bartons Motors","Bartons Subaru","Blood Hyundai","Blood Motor Mart","BMW Dealers","BMW Finance","Bondsure","Busselton Hyundai","Canstar.com.au","Car Dealership","Cardiff Nissan","CBA","Citibank","City Motors Auction Group","Click Loans","Col Crawford Motors","Commonwealth Bank","Community First Credit Union","Compare Travel Insurance","Comparethemarket.com.au","Co-op Toyota","Credit Card Compare","Credit Repair Australia","Credit Union Australia","creditcard.com.au","Cricks Jeep Mt Gravatt","CUA","Daimler Trucks Laverton","DJ Kia","DJ Mazda","Equity Story","Ferrari Brisbane","Finder.com.au","Finsure","First Domain by Plunkett","Fox Symes & Associates","Frankston Hyundai","Geelong Mazda/Blood Hyundai","Gold Coast Alfa Romeo","Greater Bank Limited","HashChing","Heritage Bank","Home Loan","HomeStart","HSBC","Hyundai Dealers","IMB Bank","ING Direct","Ireland Holden","Ireland's Group","Ireland's Used Cars","James Frizelle's Chrysler Jeep Dodge","Jarrards Auto","Jeep Dealers (Chrysler)","John Hughes","John Hughes Kia","John Hughes Mitsubishi","JSA Group","Keema Cars","Key Motors","Key Motors Townsville","Keystart Loans","Kings Cars","Kings Geelong Mitsubishi","Lakes Hyundai","Lendi","Lexus of Newcastle","loans.com.au","Macarthur Nissan","Macquarie Bank","Mandurah","McArthur Nissan","ME Bank","Medibank","Melton Toyota ","Metricon","Metro Nissan","Motorama Mitsubishi","Mozo","MyState Financial","Newspot Kia","NMRA","Northside Honda","Nunawading Fiat Alfa Romeo","Osborne Park Volkswagen","Osbourne Park Volkswagen","Over Sixty Insurance","Pacific Toyota","Parry NQ","People's Choice Credit Union","Pittard Motors","Police Credit Union (NSW)","Qantas ","RAA","Rate City","RateCity.com.au","Real Insurance","Reduce Home Loans","Rex Gorell Nissan","Ringwood Nissan","Ryde Hyundai","Savvy","Select Mortgage Services","Skoda Financial Services (VW Financial Services)","Smooth Start","South Morang Toyota","Southside Honda","St George","Suncorp","Surf Toyota","Terri Scheer (Suncorp)","Tic:Toc","Toyota","Trinity Honda","Ubank","V Singh Group","Westpac","Wheelz and Wheelz","Winter & Taylor Motor Group","Woolworths Insurance",],
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
      name: 'Entity Name',
      color: '#d8766e',
      data:  [1,1,1,1,1,2,1,1,1,3,2,1,1,1,1,1,1,1,2,2,1,1,1,1,2,2,1,1,1,1,1,1,1,2,1,1,1,3,1,1,3,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,2,1,1,2,2,1,2,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,7,1,1,2,2,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,2,1,1,2,6,1,1,3,2,1,1,1,1,1,2,1,2,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,3,2]
    }]
}

public entity_type:any= {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Entity Type'
  },
  xAxis: {
    categories: ["Bank-Big4 & subsidiaries","Bank-Other","Car dealership","Comparison website","Credit brokers","Credit union/mutual fund","Debt management/credit repair","Financial Advisor","Insurer","Other"],
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
      name: 'Enntity Type',
      color: '#51b051',
      data:  [14,21,85,18,29,10,2,1,10,3]
    }]
}



public pieAdvertisementChart:any={
  chart: {type: 'pie'},
  title: {text: 'Advertising Medium'},
  plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        }
    }
  },
  series: [{
    name: 'Value',
    colorByPoint: true,
    data: [
      {
          name: 'Billboard',
          y:15
      },
      {
          name: 'Print',
          y:118
      },
      {
          name: 'Radio',
          y:7
      },
      {
          name: 'Television',
          y:2
      },
      {
          name: 'Twitter',
          y:1
      },
      {
          name: 'Web banner ',
          y:47
      },
      {
          name: 'Vimeo',
          y:1
      },
      {
          name: 'Youtube',
          y:2
      }] 
  }]
}

public pieEntity_type:any={
  chart: {type: 'pie'},
  title: {text: 'Advertising Medium'},
  plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        }
    }
  },
  series: [{
    name: 'Value',
    colorByPoint: true,
    data: [
      {
    name:'Bank - Big 4 & subsidiaries',
    y:14
      },
      {
          name:'Bank - Other',
          y:21
      },
      {
          name:'Car dealership',
          y:85
      },
      {
          name:'Comparison website',
          y:18
      },
      {
          name:'Credit brokers',
          y:29
      },
      {
          name:'Credit union / mutual fund',
          y:10
      },
      {
          name:'Debt management / credit repair',
          y:2
      },
      {
          name:'Financial Advisor',
          y:1
      },
      {
          name:'Insurer',
          y:10
      },
      {
          name:'Other',
          y:3
      },
    ] 
  }]
}


public pieProduct_service:any={
  chart: {type: 'pie'},
  title: {text: 'product Service'},
  plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        }
    }
  },
  series: [{
    name: 'Value',
    colorByPoint: true,
    data: [
    {
        name: 'Car Finance',
        y:189
    },
    {
        name: 'Comparison Service',
        y:113
    },
    {
        name: 'Credit Brokers',
        y:1
    },
    {
        name: 'Credit Card',
        y:23
    },
    {
        name: 'Debt Management ',
        y:2
    },
    {
        name: 'Deposit Product ',
        y:43
    },
    {
        name: 'Financial Investments',
        y:1
    },
    {
        name: 'General Insurance - Home and Contents',
        y:12
    },
    {
        name: 'General Insurance - Landlord Insurance',
        y:111
    },
    {
        name: 'General Insurance - Motor Vehicle',
        y:7
    },
    {
        name: 'General Insurance - Pet Insurance',
        y:1
    },
    {
        name: 'General Insurance - Travel',
        y:1
    },
    {
        name: 'Home Loan',
        y:453
    },
    {
        name: 'Life Insurance - Funeral',
        y:1
    },
    {
        name: 'Other',
        y:2
    },
    {
        name: 'Personal Loan',
        y:3
    },
  ]
  }]
}

public pie_entity_name:any={
  chart: {type: 'pie'},
  title: {text: 'Entity Name'},
  plotOptions: {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        }
    }
  },
  series: [{
    name: 'Value',
    colorByPoint: true,
    data: [
      {
        name:'Mantello Nissan ',
        y: 1
    },
	{
        name:'Adelaide Drive',
        y: 1
    },
	{
        name:'AFD Loans',
        y: 1
    },
	{
        name:'Allianz',
        y: 1
    },
	{
        name:'Alto Holden Chatswood',
        y: 1
    },
	{
        name:'Alto Hyundai',
        y: 2
    },
	{
        name:'American Express',
        y: 1
    },
	{
        name:'American Express / Qantas',
        y: 1
    },
	{
        name:'AMH Auto Group',
        y: 1
    },
	{
        name:'ANZ',
        y: 3
    },
	{
        name:'Audi Centre Cairns',
        y: 2
    },
	{
        name:'Australia Car Finance Company',
        y: 1
    },
	{
        name:'Australian Finance Advocates',
        y: 1
    },
	{
        name:'Australian Seniors Insurance Agency',
        y: 1
    },
	{
        name:'Auto Zone Superior Vehicles',
        y: 1
    },
	{
        name:'Bananacoast Community Credit Union',
        y: 1
    },
	{
        name:'bank',
        y: 1
    },
	{
        name:'Bank Australia',
        y: 1
    },
	{
        name:'Bank of Melbourne',
        y: 2
    },
	{
        name:'Bank SA',
        y: 2
    },
	{
        name:'BankSA',
        y: 1
    },
	{
        name:'Bartons Motors',
        y: 1
    },
	{
        name:'Bartons Subaru',
        y: 1
    },
	{
        name:'Blood Hyundai',
        y: 1
    },
	{
        name:'Blood Motor Mart',
        y: 2
    },
	{
        name:'BMW Dealers',
        y: 2
    },
	{
        name:'BMW Finance',
        y: 1
    },
	{
        name:'Bondsure',
        y: 1
    },
	{
        name:'Busselton Hyundai',
        y: 1
    },
	{
        name:'Canstar.com.au',
        y: 1
    },
	{
        name:'Car Dealership',
        y: 1
    },
	{
        name:'Cardiff Nissan',
        y: 1
    },
	{
        name:'CBA',
        y: 1
    },
	{
        name:'Citibank',
        y: 2
    },
	{
        name:'City Motors Auction Group',
        y: 1
    },
	{
        name:'Click Loans',
        y: 1
    },
	{
        name:'Col Crawford Motors',
        y: 1
    },
	{
        name:'Commonwealth Bank',
        y: 3
    },
	{
        name:'Community First Credit Union',
        y: 1
    },
	{
        name:'Compare Travel Insurance',
        y: 1
    },
	{
        name:'Comparethemarket.com.au',
        y: 3
    },
	{
        name:'Co-op Toyota',
        y: 1
    },
	{
        name:'Credit Card Compare',
        y: 1
    },
	{
        name:'Credit Repair Australia',
        y: 1
    },
	{
        name:'Credit Union Australia',
        y: 2
    },
	{
        name:'creditcard.com.au',
        y: 2
    },
	{
        name:'Cricks Jeep Mt Gravatt',
        y: 1
    },
	{
        name:'CUA',
        y: 1
    },
	{
        name:'Daimler Trucks Laverton',
        y: 1
    },
	{
        name:'DJ Kia',
        y: 1
    },
	{
        name:'DJ Mazda',
        y: 1
    },
	{
        name:'Equity Story',
        y: 1
    },
	{
        name:'Ferrari Brisbane',
        y: 1
    },
	{
        name:'Finder.com.au',
        y: 1
    },
	{
        name:'Finsure',
        y: 1
    },
	{
        name:'First Domain by Plunkett',
        y: 1
    },
	{
        name:'Fox Symes & Associates',
        y: 1
    },
	{
        name:'Frankston Hyundai',
        y: 1
    },
	{
        name:'Geelong Mazda/Blood Hyundai',
        y: 2
    },
	{
        name:'Gold Coast Alfa Romeo',
        y: 1
    },
	{
        name:'Greater Bank Limited',
        y: 1
    },
	{
        name:'HashChing',
        y: 2
    },
	{
        name:'Heritage Bank',
        y: 2
    },
	{
        name:'Home Loan',
        y: 1
    },
	{
        name:'HomeStart',
        y: 1
    },
	{
        name:'HSBC',
        y: 2
    },
	{
        name:'Hyundai Dealers',
        y: 2
    },
	{
        name:'IMB Bank',
        y: 1
    },
	{
        name:'ING Direct',
        y: 2
    },
	{
        name:'Ireland Holden',
        y: 1
    },
	{
        name:'Irelands Group',
        y: 1
    },
	{
        name:'Irelands Used Cars',
        y: 1
    },
	{
        name:'James Frizelles Chrysler Jeep Dodge',
        y: 1
    },
	{
        name:'Jarrards Auto',
        y: 1
    },
	{
        name:'Jeep Dealers (Chrysler)',
        y: 1
    },
	{
        name:'John Hughes',
        y: 4
    },
	{
        name:'John Hughes Kia',
        y: 1
    },
	{
        name:'John Hughes Mitsubishi',
        y: 1
    },
	{
        name:'JSA Group',
        y: 1
    },
	{
        name:'Keema Cars',
        y: 1
    },
	{
        name:'Key Motors',
        y: 1
    },
	{
        name:'Key Motors Townsville',
        y: 1
    },
	{
        name:'Keystart Loans',
        y: 1
    },
	{
        name:'Kings Cars',
        y: 1
    },
	{
        name:'Kings Geelong Mitsubishi',
        y: 1
    },
	{
        name:'Lakes Hyundai',
        y: 1
    },
	{
        name:'Lendi',
        y: 7
    },
	{
        name:'Lexus of Newcastle',
        y: 1
    },
	{
        name:'loans.com.au',
        y: 1
    },
	{
        name:'Macarthur Nissan',
        y: 2
    },
	{
        name:'Macquarie Bank',
        y: 2
    },
	{
        name:'Mandurah',
        y: 1
    },
	{
        name:'McArthur Nissan',
        y: 1
    },
	{
        name:'ME Bank',
        y: 2
    },
	{
        name:'Medibank',
        y: 1
    },
	{
        name:'Melton Toyota ',
        y: 1
    },
	{
        name:'Metricon',
        y: 1
    },
	{
        name:'Metro Nissan',
        y: 1
    },
	{
        name:'Motorama Mitsubishi',
        y: 1
    },
	{
        name:'Mozo',
        y: 2
    },
	{
        name:'MyState Financial',
        y: 1
    },
	{
        name:'Newspot Kia',
        y: 1
    },
	{
        name:'NMRA',
        y: 2
    },
	{
        name:'Northside Honda',
        y: 1
    },
	{
        name:'Nunawading Fiat Alfa Romeo',
        y: 1
    },
	{
        name:'Osborne Park Volkswagen',
        y: 1
    },
	{
        name:'Osbourne Park Volkswagen',
        y: 2
    },
	{
        name:'Over Sixty Insurance',
        y: 1
    },
	{
        name:'Pacific Toyota',
        y: 1
    },
	{
        name:'Parry NQ',
        y: 2
    },
	{
        name:'Peoples Choice Credit Union',
        y: 6
    },
	{
        name:'Pittard Motors',
        y: 1
    },
	{
        name:'Police Credit Union (NSW)',
        y: 1
    },
	{
        name:'Qantas ',
        y: 3
    },
	{
        name:'RAA',
        y: 2
    },
	{
        name:'Rate City',
        y: 1
    },
	{
        name:'RateCity.com.au',
        y: 1
    },
	{
        name:'Real Insurance',
        y: 1
    },
	{
        name:'Reduce Home Loans',
        y: 1
    },
	{
        name:'Rex Gorell Nissan',
        y: 1
    },
	{
        name:'Ringwood Nissan',
        y: 2
    },
	{
        name:'Ryde Hyundai',
        y: 1
    },
	{
        name:'Savvy',
        y: 2
    },
	{
        name:'Select Mortgage Services',
        y: 1
    },
	{
        name:'Skoda Financial Services (VW Financial Services)',
        y: 1
    },
	{
        name:'Smooth Start',
        y: 1
    },
	{
        name:'South Morang Toyota',
        y: 1
    },
	{
        name:'Southside Honda',
        y: 1
    },
	{
        name:'St George',
        y: 2
    },
	{
        name:'Suncorp',
        y: 2
    },
	{
        name:'Surf Toyota',
        y: 1
    },
	{
        name:'Terri Scheer (Suncorp)',
        y: 1
    },
	{
        name:'Tic:Toc',
        y: 1
    },
	{
        name:'Toyota',
        y: 1
    },
	{
        name:'Trinity Honda',
        y: 1
    },
	{
        name:'Ubank',
        y: 1
    },
	{
        name:'V Singh Group',
        y: 1
    },
	{
        name:'Westpac',
        y: 1
    },
	{
        name:'Wheelz and Wheelz',
        y: 1
    },
	{
        name:'Winter & Taylor Motor Group',
        y: 3
    },
	{
        name:'Woolworths Insurance',
        y: 2
    }
    ]
  }]
}

  // jqx grid end
  constructor(
    private router: Router,
    private constantSvc: ConstantService,
    private apiSvc: ApiService
 
  ) { }


  ngOnInit(){
    
    // this.myGrid.pagesizeoptions(['10', '25', '50', '100', '200']);
    
     Highcharts.chart('Advertisement', this.Advertisement);
     Highcharts.chart('Product_service', this.Product_service);
     Highcharts.chart('entity_name', this.entity_name);
     Highcharts.chart('entity_type', this.entity_type);
     Highcharts.chart('pieAdvertisementChart', this.pieAdvertisementChart);
     Highcharts.chart('pieProduct_service', this.pieProduct_service);
     Highcharts.chart('pie_entity_name', this.pie_entity_name);
     Highcharts.chart('pieEntity_type', this.pieEntity_type);
     
    this.getAllDsData();
    this.getAllDataBreaches("1");

    
    setTimeout(() => {
        this.onTopView(); 
     }, 1000);
  }

  ngAfterViewInit(){
      this.onTopView();
  }

  getAllDsData(){
    this.apiSvc.getService(this.constantSvc.APIConfig.GET_ALL_DATA).subscribe((response) => {
        if(response.code == 200 && response.status == true){
          this.TableAdsData = response.data;
          this.tableDatalength = this.TableAdsData.length;
          this.source.localdata = this.TableAdsData;
          this.dataAdapter.dataBind();
        }else{
          this.TableAdsData = [];
        }
    });
  }


    ChangeBreachesData(event){
        this.getAllDataBreaches(event.target.value);
    }

   getAllDataBreaches(event){

    let data= {
        type: event?event:'1'
    };
    this.apiSvc.postService(this.constantSvc.APIConfig.GET_BREACHES_DATA_ALL, data).subscribe((response) => {
        if(response.code == 200 && response.status == true){
          this.TableBreachesData = response.data;
          this.tableBreachesDatalength = this.TableBreachesData.length;
          this.sourceBreaches.localdata = this.TableBreachesData;
          this.dataAdapterBreaches.dataBind();
        }else{
          this.TableAdsData = [];
        }
    });     
   }

  onTopView(){
    window.scrollTo(0,0); 
  }

  onClickWidget(event) {
    if(event == 'Advertise'){
        window.scrollTo(0, 1300); 
    }else if(event == 'Breaches'){
         window.scrollTo(0, 1900); 
    }
}
  
  Rowclick(event){
    let data =  event.args.row.bounddata;
    let AdId64 = btoa(data.id);
    console.log(data);
    
      if(data.file_name !=''){
        console.log(data.file_name);
          let val64 = btoa(data.file_name);
          var url = '/adTable/'+AdId64+'/'+val64;
          console.log(url);
          
      }else{
        console.log(data);
          var url = '/adTable/'+AdId64 ;
          console.log(url);
      }
     console.log(data);
    this.router.navigate([url]);
    
    
    
  } 

  advType(val){
    if(val=='pie'){
        this.advChartshowpie = 'block';
        this.advChartshow = 'none';
    }else{
       this.advChartshowpie = 'none';
        this.advChartshow = 'block';
    }
  }

  

  
  pieProduct_serviceType(val){  
   if(val=='pie'){
        this.productChartshowpie = 'block';
        this.productChartshow = 'none';
    }else{
       this.productChartshowpie = 'none';
        this.productChartshow = 'block';
    }
  }

  PIeEntityName(val){
    if(val=='pie'){
        this.PieEntityChartshowpie = 'block';
        this.EntityvChartshow = 'none';
    }else{
       this.PieEntityChartshowpie = 'none';
      this.EntityvChartshow = 'block';
    }
  }

  EntityNamePietype(val){
     if(val=='pie'){
        this.EntityTypeChart = 'block';
        this.PieEntityTypeChart = 'none';
    }else{
       this.EntityTypeChart = 'none';
      this.PieEntityTypeChart = 'block';
    }
  }





 sourceBreaches: any = {
    localdata: [],
    datafields:
      [
        { name: 'hit_value', type: 'string' },
        { name: 'entity_type', type: 'string' },
        { name: 'medium_type', type: 'string' },
        { name: 'entity_name', type: 'string' },
        { name: 'product_type', type: 'string' },
        { name: 'rule_id', type: 'string' },
      ],
    datatype: 'array',
  };
  dataAdapterBreaches: any = new jqx.dataAdapter(this.sourceBreaches);
  columnsBreaches: any[] = [
    { text: 'Entity Name',  datafield: 'entity_name' },
    { text: 'Product Type',  datafield: 'product_type' },
    { text: 'Medium Type', datafield: 'medium_type' },
    { text: 'Rule Id',  datafield: 'rule_id' },
    { text: 'Breach by Word',  datafield: 'hit_value' },
];



  source: any = {
    localdata: [],
    datafields:
      [
        { name: 'id', type: 'string' },
        { name: 'entity_name', type: 'string' },
        { name: 'entity_type', type: 'date' },
        { name: 'file_name', type: 'string' },
        { name: 'medium_type', type: 'string' },
        { name: 'publication_name', type: 'date' },
        { name: 'pro_or_service_type', type: 'string' },
      ],
    datatype: 'array',
  };
  dataAdapter: any = new jqx.dataAdapter(this.source);
  columns: any[] =
    [
      { text: 'Ad ID', datafield: 'id' },
      { text: 'Name', datafield: 'entity_name' },
      { text: 'Type', datafield: 'entity_type', },
      { text: 'File Name', datafield: 'file_name' },
      { text: 'Medium Type', datafield: 'medium_type' },
      { text: 'Publication Name', datafield: 'publication_name' },
      { text: 'Product Service', datafield: 'pro_or_service_type' },
    ];

}



    