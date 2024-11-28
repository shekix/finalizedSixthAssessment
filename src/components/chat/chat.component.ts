import { Component } from '@angular/core';
import { SignalRService } from '../../services/signal-r.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule,NgClass,NgFor],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  public messages: string[] = [];
  public user : string = sessionStorage.getItem("name")!;
  public message:string = "";
  constructor(private signalRService:SignalRService) {}

  ngOnInit(): void {
    this.signalRService.startConnection().subscribe(() => {
      this.signalRService.receiveMessage().subscribe((message) => {
        this.messages.push(message);
      });
    });
  }

  sendMessage(user:string,message:string): void {
    this.signalRService.sendMessage(this.user,this.message);
  }

}
