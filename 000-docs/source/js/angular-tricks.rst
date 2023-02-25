Angular - Tricks
################

@Attribute decorator
********************

We have used mainly: Component, Module, Directive decorators in our Angular app.

We have this Attribute decorator, which enables us to pass static string without a cost at performance by eliminating change detection check on it.

The values of Attribute decorator are checked once and never checked again. They are used similarly to @Input decorator:

.. code-block:: ts

    @Component({
        ...
    })
    export class BlogComponent {
        constructor(@Attribute("type") private type: string ) {}
    }

AppInitializer
**************

Bootstrap Listener
******************

.. code-block:: ts

    @NgModule({
        {
            provide: APP_BOOTSTRAP_LISTENER, multi: true,
            useExisting: runOnBootstrap
        }
        ...
    })
    export class AppModule {}

DOCUMENT
********

.. code-block:: ts

    @Component({})
    export class CanvasElement {
        constructor(@Inject(DOCUMENT) _doc: Document) {}    renderCanvas() {
            this._doc.getElementById("canvas")
        }
    }

Warning: Tread carefully! Interacting with the DOM directly is dangerous and can introduce XSS risks.

HttpInterceptor
***************

HttpInterceptor can be used in:
* Authentication,
* Caching
* Fake backend
* URL transformation
* Modifying headers

Interpolation: Override Template interpolation
**********************************************

.. code-block:: ts

    @Component({
        template: `
            <div>
                ((data))
            </div>
        `,
        interpolation: ["((","))"]
    })
    export class AppComponent {
        data: any = "dataVar"
    }

Location
********

.. code-block:: ts

    import { Location } from "@angular/common"@Component({
        ...
    })
    export class AppComponent {
        constructor(private location: Location) {}    navigateTo(url) {
            this.location.go(url)
        }    goBack() {
            location.back()
        }    goForward() {
            location.forward()
        }
    }

Meta
****

.. code-block:: ts

    import { Meta } from "@angular/platform-browser"@Component({
        ...
    })
    export class BlogComponent implements OnInit {
        constructor(private meta: Meta) {}    ngOnInit() {
            meta.updateTag({name: "title", content: ""})
            meta.updateTag({name: "description", content: "Lorem ipsum dolor"})
            meta.updateTag({name: "image", content: "./assets/blog-image.jpg"})
            meta.updateTag({name: "site", content: "My Site"})
        }
    }

NgPlural
********

To use this directive you must provide a container element that sets the [ngPlural] attribute to a switch expression. Inner elements with a [ngPluralCase] will display based on their expression:

.. code-block:: ts

    <p [ngPlural]="components">
        <ng-template ngPluralCase="=1">1 component removed</ng-template>
        <ng-template ngPluralCase=">1">{{components}} components removed </ng-template>
    </p>

Production
**********

.. code-block:: js

    if (environment.production) {
        enableProdMode();
        if (window) {
            window.console.log = () => {};
        }
    }

Title
*****

.. code-block

    import { Title } from "@angular/platform-browser"@Component({
        ...
    })
    export class LoginComponent implements OnInit {
        constructor(private title: Title) {}    ngOnInit() {
            title.setTitle("Login")
        }
    }

Sources
*******

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2020.01.19 | V1.0    | First                                                              |
+------------+---------+--------------------------------------------------------------------+
