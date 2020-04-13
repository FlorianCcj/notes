Methodology - Event Sourcing and Domain Driven Design (DDD)
###########################################################

CQRS, Fonctionnel, Event Sourcing & Domain Driven Design
********************************************************

:source: https://afup.org/talks/2628-cqrs-fonctionnel-event-sourcing-domain-driven-design

CQRS: Commad Query Responsability Segregation

Some diff
=========

* data-driven: focus on the data and how to manage it
  * more or less means CRUD
    * data (mcd)
      * Subscription Plan
      * Subscription
      * Membership
      * Session
    * then controller
      * SubscriptionController
      * UserController
      * DashboardController
      * SessionController
  * but ... plu value ... as much as an excel
* domain-driven: focus on the behavior, what function do we need
  * more or less task based ui
    * Uses cases
      * CreateSubscriptionPlan
      * Subscribe
      * SubscriptionGrossRevenue
      * StartSession
  * no need to have all use case to work

entity vs value object
======================

* entity
  * has lifecycle
  * subscription
  * membership
  * session
* value object
  * has no lifecycle
  * DateTime
  * Money
  * BillingInterval (more business)

Agregate root
=============

* is the main object which permit to manage all the other object
  * enforce integrity
  * some object have a lifecycle which depend on some other
    * if someone have a subscription, if you remove the guy, the subscription do not need to exist
* query and command
  * command: write, mutation
    * need an handler which will to business
    * the handler manage only interface
      * permit to replace when you want
      * constructor -> manage colaborator
      * listento -> which class will activate the handle
      * handle -> manage business, and return only the id, you need 
  * query: read

Use it
======

.. code-block:: php

    $repository = nez SubscriptionPlanRepository();
    $handler = new CreateSubscriptionPlanCommandHandler($repository);
    $response = $handler->handle(
      new CreateSubscriptionPlanCommand(
        'label', 12, 20, '2018-10-02', ['gym', 'tennis']
      )
    );

    $response->value();

CQS
===

* Query model
  * query
  * Handler
  * repository
  * db
* Command model
  * command
  * handler
  * repository
  * db
* but in CQS {repository, db} in query and in command model are the same
* keep id control, use uuid that you control
* repositoryInterface
  * add
  * get
  * delete
  * getAll
  * find

the bus
-------

When we need some behavior which are not in the MVP, nor query nor command
* like, performance, login, logging, cache, error, etc
* the bus call middleware
  * middleware
    * __construct(CommandBusMiddleware $next, LoggerInterface $logger)
    * dispatch(Command $command): CommandResponse
      * code before
      * then call next operation
      * code after
  * the dispatcher
    * match command and the handler
    * __construct(iterator $handlers) { foreach ($handlers as $handler) { $this->handlers[$handler->listenTo()] = $handler; } }
      * register each handler with its associated command
    * dispatch(Command $command): CommandResponse
* then call the dispatcher which call handler
* recuperation of all handler thanks to dependencies injection container of sf

.. code-block:: php
    :name: dispatcher
    :caption: dispatcher

    class CommandBusDispatcher implements CommandBusMiddleware
    {
      public function __construct(iterator $handlers) {
        foreach ($handlers as $handler) {
          $this->handlers[$handler->listenTo()] = $handler;
        }
      }

      public function dispatch(Command $command): CommandResponse {
        $commandClass = get_class($command);
        $handler = $this->handlers[$commandClass];
        if ($handler == null) {
          throw new \LogicException(
            "Handler for command $commandClass not found"
          );
        }

        return $handler->handle($command);
      }
    }

.. code-block:: php
    :name: CommandBusFactory
    :caption: CommandBusFactory

    Class CommandBusFactory
    {
      static function build(
        iterable $handler,
        Logger $logger
      ): CommandBus {
        return new LoggerBusMiddleWare(
          new CommandBusDispatcher($handler),
          $logger
        );
      }
    }

.. code-block:: php
    :name: src/Kernel.php
    :caption: src/Kernel.php

    $container
      ->registerForAutoconfiguration(CommandHandler::class)
      ->addTag('ddd.command_handler')
    ;

.. code-block:: yaml
    :name: config/services.yaml
    :caption: config/services.yaml

    services:
        App\Common\Infrastructure\CommandBus:
            factory: 'App\Service\CommandBusFactory:build'
            arguments: [!tagged ddd.command_handler, @logger]
            lazy: true

.. code-block:: php
    :name: controller example
    :caption: controller example

    /**
     * Class PaymentResource
     * @Route("/plans")
     */
    class PlansResource {
      public function __construct(
        CommandBus $commandBus,
        SerializerInterface $serializer
      ) {
        $this->commandBus = $commandBus;
        $this->serializer = $serializer;
      }

      /**
       * @Route("/", method={POST})
       */
      public function create(Request $request)
      {
        $command = $this->serializer->deserialize(
          $request->getContent(),
          CreateSubscriptionPlanCommand::class,
          'json'
        );

        $response = $this->commandBus->dispatch($command);

        return Response::create($response->value(), 201);
      }
    }

