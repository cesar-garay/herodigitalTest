import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export interface selectOption {
  id: string | number;
  description: string;
}

@Component({
  selector: 'select-field',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent implements OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() elementId: string = '';
  @Input() control: FormControl;
  @Input() isRequired = false;
  @Input() options?: Observable<selectOption[]>;

  isOpenOptions = false;
  constructor() {

  }

  ngOnInit() {
    this.label = this.label.toLowerCase();
    this.control.valueChanges.pipe(debounceTime(100)).subscribe(() => {
      this.isOpenOptions = false;
    });
  }

  ngOnDestroy() {

  }
  onSelect(): void {
    this.isOpenOptions = false;
  }
  onKeydown(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      this.isOpenOptions = true;
    }
  }
  onClick() {
    this.isOpenOptions = true;
  }

  onBlur() {
    this.isOpenOptions = false;
  }
}
