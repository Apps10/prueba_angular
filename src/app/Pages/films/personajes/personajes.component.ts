import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/Services/api.service';
@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {
  public titulo = "";
  public info_personajes:any = [];
  public info_character_fiml:boolean = false;
  public eye_color = ['blue','yellow','red'];
  public gender = ['male','female'];
  public filtro = "eye";
  public query = "";
  public querys:Array<string> = [""];

  constructor(
    private api:APIService,
    private url:ActivatedRoute,
    private router:Router
  ) {
    
   }

  ngOnInit(): void {
    this.api.GetFilms().subscribe((res:any)=>{
      if(this.api.localstorage_get('film')==""){ //carga los films en el localstorage
        this.api.localstorage_save('films',res);
      }
    });
    this.querys=this.eye_color; //predefinimos la query como el color de ojos
    this.url.params.subscribe((p:any)=>{
      if(p['id_film']!=null){
          this.titulo="Personales del film"   //cambia el titulo si entra en una pelicula
          this.info_character_fiml = true;    
          this.getcharacterfilm(this.api.GetCharacterFilmsID(this.api.GetCharactersFilms(p['id_film'])));
          console.log(this.info_personajes);
  
      }else{
        this.titulo = "Personajes destacados"
        this.info_character_fiml = false;
        this.GetCharacters10Firsts();
      }
    });
  }

  getcharacterfilm(id_personajes:any){
    let count:number = 0;
    id_personajes.forEach((p:String)=>{
      this.api.ShowCharacterFilm(p).subscribe((res:any)=>{
        if(res!=null){
          this.info_personajes.push(res);
        }
      });
    });
  }

  GetCharacters10Firsts(){ //obtiene los 10 primeros actores
    this.api.GetCharacters10Firsts().subscribe((res:any)=>{
      this.info_personajes=res;
    });
  }

  ShowFilmName(film_url:any){ //obtiene el nombre del film por su id
    return (this.api.ShowFilmName(this.api.formatterArrayFilms(film_url)));
  }

  

  GetFilmsLocalStorage(){ //obtiene los films del localstorage
    if(this.api.localstorage_get('films')==""){
      this.api.GetFilms().subscribe((res:any)=>{
        this.api.localstorage_save('films',res);
      });
    }      
    return JSON.parse(this.api.localstorage_get('films'))
  }

  SetValuesFilter(evento:any){
      switch(evento.value){
        case 'eye':{
          this.querys=this.eye_color;
          break;
        }
        case 'gender':{
          this.querys=this.gender;
          break;
        }
        case 'film':{
          this.querys = [];
          JSON.parse(this.api.localstorage_get('films')).forEach((f:any) => {
            this.querys.push(f['title']);
          });
          break;
        }
      }
  }

  GetCharactersFilmsLocalStorage(){
    if(this.api.localstorage_get('characters')==""){
      this.api.GetCharacters10Firsts().subscribe((res:any)=>{
        this.api.localstorage_save('characters',res);
      });
    }      
    return JSON.parse(this.api.localstorage_get('films'))
  }

  GetQuery(){
    let pelicula = []
    if(this.query!=""){
      if(this.filtro=='film'){
        pelicula = JSON.parse(this.api.localstorage_get('films')).filter((e:any)=>e['title']==this.query);
        this.info_personajes = [];
        this.router.navigate(['Characters',pelicula[0]['episode_id']]);
      }else{
        this.api.GetCharactersQuery(this.filtro,this.query).subscribe((res:any)=>{
          this.info_personajes=res;
        });
      }
    }else{
      alert('Seleccione Un Elemento En EL Campo de Filtrado');
    }
  }
}
