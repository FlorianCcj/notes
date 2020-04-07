Symfony - test
##############

Chapitre 01 - Intro et config
*****************************

3 types: 
* unitaire: alone in the dark
* integration: a class in her context
* fonctionnel (ou End to End): like a user

When to write the
* to check: when you get a code, you write test to check if your modification do not change the goal of the function
* Test Driven Development: write test before coding

Tools
* PHPUnit
* Behat / Puppeteer / Cypress

* :code:`composer require --dev symfony/phpunit-bridge`
* :code:`bin /phpunit`
* test class need to finish by :code:`Test`
* test method need to begin by :code:`test`
* class to test
  * :code:`PHPUnit\Framework\TestCase`: to unit test
  * :code:`Symfony\Bundle\FrameworkBundle\Test\KernelTestCase`: to integration test, can access to Kernel
  * :code:`Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;`: to check as user (e2e test)

.. code-block:: php
    :name: Tests/AppTest.php
    :caption: Tests/AppTest.php

    <?php
    namespace App\Tests;

    use PHPUnit\Framework\TestCase;

    class appTest extends TestCase {
        public function testTestsAreWorking () {
            $this->assertEquals(2, 1+1);
        }
    }

:code:`config` and :code:`.env` used is test config

Chapitre 02 - Tester avec une base de donnee
********************************************

* :code:`composer require --dev orm-fixtures`
* :code:`composer make:fixtures TodoFixtures`

.. code-block:: php

.. code-block:: php
    :caption: TodoFixtures.php
    :name: TodoFixtures.php

    use App\Entity\Todo;

    for($i_todo; $i_todo <=10; $i_todo++){
        $todo = new Todo();
        $todo->setTitle("Todo s title n $i_todo")
            ->setContent("<p>Todo s content n $i_todo</p>")
            ->setImage("http://placehold.it/350x150")
            ->setCreatedAt(new \Datetime())
        ;

        $manager->persist($todo);
    }
    $manager->flush();

.. code-block:: php
    :name: Tests/Repository/TodoRepositoryTest.php
    :caption: Tests/Repository/TodoRepositoryTest.php

    <?php

    namespace App\Tests\Repository;

    use App\Repository\TodoRepository;
    use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

    class TodoRepositoryTest extends KernelTestCase
    {
        public function testCount() {
            self::bootKernel();
            $users = self::$container->get(TodoRepository::class)->count([]);
            $this->assertEquals(10, $users);
        }
    }

* config :code:`.env.test`
* :code:`bin/console doctrine:database:create --env-test`
* :code:`bin/console doctrine:schema:update --env-test --force`

Liip bundle

* :code:`composer require --dev liip/test-fixtures-bundle:^1.0.0`

.. code-block:: php
    :name: tests/Repository/TodoRepositoryTest.php
    :caption: tests/Repository/TodoRepositoryTest.php

    <?php
    namespace App\Tests\Repository;

    // tests/Repository/TodoRepositoryTest.php

    use App\DataFixtures\TodoFixtures;
    use App\Repository\TodoRepository;
    use Liip\TestFixturesBundle\Test\FixturesTrait;
    use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

    class TodoRepositoryTest extends KernelTestCase
    {

        use FixturesTrait;

        public function testCount() {
            self::bootKernel();
            $this->loadFixtures([TodoFixtures::class]);
            $users = self::$container->get(TodoRepository::class)->count([]);
            $this->assertEquals(10, $users);
        }
    }


:warning: you should switch to SQLite as well as use FixturesTrait to test ... but do not work on my machine



.. code

Alice Bundle

* :code:`composer require --dev theofidry/alice-data-fixtures`

Chapitre 03 - Tester une entite
*******************************

.. code-block:: php
    :name: tests/Entity/TodoTest.php
    :caption: tests/Entity/TodoTest.php

    <?php
    namespace App\Tests\Entity;

    use App\Entity\Todo;
    use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

    class TodoTest extends KernelTestCase
    {
        public function getEntity(): Todo {
            return (new Todo())
              ->setTitle("Todo 1")
            ;
        }

        public function assertHasErrors(Todo $todo, int $number = 0) {
            self::bootKernel();
            $errors = self::$container->get('validator')->validate($todo);
            $this->assertCount($number, $errors);
        }

        public function testValidEntity() {
            $todo = $this->getEntity();
            $this->assertHasErrors($todo);
        }

        public function testInvalidEntity() {
            $todo = $this->getEntity()->setTitle(null);
            $this->assertHasErrors($todo, 0);
        }
    }

You can filter with :code:`bin/phpunit --filter=TodoTest`

Chapitre 04 - Tester un validateur
**********************************

