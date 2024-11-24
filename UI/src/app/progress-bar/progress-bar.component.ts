import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  
  currentStep: number = 3;

  constructor() { }

  ngOnInit(): void {
    this.nextStep();
    this.previousStep();
  }


  // Simulate stage progression
  nextStep() {
    if (this.currentStep <= 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

}
