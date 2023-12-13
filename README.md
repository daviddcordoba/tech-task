# Explorador de Pokémon con Ionic y React

Esta tarea implementa un explorador de Pokémon utilizando Ionic y React. La aplicación carga datos de la PokeAPI para mostrar información detallada sobre diferentes Pokémon. A continuación, se proporciona una descripción de los principales componentes y funcionalidades del código.

## Componente ExploreContainer

El componente principal de la aplicación se llama `ExploreContainer`. Aquí se encuentran los elementos visuales y la lógica para mostrar una cuadrícula de tarjetas de Pokémon, con capacidad de carga infinita y funcionalidad de actualización.

### Estado y efectos

- `pokemons`: Un estado que almacena la lista actual de Pokémon.
- `page`: Un estado que representa la página actual de datos que se cargará desde la API.
- `cardColor`: Un estado que guarda un color aleatorio para aplicar a las tarjetas de Pokémon.

### Métodos

- `fetchData`: Una función asincrónica que obtiene datos de la PokeAPI y actualiza el estado de Pokémon evitando duplicados.
- `loadMore`: Una función que maneja la carga infinita de más Pokémon al desplazarse hacia abajo.
- `refreshData`: Una función que maneja la actualización de los colores de las cartas al tirar hacia abajo para refrescar.

### Renderizado

- Se utiliza un componente de cuadrícula de Ionic (`IonGrid`) para organizar las tarjetas de Pokémon.
- Se utiliza un componente de actualización (`IonRefresher`) para permitir a los usuarios recargar la lista de Pokémon.
- El componente de tarjeta (`IonCard`) muestra la imagen, nombre, altura, peso, experiencia y habilidades de cada Pokémon.
- El componente `IonInfiniteScroll` se emplea para habilitar la carga infinita de más Pokémon a medida que el usuario se desplaza hacia abajo en la lista.
- Se incorpora el componente `IonRefresher` para permitir a los usuarios actualizar los colores de la carta de Pokémon tirando hacia abajo.

## Utilidades

### `getAllPokemons`

Este archivo contiene una función asíncrona que utiliza Axios para hacer una solicitud a la PokeAPI y devuelve un array de objetos `Pokemon`. Cada objeto contiene información detallada sobre un Pokémon, incluyendo nombre, imagen, altura, peso, habilidades y experiencia.

## Uso

1. Clona este repositorio.
2. Si no tienes Ionic instalado globalmente, puedes instalarlo con `npm install -g @ionic/cli`.
3. Ejecuta `npm install` para instalar las dependencias.
4. Ejecuta `ionic serve` para iniciar la aplicación en modo desarrollo.

Gracias por ver.
