import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TicketComponent } from './modules/ticket/ticket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TicketOverviewComponent } from './modules/ticket-overview/ticket-overview.component';
import { FeedbackComponent } from './modules/feedback/feedback.component';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
    declarations: [
        AppComponent,
        TicketComponent,
        TicketOverviewComponent,
        FeedbackComponent,    
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
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
