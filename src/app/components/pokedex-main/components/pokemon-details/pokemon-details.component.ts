import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServerServiceService } from './../../../../services/server-service.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private serverService: ServerServiceService
  ) {}

  searchForm: FormGroup;
  pokemonData = null;
  pokemonMovesData = [];
  pokemonLocationData = [];
  // isFormSubmitted = false;

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchString: [''],
    });
  }

  searchPokemon() {
    this.searchForm.disable();
    console.log(this.searchForm.value);
    this.serverService
      .getPokemon(this.searchForm.value.searchString.toLowerCase())
      .subscribe(
        (value) => {
          console.log(value);
          setTimeout(() => {
            this.pokemonData = value;
            this.getPokemonMovesDetails();
            this.getPokemonLocationDetails();
            this.searchForm.enable();
          }, 1000);
        },
        (error) => {
          this.searchForm.enable();
        }
      );
  }

  getPokemonMovesDetails() {
    this.pokemonData.moves.forEach((pokemonMoves) => {
      this.serverService
        .getPokemonMoves(pokemonMoves.move.url)
        .subscribe((moves: any) => {
          moves.effect_entries.forEach((effect) => {
            if (effect.language.name === 'en') {
              this.pokemonMovesData.push([
                pokemonMoves.move.name,
                effect.effect,
              ]);
            }
          });
        });
    });
  }

  getPokemonLocationDetails() {
    this.serverService
      .getPokemonMoves(this.pokemonData.location_area_encounters)
      .subscribe((locations: any) => {
        locations.forEach((area) => {
          this.pokemonLocationData.push(area.location_area.name);
        });
      });
  }
}
