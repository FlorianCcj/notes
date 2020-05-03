Symfony - First Step
####################

init
****

* install php (+ :code:`php -v`)
* install composer (+ :code:`composer -V`)
* install phpcs
* :code:`composer create-project symfony/skeleton demo`
* :code:`composer require symfony/orm-pack`
* :code:`composer require --dev symfony/maker-bundle`
* add in composer

..code-block:: json
    :caption: composer.json
    :name: composer.json

    "scripts": {
        "server": [
            "php -S localhost:8000 -t public"
        ],
        "lint" : [
            "phpcs --standard=PSR1,PSR2 src"
        ]
    },

Controller
**********

* :code:`bin/console make:controller BlogController`

DB
**

init
====

(dans vscode recommend to install :code:`php namespace resolver`)
(use with :code:`alt+ctrl+i`)

* edit :code:`.env`
* :code:`bin/console doctrine:database:create`

entity and migration
====================

* :code:`bin/console make:entity Todo`
* property in lowerCamelCase
* :code:`bin/console make:migration`
* :code:`bin/console doctrine:migrations:migrate`
* :code:`bin/console doctrine:migrations:execute --<up|down> <version>`
* :code:`bin/console doctrine:migrations:execute --up 20200404184326`

fixture
=======

* :code:`composer require orm-fixtures --dev`
* :code:`bin/console make:fixtures TodoFixtures`

.. code-block:: php
    :caption: ArticleFixtures.php
    :name: ArticleFixtures.php

    use App\Entity\Article;

    for($i_article; $i_article <=10; $i_article++){
        $article = new Article();
        $article->setTitle("Article s title n $i_article")
            ->setContent("<p>Article s content n $i_article</p>")
            ->setImage("http://placehold.it/350x150")
            ->setCreatedAt(new \Datetime())
        ;

        $manager->persist($article);
    }
    $manager->flush();

* :code:`bin/console doctrine:fixtures:load`

Dans le controller

:code:`$repository = $this->getDoctrine()->getRepository(Article::class);`

dependency injection
====================

.. code-block:: php
    :name: controller
    :caption: controller

    /**
     * @Route("/blog/{id}", name="blog_show")
     * @ParamConverter("post", class="SensioBlogBundle:Post")
     */
    public function blog(Article $article){
        // code
    }

to manage exception in json

.. code-block:: yaml
    :name: config/routes/annotations.yaml
    :caption: config/routes/annotations.yaml

    # config/routes/annotations.yaml
    controllers:
        ...
        defaults:
            _format: json

form
****

* :code:`composer require form`
* :code:`bin/console make:form <FormName> <classBaseName>`
* :code:`bin/console make:form ArticleType Article`

.. code-block:: php
    :caption: controller
    :name: controller

    $form = $this->createForm(ArticleType::class, $article);
 
    $form->handleRequest($request);

    if($form->isValid()){
      // persist
      // flush
    }

validation
==========

.. code-block:: php
    :caption: entity
    :name: entity

    use Symfony\Component\Validator\Constraints as Assert;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(min=10, max=255)
     * @Assert\Url()
     */

Security
********

TODO

Serialisation
*************

Firt try
========

:code:`composer require symfony/serializer`

.. code-block:: yaml
    :name: config/services.yaml
    :caption: config/services.yaml

    services:
        get_set_method_normalizer:
            class: Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer
            tags: [serializer.normalizer]

.. code-block: php

    use Symfony\Component\Routing\Annotation\Route;
    use App\Repository\PostRepository;

    /**
     * @Route("/api/post", name="api_post_list", methods={"GET"})
     */
    public function list(PostRepository $postRepository, NormalizerInterface $normalizer){
        // get posts
        $posts = $postRepository->findAll();

        // all property are private, so you need a normalizer to access to the getter
        // //!\\ WARNING //!\\ if there is a reference in comment, you will have a circular reference

        $postsNormalizes = $normalizer->normalize($posts);
        $json = json_encore($postsNormalizes);

        return $json;
    }

