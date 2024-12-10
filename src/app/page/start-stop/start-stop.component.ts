import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TicketConfiguration {
  maxTicketCapacity: number;
  totalTickets: number;
  ticketReleaseRate: number;
  customerRetrievalRate: number;
}

interface ResponseMessage {
  message: string;
}

@Component({
  selector: 'app-start-stop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './start-stop.component.html',
  styleUrls: ['./start-stop.component.css']
})
export class StartStopComponent implements OnInit {
  private baseUrl = 'http://localhost:9090/config'; // Adjust to match your backend port
  configuration: TicketConfiguration = {
    maxTicketCapacity: 100,
    totalTickets: 50,
    ticketReleaseRate: 1000,
    customerRetrievalRate: 1000
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch current configuration when component initializes
    this.fetchCurrentConfiguration();
  }

  fetchCurrentConfiguration() {
    this.http.get<TicketConfiguration>(`${this.baseUrl}/get`)
      .subscribe({
        next: (config) => {
          this.configuration = config;
        },
        error: (err) => {
          console.error('Failed to fetch configuration', err);
        }
      });
  }

  onStart() {
    this.http.post<ResponseMessage>(`${this.baseUrl}/start`, this.configuration)
      .subscribe({
        next: (response) => {
          console.log(response.message);
          alert('Selling and buying threads started successfully!');
        },
        error: (err) => {
          console.error('Failed to start threads', err);
          alert('Failed to start threads');
        }
      });
  }

  onStop() {
    this.http.post<ResponseMessage>(`${this.baseUrl}/stop`, {})
      .subscribe({
        next: (response) => {
          console.log(response.message);
          alert('Selling and buying threads stopped successfully!');
        },
        error: (err) => {
          console.error('Failed to stop threads', err);
          alert('Failed to stop threads');
        }
      });
  }
}
