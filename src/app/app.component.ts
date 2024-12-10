import { Component } from '@angular/core';
import { ConfigPageComponent } from './page/config-page/config-page.component';
import { StartStopComponent } from './page/start-stop/start-stop.component';
import { TotalTicketComponent } from './page/total-ticket/total-ticket.component';// Import the TicketStatus component
import { BaseComponentComponent } from './page/base-component/base-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ConfigPageComponent,
    StartStopComponent,
    TotalTicketComponent,
    BaseComponentComponent// Add TicketStatusComponent to imports
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oop-FE';
}
