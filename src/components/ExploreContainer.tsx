import React, { useEffect, useState } from 'react';
import './ExploreContainer.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import getAllPokemons from '../utils/getAllPokemons';
import { Pokemon } from '../interfaces/Pokemon';

const ExploreContainer: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1); // Inicializa la página en 1

  const fetchData = async () => {
    try {
      const data = await getAllPokemons(page);
      setPokemons((prevPokemons) => {
        // Filtra los Pokémon ya existentes para evitar duplicados
        const filteredPokemons = data.filter(
          (newPokemon) => !prevPokemons.some((existingPokemon) => existingPokemon.name === newPokemon.name)
        );
        // Combina los Pokémon existentes con los nuevos filtrados
        return [...prevPokemons, ...filteredPokemons];
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    fetchData();
  }, [page]); // Agregué 'page' como dependencia para que la función se vuelva a ejecutar cuando cambie la página

  const loadMore =async (event: CustomEvent<void>) => {
    setPage((prevPage) => prevPage + 1);

    // Asegúrate de que la carga asíncrona se complete antes de completar el evento
    await fetchData();

    // Completa el evento de IonInfiniteScroll
    (event.target as HTMLIonInfiniteScrollElement).complete();
  };

  return (
    <IonGrid>
      <IonRow>
        {pokemons.map((pokemon) => (
          <IonCol key={pokemon.name} size="6" size-md="4" size-lg="2.4">
            <IonCard>
              <img alt="Silhouette of mountains" src={pokemon.imageUrl} style={{ maxWidth: '100%' }} />
              <IonCardHeader>
                <IonCardTitle>{pokemon.name}</IonCardTitle>
                <IonCardSubtitle>{`Height: ${pokemon.height}, Weight: ${pokemon.weight}, Experience: ${pokemon.experience}`}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                Abilities:
                {pokemon.abilities.map((ability, id) => (
                  <span key={id}> {ability.name} </span>
                ))}
              </IonCardContent>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
      <IonInfiniteScroll onIonInfinite={(e: CustomEvent<void>) => loadMore(e)}>
  <IonInfiniteScrollContent loadingText="Cargando más..." />
</IonInfiniteScroll>
    </IonGrid>
  );
};

export default ExploreContainer;