Chapitre 05 - Tester un eventSubscriber
***************************************

Chapitre 06 - Tester un Controller
**********************************

* :code:`composer require --dev symfony/browser-kit`

.. code-block:: php

    <?php
    namespace App\Tests\Controller;

    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

    class TodoControllerTest extends WebTestCase
    {
        public function testTodoList() {
            $client = static::createClient();
            $client->request('GET', '/api/todos');
            $this->assertResponseStatusCodeSame(Response::HTTP_OK);
        }
    }

Chapitre 07 - Tester EndToEnd avec Panther
******************************************

To see
******

.. code-block::php

    <?php

    namespace App\Tests;

    use App\Entity\User;
    use App\Tests\Controller\NeedLoginTrait;
    use Liip\TestFixturesBundle\Test\FixturesTrait;
    use Symfony\Bundle\FrameworkBundle\KernelBrowser;
    use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
    use Symfony\Component\HttpFoundation\Response;

    class ApplicationAvailabilityFunctionalTest extends WebTestCase
    {
        use FixturesTrait, NeedLoginTrait;

        /** @var KernelBrowser */
        private $client;

        /** @var User[] */
        private $users = [];

        protected function setUp(): void
        {
            $this->users = $this->loadFixtureFiles([__DIR__ . '/Fixtures/users.yaml']);
            $this->client = static::createClient();
        }

        /**
        * @dataProvider urlPublicProvider
        * @param string $url
        */
        public function testPageIsSuccessful(string $url)
        {
            $this->client->request('GET', $url);
            $this->assertResponseIsSuccessful();
        }

        /**
        * @dataProvider urlRestrictedAdminProvider
        * @dataProvider urlRestrictedModeratorProvider
        * @dataProvider urlRestrictedUserProvider
        * @param string $url
        */
        public function testRedirectToLogin(string $url)
        {
            $this->client->request('GET', $url);
            $this->assertResponseRedirects('/login');
        }

        /**
        * @dataProvider urlRestrictedUserProvider
        * @param string $url
        */
        public function testAuthenticatedUserAccess(string $url)
        {
            $this->checkStatusUrl($url, 'user_demo', Response::HTTP_OK);
        }

        /**
        * @param string $url
        * @param string $username
        * @param int $expectedStatus
        */
        private function checkStatusUrl(string $url, string $username, int $expectedStatus)
        {
            $this->logIn($this->client, $this->users[$username]);
            $this->client->request('GET', $url);
            $this->assertResponseStatusCodeSame($expectedStatus);
        }

        /**
        * @dataProvider urlRestrictedAdminProvider
        * @param string $url
        */
        public function testAuthenticatedAdminAccess(string $url)
        {
            $this->checkStatusUrl($url, 'user_admin', Response::HTTP_OK);
            $this->checkStatusUrl($url, 'user_moderator', Response::HTTP_FORBIDDEN);
            $this->checkStatusUrl($url, 'user_demo', Response::HTTP_FORBIDDEN);
        }

        /**
        * @dataProvider urlRestrictedModeratorProvider
        * @param string $url
        */
        public function testAuthenticatedModeratorAccess(string $url)
        {
            $this->checkStatusUrl($url, 'user_admin', Response::HTTP_OK);
            $this->checkStatusUrl($url, 'user_moderator', Response::HTTP_OK);
            $this->checkStatusUrl($url, 'user_demo', Response::HTTP_FORBIDDEN);
        }

        public function urlPublicProvider()
        {
            // Pages
            yield 'page_forums' => ['/forums'];
            yield 'page_members' => ['/members'];
            yield 'page_team' => ['/team'];

            // Security
            yield 'security_login' => ['/login'];
        }

        public function urlRestrictedAdminProvider()
        {
            // Categories
            yield 'panel_categories' => ['/panel/categories'];
            yield 'panel_categories_add' => ['/panel/categories/add'];

            // Forums
            yield 'panel_forums' => ['/panel/forums'];
        }

        public function urlRestrictedModeratorProvider()
        {
            yield 'panel' => ['/panel'];

            // Reports
            yield 'panel_reports' => ['/panel/reports'];

            // Users
            yield 'panel_users' => ['/panel/users'];
        }

        public function urlRestrictedUserProvider()
        {
            // User profile
            yield 'user_profile' => ['/user/demo'];
            yield 'user_profile_messages' => ['/user/demo/messages'];
            yield 'user_profile_threads' => ['/user/demo/threads'];
        }
    }

Sources
*******

* https://www.youtube.com/watch?v=ukocHoa8y3o&list=PLjwdMgw5TTLWtWmdMzPaoc45Iztu7tVQ8&index=1