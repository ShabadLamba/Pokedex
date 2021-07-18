import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Pokemon {
  heroesUrl: string;
  textfile: string;
  date: any;
}

@Injectable({
  providedIn: 'root',
})
export class ServerServiceService {
  constructor(private http: HttpClient) {}

  pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

  getPokemon(pokemonName) {
    return this.http.get(this.pokemonUrl + pokemonName);
  }

  getPokemonMoves(url) {
    return this.http.get(url);
  }

  getPokemonLocations(url) {
    return this.http.get(url);
  }
}
