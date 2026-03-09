import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Clients } from './components/clients/clients';
import { Meetings } from './components/meetings/meetings'; 
import { Tasks } from './components/tasks/tasks';

export const routes: Routes =[
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
  { path: 'dashboard', component: Dashboard },
  { path: 'clients', component: Clients },
  { path: 'meetings', component: Meetings },
  { path: 'tasks', component: Tasks }

];