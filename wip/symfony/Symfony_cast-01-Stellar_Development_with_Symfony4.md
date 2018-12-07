# Symfony cast - Stellar Development with Symfony 4

index sf4: https://symfonycasts.com/tracks/symfony

composer create-project symfony/skeleton the_spacebar

cd the_spacebar

```bash
php -S 127.0.0.1:8000 -t public
```

```bash
git init
git add .
git commit
```

```bash
composer require server
```

```bash
bin/console server:run
```

```yaml
# config/routes.yaml
index:
    path: /
    controller: App\Controller\ArticleController::homepage
```

```php
// src/Controller/ArticleController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;

class ArticleController
{
  public function homepage()
  {
    return new Response('OMG! My first page already! WOOO!');
  }
}
```

composer require annotations

```yaml
# config/routes.yaml
# All is removed
```

```php
// src/Controller/ArticleController.php
namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class ArticleController
{
  /**
   * @Route("/")
   */
  public function homepage()
  {
    return new Response('OMG! My first page already! WOOO!');
  }
}
```

```bash
git init
git add .
git commit -m "making so much good progress"
```

```bash
composer require sec-checker --
```

```bash
php bin/console security:check
```

## 05. Twig recipe

composer require twig

## 06. Twig

```php
// src/Controller/ArticleController.php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ArticleController extends AbstractController
{
  /**
   * @Route("/")
   */
  public function homepage()
  {
    return new Response('OMG! My first page already! WOOO!');
  }

  /**
    * @Route("/news/{slug}")
    */
    public function show($slug)
    {
        $comments = [
            'I ate a normal rock once. It did NOT taste like bacon!',
            'Woohoo! I\'m going on an all-asteroid diet!',
            'I like bacon too! Buy some from my site! bakinsomebacon.com',
        ];

        return $this->render('article/show.html.twig', [
            'title' => ucwords(str_replace('-', ' ', $slug)),
            'comments' => $comments,
        ]);
    }
}
```

```html
{# templates/article/show.html.twig #}

{% extends 'base.html.twig' %}

{% block title %}Read: {{ title }}{% endblock %}

{% block body %}

<h1>{{ title }}</h1>
<div>
    <p>
        Bacon ipsum dolor amet filet mignon picanha kielbasa jowl hamburger shankle biltong chicken turkey pastrami cupim pork chop. Chicken andouille prosciutto capicola picanha, brisket t-bone. Tri-tip pig pork chop short ribs frankfurter pork ham. Landjaeger meatball meatloaf, kielbasa strip steak leberkas picanha swine chicken pancetta pork loin hamburger pork.
    </p>
    <p>
        Kielbasa pork belly meatball cupim burgdoggen chuck turkey buffalo ground round leberkas cow shank short loin bacon alcatra. Leberkas short loin boudin swine, ham hock bresaola turducken tail pastrami picanha pancetta andouille rump landjaeger bacon. Pastrami swine rump meatball filet mignon turkey alcatra. Picanha filet mignon ground round tongue ham hock ball tip tri-tip, prosciutto leberkas kielbasa short loin short ribs drumstick. Flank pig kielbasa short loin jerky ham hock turducken prosciutto t-bone salami pork jowl.
    </p>
    <p>
        Pastrami short loin pork chop, chicken kielbasa swine turducken jerky short ribs beef. Short ribs alcatra shoulder, flank pork chop shankle t-bone. Tail rump pork chop boudin pig, chicken porchetta. Shank doner biltong, capicola brisket sausage meatloaf beef ribs kevin beef rump ribeye t-bone. Shoulder cupim meatloaf, beef kevin frankfurter picanha bacon. Frankfurter bresaola chuck kevin buffalo strip steak pork loin beef ribs prosciutto picanha shankle. Drumstick prosciutto pancetta beef ribs.
    </p>
    <h2>Comments</h2>
    <ul>

        {% for comment in comments %}

            <li>{{ comment }}</li>

        {% endfor %}
    </ul>
</div>

{% endblock %}
```

## 07. Web Debug Toolbar & the Profiler!

```bash
composer require profiler --dev
```

permit to user
 {{ dump() }} in twig
 dump($slug, $this); in controller

## 08. Debugging & Pack

