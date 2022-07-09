import { Component, OnInit } from '@angular/core';
import { TallerService } from '../../providers/services/taller.service';
import { ActivatedRoute } from '@angular/router';
import { TallerGetByIdService } from '../../providers/services/taller-getById.service';

@Component({
  selector: 'app-user-taller',
  templateUrl: './user-taller.component.html',
  styles: [],
})
export class UserTallerComponent implements OnInit {

  idTaller: any = this.activatedRoute.snapshot.paramMap.get('id_taller');
  talleres: any[] = [];
  taller: any;

  constructor(
    private tallerServiceById: TallerGetByIdService,
    private tallerService: TallerService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTaller();
    this.getTalleres();
  }

  getTaller(): void {
    this.tallerServiceById.getById$(this.idTaller).subscribe(response => {
      console.log(response);
      this.taller = response.data || [];
    });
  }

  getTalleres(): void {
    this.tallerService.getAll$().subscribe((response) => {
      console.log(response);
      this.talleres = response.data || [];
    });
  }
}
