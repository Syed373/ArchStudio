import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Client } from '../../services/data';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clients.html',
  styleUrls: ['./clients.css']
})
export class Clients implements OnInit {
  clients: Client[] = [];
  isModalOpen = false;

  searchTerm: string = '';

  get filteredClients() {
    if (!this.searchTerm) {
      return this.clients;
    }

    const lowerCaseTerm = this.searchTerm.toLowerCase();

    return this.clients.filter(client =>
      client.name.toLowerCase().includes(lowerCaseTerm) ||
      client.company.toLowerCase().includes(lowerCaseTerm) ||
      client.email.toLowerCase().includes(lowerCaseTerm)
    );
  }

  newClient: any = { name: '', email: '', phone: '', company: '', projectType: '', status: 'active' };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.clients$.subscribe(data => this.clients = data);
  }

  openModal() { this.isModalOpen = true; }
  closeModal() { this.isModalOpen = false; }

  submitClient() {
    if (!this.newClient.name || !this.newClient.email) return;
    this.dataService.addClient({ ...this.newClient, id: Date.now().toString() });
    this.closeModal();
    this.newClient = { name: '', email: '', phone: '', company: '', projectType: '', status: 'active' };
  }

  removeClient(id: string) {
    const confirmDelete = confirm('Are you sure you want to remove this client?');
    if (confirmDelete) {
      this.dataService.removeClient(id);
    }
  }
}