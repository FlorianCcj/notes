# css-grid

Install Firefox and Node.
 * Firefox: have a good debugging tool
 * Node: auto update browser (cf: package.json)

### 02. [Starter Files and Tooling Setup](https://jsfiddle.net/6qvwur9q/)
css variable
:root {
  --yellow: #ffc600;
  --black: #272727;
}
body { color: var(--black);}

### 03. [CSS Grid Fundamentals](https://jsfiddle.net/qxxpgg4j/)
it's always an harmony between a container and item in it
```
.container {
  display: grid;
  /* grid-template-columns: 100px 100px 100px; */
  /* grid-template-columns: 50rem 20% 250px auto; */
  grid-template-columns: repeat(5, auto);
  grid-template-rows: 100px 200px 400px;
  grid-gap: 20px;
}
```


### 04. [CSS Grid Dev Tools](https://jsfiddle.net/b55x8vh2/)
### 05. [CSS Grid Implicit vs Explicit Tracks](https://jsfiddle.net/mon8xdgb/)

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px 400px; /* 1-2) 2 columns are explicite defined so row are implicited created */
  grid-template-rows: 200px 400px; /* 2) 2 columns and 2 rows are explicite defined  */

  /* with 6 items it will create 2 implicited rows */
  grid-auto-rows: 100px; /* implicited rows will have 100px, in firefox still not able to managed multiple definition in implicite rows*/
}
```

### 06. [CSS grid-auto-flow Explained](https://jsfiddle.net/Loq4uj16/)
```
.container {
  display: grid;
  grid-gap: 20px;

  grid-template-columns: 400px 200px;
  grid-auto-flow: row; /*other value: column*/
  grid-auto-rows: 500px;
}
```

### 07. [Sizing tracks in CSS Grid](https://jsfiddle.net/q8h3r8yb/)
```
.container {
  display: grid;
  grid-gap: 20px;

  /*grid-template-columns: 25% 25% 25% 25%;*/ /* 100% + 60px ... too bad*/
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* auto will fit to the content */
  /* fr will take the all the free space */

}
```

### 08. [CSS Grid repeat function](https://jsfiddle.net/8f8xyx86/)
```
.container {
  display: grid;
  grid-gap: 20px;

  grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr 2fr);
  grid-template-columns: 100px repeat(4, 1fr 2fr) 10% repeat(2, 10px);
}
```

### 09. [Sizing Grid Items](https://jsfiddle.net/wqs6tcuk/)
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}
.item9 {width: 500px;} /*size all column to 500px*/
.item9 {grid-column: span 2;} /*item9 will take 2 column, if to long it go to next lign and let dead space*/
.item9 {grid-column: span 10;} /*if too long for container, implicit column*/
.item9 {grid-row: span 2;}
```

### 10. [Placing Grid Items](https://jsfiddle.net/hs5xhvpp/)
```
/* grid-column: 2 / 5; <=> grid-column-start: 2; grid-column-end: 5;*/
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}
.item9 {grid-column: 2 / 5;} /*begin inter 2 and end inter 5*
.item9 {grid-column: 2 / span 2;}
.item9 {grid-column: 1 / -1;} /*entire grid*/
.item9 {grid-row: 1 / -1;} /*Be carefull if you don't explicit define row, it ll take 1 line*/
```

### 11. [Spanning and Placing Cardio](https://jsfiddle.net/2z7z6o9k/)
### 12. [auto-fit and auto-fill](https://jsfiddle.net/d1pLngzx/)
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 100px); /*you don't know how many columns you want, just fill the width container*/
  grid-template-columns: repeat(auto-fit, 100px); /*the same thing but the grid stop after the last item, if you put an element end: -1 in fill it will be at the end rigth, in fit it will be just after the last item*/
}
```

### 13. [Using minmax() for Responsive Grids](https://jsfiddle.net/xthszm2j/)
work only with auto-fill and auto-fit (remplace mediqueries)

```
.container {
  display: grid;
  grid-gap: 20px;
  /*grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));*/
  /*grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));*/
  /*grid-template-columns: auto 150px 150px 150px;*/
  grid-template-columns: fit-content(100px) 150px 150px 150px;
}
```

### 14. Grid Template Areas:
    - [Area Line Names](https://jsfiddle.net/tkyxomht/)
    - [Areas](https://jsfiddle.net/p0sn7L7v/)
```
.container {
  display: grid;
  grid-gap: 20px;

  grid-template-columns: 1fr 500px 1fr;
  grid-template-rows: 150px 150px 100px;

  grid-template-areas: /*permit to name area, "." permit to let a blank*/
    "sidebar-1 content sidebar-2";
    "sidebar-1 content sidebar-2";
    "footer footer footer"
    /*"footer footer ."*/
  ;
}

.footer { grid-area: footer; }
.item1 { grid-area: sidebar-1; }
.item2 { grid-area: content; }
.item3 { grid-area: sidebar-2; }

