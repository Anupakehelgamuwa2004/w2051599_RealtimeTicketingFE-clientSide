import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

@Component({
  selector: 'app-total-ticket',
  standalone: true,
  templateUrl: './total-ticket.component.html',
  styleUrls: ['./total-ticket.component.css'],
  imports: [CommonModule]
})
export class TotalTicketComponent implements OnInit, OnDestroy {
  private socketClient: Stomp.Client | null = null;
  public messages: { text: string, timestamp: string }[] = []; // Store formatted message strings with timestamp

  ngOnInit() {
    this.connectWebSocket();
  }

  ngOnDestroy() {
    if (this.socketClient) {
      this.socketClient.disconnect(() => {
        console.log('WebSocket connection closed.');
      });
    }
  }

  connectWebSocket() {
    const ws = new SockJS('http://localhost:9090/chat');
    this.socketClient = Stomp.over(ws);

    this.socketClient.connect({}, (frame) => {
      console.log('WebSocket connected:', frame);

      // Subscribe to /topic/tickets
      this.socketClient?.subscribe('/topic/tickets', (message: { body: string }) => {
        const parsedMessage = JSON.parse(message.body);

        // Process the message and format it
        const formattedMessage = this.formatMessage(parsedMessage);
        const timestamp = new Date().toLocaleTimeString();
        this.messages.push({ text: formattedMessage, timestamp });
        console.log('Received:', formattedMessage);
      });
    });
  }

  sendMessage() {
    if (this.socketClient) {
      // Send a message to /app/sendMessage (handled by the Controller class)
      this.socketClient.send('/app/sendMessage', {}, JSON.stringify({
        sender: 'Client',
        content: 'Hello from Angular!',
      }));
      console.log('Message sent!');
    } else {
      console.error('WebSocket client is not connected.');
    }
  }

  formatMessage(message: any): string {
    // Extract the sender and content
    const sender = message.sender?.split(' ')[1]; // Get the vendor or customer number
    const content = message.content;

    let formattedMessage = '';

    if (content.includes('added')) {
      // For "added" content
      const ticketsAdded = content.split(' ')[1]; // Extract the number of tickets added
      formattedMessage = `${sender} added ${ticketsAdded} tickets. Current available: ${ticketsAdded}`;
    } else if (content.includes('purchased')) {
      // For "purchased" content
      const currentTickets = content.split(': ')[1]; // Extract the current ticket count
      formattedMessage = `${sender} purchased a ticket. Current available: ${currentTickets}`;
    }

    return formattedMessage;
  }
}
