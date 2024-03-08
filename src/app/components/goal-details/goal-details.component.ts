import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { goal } from '../../models/goal.model';
import { goalService } from '../../services/goal.service';

@Component({
  selector: 'app-goal-details',
  templateUrl: './goal-details.component.html',
  styleUrls: ['./goal-details.component.css'],
})
export class GoalDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentGoal: goal = {
    id: '',
    title: '',
    description: '',
    status: false,
  };

  message = '';
  loader = true;

  constructor(
    private goalService: goalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loader = false;
    if (!this.viewMode) {
      this.message = '';
      this.getGoal(this.route.snapshot.params['id']);
    }
  }

  getGoal(id: string): void {
    this.loader = true;
    this.goalService.get(id).subscribe({
      next: (data) => {
        this.currentGoal.id = id;
        this.currentGoal.title = data.title;
        this.currentGoal.description = data.description;
        this.loader = false;
      },
      error: (e) => console.error(e),
    });
  }

  updateStatus(status: boolean): void {
    const data = {
      title: this.currentGoal.title,
      description: this.currentGoal.description,
      status: status,
    };

    this.message = '';

    this.goalService.update(this.currentGoal.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentGoal.status = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  updateGoal(): void {
    this.message = '';
    this.loader = true;
    this.goalService.update(this.currentGoal.id, this.currentGoal).subscribe({
      next: (res) => {
        console.log(res);
        this.loader = false;
        this.message = res.message
          ? res.message
          : 'This goal was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  deleteGoal(): void {
    this.loader = true;
    this.goalService.delete(this.currentGoal.id).subscribe({
      next: (res) => {
        console.log(res);
        this.loader = false;
        this.router.navigate(['/goals']);
      },
      error: (e) => console.error(e),
    });
  }
}
