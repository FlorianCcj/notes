<?php

namespace App\Controller;

use App\Services\TodoService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CustomAbstractController extends AbstractController
{

    /**
     * EntityManagerInterface $em
     */
    protected $em;

    /**
     * SerializerInterface $serializer
     */
    protected $serializer;

    public function __construct(
        EntityManagerInterface $em,
        SerializerInterface $serializer
    ) {
        $this->em = $em;
        $this->serializer = $serializer;
    }

    protected function secureContent($content)
    {
        return $content === "" ? "{}" : $content;
    }

    protected function save($data)
    {
        $this->em->persist($data);
        $this->em->flush();
    }
}
