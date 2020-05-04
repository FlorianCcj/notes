Methodology - Code - Good Practices
###################################

:source: thanks to Sam G.

* DRY - Don t Repeat Yourself: il semble que la perfection soit atteinte non quand il n y a plus rien a ajouter mais quand il n y a plus rien a retrancher
* AP - Abstraction Principe: chaque fonction significative d une application devrait etre realisee a un seul endroit dans le code source
* KISS - Keep It Simple and Stupid: un code simple est plus facile a lire, maintenir
* YAGNI - You Aren t Gonna Need It: ne pas ajouter de fonctionnalite avant d en avoir besoin
* DTSTTCP - Do The Simplest Thing That Could Possibly Work: c est la methode la plus simple qui fonctionne
* LoD - Low of Demeter: ne parlez qu a vos amis immediats
* POKA-YOKE: anti-erreur, atteindre le "zero-defaut"
  * contact: oblige l operateur a ne pas faire d erreur
  * signalement: indique a l operateur que la procedure n est pas respectee
  * chronologique: impose a l operateur l ordre des operations
* FIRST: 5 principes pour les tests
  * Fast
  * Independant
  * Repeatale
  * Self-validating
  * Timely
* STUPID: 6 principe a eviter
  * Singleton
  * Tight coupling
  * Untestable
  * Premature optimization
  * Indescriptive naming
  * Duplication
* SOLID: 5 principes de designes
  * SRP - Single Reponsibility Principe
  * OCP - Open Closed Principe
  * LSP - Loskiow Substitution Principe
  * ISP - Interface Segregation Principe
  * DIP - Dependency Inversion Principe
* XP - eXtreme Programming
  * puisque la revue de code est une bonne pratique, elle sera faite en permanance (par binome)
  * puisque les tests sont utiles, ils seront faits systematiquement avant chaque mise en oeuvre
  * puisque la conception est importante, elle sera faite tout au long du project (refactoring)
  * puisque la simplicite permet d avancer plus vite, nous choisirons toujours la solution la plus simple
  * puisque la comprehension est importante, nous definiron et feront evoluer ensemble des metaphores
  * puisque l integration des modifications est cruciale, nous l effectuerons plusieurs fois par jour
  * puisque les besoins evoluent vite, nous ferons des cycles de development tres rapides pour nous adapter aux changements
* PP - Pair Programming
  * Bruit: la programmation en binome necessite de programmer a voix haute et de partager son point de vue
  * Engagement: le binome adhere au principe et s investit dans le projet
  * Transmission: le novice code sous le regard de l expert
  * Relationnel
