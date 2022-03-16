import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../shared/validators/validaciones';
import { EmailValidatorService } from '../../shared/validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {



  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatosService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatosService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatosService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, ]],
  },{
    validators: [ this.validatosService.camposIguales('password', 'password2')]
  })


  get emailErrorMsg(): string {
    const error = this.miFormulario.get('email')?.errors;
    if (error?.['required']) {
      return 'Email es obligatorio';
    }else if (error?.['pattern']) {
      return 'El valor ingresado no tiene formato de correo';
    }else if (error?.['emailTomado']) {
      return 'El email ya fue tomado';
    }
    return '';
  }

  constructor(private fb: FormBuilder,
              private validatosService: ValidatorService,
              private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Fernando Herrera',
      email: 'test1@test.com',
      username: 'fernando_her85'
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

  emailRequired() {
    return this.miFormulario.get('email')?.errors?.['required'] && this.miFormulario.get('email')?.touched;
  }

  emailFormato() {
    return this.miFormulario.get('email')?.errors?.['pattern'] && this.miFormulario.get('email')?.touched;
  }

  emailTomado() {
    return this.miFormulario.get('email')?.errors?.['emailTomado'] && this.miFormulario.get('email')?.touched;
  }

  submitFormulario() {
    this.miFormulario.markAllAsTouched();
  }

}
