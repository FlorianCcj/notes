<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Form\TodoType;
use App\Services\TodoService;
use App\Repository\TodoRepository;
use App\Controller\CustomAbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class TodoController extends CustomAbstractController
{
    /**
     * @Route("/todos/{id}", name="todo_get", methods={"GET"}, requirements={"id":"\d+"})
     */
    public function getIt(Todo $todo)
    {
        return $this->json($todo, Response::HTTP_OK, [], ['groups' => ['todo:get']]);
    }

    /**
     * @Route("/todos", name="todo_list", methods={"GET"})
     */
    public function list(TodoRepository $todoRepository)
    {
        return $this->json($todoRepository->findAll(), Response::HTTP_OK, [], ['groups' => ['todo:list']]);
    }

    /**
     * @Route("/todos", name="todo_create", methods={"POST"})
     */
    public function create(
        Request $request,
        TodoService $todoService
    ) {
        $receivedJson = $this->secureContent($request->getContent());
        $data = $this->serializer->deserialize($receivedJson, Todo::class, 'json');

        $error = $todoService->extractErrors($data);
        if ($error !== null) {
            return $error;
        }

        $this->save($data);

        return $this->json($data, Response::HTTP_CREATED, [], ['groups' => ['todo:get']]);
    }

    /**
     * @Route("/todos/{id}", name="todo_edit", methods={"PUT"})
     */
    public function edit(
        Todo $todo,
        Request $request,
        TodoService $todoService
    ) {
        $receivedJson = $this->secureContent($request->getContent());
        $data = json_decode($receivedJson, true);
        $form = $this->createForm(TodoType::class, $todo);

        $error = $todoService->extractErrors(
            $this->serializer->deserialize($receivedJson, Todo::class, 'json')
        );
        if ($error !== null) {
            return $error;
        }

        $form->submit($data);
        $this->save($todo);

        return $this->json($todo, Response::HTTP_OK, [], ['groups' => ['todo:get']]);
    }

    /**
     * @Route("/todos/{id}", name="todo_delete", methods={"DELETE"})
     */
    public function delete(Todo $todo)
    {
        $this->em->remove($todo);
        $this->em->flush();

        return $this->json(null, Response::HTTP_NO_CONTENT, [], []);
    }
}
