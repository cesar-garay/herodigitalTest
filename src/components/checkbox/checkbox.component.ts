import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'checkbox-field',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})

export class CheckboxComponent implements OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() elementId: string = '';
  @Input() control: FormControl;
  @Input() isRequired = false;
  @Input() fieldType: string = 'text';

  constructor() {

  }

  ngOnInit() {
    this.label = this.label.toLowerCase();
  }

  ngOnDestroy() {

  }
}
