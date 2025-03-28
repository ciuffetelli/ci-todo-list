import { Component } from '@angular/core';
import { TaskComponent } from "../../components/task/task.component";
import { ButtonComponent } from "../../components/button/button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [TaskComponent, ButtonComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
