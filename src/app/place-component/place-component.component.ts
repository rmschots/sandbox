import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { place } from './fixed/place.validator';

@Component({
  selector: 'sb-place-component',
  templateUrl: './place-component.component.html',
  styleUrls: ['./place-component.component.scss']
})
export class PlaceComponentComponent {

  formVisible = false;
  formVisible2 = false;

  form: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      birthPlace: new FormControl(null, [Validators.required]),
      birthPlace2: new FormControl(null, [Validators.required, place()])
    });
  }

  printValidators() {
    console.log(this.form.controls['birthPlace'].validator(this.form.controls['birthPlace']));
  }

  printValidators2() {
    console.log(this.form.controls['birthPlace2'].validator(this.form.controls['birthPlace2']));
  }
}
