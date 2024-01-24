import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MaterialModule } from "./material.module";
import { FeatherIconsModule } from "./components/feather-icons/feather-icons.module";
import { OMExcludePipePipe } from "../_pipes/omexclude-pipe.pipe";
import { MultipleExclude } from "../_pipes/multiple-exclude.pipe";
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatMenuModule } from "@angular/material/menu";
import { MonthNamePipe } from "../_pipes/month.pipe";
import { RoundedNumberPipe } from "../_pipes/RoundedNumberPipe.pipe";
import { UniquePipe2 } from "../_pipes/unique.pipe copy";
import { TilExcludePipe } from "../_pipes/TilsExcludePipe";
import { OTNameRemoverPipe } from "../_pipes/otNameRemover.pipe";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
  declarations: [
    OMExcludePipePipe,
    MultipleExclude,
    MonthNamePipe,
    RoundedNumberPipe,
    UniquePipe2,
    TilExcludePipe,
    OTNameRemoverPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    PerfectScrollbarModule,
    MatExpansionModule,
    MatMenuModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    UniquePipe2,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    MaterialModule,
    FeatherIconsModule,
    OMExcludePipePipe,
    MultipleExclude,
    PerfectScrollbarModule,
    MatExpansionModule,
    MatMenuModule,
    MonthNamePipe,
    RoundedNumberPipe,
    TilExcludePipe,
    OTNameRemoverPipe
  ],
})
export class SharedModule {}
