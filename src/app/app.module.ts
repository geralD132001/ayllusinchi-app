import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NopageFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    PagesModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
