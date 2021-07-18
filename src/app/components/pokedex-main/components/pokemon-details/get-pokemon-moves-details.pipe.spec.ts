import { GetPokemonMovesDetailsPipe } from './get-pokemon-moves-details.pipe';

describe('GetPokemonMovesDetailsPipe', () => {
  it('create an instance', () => {
    const pipe = new GetPokemonMovesDetailsPipe();
    expect(pipe).toBeTruthy();
  });
});
