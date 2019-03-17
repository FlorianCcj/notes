* https://learn.shayhowe.com/html-css/
* http://www.htmldog.com/guides/css/
* http://www.barelyfitz.com/screencast/html-training/css/positioning/
* https://tympanus.net/codrops/css_reference/
* https://codepen.io/shshaw/full/gEiDt
* https://cssguidelin.es/
* https://marksheet.io/
* https://cssgrid.io/
* https://developer.mozilla.org/en-US/docs/Web/CSS
* https://www.w3schools.com/css/
* https://css-tricks.com/snippets/css/complete-guide-grid/
* https://gridbyexample.com/examples/ (example seems cowl)
* https://www.learnenough.com/css-and-layout-tutorial/introduction (ebook but seem good)
* http://web.simmons.edu/~grovesd/comm328/demo/css-exercises/simmons-layout-exercise/
* http://css.maxdesign.com.au/floatutorial/ (exercise seems cowl)
* https://github.com/char1eschen/40-Layout-Exercises (exercise seems cowl)
* https://enjoycss.com/ (help you to render)

## 30 CSS Best Practices for Beginners

https://code.tutsplus.com/tutorials/30-css-best-practices-for-beginners--net-6741

write in 2009

1. Make it Readable
2. Keep it Consistent (class, id naming convention)
3. Start with a Framework
4. Use a Reset
    meyer web s reset: https://meyerweb.com/eric/tools/css/reset/index.html
    yahoo s reset
    your own reset: https://code.tutsplus.com/tutorials/quick-tip-create-your-own-simple-resetcss-file--net-206
5. Organize the Stylesheet with a Top-down Structure
6. Combine Elements
    h1, h2, h3 {font-family: tahoma, color: #333}
7. Create Your HTML First
8. Use Multiple Classes
9. Use the Right Doctype
    general: <!DOCTYPE html>
    learn more: https://alistapart.com/article/doctype
10.  Use Shorthand  
    #crayon {
        margin: 8px 7px 0px 5px; // top, right, bottom, and left values, respectively.
    }
    instead of 
    #crayon {
        margin-left:    5px;
        margin-right:   7px;
        margin-top: 8px;
    }
11. Comment your CSS
12. Understand the Difference Between Block vs. Inline Elements
13. Alphabetize your Properties
14. Use CSS Compressors
15. Make Use of Generic Classes
    .left {float:left}
    .right {float:right}
16. Use "Margin: 0 auto" to Center Layouts
17. Don't Just Wrap a DIV Around It
18. Use Firebug
19. Hack Less
20. Use Absolute Positioning Sparingly
21. Use Text-transform
22. Don't use Negative Margins to Hide Your h1
23. Validate Your CSS and XHTML
24. Ems vs. Pixels
25. Don't Underestimate the List
26. Avoid Extra Selectors
    .someclass li {...}
    instead of 
    body #container .someclass ul li {....}
27. Add Margins and Padding to All
    begin with * {margin:0;padding:0;}
    like that you ll sure that any browser will print it corectly
28. When Ready, Try Object Oriented CSS
29. Use Multiple Stylesheets
30. Check for Closed Elements First When Debugging

## html form good practice

https://code.tutsplus.com/tutorials/20-html-forms-best-practices-for-beginners--net-6593

* 11 : Use good focusing techniques
    input[type=text]:hover {
            background-color:#ffff66;
            border-color:#999999;
    }
* 12 : Consider people using Screen Readers
* 15 : Validate on both the Client and Server
* 16 : Give your Users Smart Warnings