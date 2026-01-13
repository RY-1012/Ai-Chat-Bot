import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class Chat {

  username = '';
  message = '';
  messages: any[] = [];
  aiTyping = false;
  users: string[] = [];

  constructor(private socket: SocketService) {

    this.socket.receiveMessage().subscribe((msg: any) => {
      this.aiTyping = false;
      msg.time = new Date().toLocaleTimeString();
      this.messages.push(msg);

      setTimeout(() => {
        const box = document.getElementById('chatBox');
        if (box) box.scrollTop = box.scrollHeight;
      });
    });

    this.socket.onTyping().subscribe(() => {
      this.aiTyping = true;
    });

    this.socket.getUsers().subscribe((list: any) => {
      this.users = list;
    });
  }

  send() {
    if (!this.username || !this.message.trim()) return;

    this.socket.join(this.username);

    this.socket.sendMessage({
      user: this.username,
      message: this.message
    });

    this.message = '';
  }
}
