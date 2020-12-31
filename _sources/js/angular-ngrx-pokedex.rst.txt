Angular - NgrxPokedex
#####################

:code: https://github.com/Caballerog/ngrx-pokedex.git

Part1
*****

:source: https://medium.com/better-programming/build-your-pok%C3%A9dex-part-1-introduction-to-ngrx-a89c3be0ea10

* shared. Here we will place all elements that are shared among every module, such as pipes, directives, services, models, and the state.
* state. The state is divided in turn into substates that allow us to manage the data structures where the state of the application will be stored. In our application we will only have a state called Pokémon where the information related to Pokémon is stored.
* views. Here you will find the views/pages of the application. The application is structured in modules:
* CoreModule. The services that are essential for the application, which need to be instantiated initially.
* SharedModule. The modules that are shared among all the feature modules.
* FeatureModules. Modules that are organized by features in the application. In our concrete application we will only have one feature module (PokemonModule).

dans le tsconfig.json

.. code-block:: json
    :name: tsconfig.json
    :caption: tsconfig.json

    compilerOptions.baseUrl: "src"
    compilerOptions."resolveJsonModule": true,
    compilerOptions."path": {
        "@shared/*": ["app/shared/*"],
        "@services/*": ["app/shared/services/*"],
        "@states/*": ["app/shared/states/*"],
        "@views/*": ["app/views/*"],
        "@models/*": ["app/shared/interfaces/*"],
        "@environments/*": ["environments/*"]
    }

.. code-block:: json
    :name: environment.ts
    :caption: environment.ts

    // environment.ts
    export const environment = {
        production: false,
        backendUrl: '/api/pokemons/'
    }

@ngrx/store

* Actions describe unique events that are dispatched from components and services.
* State changes are handled by pure functions called reducers that take the current state and the latest action to compute a new state.
* Selectors are pure functions used to select, derive, and compose pieces of state.
* State accessed with the store, an observable of state and an observer of actions.

@ngrx/effects

* Effects isolates side effects from components, allowing for purer components that select state and dispatch actions.
* Effects runs long-running services that listen to an observable of every action dispatched from the Store.
* Effects filters those actions based on the type of action they are interested in. This is done by using an operator.
* Effects performs tasks, which are synchronous or asynchronous, and return a new action.

@ngrx/store-devtools

1. Install the package: npm install @ngrx/store-devtools.
2. Install the Chrome/Firefox extension.
3. In your AppModule, add instrumentation to the module imports using StoreDevtoolsModule.instrument:

* SharedModule. This module imports and exports the modules that are shared in the feature modules. Note that a set of modules belonging to @angular/material has been imported, which could have been imported and exported in a specific module named shared.material.module. However, it has been exported directly from the SharedModule module to simplify the problem. It is necessary to import the StoreModule module since it is the responsible to load the store in the application. Finally, modules related to the forms are imported in order to build the user interfaces.
* CoreModule. In this module, the reducers and effects are initialized using the StoreModule andEffectsModule modules.

install material:
npm install @angular/material 
npm install @angular/flex-layout 
npm install @angular/cdk

NgRX is composed of the following concepts:

* State. The state that we want to model is defined here. The ideal is to design sub-states that make up the full state.
* Actions. List of actions that can be performed on the store or that have an effect.
* Reducers. Methods that transform the State (creating a new state since immutability is used).
* Selectors. Methods that let you create an observable on a substate of the store. The selectors are very useful because they allow us to create observables only on the fragment that interests us in each component, without needing to observe the whole store.
* Effects.Those methods that do not modify the store are incorporated here. In our case, we will use it to create notifications for whether the operations were carried out satisfactorily or incorrectly. In addition, the effects are used to trigger the actions in case the service’s operations have been satisfactorily or incorrectly performed.

always 3 actions for each request, the request, the request success, the request failed

only if there is success update the state

NgRX provides two functions to create selectors:
* CreateFeatureSelector. This function allows us to create a selector for a substate.
* CreateSelector. This function allows us to create selectors using two parameters: 1. A selector; 2. A function that defines what value we want to select.

* SmartComponents. Components that will perform tasks with the store through the dispatch method or using the selectors.
* DummyComponents. Components that only have to show data and manage events towards the SmartComponent.

never forgot :

.. code-block:: ts

    @Component({
        changeDetection: ChangeDetectionStrategy.OnPush
    })

A form component

