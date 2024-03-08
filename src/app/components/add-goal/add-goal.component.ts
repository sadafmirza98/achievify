import { Component, OnInit } from '@angular/core';
import { goal } from '../../models/goal.model';
import { goalService } from '../../services/goal.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css'],
})
export class AddGoalComponent implements OnInit {
  goal: goal = {
    title: '',
    description: '',
    status: false,
  };
  submitted = false;
  loader = true;
  ngOnInit() {
    this.loader = false;
  }
  constructor(private goalService: goalService) {}

  saveGoal(): void {
    const data = {
      title: this.goal.title,
      description: this.goal.description,
    };
    this.loader = true;
    this.goalService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
        this.loader = false;
      },
      error: (e) => console.error(e),
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.loader = false;
    this.goal = {
      title: '',
      description: '',
      status: false,
    };
  }
}