@media (max-width: 700px) {
  .container {
    grid-template-areas:
      "content content content";
      "sidebar-1 sidebar-1 sidebar-2";
      "footer footer footer"
    ;
  }
}
```

other exemple

```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    "poop poop poop poop burger burger burger burger"
    "poop poop poop poop burger burger burger burger"
    "poop poop poop poop burger burger burger burger"
    "poop poop poop poop burger burger burger burger"
  ;
}

.item3 {
  /* grid-area: poop; *//*1*/
  /* grid-column: poop-start / poop-end */ /*2*/
  /* grid-column: poop-start / burger-end */ /*3*/
  /* grid-column: poop-start / burger-end */ /*4*/
  /* grid-row-end: poop-end */ /*4*/
}
```

### 15. [Naming Lines in CSS Grid](https://jsfiddle.net/ygpmn0xh/)
```
.container {
  display: grid;
  grid-gap: 20px;
  /* grid-template-columns: 1fr 500px 1fr; *//*1 before naming*/
  grid-template-columns: [sidebar-start side-left] 1fr [sidebar-end content-start] 500px [content-end] 1fr [site-right]; /*naming column (those between item) */
  /*grid-template-rows: repeat(10, auto);*/ /*1 before naming*/
  grid-template-rows: [content-top] repeat(10, auto) [content-bottom];
}

.item3 {
  /* grid-column: 2; *//*1 before naming*/
  /* grid-row: 1 / span 10; *//*1 before naming*/
  grid-column: content-start;
  grid-row: content-top / content-bottom;
}
```

### 16. [grid-auto-flow dense Block Fitting](https://jsfiddle.net/sxj83p70/)
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(10, 1fr);
  /* grid-auro-flow: dense; */ /* if an item is too big i put it on the nextlign*/
}

.item:nth-child(6n) { /*6th, 12th, 18th ... item i do ...*/
  grid-column: span 6;
}

.item:nth-child(8n) { /*6th, 12th, 18th ... item i do ...*/
  grid-column: span 2;
}

.item:nth-child(9n) { /*6th, 12th, 18th ... item i do ...*/
  grid-row: span 2;
}
```

### 17. [CSS Grid Alignment + Centering](https://jsfiddle.net/eyL9a2gv/)
six methods to do it:
 * `justify-items` `align-items`: in the item
 * `justify-content` `align-content`: in the container, value: start, end, center, space-around, space-between
 * `justify-self` `align-self`: the container him self

 justify-* => row axis
 align-* => column axis
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 100px);
  /*justify-items: center;*//*1*/ /*default value: stretch, other value: start, end, flex-start, flex-end*/
  /*align-items: center;*//*1*/
  place-items: center center; /*not compatible every where*/

}
```

### 18. [Re-ordering Grid Items](https://jsfiddle.net/uscf9mk0/)
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(10, 1fr);
}
.logo {
  grid-column: span 2;
  order: 2; /*to the end because all other have order 0 by default, so we need to add order to others*/
}
.nav {
  grid-column: span 8;
  order: 1;
}
.content {
  grid-column: 1 / -1;
  order: 3;
}

```

### 19. [Nesting Grid with Album Layouts](https://jsfiddle.net/yn7jak0y/)
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}
```

### 20. [CSS Grid Image Gallery](https://jsfiddle.net/cbjzped2/)
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}
```

### 21. Flexbox vs CSS Grid:
    - [Axis Flipping](https://jsfiddle.net/pt8hym9s/)
    - [Controls on Right](https://jsfiddle.net/4o7gavuj/)
    - [Flex on Item](https://jsfiddle.net/1u264ftd/)
    - [Perfectly Centered](https://jsfiddle.net/sgbrtrjo/)
    - [Self Control](https://jsfiddle.net/c6gg8pkn/)
    - [Stacked Layout](https://jsfiddle.net/mnfm1sw0/)
    - [Unknown Content Size](https://jsfiddle.net/4ze02bkj/)
    - [Unknown Number of Items](https://jsfiddle.net/Lg7r3jmy/)
    - [Variable Widths on Each Row](https://jsfiddle.net/qymhootd/)
### 22. [Recreating Codepen](https://jsfiddle.net/br6n54qt/)
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}
```

### 23. [Bootstrappy Grid with CSS Variables](https://jsfiddle.net/gLLht2hd/)
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}
```

### 24. [Responisve Website](https://jsfiddle.net/bh16ofp8/)
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}
```

### 25. [Full Bleed Blog Layout](https://jsfiddle.net/j8w6v3mh/)
```
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
}
```

## ressource

site des cours : https://courses.wesbos.com/account/access/5a7379e54ea3f06ee9035d84
on joue : http://cssgridgarden.com/
cours : https://www.cssgrid.cc/

video complete : https://cssgrid.io/
cours source : https://github.com/wesbos/css-grid