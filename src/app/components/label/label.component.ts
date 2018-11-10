import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  @Input()
  text: 'Pitch' | 'Technology' | 'Wtf' = 'Pitch';

  get textToDisplay() {
    switch (this.text) {
      case 'Pitch': return 'Pitch 🕺';
      case 'Technology': return 'Technology 🤖';
      case 'Wtf': return 'Wtf 🤪';
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
