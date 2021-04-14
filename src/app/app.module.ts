import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CarOwnersServiceService } from './shared/services/carOwnersService.service'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { InMemoryDataService } from './shared/services/in-memory-data.service'
import { ListOwnersComponent } from './list-owners/list-owners.component'
import { OwnerInfoComponent } from './owner-info/owner-info.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './material.module'

@NgModule({
  declarations: [AppComponent, ListOwnersComponent, OwnerInfoComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    NoopAnimationsModule,
  ],
  providers: [CarOwnersServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
