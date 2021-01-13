import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() featureSelected = new EventEmitter<string>();
  constructor(private router: Router, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSelect(feature: string): void {
    this.router.navigate(['/' + feature]);
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

}
