import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-config-page',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.css']
})
export class ConfigPageComponent implements OnInit {

  // Define ticketInfor with initial default values
  public ticketInfor = {
    maxTicketCapacity: 0,
    totalTickets: 0,
    ticketReleaseRate: 0,
    customerRetrievalRate: 0
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Optionally, load configuration when the component initializes
    // Uncomment the line below if you want to load configuration on load
    // this.loadConfiguration();
  }

  /**
   * Method to configure (update) tickets by sending data to the backend
   */
  configureTickets() {
    console.log('Sending Configuration:', this.ticketInfor);  // Debugging: Check the data being sent

    this.http.post<{ message: string }>('http://localhost:9090/config/update', this.ticketInfor)
      .subscribe(
        (response) => {
          alert(response.message);  // Display success message from backend
        },
        (error) => {
          console.error('Error updating configuration:', error);
          alert('Failed to update configuration');
        }
      );
  }

  /**
   * Method to load the existing configuration from the backend
   */
  loadConfiguration() {
    this.http.get<any>('http://localhost:9090/config/get')
      .subscribe(
        (config) => {
          // Assign the fetched configuration to ticketInfor
          this.ticketInfor = {
            maxTicketCapacity: config.maxTicketCapacity,
            totalTickets: config.totalTickets,
            ticketReleaseRate: config.ticketReleaseRate,
            customerRetrievalRate: config.customerRetrievalRate
          };
          console.log('Configuration loaded:', this.ticketInfor);  // Debugging: Verify loaded data
          alert('Configuration loaded successfully!');
        },
        (error) => {
          console.error('Error loading configuration:', error);
          alert('Failed to load configuration');
        }
      );
  }
}