```bash
composer require debug --dev
composer unpack debug # permit to know all package use in debug install (in composer.json)
```

## 09. Assets: CSS & JavaScript

```html
{# templates/base.html.twig #}
<!doctype html>
<html lang="en">
    <head>

        <title>{% block title %}Welcome to the SpaceBar{% endblock %}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        {% block stylesheets %}
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
            <!--<link rel="stylesheet" href="/css/font-awesome.css">-->
            <!--<link rel="stylesheet" href="/css/styles.css">-->
            <link rel="stylesheet" href="{{ asset('css/font-awesome.css') }}">
            <link rel="stylesheet" href="{{ asset('css/styles.css') }}">

        {% endblock %}
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-dark navbar-bg mb-5">
            <a style="margin-left: 75px;" class="navbar-brand space-brand" href="#">The Space Bar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav mr-auto">
                     <li class="nav-item">
                       <a style="color: #fff;" class="nav-link" href="#">Local Asteroids</a>
                     </li>
                     <li class="nav-item">
                       <a style="color: #fff;" class="nav-link" href="#">Weather</a>
                     </li>
                   </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-info my-2 my-sm-0" type="submit">Search</button>
                </form>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown" style="margin-right: 75px;">
                        <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img class="nav-profile-img rounded-circle" src="images/astronaut-profile.png">
                </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="#">Profile</a>
                            <a class="dropdown-item" href="#">Create Post</a>
                            <a class="dropdown-item" href="#">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>

        {% block body %}{% endblock %}
        <footer class="footer">
            <div class="container text-center">
                <span class="text-muted">Made with <i class="fa fa-heart" style="color: red;"></i> by the guys and gals at <a href="https://knpuniversity.com">KnpUniversity</a></span>
            </div>
        </footer>

        {% block javascripts %}
            <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
            <script>
                $('.dropdown-toggle').dropdown();

            </script>

        {% endblock %}
    </body>
</html>
```

```bash
composer require asset
```

