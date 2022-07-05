import { Component, OnInit } from '@angular/core';
import { TallerService } from '../../providers/services/taller.service';


@Component({
  selector: 'app-user-taller',
  templateUrl: './user-taller.component.html',
  styles: [
  ]
})
export class UserTallerComponent implements OnInit {

  talleres: any[] = [];

  constructor(private tallerService: TallerService) { }

  ngOnInit(): void {
    this.getTalleres();
  }

  getTalleres(): void {
    this.tallerService.getAll$().subscribe((response) => {
      console.log(response);
      this.talleres = response.data || [];
    });
  }


  

}
