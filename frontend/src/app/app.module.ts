import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { WelcomeContentComponent } from './welcome-content/welcome-content.component';
import { AuthContentComponent } from './auth-content/auth-content.component';
import { ContentComponent } from './content/content.component';
import { MatFormFieldModule } from '@angular/material/form-field';  

import { AxiosService } from './axios.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExaminationDisplayComponent } from './examination-display/examination-display.component';
import { HttpClientModule } from '@angular/common/http';
import { ExaminationInputComponent } from './examination-input/examination-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    HeaderComponent,
    LoginFormComponent,
    WelcomeContentComponent,
    AuthContentComponent,
    ContentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    ExaminationDisplayComponent,
    ExaminationInputComponent
  ],
  providers: [AxiosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
