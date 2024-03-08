import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalsListComponent } from './components/goals-list/goals-list.component';
import { GoalDetailsComponent } from './components/goal-details/goal-details.component';
import { AddGoalComponent } from './components/add-goal/add-goal.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'goals', component: GoalsListComponent },
  { path: 'goals/:id', component: GoalDetailsComponent },
  { path: 'add', component: AddGoalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
