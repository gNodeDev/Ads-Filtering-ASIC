import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NodeGraphComponent } from '../../pages/node-graph/node-graph.component';
import { AdTableComponent } from 'src/app/pages/ad-table/ad-table.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'nodeGraph', component: NodeGraphComponent },
    { path: 'adTable/:adId', component: AdTableComponent },
    { path: 'adTable/:adId/:fileId', component: AdTableComponent },
];
