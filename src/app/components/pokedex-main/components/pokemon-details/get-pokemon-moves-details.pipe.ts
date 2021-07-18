import { Pipe, PipeTransform } from '@angular/core';
import { ServerServiceService } from './../../../../services/server-service.service';

@Pipe({
  name: 'getPokemonMovesDetails',
})
export class GetPokemonMovesDetailsPipe implements PipeTransform {
  constructor(private serverService: ServerServiceService) {}

  transform(value: string) {
    let moveDetails = '';
    this.serverService.getPokemonMoves(value).subscribe((pokemonMoves: any) => {
      debugger;
      pokemonMoves.effect_entries.forEach((effect) => {
        if (effect.language.name === 'en') {
          moveDetails = effect.effect;
          console.log(moveDetails);
          return moveDetails;
        }
      });
    });
  }
}
