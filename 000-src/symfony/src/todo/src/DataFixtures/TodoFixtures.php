<?php

namespace App\DataFixtures;

use App\Entity\Todo;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class TodoFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        for ($i_article = 1; $i_article <= 10; $i_article++) {
            $todo = new Todo();
            $todo->setTitle("Todo $i_article")
                ->setContent("Todo Content $i_article")
            ;
            $manager->persist($todo);
        }
        $manager->flush();
    }
}
