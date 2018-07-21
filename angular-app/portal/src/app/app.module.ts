import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { ResultsTableComponent } from './components/tournament/results-table/results-table.component';
import { PairMapperComponent } from './components/tournament/pair-mapper/pair-mapper.component';
import { RoundsTableComponent } from './components/tournament/rounds-table/rounds-table.component';
import { ResultParserComponent } from './components/tournament/result-parser/result-parser.component';

@NgModule({
    declarations: [
        AppComponent,
        ResultsTableComponent,
        PairMapperComponent,
        RoundsTableComponent,
        ResultParserComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
