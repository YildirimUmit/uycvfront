import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import {CardModule} from "primeng/card";
import {ImageModule} from "primeng/image";
import {FieldsetModule} from "primeng/fieldset";
import {TimelineModule} from "primeng/timeline";
import {ChipModule} from "primeng/chip";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SpeedDialModule} from "primeng/speeddial";
import {ToastModule} from "primeng/toast";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
        AnimateOnScrollModule,
        CardModule,
        ImageModule,
        FieldsetModule,
        TimelineModule,
        ChipModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        SpeedDialModule,
        ToastModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
