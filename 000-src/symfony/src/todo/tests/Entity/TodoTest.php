<?php
namespace App\Tests\Entity;

use App\Entity\Todo;
use App\DataFixtures\TodoFixtures;
use Liip\TestFixturesBundle\Test\FixturesTrait;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class TodoTest extends KernelTestCase
{
    use FixturesTrait;

    public function getEntity(): Todo {
        return (new Todo())
          ->setTitle("Todo not known")
        ;
    }

    public function assertHasErrors(Todo $todo, int $number = 0) {
        self::bootKernel();
        $errors = self::$container->get('validator')->validate($todo);
        $messages = [];
        /** @var ConstraintViolation $error */
        foreach($errors as $error) {
            $messages[] = $error->getPropertyPath() . ' => ' . $error->getMessage();
        }
        $this->assertCount($number, $errors, implode(', ', $messages));
    }

    public function testValidEntity() {
        $todo = $this->getEntity();
        $this->assertHasErrors($todo);
    }

    public function testInvalidNullEntity() {
        $todo = (new Todo());
        $this->assertHasErrors($todo, 1);
    }

    public function testInvalidDouble() {
      self::bootKernel();
      $todo = $this->getEntity()->setTitle("Todo 1");
      $this->loadFixtures([TodoFixtures::class]);
      $this->assertHasErrors($todo, 1);
    }
}
