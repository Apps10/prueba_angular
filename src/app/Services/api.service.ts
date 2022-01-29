import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class APIService {
  private url:string = "https://swapi.dev/api/";

  constructor(private http:HttpClient ) { }

  GetFilms(){
    return this.http.get(`${this.url}films`).pipe(map((res:any)=>{
      return res.results.slice(0,7);
    }));
  }

  GetCharacters10Firsts(){
    return this.http.get(`${this.url}people`).pipe(map((res:any)=>{
      return res.results.slice(0,10);
    }));
  }

  ShowFilmName(film_id:any){
    return this.findFilmByID(film_id)['title'];
  }


  GetCharactersQuery(filtro:string,query:string,){
    let temp:any =[];
    return this.http.get(`${this.url}people`).pipe(map((res:any)=>{
      console.log(res);
      switch(filtro){
        case 'eye':
          temp = res.results.filter((e:any) => e['eye_color']==query);
          break;
        case 'gender':
          temp = res.results.filter((e:any) => e['gender']==query);
          break;
      }
      return temp;
    }));
  } 

  GetCharactersFilms(film_id:Number){
      return this.findFilmByID(film_id)['characters'];
  }

  private formatterArrayCharacter(Url_personaje:string){
    //tomamos los valores desde el 29 hasta uno menos del tamaño de la cadena para optener solo el id del personaje
    return Url_personaje.slice(29,Url_personaje.length-1);
  }

  formatterArrayFilms(Url_film:string){
    return Url_film.slice(28,Url_film.length-1);
  }

  GetCharacterFilmsID(Url_personaje:Array<string>){
    let id_personajes:Array<string> = [];
    //transformar de ruta a id del personaje 
    console.log(Url_personaje);
    Url_personaje.forEach(e => {    
      id_personajes.push(this.formatterArrayCharacter(e));
    });
    //maximo 10 elementos
    id_personajes = id_personajes.slice(0,10);
    return id_personajes
  }


  ShowCharacterFilm(id_personaje:String){
    let films:Array<String> = [];
    let film:any = [];
    return this.http.get(this.url+`people/${id_personaje}`).pipe(map((res:any)=>{
      //console.log('id_personaje: '+id_personaje);
      //console.log(res);
      res['films'].forEach((f:string) => {
        film.push(this.formatterArrayFilms(f));
      });
      films.push(film);
      var temp = {
        'name':res['name'],
        'eye_color':res['eye_color'],
        'gender':res['gender'],
        'films':res['films']
      };
      return res;
    }));
  }


  findFilmByID(film_id:Number){
    let et:any=[];
     JSON.parse(this.localstorage_get('films')).forEach((e:any) => {
      //console.log(e['episode_id']+" es igual a esto "+ film_id+" eso es: "+ (e['episode_id']==film_id));
      if(e['episode_id']==film_id){
        et=e;
      }
    });
    return et;
  }

  localstorage_save(key:string,json:JSON){
    localStorage.setItem(key,JSON.stringify(json));
  }

  localstorage_get(key:string){
    return localStorage.getItem(key) ||  "";
  }
}
