import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {ExamsComponent} from './pages/exams/exams.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ExamComponent} from './pages/exam/exam.component';
import {ExamTimerPipe} from './pipes/exam-timer.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NewExamComponent} from './pages/new-exam/new-exam.component';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogComponent} from './pages/dialog/dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {EditExamComponent} from './pages/edit-exam/edit-exam.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AuthGuard} from "./support/auth.guard";
import {AuthenticationService} from "./services/authentication.service";
import {HttpRequestInterceptor} from "./services/http-request.interceptor";
import {MyAccountComponent} from './pages/my-account/my-account.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { MyExamAttemptsComponent } from './pages/my-exam-attempts/my-exam-attempts.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import { ExamAttemptConverterPipe } from './pipes/exam-attempt-converter.pipe';
import { UserOptionsDialogComponent } from './pages/users-list/user-options-dialog/user-options-dialog.component';
import { UserNewRoleDialogComponent } from './pages/users-list/user-new-role-dialog/user-new-role-dialog.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { PasswordResetNewComponent } from './pages/password-reset/password-reset-new/password-reset-new.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExamsComponent,
    PageNotFoundComponent,
    ExamComponent,
    ExamTimerPipe,
    NewExamComponent,
    DialogComponent,
    EditExamComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    MyAccountComponent,
    ActivateAccountComponent,
    MyExamAttemptsComponent,
    ExamAttemptConverterPipe,
    UserOptionsDialogComponent,
    UserNewRoleDialogComponent,
    PasswordResetComponent,
    PasswordResetNewComponent,
    UsersListComponent
  ],
  entryComponents: [DialogComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatTooltipModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatPaginatorModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard, AuthenticationService, [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
  ]],
  bootstrap: [AppComponent]
})
export class AppModule {
}
