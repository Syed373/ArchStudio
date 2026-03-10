import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Task, Client } from '../../services/data';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.css']
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  clients: Client[] =[];
  isModalOpen = false;

  newTask: any = { title: '', clientName: '', description: '', priority: 'Medium', dueDate: '', status: 'To Do' };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.tasks$.subscribe(data => this.tasks = data);
    this.dataService.clients$.subscribe(data => this.clients = data);
  }

  getTasksByStatus(status: string) {
    return this.tasks.filter(t => t.status === status);
  }

  openModal() { this.isModalOpen = true; }
  closeModal() { this.isModalOpen = false; }

  submitTask() {
    if (!this.newTask.title || !this.newTask.clientName) return;
    
    this.dataService.addTask({ ...this.newTask, id: Date.now().toString() });
    
    this.closeModal();
    this.newTask = { title: '', clientName: '', description: '', priority: 'Medium', dueDate: '', status: 'To Do' };
  }
  
  changeTaskStatus(id: string, event: any) {
    const newStatus = event.target.value;
    this.dataService.updateTaskStatus(id, newStatus);
  }
}