```html
{# templates/article/show.html.twig #}
{% extends 'base.html.twig' %}

{% block title %}Read: {{ title }}{% endblock %}

{% block body %}

<div class="container">
    <div class="row">
        <div class="col-sm-12">
            <div class="show-article-container p-3 mt-4">
                <div class="row">
                    <div class="col-sm-12">
                        <img class="show-article-img" src="{{ asset('images/asteroid.jpeg') }}">
                        <div class="show-article-title-container d-inline-block pl-3 align-middle">
                            <span class="show-article-title ">{{ title }}</span>
                            <br>
                            <span class="align-left article-details"><img class="article-author-img rounded-circle" src="{{ asset('images/alien-profile.png') }}"> Mike Ferengi </span>
                            <span class="pl-2 article-details"> 3 hours ago</span>
                            <span class="pl-2 article-details">
                                <span class="js-like-article-count">5</span>
                                <a href="{{ path('article_toggle_heart', {slug: slug}) }}" class="fa fa-heart-o like-article js-like-article"></a>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="article-text">
                            <p>Spicy jalapeno bacon ipsum dolor amet veniam shank in dolore. Ham hock nisi landjaeger cow,
                                lorem proident beef ribs aute enim veniam ut cillum pork chuck picanha. Dolore reprehenderit
                                labore minim pork belly spare ribs cupim short loin in. Elit exercitation eiusmod dolore cow
                                turkey shank eu pork belly meatball non cupim.</p>

                            <p>Laboris beef ribs fatback fugiat eiusmod jowl kielbasa alcatra dolore velit ea ball tip. Pariatur
                                laboris sunt venison, et laborum dolore minim non meatball. Shankle eu flank aliqua shoulder,
                                capicola biltong frankfurter boudin cupim officia. Exercitation fugiat consectetur ham. Adipisicing
                                picanha shank et filet mignon pork belly ut ullamco. Irure velit turducken ground round doner incididunt
                                occaecat lorem meatball prosciutto quis strip steak.</p>

                            <p>Meatball adipisicing ribeye bacon strip steak eu. Consectetur ham hock pork hamburger enim strip steak
                                mollit quis officia meatloaf tri-tip swine. Cow ut reprehenderit, buffalo incididunt in filet mignon
                                strip steak pork belly aliquip capicola officia. Labore deserunt esse chicken lorem shoulder tail consectetur
                                cow est ribeye adipisicing. Pig hamburger pork belly enim. Do porchetta minim capicola irure pancetta chuck
                                fugiat.</p>

                            <p>Sausage tenderloin officia jerky nostrud. Laborum elit pastrami non, pig kevin buffalo minim ex quis. Pork belly
                                pork chop officia anim. Irure tempor leberkas kevin adipisicing cupidatat qui buffalo ham aliqua pork belly
                                exercitation eiusmod. Exercitation incididunt rump laborum, t-bone short ribs buffalo ut shankle pork chop
                                bresaola shoulder burgdoggen fugiat. Adipisicing nostrud chicken consequat beef ribs, quis filet mignon do.
                                Prosciutto capicola mollit shankle aliquip do dolore hamburger brisket turducken eu.</p>

                            <p>Do mollit deserunt prosciutto laborum. Duis sint tongue quis nisi. Capicola qui beef ribs dolore pariatur.
                                Minim strip steak fugiat nisi est, meatloaf pig aute. Swine rump turducken nulla sausage. Reprehenderit pork
                                belly tongue alcatra, shoulder excepteur in beef bresaola duis ham bacon eiusmod. Doner drumstick short loin,
                                adipisicing cow cillum tenderloin.</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <p class="share-icons mb-5"><span class="pr-1">Share:</span> <i class="pr-1 fa fa-facebook-square"></i><i class="pr-1 fa fa-twitter-square"></i><i class="pr-1 fa fa-reddit-square"></i><i class="pr-1 fa fa-share-alt-square"></i></p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <h3><i class="pr-3 fa fa-comment"></i>{{ comments|length }} Comments</h3>
                        <hr>

                        <div class="row mb-5">
                            <div class="col-sm-12">
                                <img class="comment-img rounded-circle" src="{{ asset('images/astronaut-profile.png') }}">
                                <div class="comment-container d-inline-block pl-3 align-top">
                                    <span class="commenter-name">Amy Oort</span>
                                    <div class="form-group">
                                        <textarea class="form-control comment-form" id="articleText" rows="1"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-info">Comment</button>
                                </div>
                            </div>
                        </div>

                        {% for comment in comments %}
                        <div class="row">
                            <div class="col-sm-12">
                                <img class="comment-img rounded-circle" src="{{ asset('images/alien-profile.png') }}">
                                <div class="comment-container d-inline-block pl-3 align-top">
                                    <span class="commenter-name">Mike Ferengi</span>
                                    <br>
                                    <span class="comment"> {{ comment }}</span>
                                    <p><a href="#">Reply</a></p>
                                </div>
                            </div>
                        </div>
                        {% endfor %}

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{% endblock %}

{% block javascripts %}
    {{ parent() }}

    <script src="{{ asset('js/article_show.js') }}"></script>
{% endblock %}%
```

