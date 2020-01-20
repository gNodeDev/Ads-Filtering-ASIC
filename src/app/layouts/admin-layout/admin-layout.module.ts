import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NodeGraphComponent } from 'src/app/pages/node-graph/node-graph.component';
import { ChartModule } from 'angular-highcharts';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { AdTableComponent } from 'src/app/pages/ad-table/ad-table.component';
import { AgmCoreModule } from '@agm/core';
    
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ChartModule,
    AgmCoreModule.forRoot({
       apiKey: 'AIzaSyBTyjNROkVUD_GbDrFI21GX1K0HLjogn1k'
    })
  ],
  
  exports:[
    jqxGridComponent,
    AgmCoreModule
  ],
  
  declarations: [
    DashboardComponent,
    NodeGraphComponent,
    jqxGridComponent,
    AdTableComponent
  ]
})

export class AdminLayoutModule {}
