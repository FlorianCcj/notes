<?php
namespace App\Tests\Controller;

use App\Entity\Todo;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use ApiPlatform\Core\Bridge\Symfony\Bundle\Test\ApiTestCase;

class TodoControllerTest extends WebTestCase
{
    /** AbstractBrowser $client (typehint only possible in php 7.4)*/
    public $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    public function getsUrlsProvider()
    {
        yield 'todo_create-ko' => ['POST', '/api/todos', Response::HTTP_BAD_REQUEST];

        yield 'todo_delete-ok' => ['DELETE', '/api/todos/1', Response::HTTP_NO_CONTENT];
        yield 'todo_delete-ko' => ['DELETE', '/api/todos/1', Response::HTTP_NOT_FOUND];

        yield 'todo_get-ok' => ['GET', '/api/todos/10', Response::HTTP_OK];
        yield 'todo_get-ko-not_found' => ['GET', '/api/todos/999', Response::HTTP_NOT_FOUND];
        yield 'todo_get-ko-bad_param' => ['GET', '/api/todos/haha', Response::HTTP_METHOD_NOT_ALLOWED];

        yield 'todo_list' => ['GET', '/api/todos', Response::HTTP_OK];
    }
    /* ---------------- smoke test ---------------- */

    /**
     * @group smoketest
     * @group functionnaltest
     * @dataProvider getsUrlsProvider
     */
    public function testReturnCode(string $method, string $url, int $returnCode) {
        $this->client->request($method, $url);
        $this->assertResponseStatusCodeSame($returnCode);
    }

    /* ---------------- todo_create ---------------- */

    public function testTodoCreate() {
        $data = [
            'title' => 'Hello I am a new post'
        ];

        $this->client->request('POST', '/api/todos', [], [], [], json_encode($data));
        $this->assertResponseStatusCodeSame(Response::HTTP_CREATED);

        $json = json_decode($this->client->getResponse()->getContent(), true);
        static::assertArrayHasKey('title', $json);
        static::assertEquals($json['title'], $data['title']);
    }

    public function testTodoCreateFailure() {
        $data = [
            'title' => 'Hello I am a new post'
        ];

        $this->client->request('POST', '/api/todos', [], [], [], json_encode($data));
        $this->assertResponseStatusCodeSame(Response::HTTP_BAD_REQUEST);
    }

    /* ---------------- todo_delete ---------------- */
    /* ---------------- todo_edit ---------------- */

    public function testTodoEdit() {
        $data = [
            'title' => 'new title for todo 2'
        ];

        $this->client->request('PUT', '/api/todos/2', [], [], [], json_encode($data));
        $this->assertResponseStatusCodeSame(Response::HTTP_OK);

        $json = json_decode($this->client->getResponse()->getContent(), true);
        static::assertArrayHasKey('title', $json);
        static::assertEquals($json['title'], $data['title']);
    }

    /* ---------------- todo_get ---------------- */

    public function testTodoGetContent() {
        $this->client->request('GET', '/api/todos/10');

        $json = json_decode($this->client->getResponse()->getContent(), true);

        static::assertArrayHasKey('title', $json);
        static::assertIsString($json['title']);
    }

    /* ---------------- todo_list ---------------- */

    /**
     * @group functionnaltest
     */
    public function testTodoListContent() {
        $this->client->request('GET', '/api/todos');

        $json = json_decode($this->client->getResponse()->getContent(), true);
        // Check number of results
        static::assertCount(10, $json);

        // Check first item format
        $firstItem = $json[0];
        static::assertArrayHasKey('title', $firstItem);
        static::assertIsString($firstItem['title']);
    }
}
