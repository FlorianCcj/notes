<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TodoService
{
    /**
     * SerializerInterface $serializer
     */
    private $serializer;

    /**
     * ValidatorInterface $validator
     */
    private $validator;

    public function __construct(
        SerializerInterface $serializer,
        ValidatorInterface $validator
    ) {
        $this->serializer = $serializer;
        $this->validator = $validator;
    }

    public function extractErrors($data)
    {
        $errors = $this->validator->validate($data);
        if (count($errors) > 0) {
            return new Response(
                $this->serializer->serialize(
                    $errors,
                    'json',
                    ['json_encode_options' => JsonResponse::DEFAULT_ENCODING_OPTIONS]
                ),
                Response::HTTP_BAD_REQUEST,
                ['Content-Type' => 'Application/json']
            );
        }
        return null;
    }
}
