import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Meeting, Client } from '../../services/data';

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './meetings.html',
  styleUrls: ['./meetings.css']
})
export class Meetings implements OnInit {
  meetings: Meeting[] = [];
  clients: Client[] =[];
  isModalOpen = false;
  newMeeting: any = { title: '', clientName: '', date: '', time: '', location: '', notes: '', status: 'scheduled' };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.meetings$.subscribe(data => this.meetings = data);
    this.dataService.clients$.subscribe(data => this.clients = data);
  }

  openModal() { this.isModalOpen = true; }
  closeModal() { this.isModalOpen = false; }

  submitMeeting() {
    if(!this.newMeeting.title || !this.newMeeting.clientName) return;
    this.dataService.addMeeting({ ...this.newMeeting, id: Date.now().toString() });
    this.closeModal();
    this.newMeeting = { title: '', clientName: '', date: '', time: '', location: '', notes: '', status: 'scheduled' };
  }
  
  completeMeeting(id: string) {
    this.dataService.updateMeetingStatus(id, 'completed');
  }

  cancelMeeting(id: string) {
    const confirmCancel = confirm('Are you sure you want to cancel this meeting?');
    if (confirmCancel) {
      this.dataService.updateMeetingStatus(id, 'cancelled');
    }
  }
}