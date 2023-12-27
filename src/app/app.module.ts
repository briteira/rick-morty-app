import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { CharacterListComponent } from './modules/character/character-list/character-list.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CharacterFilterModalComponent } from './modules/character/character-filter-modal/character-filter-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuSidebarComponent,
    CharacterListComponent,
    InputSearchComponent,
    CharacterFilterModalComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'pt'
    }),
    MatMenuModule,
    BrowserAnimationsModule,
    MatIconModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
