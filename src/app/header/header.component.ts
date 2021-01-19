import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { DataStorageService } from '../core/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authSubscription: Subscription | undefined;
  userEmail: string | undefined;
  isAuthenticated = false;

  constructor(private router: Router, private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !user ? false : true; // !!user
      this.userEmail = !user ? undefined : user.email;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  onNavigateToAuth(): void {
    this.router.navigate(['/auth']);
  }

  onLogout(): void {
    this.authService.logout();
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

}
