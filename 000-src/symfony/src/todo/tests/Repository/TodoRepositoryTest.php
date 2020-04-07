<?php
namespace App\Tests\Repository;

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