.. code-block:: php
    :name: DoctrineFluchMiddleware
    :caption: DoctrineFluchMiddleware

    class DoctrineFluchMiddleware
    {
      function __construct(CommandBus $next, EntityManager $em)
      {
        $this->next = $next;
        $this->em = $em;
      }

      function dispatch(Command $command): CommandResponse
      {
        $this-em->getConnection()->beginTransaction();
        try {
          $commandResponse = $this->next->dispatch($command);
          $this->em->flush();
          $this->em->getConnection->commit();
        } catch() {
          $this->em->rollback();
        }
        return $commandResponse;
      }
    }

Domain event, business side-effects
-----------------------------------

* :code:`event` are used for all that is not business nor technic needed
  * :code:`event` happened in an other process if it fail it will not affect the :code:`command`
  * a :code:`command` present a intent, a :code:`event` present a fact
  * an :code:`eventHandler` always return void
  * example1: in a user subscribe, send a mail to confirm
  * example2: in event sourcing, when you realise a command, update the view database
  * example3: update a legacy db
  * example4: make stats and stock it

.. code-block:: php
    :name: event example
    :caption: event example

    namespace App\Membership\Domain;

    class MemberJoined implement Event
    {
      public $newMemberId;
      public $chosenPlanId;

      public __construct(Uuid $newMemberId, Uuid $chosenPlanId)
      {
        $this->newMemberId = $newMemberId;
        $this->chosenPlanId = $chosenPlanId;
      }
    }

.. code-block:: php
    :name: handler
    :caption: handler

    class JoinMembershipCommandHandler implements CommandHandler
    {
      public function handle(Command $command): CommandResponse
      {
        /* ... */
        return CommandResponse::withValue(
          $membership->id(),
          new MemberJoined($membership->id(), $plan->id())
        );
      }
    }

Withvalue signature
:code:`static function withValue($value, Event... $events): CommandResponse`

.. code-block:: php
    :main: event handler
    :caption: event handler

    class SendWelcomeMailOnMemberJoined implements EventHandler
    {
      public function __construct(
        Mailer $mailer,
        SubscriptionPlanRepository $planRepository,
        MemberRepository $memberRepository
      ) { /* ... */ }

      public function handle(MemberJoined $event): void
      {
        $member = $this->memberRepository->get($event->memberId);
        $plan = $this->memberRepository->get($event->choosenPlanId);

        $message = "Hello .$member->firstname(), welcome in SportLand We hope you'll ennjoy your $plan->name() subscription";

        $mailer->send($member->email(), $message);
      }

      public function listenTo(): string
      {
        return MemberJoined::class;
      }
    }

.. code-block:: php
    :name: event dispatcher middleware
    :caption: event dispatcher middleware

    class EventDispatcherBusMiddleware implements CommandBusMiddleware
    {
      public function __construct(CommandBus $next, EventBus $eventBus)
      { /* ... */ }

      public function dispatch(Command $command): CommandResponse
      {
        $commandResponse = $this->bus->dispatch($command);
        if ($commandResponse->hasEvents()) {
          foreach ($commandResponse->events() as $event) {
            $this->eventBus->dispatch($event);
          }
        }
        return $commandResponse;
      }
    }

.. code-block:: php
    :name: event dispatcher
    :caption: event dispatcher

    class EventBus implements \App\Common\DDD\EventBus
    {
      public function __construct(iterable $handlers)
      {
        foreach ($handlers as $handler) {
          $this->handlers[] = $handler;
        }
      }

      public function dispatch(Event $event):void
      {
        $eventClass = get_class($event);
        $matchingHandlers = array_filter(
          $this->handlers,
          function($handler) use ($eventClass) {
            return $handler->listenTo() === $eventClass;
          }
        )

        foreach ($matchingHandlers as $handler) {
          $handler->handle($event);
        }
      }
    }

CQRS
----

* repository have now only :code:`get`, :code:`add`, :code:`delete`
* not need repository in :code:`query model`, it is free for all

.. code-block:: php
    :name: exemple repository, implements with doctrine
    :caption: exemple repository, implements with doctrine

    class BasketDoctrine implements Repository
    {
      public function __construct(EntityManagerInterface $em)
      {
        $this->em = $em;
      }

      public function get(Uuid $uuid): Basket
      {
        $data = $this->em
          ->getRepository(Basket::class)
          ->find($uuid)
        ;
        if ($data === null) {
          throw new EntityNotFoundException();
        }

        return Basket::mapFromDoctrine($data);
      }

      public function add(Basket $data): void
      {
        $this->em->merge(Basket::mapFromPayment($data));
      }
    }

.. code-block:: php
    :name: query handler
    :caption: query handler

    class FindActiveSubscriptionPlansQueryHandler
    {
      private $connection;

      public function __construct(EntityManagerInterface $em)
      {
        $this->em = $em;
      }

      public function handle(Query $query): array {
        $query = $this->em->query("SELECT NEW SubscriptionViewModel(s.name, s.prive) FROM Subscription s");
        return $query->getResult();
      }

      public function listenTo(): string {
        return FindAllActiveSubscriptionPlansQuery::class;
      }
    }

http://blog.arkency.com/2016/05/the-anatomy-of-domain-event/
https://www.youtube.com/watch?v=QGGZs0KqxZw