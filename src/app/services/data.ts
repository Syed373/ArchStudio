import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Client { id: string; name: string; initials: string; email: string; phone: string; company: string; projectType: string; status: string; }
export interface Meeting { id: string; title: string; clientName: string; date: string; time: string; location: string; notes: string; status: string; }
export interface Task { id: string; title: string; clientName: string; description: string; priority: string; dueDate: string; status: string; }

@Injectable({ providedIn: 'root' })
export class DataService {
  private clients = new BehaviorSubject<Client[]>([
    { id: '1', name: 'Sarah Mitchell', initials: 'SM', email: 'sarah@mitchell.com', phone: '+1 555-0101', company: 'Mitchell Estates', projectType: 'Residential', status: 'active' },
    { id: '2', name: 'James Rodriguez', initials: 'JR', email: 'james@rodcorp.com', phone: '+1 555-0102', company: 'Rodriguez Corp', projectType: 'Commercial', status: 'active' }
  ]);
  
  private meetings = new BehaviorSubject<Meeting[]>([
    { id: '1', title: 'Initial Site Visit', clientName: 'Sarah Mitchell', date: '2026-03-12', time: '10:00', location: '123 Oak Street', notes: 'Bring site survey documents', status: 'scheduled' }
  ]);

  private tasks = new BehaviorSubject<Task[]>([
    { id: '1', title: 'Structural Analysis', clientName: 'James Rodriguez', description: 'Complete structural analysis', priority: 'high', dueDate: '2026-03-18', status: 'To Do' }
  ]);

  clients$ = this.clients.asObservable();
  meetings$ = this.meetings.asObservable();
  tasks$ = this.tasks.asObservable();

  addClient(client: Client) {
    client.initials = client.name.split(' ').map(n => n[0]).join('').toUpperCase();
    this.clients.next([...this.clients.value, client]);
  }

  addMeeting(meeting: Meeting) {
    this.meetings.next([...this.meetings.value, meeting]);
  }

  addTask(task: Task) {
    this.tasks.next([...this.tasks.value, task]);
  }
}