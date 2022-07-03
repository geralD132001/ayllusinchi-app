import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  autorizado: boolean;
  auth: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.autorizado = this.authService.isAuthenticated();
    this.auth = this.authService;
  }

  logout(): void {
    // let username = this.authService.usuario.username;
    Swal.fire('Logout', `Hola ${this.auth.usuario.username}, has cerrado sesión con éxito!`, 'success');
    this.authService.logout();
    //this.autorizado = false;
    //this.auth = [];
    location.reload();
    //this.router.navigate(['**']);
  }

}
