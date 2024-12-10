import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfigPageComponent } from '../config-page/config-page.component';
import { StartStopComponent } from '../start-stop/start-stop.component';
import { TotalTicketComponent } from '../total-ticket/total-ticket.component';

@Component({
  selector: 'app-base-component',
  standalone: true,
  imports: [CommonModule,ConfigPageComponent,StartStopComponent,TotalTicketComponent],
  templateUrl: './base-component.component.html',
  styleUrl: './base-component.component.css'
})
export class BaseComponentComponent {

}
