Angular - PWA
#############

:source: https://levelup.gitconnected.com/a-guide-to-building-a-pwa-in-angular-acea27ae708d

Features of PWA
***************

1. Progressive: The app should work for every user no matter what the browser choice is because it is built with progressive enhancement as a core principle.
2. Responsive: The app can respond to the user’s behavior and environment based on screen size, platform, and orientation.
3. Connectivity Independent: When the network is not available or too slow, the app should still work on a device.
4. App-like: It looks and feels like an app but with no download and installation needed.
5. Fresh: The service worker update process will always keep the app up-to-date.
6. Secured: Accessed via HTTPS to allow authorization, secured transactions, and also to prevent unauthorized access
7. Splash Screen: Splash screen is added during the startup of the app. It feels more like a native app.

Which process
*************

.. code-block:: bash

    node -v # need 12+
    npm i -g @angular/cli
    ng new pwatest
    cd pwatest

    ng add @angular/material
    # choose Deep Purple/Amber
    # add HammerJs

    # edit app.module.ts # E001

    ng g service services/api
    # edit api.service.ts # E002
    # edit app.component.ts # E003
    # edit app.module.ts # E004
    # edit app.component.html # E005

    ng build --prod
    npm i -g http-server
    cd dist/pwatest
    http-server -o
    # go to http://127.0.0.1:8080

    # installer Lighthouse Report Generator (firefox but don t work for localhost)
    # install lighthouse stack packs (chrome)
    # Ctrl * shift + I -> Audit

    ng add @angular/pwa

    # Ctrl * shift + I -> Audit

E001
****

.. code-block:: typescript

    // app.module.ts
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppRoutingModule } from './app-routing.module';
    import { AppComponent } from './app.component';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { HttpClientModule } from '@angular/common/http';
  
    @NgModule({
        declarations: [
            AppComponent

        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            HttpClientModule

        ],
        providers: [],
        bootstrap: [AppComponent]

    })
    export class AppModule { }

E002
****

.. code-block:: typescript

    // api.service.ts
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';

    export interface Item {
        name: string;
        description: string;
        url: string;
        html: string;
        markdown: string;

    }

    @Injectable({
        providedIn: 'root'

    })
    export class ApiService {
        private baseURL: string = "https://www.techiediaries.com/api/data.json"; constructor(private httpClient: HttpClient) {}
      
        fetch(): Observable<Item[]> {
            return <Observable<Item[]>>this.httpClient.get(this.baseURL);

        }

    }

E003
****

.. code-block:: typescript

    // app.component.ts
    import { Component, OnInit } from '@angular/core';
    import { Item, ApiService } from './services/api.service';
  
    @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']

    })
    export class AppComponent implements OnInit{
        title = 'firstpwa';
        items: Array<Item>;  constructor(private apiService: ApiService) {}
      
        ngOnInit() {
            this.fetchData();

        }
      
        fetchData() {
            this.apiService.fetch().subscribe(
                (data: Array<Item>) => {
                    console.log(data);
                    this.items = data;

                }, (err) => {
                    console.log(err);

                }

            );

        }

    }

E004
****

.. code-block:: typescript

    // app.module.ts
    /*...*/
    import { MatToolbarModule, MatCardModule, MatButtonModule } from  '@angular/material';
  
    @NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            /*...*/
            MatToolbarModule,
            MatCardModule,
            MatButtonModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
    export class AppModule { }


E005
****

.. code-block:: html

    <!-- app.component.html -->
    <mat-toolbar color="primary">
        <mat-toolbar-row>
            <span>JS-jargon</span>
        </mat-toolbar-row>
    </mat-toolbar>
  
    <main>
        <mat-card *ngFor="let item of items">
            <mat-card-header>
                <mat-card-title>{{item.name}}</mat-card-title>
            </mat-card-header>  
            <mat-card-content>
                {{item.description}}
            </mat-card-content>    <mat-card-actions>
                <a mat-raised-button href="{{item.url}}" color="primary">More</a>
            </mat-card-actions>
        </mat-card>
    </main>
