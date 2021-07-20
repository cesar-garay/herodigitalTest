import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectOption } from 'src/components/select/select.component';

export interface BeResponse {
  status: string;
  message: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  private residentOptions: selectOption[] = [
    { id: 'yes', description: 'Yes' },
    { id: 'no', description: 'No' },
  ];

  $residentOptions = of(this.residentOptions);

  loading = false;
  successMessage = '';
  errorMessage = '';
  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.form = new FormGroup({
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'org': new FormControl(''),
      'euResident': new FormControl('', [Validators.required]),
      'advances': new FormControl(true, [Validators.required]),
      'alerts': new FormControl(''),
      'other': new FormControl(''),
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';
      this.formSave().subscribe((response) => {
        if (response.status === 'success') {
          // Added just for functional propose to see the loading and disable
          setTimeout(() => {
            this.loading = false;
            this.successMessage = response.message
          }, 2000);
        } else {
          this.loading = false;
        }

      }, (beError) => {
        this.loading = false;
        this.errorMessage = beError.error.message;
      });

    } else {
      this.form.markAllAsTouched();
      this.form.markAsDirty();
      this.form.updateValueAndValidity();
    }
  }

  resetForm() {
    this.form.reset();
    this.form.get('euResident')?.setValue('yes');
  }
  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  private formSave(): Observable<BeResponse> {
    const body = new URLSearchParams();
    const formValues = this.form.getRawValue();
    Object.keys(formValues).forEach((key: string) => {
      body.set(key, formValues[key])
    });
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post('http://localhost:3000/emailUpdate', body, options).pipe(map(result => result as BeResponse));
  }
}
