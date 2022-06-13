import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/auth-interceptor';
import { MaterialModule } from './material/material.module';
import { TicketComponent } from './components/ticket/ticket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FeedbackComponent } from './components/feedback/feedback.component';

@NgModule({
    declarations: [
        AppComponent,
        TicketComponent,
        FeedbackComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgxStarRatingModule,
    ],
    providers: [AuthGuard, DatePipe,
        { provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
