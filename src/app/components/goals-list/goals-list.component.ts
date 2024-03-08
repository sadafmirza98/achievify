import { Component, OnInit } from '@angular/core';
import { goal } from '../../models/goal.model'; // Correct the import statement
import { goalService } from '../../services/goal.service'; // Correct the import statement
import { Router } from '@angular/router';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.css'],
})
export class GoalsListComponent implements OnInit {
  goals: goal[] = [];
  currentGoal: goal = {}; // Initialize as an empty object
  currentIndex = -1;
  title = '';
  additionalSasukeText =
    'Seems like there are no missions to show. Time to forge your own path, just like I did with the Akatsuki. Embrace the solitude and unleash your true potential';
  constructor(private goalService: goalService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveGoals(); // Correct the method name
  }

  retrieveGoals(): void {
    this.goalService.getAll().subscribe({
      next: (data: any) => {
        // Correct the type of data
        this.goals = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log(this.goals);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveGoals(); // Correct the method name
    this.currentGoal = {};
    this.currentIndex = -1;
  }

  setActiveGoal(goal: goal, index: number): void {
    this.currentGoal = goal;
    this.currentIndex = index;
  }

  removeAllGoals(): void {
    this.goalService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }

  searchTitle(): void {
    this.currentGoal = {};
    this.currentIndex = -1;

    this.goalService.findByTitle(this.title).subscribe({
      next: (data: goal[]) => {
        // Correct the type of data
        this.goals = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  redirectToAddPage() {
    this.router.navigateByUrl('/add');
  }
}
