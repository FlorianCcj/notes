Vue - router middleware
#######################

..code-block:: js

    const Root = { template: '<div>Root</div>' }
    const Page1 = { template: '<div>Page1</div>' }
    const Page2 = {

        template: '<div>Page2</div>',
        // beforeRouteEnter:
        // beforeRouteUpdate:
        // beforeRouteLeave:

    }

    const guardIsLoggedIn = (to, from, next) => {
        if (user) {
            console.log('guardIsLoggedIn OK');
            next();

        }

    }

    const guardIsAnAdult = (to, from, next) => {
        if (user.age > 18) {
            console.log('guardIsAnAdult OK');
            next();

        }

    }

    const guardIsFromSpain = (to, from, next) => {
        if (user.country === countries.Spain) {
            console.log('guardIsFromSpain OK');
            next();

        }

    }

    const router = new VueRouter({
        mode: 'history',
        routes: [

            {
                path: '/', 
                component: Root

            },
            {

                path: '/page1', 
                component: Page1, 
                beforeEnter: guardIsAnAdult

            },
            {

                path: '/page2', 
                component: Page2, 
                beforeEnter: VueRouterMultiguard([guardIsAnAdult, guardIsFromSpain])

            },

        ]

    })

    router.beforeEach(guardIsLoggedIn)

    router.afterEach((to, from) => {
        console.log('afterEach')

    })

    new Vue({
        router,
        el: '#app',

    })

Sources
*******

* https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
* https://medium.com/@CKGrafico/configuring-a-middleware-with-vue-router-6343d7be5e6c

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2019.12.22 | V1.0.1  | Remove sphinx warning                                              |
+------------+---------+--------------------------------------------------------------------+
| 2019.12.20 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+
