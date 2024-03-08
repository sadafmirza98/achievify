import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  texts = [
    'Forge your path.',
    'Embark on your journey.',
    'Believe in yourself!',
  ];
  currentTextIndex = 0;
  currentIndex = 0;
  index = 0;
  speed = 200; // Adjust speed as needed
  textToShow = '';
  additionalText =
    'Welcome to your ultimate tool for mastering your goals just like a true ninja dattebayo.';
  ngOnInit(): void {
    this.typeWriter();
  }

  typeWriter() {
    if (this.currentTextIndex < this.texts.length) {
      const currentText = this.texts[this.currentTextIndex];
      if (this.currentIndex < currentText.length) {
        this.textToShow += currentText.charAt(this.currentIndex);
        this.currentIndex++;
        setTimeout(() => this.typeWriter(), this.speed);
      } else {
        // Displayed the entire text, move to the next text or loop back to the beginning
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        this.currentIndex = 0;
        this.textToShow = '';
        setTimeout(() => this.typeWriter(), this.speed);
      }
    }
  }
}
