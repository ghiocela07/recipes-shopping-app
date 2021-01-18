import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string | undefined;

  constructor(private authService: AuthService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }


  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.singUp(email, password);
    }

    authObservable.subscribe(
      responseData => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
        this.openAlertBox(errorMessage);
      }
    );
    form.reset();
  }

  private openAlertBox(messageToShow: string): void {

    const dialogRef = this.matDialog.open(AlertComponent, {
      width: '400px',
      data: { message: messageToShow }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }
}