```html
{# template/article/homepage.html.twig #}
{% extends 'base.html.twig' %}

{% block body %}
    <div class="container">
        <div class="row">

            <!-- Article List -->

            <div class="col-sm-12 col-md-8">

                <!-- H1 Article -->
                <a class="main-article-link" href="#">
                    <div class="main-article mb-5 pb-3">
                        <img src="{{ asset('images/meteor-shower.jpg') }}" alt="meteor shower">
                        <h1 class="text-center mt-2">Ursid Meteor Shower: <br>Healthier than a regular shower?</h1>
                    </div>
                </a>

                <!-- Supporting Articles -->

                <div class="article-container my-1">
                    <a href="{{ path('article_show', {slug: 'why-asteroids-taste-like-bacon'}) }}">
                        <img class="article-img" src="{{ asset('images/asteroid.jpeg') }}">
                        <div class="article-title d-inline-block pl-3 align-middle">
                            <span>Why do Asteroids Taste Like Bacon?</span>
                            <br>
                            <span class="align-left article-details"><img class="article-author-img rounded-circle" src="{{ asset('images/alien-profile.png') }}"> Mike Ferengi </span>
                            <span class="pl-5 article-details float-right"> 3 hours ago</span>
                        </div>
                    </a>
                </div>

                <div class="article-container my-1">
                    <a href="#">
                        <img class="article-img"  src="{{ asset('images/mercury.jpeg') }}">
                        <div class="article-title d-inline-block pl-3 align-middle">
                            <span>Life on Planet Mercury: <br> Tan, Relaxing and Fabulous</span>
                            <br>
                            <span class="align-left article-details"><img class="article-author-img rounded-circle" src="{{ asset('images/astronaut-profile.png') }}"> Amy Oort </span>
                            <span class="pl-5 article-details float-right"> 6 days ago</span>
                        </div>
                    </a>
                </div>

                <div class="article-container my-1">
                    <a href="#">
                        <img class="article-img" src="{{ asset('images/lightspeed.png') }}">
                        <div class="article-title d-inline-block pl-3 align-middle">
                            <span>Light Speed Travel: <br> Fountain of Youth or Fallacy</span>
                            <br>
                            <span class="align-left article-details"><img class="article-author-img rounded-circle" src="{{ asset('images/astronaut-profile.png') }}"> Amy Oort </span>
                            <span class="pl-5 article-details float-right"> 2 weeks ago</span>
                        </div>
                    </a>
                </div>

            </div>

            <!-- Right bar ad space -->


            <div class="col-sm-12 col-md-4 text-center">
                <div class="ad-space mx-auto mt-1 pb-2 pt-2">
                    <img class="advertisement-img" src="{{ asset('images/space-ice.png') }}">
                    <p><span class="advertisement-text">New:</span> Space Ice Cream!</p>
                    <button class="btn btn-info">Buy Now!</button>
                </div>

                <div class="quote-space pb-2 pt-2 px-5">
                    <h3 class="text-center pb-3">Trending Quotes</h3>
                    <p><i class="fa fa-comment"></i> "Our two greatest problems are gravity and paperwork. We can lick gravity, but sometimes the paperwork is overwhelming." <br>— <a href="https://en.wikipedia.org/wiki/Wernher_von_Braun">Wernher von Braun, Rocket Engineer</a></p>

                    <p class="pt-4"><i class="fa fa-comment"></i> "Let's face it, space is a risky business. I always considered every launch a barely controlled explosion." <br>— <a href="https://en.wikipedia.org/wiki/Aaron_Cohen_(Deputy_NASA_administrator)">Aaron Cohen, NASA Administrator</a></p>

                    <p class="pt-4"><i class="fa fa-comment"></i> "If offered a seat on a rocket ship, don't ask what seat. Just get on."<br>— <a href="https://en.wikipedia.org/wiki/Christa_McAuliffe">Christa McAuliffe, Challenger Astronaut</a>
                </div>
            </div>
        </div>
    </div>
{% endblock %}
```

```php
// src/Controller/ArticleController.php

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

class ArticleController extends AbstractController
{
    /**
     * @Route("/", name="app_homepage")
     */
    public function homepage()
    {
        return $this->render('article/homepage.html.twig');
    }

    /**
     * @Route("/news/{slug}", name="article_show")
     */
    public function show($slug)
    {
        $comments = [
            'I ate a normal rock once. It did NOT taste like bacon!',
            'Woohoo! I\'m going on an all-asteroid diet!',
            'I like bacon too! Buy some from my site! bakinsomebacon.com',
        ];

        return $this->render('article/show.html.twig', [
            'title' => ucwords(str_replace('-', ' ', $slug)),
            'slug' => $slug,
            'comments' => $comments,
        ]);
    }

    /**
     * @Route("/news/{slug}/heart", name="article_toggle_heart", methods={"POST"})
     */
    public function toggleArticleHeart($slug, LoggerInterface $logger)
    {
        // TODO - actually heart/unheart the article!

        $logger->info('Article is being hearted!');

        return new JsonResponse(['hearts' => rand(5, 100)]);
    }
}

```

