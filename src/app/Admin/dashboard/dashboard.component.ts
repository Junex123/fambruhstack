import { Component } from '@angular/core';
import { AddblogComponent } from '../addblog/addblog.component';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AddblogComponent,AddproductComponent,CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  selectedTab: string = 'tab1'; // Initialize active tab

  constructor() {}
  // Method to switch tabs
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
