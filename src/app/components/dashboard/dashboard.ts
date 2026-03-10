import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Meeting, Task } from '../../services/data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './dashboard.html',
  styleUrls:['./dashboard.css']
})
export class Dashboard implements OnInit {
  totalClients = 0;
  upcomingMeetings = 0;
  pendingTasks = 0;
  
  meetingsList: Meeting[] =[];
  tasksList: Task[] =[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.clients$.subscribe(clients => this.totalClients = clients.length);
    
    this.dataService.meetings$.subscribe(meetings => {
      this.meetingsList = meetings;
      this.upcomingMeetings = meetings.filter(m => m.status === 'scheduled').length;
    });
    
    this.dataService.tasks$.subscribe(tasks => {
      this.tasksList = tasks;
      this.pendingTasks = tasks.filter(t => t.status !== 'Done').length;
    });
  }
}