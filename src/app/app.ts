import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateMeeting } from './components/create-meeting/create-meeting';
import { CreateClient } from './components/create-client/create-client';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateMeeting, CreateClient],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ArchStudio');
}
