Methodology - architecture
##########################

Clean architecture
******************

:source: https://www.youtube.com/watch?v=LTxJFQ6xmzM (2020.08.17)

* hexagonal architecture
* onion architecture
* screaming architecture
* MVP
* Use case driven approach (BCE)

Classic project

* evolution

  * begin, controller call model, then send data to view
  * but to easier management view call model to know the age, that ok but it is the view which command the model
  * for traduction too, we use pipe (view) to call db and to have the translation

* architecture

  * entry: api, cli, amqp
  * app: business code
  * external dependancies: db, api, amqp, mail

* problem

  * to send a mail, we call a :code:`lib` to create an :code:`object` which cill send a mail
  * but the :code:`lib` is now needed and can t change
  * and to test you will need to mock the :code:`lib`
  * => :code:`lib` update => business code update, for same function

* solution

  * create a class, used by every one, if :code:`lib` update, just one class update
  * but still :code:`lib` dependant
  * use an interface, an interface which will be implement by an external class
  * the external class will transfor your business function (sendToAdmin) to :code:`lib` object
  * to test you can easily create a class which implement the interface
  * input: external call only know interface, and we use our implementation which always implement the interface
  * dependancies: you make an interface which will be implement by the lib (just with an adapter)

in fact this only hexagonal architecture

Where is the code

* Use case driven action

  * one class => one action (use case)
  * the use case is the input and will manage all the workflow
  * each class have a function :code:`execute`, or :code:`__invoke`
  * it take argument from the input boundary (port or input)
  * instead of return, send to the output boundary
  * execute is a business function, it do not take technical argument
  * argument register are Data Transfert Object
  * DTO attribute are public (no getter nor setter)
  * DTO only get string, number
  * the same way for the output boundary, execute do not take entity, but already serialized entity
  * execute argument are DTO, next class (can be output boundary)
  * output boundary have a ::code:`present` function which take :code:`response` argument and send it
  * a use case file

    * use case interface
    * use case implementation
    * use case DTO (argument of :code:`execute` implementation)
    * DTO output boundary
    * interface ouput boundary

.. code-block:: php
  :name: use case example

  public function execute(LoginRequest $request, LoginOutput $output) {

    $response = new LoginResponse();
    $user = $this->userRepository->getByEmail($request->email);

    if ($request->password === $user->password()) {
      $response->setUser($this->convertUser($user));
    } else {
      $response->addError('password','Wrong password');
    }

    return $output->present($response)
  }

* for the view

  * we will create a new object :code:`presenter`
  * presenter will take the output of the output boundary and will format it (a View Model) to be perfect to the view
  * we can change of prensenter to ask a JSON, HTML, XML presenter

.. code-block:: php
  :name: controller example

  $registerRequest = RegisterRequest::fromPost($_POST):

  if ($responseTypeFromHeader === 'html') {
    $presenter = new RegisterHtmlPresenter();
    $view = new RegisterHtmlView();
  } else {
    $presenter = new RegisterJsonPresenter();
    $view = new RegisterJsonView();
  }

  $useCase = new Register(/* other service */):
  $useCase->execute($registerRequest, $presenter);
  echo $view->generateView($presenter->viewModel());

.. code-block:: php
  :name: test example

  class LoginTest extends TestCase implements LoginPresenter {
  /** @var LoginResponse */
  private response

  public function present(LoginResponse $response) {
    $this->response = $response;
  }

  public function test_it_saves_the_logged_user_in_the_response() {
    $useCase = new Login(/* ... */);
    $useCase->execute(new LoginRequest('user@gmail.com', 'password'), $this);

    $this->assertSame($this->registerUser, $this->response->client());
  }

  }

30 min
see also

* https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
