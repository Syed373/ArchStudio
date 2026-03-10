import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Client { id: string; name: string; initials: string; email: string; phone: string; company: string; projectType: string; status: string; }
export interface Meeting { id: string; title: string; clientName: string; date: string; time: string; location: string; notes: string; status: string; }
export interface Task { id: string; title: string; clientName: string; description: string; priority: string; dueDate: string; status: string; }

@Injectable({ providedIn: 'root' })
export class DataService {
  private clients = new BehaviorSubject<Client[]>([
    { id: '1', name: 'Sarah Mitchell', initials: 'SM', email: 'sarah@mitchell.com', phone: '+1 555-0101', company: 'Mitchell Estates', projectType: 'Residential', status: 'active' },
    { id: '2', name: 'James Rodriguez', initials: 'JR', email: 'james@rodcorp.com', phone: '+1 555-0102', company: 'Rodriguez Corp', projectType: 'Commercial', status: 'active' },
    { id: '3', name: 'Emily Chen', initials: 'EC', email: 'emily@chendesign.com', phone: '+1 555-0103', company: 'Chen Design Studio', projectType: 'Interior', status: 'prospect' },
    { id: '4', name: 'David Park', initials: 'DP', email: 'david@parkdev.com', phone: '+1 555-0104', company: 'Park Developments', projectType: 'Residential', status: 'active' },
    { id: '5', name: 'Lisa Johnson', initials: 'LJ', email: 'lisa@johnsonconsulting.com', phone: '+1 555-0105', company: 'Johnson Consulting', projectType: 'Landscape', status: 'inactive' }
  ]);
  
  private meetings = new BehaviorSubject<Meeting[]>([
    { id: '1', title: 'Initial Site Visit', clientName: 'Sarah Mitchell', date: '2026-03-12', time: '10:00', location: '123 Oak Street', notes: 'Bring site survey documents', status: 'scheduled' },
    { id: '2', title: 'Design Review', clientName: 'James Rodriguez', date: '2026-03-15', time: '14:00', location: '456 Pine Avenue', notes: 'Review preliminary design concepts', status: 'scheduled' },
    { id: '3', title: 'Budget Discussion', clientName: 'Emily Chen', date: '2026-03-20', time: '11:00', location: '789 Maple Drive', notes: 'Discuss project budget and constraints', status: 'scheduled' },
    { id: '4', title: 'Project Kickoff', clientName: 'David Park', date: '2026-03-25', time: '09:00', location: '321 Cedar Lane', notes: 'Kickoff meeting to discuss project scope and timeline', status: 'scheduled' },
    { id: '5', title: 'Final Presentation', clientName: 'Lisa Johnson', date: '2026-03-30', time: '16:00', location: '654 Spruce Road', notes: 'Present final design proposal for approval', status: 'scheduled' }
  ]);

  private tasks = new BehaviorSubject<Task[]>([
    { id: '1', title: 'Structural Analysis', clientName: 'James Rodriguez', description: 'Complete structural analysis', priority: 'high', dueDate: '2026-03-18', status: 'To Do' },
    { id: '2', title: 'Material Selection', clientName: 'Emily Chen', description: 'Select materials for interior design', priority: 'medium', dueDate: '2026-03-22', status: 'In Progress' },
    { id: '3', title: 'Landscape Design', clientName: 'Lisa Johnson', description: 'Create landscape design concepts', priority: 'low', dueDate: '2026-03-28', status: 'To Do' },
    { id: '4', title: 'Client Presentation', clientName: 'Sarah Mitchell', description: 'Prepare presentation for client meeting', priority: 'high', dueDate: '2026-03-10', status: 'In Progress' },
    { id: '5', title: 'Code Compliance Review', clientName: 'David Park', description: 'Review design for code compliance', priority: 'medium', dueDate: '2026-03-24', status: 'To Do' },
    { id: '6', title: '3D Modeling', clientName: 'James Rodriguez', description: 'Create 3D models for design review', priority: 'high', dueDate: '2026-03-17', status: 'Done' },
  ]);

  clients$ = this.clients.asObservable();
  meetings$ = this.meetings.asObservable();
  tasks$ = this.tasks.asObservable();

  addClient(client: Client) {
    client.initials = client.name.split(' ').map(n => n[0]).join('').toUpperCase();
    this.clients.next([...this.clients.value, client]);
  }

  removeClient(id: string) {
    const updatedClients = this.clients.value.filter(client => client.id !== id);
    this.clients.next(updatedClients);
  }

  addMeeting(meeting: Meeting) {
    this.meetings.next([...this.meetings.value, meeting]);
  }

  updateMeetingStatus(id: string, newStatus: string) {
    const updatedMeetings = this.meetings.value.map(meeting => 
      meeting.id === id ? { ...meeting, status: newStatus } : meeting
    );
    this.meetings.next(updatedMeetings);
  }

  addTask(task: Task) {
    this.tasks.next([...this.tasks.value, task]);
  }

  updateTaskStatus(id: string, newStatus: string) {
    const updatedTasks = this.tasks.value.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    );
    this.tasks.next(updatedTasks);
  }
}