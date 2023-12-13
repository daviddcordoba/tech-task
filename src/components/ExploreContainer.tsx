import React, { useEffect, useState } from 'react';
import './ExploreContainer.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonGrid, IonRow, IonCol, IonInfiniteScroll, IonInfiniteScrollContent,IonRefresher,
  IonRefresherContent } from '@ionic/react';
import getAllPokemons from '../utils/getAllPokemons';
import { Pokemon } from '../interfaces/Pokemon';
import getRandomColor from '../utils/getRandomColor';


const ExploreContainer: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1); // Inicializa la página en 1
  const [cardColor, setCardColor] = useState<string>('');
  
  const fetchData = async () => {
    try {
      const data = await getAllPokemons(page);
      setPokemons((prevPokemons) => {
        // Evito duplicados
        const filteredPokemons = data.filter(
          (newPokemon) => !prevPokemons.some((existingPokemon) => existingPokemon.name === newPokemon.name)
        );

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
    await fetchData();

    setPage((prevPage) => prevPage + 1);
    
    (event.target as HTMLIonInfiniteScrollElement).complete();
  };

  const refreshData = async (event: CustomEvent) => {
   
    setTimeout(() => {
      setCardColor(getRandomColor())

      event.detail.complete();
    }, 1000);
  };

  return (
    <IonGrid>
      <IonRefresher slot="fixed" onIonRefresh={(e) => refreshData(e)}>
      <IonRefresherContent refreshingText="Cargando..."></IonRefresherContent>
      </IonRefresher>
      <IonRow>
        {pokemons.map((pokemon) => (
          <IonCol key={pokemon.name} size="6" size-md="4" size-lg="2.4">
            <IonCard style={{ backgroundColor: cardColor }}>
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