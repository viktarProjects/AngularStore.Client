import {Component, ElementRef, Input, OnInit, Self, ViewChild} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, NgControl} from "@angular/forms";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})

export class TextInputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() label!: string;
  @Input() value : any;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  get control(): FormControl {
    return this.controlDir.control as FormControl
  }
}
