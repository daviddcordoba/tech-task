import axios from 'axios';
import { Pokemon } from '../interfaces/Pokemon';

export default async (page: number): Promise<Pokemon[]> => {
  try {
    const { data } = await axios(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${(page - 1) * 50}`);
    console.log('page',page)
    console.log('cuenta',(page-1) * 50)

    const pokemonPromises = data.results.map(async (obj: any) => {
      const { data } = await axios(obj.url);
      return {
        id: data.id,
        name: data.name,
        imageUrl: data.sprites.other['official-artwork'].front_default,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((ability: any) => ({ name: ability.ability.name })),
        experience: data.base_experience,
      };
    });

    const pokemonData = await Promise.all(pokemonPromises);
    return pokemonData;
  } catch (error) {
    console.log(error);
    return []; // Devuelve un array vacío en caso de error
  }
};