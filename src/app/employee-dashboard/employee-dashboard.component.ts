import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css',
  providers: [ ApiService],
})
export class EmployeeDashboardComponent {

}
