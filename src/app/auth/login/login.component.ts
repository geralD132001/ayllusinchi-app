import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  usuario: any;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicio();
    if(this.authService.isAuthenticated()) {
      Swal.fire("Login", `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/auth/login'])
    }
  }

  private inicio(): any {
    const controls = {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    };
    this.formGroup = this.formBuilder.group(controls);
  }


  login(): void {
    this.usuario = this.formGroup.value;
    if(this.usuario.username === '' || this.usuario.password === ''){
      Swal.fire("Error", "Usuario o contraseña vacías!", "error");
      return;
    }
    this.authService.login(this.usuario).subscribe( response => {
      console.log(response);
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/user-dashboard']);
      Swal.fire("Login", `Hola ${usuario.username}, has iniciado sesión con exito!`, 'success');
    }, error => {
      if(error.status === 400){
        Swal.fire("Error en el login", `Usuario o clave incorrectas`, 'error');
      }
    })
  }

}