```html
{# template/base.html.twig #}
<!doctype html>
<html lang="en">

    <head>
        <title>{% block title %}Welcome to the SpaceBar{% endblock %}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        {% block stylesheets %}
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
            <link rel="stylesheet" href="{{ asset('css/font-awesome.css') }}">
            <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
        {% endblock %}
    </head>

    <body>
        <nav class="navbar navbar-expand-lg navbar-dark navbar-bg mb-5">
            <a style="margin-left: 75px;" class="navbar-brand space-brand" href="{{ path('app_homepage') }}">The Space Bar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav mr-auto">
                     <li class="nav-item">
                       <a style="color: #fff;" class="nav-link" href="#">Local Asteroids</a>
                     </li>
                     <li class="nav-item">
                       <a style="color: #fff;" class="nav-link" href="#">Weather</a>
                     </li>
                   </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-info my-2 my-sm-0" type="submit">Search</button>
                </form>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown" style="margin-right: 75px;">
                        <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <img class="nav-profile-img rounded-circle" src="{{ asset('images/astronaut-profile.png') }}">
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="#">Profile</a>
                            <a class="dropdown-item" href="#">Create Post</a>
                            <a class="dropdown-item" href="#">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>

        {% block body %}{% endblock %}

        <footer class="footer">
            <div class="container text-center">
                <span class="text-muted">Made with <i class="fa fa-heart" style="color: red;"></i> by the guys and gals at <a href="https://knpuniversity.com">KnpUniversity</a></span>
            </div>
        </footer>


        {% block javascripts %}
            <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
            <script>
                $('.dropdown-toggle').dropdown();
            </script>
        {% endblock %}
    </body>
</html>

```

```js
// public/js/article_show.js
$(document).ready(function() {
    $('.js-like-article').on('click', function(e) {
        e.preventDefault();

        var $link = $(e.currentTarget);
        $link.toggleClass('fa-heart-o').toggleClass('fa-heart');

        $.ajax({
            method: 'POST',
            url: $link.attr('href')
        }).done(function(data) {
            $('.js-like-article-count').html(data.hearts);
        })
    });
});

```

## 10. Generating URLs

```bash
./bin/console debug:router
```

```html
<!--- templates/base.html.twig l.19-->
<a style="margin-left: 75px;" class="navbar-brand space-brand" href="#">The Space Bar</a>
```

=>

```html
<!--- templates/base.html.twig l.19-->
 <a style="margin-left: 75px;" class="navbar-brand space-brand" href="{{ path('app_article_homepage') }}">The Space Bar</a>
```

you can name it and target a specific file

```php
/**
 * @Route("/", name="app_homepage")
 */
public function homepage()

{
    return $this->render('article/homepage.html.twig');
}
```

```html
<!-- templates/article/homepage.html.twig l.22-->
<a href="#">
```

```html
<!-- templates/article/homepage.html.twig l.22-->
<a href="{{ path('article_show', {slug: 'why-asteroids-taste-like-bacon'}) }}">
```

## 11. JavaScript & Page-Specific Assets

```html
<!-- templates/base.html.twig -->
{% block javascripts %}
<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
{% endblock %}
```

```js
// public/js/article_show.js
$(document).ready(function() {
    $('.js-like-article').on('click', function(e) {
        e.preventDefault();
        var $link = $(e.currentTarget);
        $link.toggleClass('fa-heart-o').toggleClass('fa-heart');
        $('.js-like-article-count').html('TEST');
    });
});
```

```html
<!-- templates/article/show.html.twig-->

{% block javascripts %}
    {{ parent() }}
    <script src="{{ asset('js/article_show.js') }}"></script>
{% endblock %}
```

## 12. JSON API Endpoint

```php
// src/Controller/ArticleController.php
use Symfony\Component\HttpFoundation\JsonResponse;

// ...

    /**
     * @Route("/news/{slug}/heart", name="article_toggle_heart", methods={"POST"})
     */
    public function toggleArticleHeart($slug)
    {
      return new JsonResponse(['hearts' => rand(5, 100)]);
    }
```

```html
<!-- templates/article/show.html.twig l.21 -->
<a href="{{ path('article_toggle_heart', {slug: slug}) }}" class="fa fa-heart-o like-article js-like-article"></a>
```

```js
// public/js/article_show.js
$(document).ready(function() {
    $('.js-like-article').on('click', function(e) {
      // l.3-7
        $.ajax({
            method: 'POST',
            url: $link.attr('href')
        }).done(function(data) {
           $('.js-like-article-count').html(data.hearts);
        })
    });
});
```

## 13. Services
