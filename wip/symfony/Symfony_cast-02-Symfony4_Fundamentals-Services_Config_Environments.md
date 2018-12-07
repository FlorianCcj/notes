# Symfony cast - 02 - Symfony 4 Fundamentals: Services, Config & Environments

## 01. Bundles give you Service

Vendor bundle are defined in `config/bundles.php`

with this config, service are included in kernel

## 02. KnpMarkdownBundle & Its Service

`composer require knplabs/knp-markdown-bundle`

```php
// src/Controller/ArticleController.php
use Michelf\MarkdownInterface;

class ArticleController extends AbstractController

{
    public function show($slug, MarkdownInterface $markdown)

    {
        $articleContent = <<<EOF
EOF;
        $articleContent = $markdown->transform($articleContent);
    }
}
```

```html
<!-- templates/article/show.html.twig -->
{% block body %}
<div class="container">
    <div class="row">
        <div class="col-sm-12">
            <div class="show-article-container p-3 mt-4">
              <!-- l.11-25 -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="article-text">

                            {{ articleContent|raw }}
                        </div>
                    </div>
                </div>
                <!-- l.33-71 -->
            </div>
        </div>
    </div>
</div>
{% endblock %}
```

## 03. The Cache Service

```php
// src/Controller/ArticleController.php
use Symfony\Component\Cache\Adapter\AdapterInterface;

class ArticleController extends AbstractController
{
    public function show($slug, MarkdownInterface $markdown, AdapterInterface $cache)
    {
      $articleContent = <<<EOF
EOF;
       $item = $cache->getItem('markdown_'.md5($articleContent));
       if (!$item->isHit()) {
         $item->set($markdown->transform($articleContent));
         $cache->save($item);
       }
       $articleContent = $item->get();
    }
}
```

## 04. Configuring a Bundle

`./bin/console config:dump KnpMarkdownBundle`

```php
// src/Controller/ArticleController.php
class ArticleController extends AbstractController
{
    public function show($slug, MarkdownInterface $markdown, AdapterInterface $cache)

    {
        dump($markdown);die;
    }
}
```

```yaml
# config/packages/knp_markdown.yaml
knp_markdown:
    parser:
        service: markdown.parser.light
```

## 05. debug:container & Cache Config

`./bin/console debug:autowiring`

`./bin/console debug:container --show-private`

```bash
./bin/console config:dump framework
./bin/console debug:config framework
```

## 06. Explore! Environments & Config Files

## 07. Leveraging the prod Environment

## 08. Creating Services!

## 09. Using Non-Standard Services: Logger Channels

## 10. service.yaml & the Amazing bind

```yaml
# config/services.yaml
services:
  _defaults:
    autowire: true      # Automatically injects dependencies in your services.
    autoconfigure: true # Automatically registers your services as commands, event subscribers, etc.
    public: false       # Allows optimizing the container by removing unused services; this also means
    bind:               # only in construct but pratic to focus
      $markdownLogger: '@monolog.logger.markdown'

  App\:
    resource: '../src/*'
    exclude: '../src/{Entity,Migrations,Tests}'

  App\Controller\:
    resource: '../src/Controller'
    tags: ['controller.service_arguments']

  App\Service\MarkdownHelper:
    arguments:
      $logger: '@monolog.logger.markdown'
```

## 11. Config Parameters

```yaml
# config/packages/dev/framework.yaml
framework:
    cache:
      app: cache.adapter.filesystem
      # app: cache.adapter.apcu
```

```yaml
# config/packages/dev/framework.yaml
parameters:
    cache_adapter: cache.adapter.filesystem
framework:
    cache:
        app: '%cache_adapter%'
```

```yaml
# config/services.yaml
parameters:
   cache_adapter: cache.adapter.apcu.filesystem
# config/services_dev.yaml
parameters:
   cache_adapter: cache.adapter.filesystem
# config/packages/dev/framework.yaml
framework:
    cache:
        app: '%cache_adapter%'
```

```bash
php bin/console debug:container --parameters
```

## 12. Constructors for your Controller

```bash
composer require nexylan/slack-bundle php-http/guzzle6-adapter:1.1.1
```

## 13. Installing Bundles with "average" Docs

## 14. Autowiring Aliases

## 15. Environment Variables

## 16. Env Var Tricks & on Production

## 17. Bonus! LoggerTrait & Setter Injection

## 18. MakerBundle

## 19. Fun with Commands
