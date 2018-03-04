import { FormControl, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import {Observable} from "rxjs/Observable";

export function positiveNumberValidator(): ValidatorFn  {
  return (control: AbstractControl): {[key: string]: any} => {
    if (!control.value) {
      return null;
    }
    const price = parseInt(control.value, 10);

    if (price > 0) {
      return null;
    } else {
      return {postiveNumber: true};
    }
  };
}