Fix it
======

.. code-block:: php

    use Symfony\Component\Serializer\Annotation\Groups;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("posts:list")
     */

.. code-block: php

    use Symfony\Component\Routing\Annotation\Route;
    use App\Repository\PostRepository;

    /**
     * @Route("/api/post", name="api_post_list", methods={"GET"})
     */
    public function list(PostRepository $postRepository, NormalizerInterface $normalizer){
        // get posts
        $posts = $postRepository->findAll();

        // all property are private, so you need a normalizer to access to the getter
        // only focus ic property target by this group
        $postsNormalizes = $normalizer->normalize($posts, null, ['groups' => 'post:list']);
        $json = json_encore($postsNormalizes);

        return new Responce($json, 200, [
            "Content-Type" => "Application/json"
        ]);
    }

Reduce code
===========

.. code-block: php

    use Symfony\Component\Routing\Annotation\Route;
    use App\Repository\PostRepository;

    /**
     * @Route("/api/post", name="api_post_list", methods={"GET"})
     */
    public function list(PostRepository $postRepository, SerializerInterface $serializer){
        // get posts
        $posts = $postRepository->findAll();
        $json = $serializer->serialize($posts, 'json', ['groups' => 'post:list']);

        return new JsonResponce($json, 200, [], true);
    }

Reduce code v2
==============

.. code-block: php

    use Symfony\Component\Routing\Annotation\Route;
    use App\Repository\PostRepository;

    /**
     * @Route("/api/post", name="api_post_list", methods={"GET"})
     */
    public function list(PostRepository $postRepository) {
        return $this->json($postRepository->findAll(), 200, [], ['groups' => 'post:list']);
    }

Deserialisation
***************

To install validator: :code:`composer require symfony/validator`

.. code-block:: php

    /**
     * @Route("/api/post", name="api_post_create", methods={"POST"})
     */
    public function post(Request $request, SerializerInterface $serializer, EntityMaganerInterface $em) {
        $receivedJson = $request->getContent();
        try {
            $post = $serializer->deserialize($receivedJson, Post::class, 'json');
            $em->persist($post);
            $em->flush();
            return $this->json($post, 201, [], ['groups' => 'post:list']);
        } catch(NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400)
        }
    }

If you want to add constraints, do it like in :code:`validation` with :code:`Assert` in the :code:`Entity`

.. code-block:: php

    /**
     * @Route("/api/post", name="api_post_create", methods={"POST"})
     */
    public function post(Request $request, SerializerInterface $serializer, EntityMaganerInterface $em, ValidatorInterface $validator) {
        $receivedJson = $request->getContent();
        try {
            $post = $serializer->deserialize($receivedJson, Post::class, 'json');

            $errors = $validator->validate($post);
            if (count($errors) > 0) {
                return $this->json(errors, 400);
            }

            $em->persist($post);
            $em->flush();
            return $this->json($post, 201, [], ['groups' => 'post:list']);
        } catch(NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400)
        }
    }

Paramconverter
**************

Todo

:code:`composer require annotations`

.. code-block:: php

    /**
     * @Route("/{category_slug}/{slug}", name="content_show")
     * @ParamConverter("content", options={"mapping": {"slug": "slug"}})
     * @ParamConverter("category", options={"mapping": {"category_slug": "slug"}})
     * ParamConverter("category", class="Category::class", options={"mapping": {"category_slug": "slug"}})
     * @Method("GET")
     */
    public function show(Category $category, Content $content)

debug
*****

* list entity: :code:`bin/console doctrine:mapping:info`
* list bundle: :code:`bin/console config:dump-reference`
* list service: :code:`bin/console debug:autowiring`

request
*******

Force answer in json: add header :code:`Accept: application/json`

sources
*******

* https://medium.com/q-software/symfony-5-the-rest-the-crud-and-the-swag-7430cb84cd5
* https://www.youtube.com/watch?v=UTusmVpwJXo&list=PLpUhHhXoxrjdQLodxlHFY09_9XzqdPBW8