import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProdukModel } from './dashboard/dashboard.model';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-angular';
}
