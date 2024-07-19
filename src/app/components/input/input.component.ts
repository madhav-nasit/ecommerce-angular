import { Component, ElementRef, Input, Optional, Self, ViewChild } from '@angular/core';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

interface InputProps {
  id: string;
  control: FormControl<any>;
  type?: string;
  label: string;
  error?: string;
  class?: string;
}

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements InputProps {
  @Input() id!: string;
  @Input() type: string = 'text';
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() error?: string;
  @Input() class?: string;
  @ViewChild('input') myInput!: ElementRef<any>;

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any): void {}

  focusOnInput() {
    this.myInput.nativeElement.focus();
  }
}
