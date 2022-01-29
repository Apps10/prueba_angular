import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public films:any = [];
  constructor(private api:APIService) { }

  ngOnInit(): void {
    this.api.GetFilms().subscribe((res:any)=>{
      this.films=res;
      this.api.localstorage_save('films',this.films);
    });
  }
}