.. code-block:: js

    import {
        ChangeDetectionStrategy,Component,
        EventEmitter,
        Input, Output,
        OnChanges, OnInit,
    } from '@angular/core';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    import { Pokemon } from '@shared/interfaces/pokemon.interface';

    @Component({
        selector: 'app-pokemon-form',
        templateUrl: './pokemon-form.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class PokemonFormComponent implements OnInit, OnChanges {
        pokemonForm: FormGroup;
        @Input() pokemon: Pokemon = {} as Pokemon;
        @Output() add: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
        @Output() update: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

        constructor(private formBuilder: FormBuilder) {}

        ngOnInit() {
            this.initForm(this.pokemon);
        }
        ngOnChanges() {
            this.initForm(this.pokemon);
        }

        private initForm(pokemon: Partial<Pokemon> = {}) {
            this.pokemonForm = this.formBuilder.group({
                name: [pokemon.name, Validators.required],
                description: [pokemon.description, Validators.required],
                height: [pokemon.height, Validators.required],
                weight: [pokemon.weight, Validators.required],
                photo: [pokemon.photo, Validators.required]
            });
        }

        public addPokemon() {
            const pokemon: Pokemon = { ...this.pokemonForm.value };
            this.add.emit(pokemon);
            this.initForm();
        }

        public updatePokemon() {
            const pokemon = {
            ...this.pokemon,
            ...this.pokemonForm.value
            };
            this.update.emit(pokemon);
            this.initForm();
        }
    }

Build Your Pokédex: Part 2 — @ngrx/entity
*****************************************

:source: https://medium.com/better-programming/build-your-pok%C3%A9dex-part-2-ngrx-entity-6e9d7256e6a8

State
=====

Before

.. code-block:: js

    import { Pokemon } from '@shared/interfaces/pokemon.interface';
    export interface PokemonState {
        ids: number[];
        entities: { [key: string]: Pokemon };
    }

After

.. code-block:: js

    import { EntityState } from '@ngrx/entity';
    import { Pokemon } from '@shared/interfaces/pokemon.interface';
    import { createEntityAdapter } from '@ngrx/entity';

    export const pokemonAdapter = createEntityAdapter<Pokemon>();

    export interface PokemonState extends EntityState<Pokemon> {}

Reducer
=======

Adapter Collection Methods
--------------------------

* :code:`addOne`: Add one entity to the collection.
* :code:`addMany`: Add multiple entities to the collection.
* :code:`addAll`: Replace the current collection with the provided collection.
* :code:`removeOne`: Remove one entity from the collection.
* :code:`removeMany`: Remove multiple entities from the collection, by ID or by predicate.
* :code:`removeAll`: Clear entity collection.
* :code:`updateOne`: Update one entity in the collection.
* :code:`updateMany`: Update multiple entities in the collection.
* :code:`upsertOne`: Add or update one entity in the collection.
* :code:`upsertMany`: Add or update multiple entities in the collection.
* :code:`map`: Update multiple entities in the collection by defining a map function, similar to Array.map.

Before:

.. code-block:: js

    import { PokemonActionTypes, PokemonActions } from './pokemon.actions';
    import { PokemonState } from './pokemon.adapter';

    export function pokemonInitialState(): PokemonState {
        return {
            ids: [],
            entities: {}
        };
    }

    function arrayToObject(array) {
        return array.reduce((obj, item) => {
            obj[item.id] = item;
            return obj;
        }, {});
    }

    export function pokemonReducer(
        state: PokemonState = pokemonInitialState(),
        action: PokemonActions
    ): PokemonState {
        switch (action.type) {
            case PokemonActionTypes.LOAD_POKEMONS_SUCCESS:
                return {
                    ...state,
                    entities: arrayToObject(action.payload)
                };

        case PokemonActionTypes.ADD_SUCCESS:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [action.pokemon.id]: action.pokemon
                }
            };

        case PokemonActionTypes.DELETE_SUCCESS:
            const entities = { ...state.entities };
            delete entities[action.id];
            return {
                ...state,
                entities
            };

        case PokemonActionTypes.UPDATE_SUCCESS:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [action.pokemon.id]: action.pokemon
                }
            };

        default:
            return state;
        }
    }

.. code-block:: js

    import { PokemonActionTypes, PokemonActions } from './pokemon.actions';
    import { PokemonState, pokemonAdapter } from './pokemon.adapter';

    export function pokemonInitialState(): PokemonState {
        return pokemonAdapter.getInitialState();
    }

    export function pokemonReducer(
        state: PokemonState = pokemonInitialState(),
        action: PokemonActions
    ): PokemonState {
        switch (action.type) {
            case PokemonActionTypes.LOAD_POKEMONS_SUCCESS:
                return pokemonAdapter.addAll(action.payload, state);

            case PokemonActionTypes.ADD_SUCCESS:
                return pokemonAdapter.addOne(action.pokemon, state);

            case PokemonActionTypes.DELETE_SUCCESS:
                return pokemonAdapter.removeOne(action.id, state);

            case PokemonActionTypes.UPDATE_SUCCESS:
                const { id } = action.pokemon;
                return pokemonAdapter.updateOne(
                    {
                        id,
                        changes: action.pokemon
                    },
                    state
                );

            default:
                return state;
        }
    }

Selector
========

Before

.. code-block:: js

    import { createFeatureSelector, createSelector } from '@ngrx/store';
    import { PokemonState } from './pokemon.adapter';

    export const selectPokemonState = createFeatureSelector<PokemonState>(
        'pokemon'
    );

    export const selectAll = createSelector(
        selectPokemonState,
        state => Object.values(state.entities)
    );

After

.. code-block:: js

    import { PokemonState, pokemonAdapter } from './pokemon.adapter';
    import { createFeatureSelector, createSelector } from '@ngrx/store';

    export const selectPokemonState = createFeatureSelector<PokemonState>(
        'pokemon'
    );

    export const {
        selectIds,
        selectEntities,
        selectAll,
        selectTotal
    } = pokemonAdapter.getSelectors(selectPokemonState);

Build Your Pokédex: Part 3 — Improve NgRx Using Creator Functions
*****************************************************************

:source: https://medium.com/better-programming/build-your-pok%C3%A9dex-part-3-improve-ngrx-using-create-functions-21e59ace65e

some good idea but ... don t know ...
