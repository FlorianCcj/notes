Install
*******

pip install pipenv 
pipenv install
pipenv install django>=2.2
pipenv shell

django-admin startproject <project_name> <path>

python manage.py runserver

New app
*******

python manage.py startapp polls

First view
==========

.. code-block:: python

    # polls/views.py
    from django.http import HttpResponse
    
    def index(request):
        return HttpResponse("Hello, world. You're at the polls index.")

.. code-block:: python

    # polls/urls.py

    from django.urls import path
    from . import views

    urlpatterns = [
        path('', views.index, name='index'),
    ]

.. code-block:: python

    # <app>/urls

    from django.contrib import admin
    from django.url import include, path

    urlpattern = [
        path('polls/', include('polls.url')),
        path('admin/', admin.site.urls),
    ]

Database
********

in settings.py look for the keyword DATABASE
* ENGINE can take differents value: :code:`django.db.backends.sqlite3`, :code:`django.db.backends.postgresql`, :code:`django.db.backends.mysql`, :code:`django.db.backends.oracle`, ...
* NAME is mandatory
* if you don t use sqlite you will need USER, PASSWORD, HOST

python manage.py migrate: migrate db to respect settings.py -> INSTALLED_APPS constraint
python manage.py makemigrations polls: create new migration for app
    * make new file in <app>/migrations
python manage.py sqlmigrate polls 0001: launch a migration in <app>/migrations
python manage.py check: check models without migrate

Plugin
******

You can add plugin in settings.py thanks to INSTALLED_APPS
you can see you them as submodule. Your app (create by :code:`python manage.py startapp`) has to be declared in too

default:
* django.contrib.admin
* django.contrib.auth
* django.contrib.contenttypes
* django.contrib.sessions
* django.contrib.messages
* django.contrib.statisticfiles

Entities
********

.. code-block:: python

    # polls/models

    import datetime

    from django.db import models
    from django.utils import timezone

    class Question(models.Model):
        question_text = models.CharField(max_length=200)
        pub_date = models.DateTimeField('date published')

        def __str__(self):
            return self.question_text

        def was_published_recently(self):
            return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

    class Choice(models.Model):
        question = models.ForeignKey(Questions, on_delete=models.CASCADE)
        choice_text = models.CharField(max_length=200)
        votes = models.IntegerField(default=0)

        def __str__():
            return self.choice_text
Test
====

python manage.py shell
from polls.models import Choice, Question
Question.objects.all()
from django.utils iòport timezone
q = Question(question_text="What's new?", pub_date=timezone.now())
q.save()
q.id
q.question_text
q.pub_date
question_text = "What's up?"
q.save()
Question.objects.all()

Question.objects.all()
Question.objects.filter(id=1)
Question.objects.filter(question_text__startwith='What')
from django.utils import timezone
cur_year = timezone.now().year
Question.objects.get(pub_date__year=cur_year)
Question.objects.get(id=2)
q = Question.objects.get(pk=1)
q.was_published_recently()
q.choice_set.all()
q.choice_set.count()
q.choice_set.create(choice_text='Not much', votes=0)
q.choice_set.create(choice_text='The sky', votes=0)
c = q.choice_set.create(choice_text='Just hacking again', votes=0)
c.question
q.choice_set.all()
q.choice_set.count()
Choice.objects.filter(question__pub_date__year=cur_year)
c = a.choice_set_filter(choice_set__start_with='Just')
c.delete

Admin
*****

python manage.py createsuperuser
python manage.py runserver
acces on localhost:8000/admin

.. code-block:: python

    from django.contrib import admin
    from .models import Question

    admin.site.register(Question)

Routing
*******

New view

.. code-block:: python

    # polls/views.py

    from django.http import Http404
    from django.shortcuts import render

    from .models import Question

    def detail(request, question_id):
        try:
            question = Question.object.get(pk=question_id)
        except:
            raise Http404("Question does not exist")
        return render(request, 'polls/detail.html', {"question": question})

    def index(request):
        latest_question_list = Question.object.order_by('-pub_date')[:5]
        context = {'latest_question_list': latest_question_list}
        return render(request, 'polls/index.html', context)

    def results(request, question_id):
        response = "You're looking at the result of question %s"
        return HttpResponse(response % question_id)

    def vote(request, question_id):
        return HttpResponse("You're voting on question %s" % question_id)

.. code-block:: python

    # polls/urls

    from django.urls import path
    from . import views

    app_name = 'polls'
    urlpattern = [
        path('', views.index, name='index'),
        path('<int:question_id>/', views.detail, name='detail'),
        path('<int:question_id>/results/', views.results, name='results'),
        path('<int:question_id>/vote/', views.vote, name='vote'),
    ]

.. code-block:: python

    {# polls/templates/polls/index.html #}
    {% if latest_question_list %}
        <ul>
            {% for question in latest_question_list %}
                <li><a hrel="{% url 'polls:detail' question.id %}">{{ question.question_text }}</a></li>
            {% endfor %}
        </ul>
    {% else %}
        <p>No polls are available.</p>
    {% endif %}

.. code-block::python

    {# polls/templates/polls/index.html #}
    <h1>{{ question.question_text }}</h1>
    <ul>
        {% for choice in question.choice_set.all %}
            <li>{{ choice.choice_text }}</li>
        {% endfor %}
    </ul>

easy view

.. code-block:: python

    # polls/views.py

    from django.http import HttpResponseRedirect
    from django.shortcuts import get_object_or_404, render
    from django.urls import reverse
    from django.views import generic

    from .models import Choice, Question


    class IndexView(generic.ListView):
        template_name = 'polls/index.html'
        context_object_name = 'latest_question_list'

        def get_queryset(self):
            """Return the last five published questions."""
            return Question.objects.order_by('-pub_date')[:5]


    class DetailView(generic.DetailView):
        model = Question
        template_name = 'polls/detail.html'


    class ResultsView(generic.DetailView):
        model = Question
        template_name = 'polls/results.html'


    def vote(request, question_id):
        question = get_object_or_404(Question, pk=question_id)
        try:
            selected_choice = question.choice_set.get(pk=request.POST['choice'])
        except (KeyError, Choice.DoesNotExist):
            return render(request, 'polls/detail.html', {
                'question': question,
                'error_message': 'You didn t select a choice'
            })
        else:
            selected_choice.votes += 1
            selected_choice.save()
            return HttpResponseRedirect(reverse('polls:results', args=(question.id)))

    # Needed ?
    # def results(request, question_id):
    #     question = get_object_or_404(Question, pk=question_id)
    #     return render(request, 'polls/results.html', {'question': question})


Form
****

.. code-block:: python

    {# polls/templates/polls/detail.html #}

    <h1>{{ question.question_text }}</h1>

    {% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}

    <form action="{% url 'polls:vote' question.id %}" method="post">
        {% csrf_token %}
        {% for choice in question.choice_set.all %}
        <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}">
        <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
        {% endfor %}
        <input type="submit" value="Vote">
    </form>

.. code-block: python

    {% polls/templates/polls/results.html %}
    <h1>{{ question.question_text }}</h1>
    <ul>
    {% for choice in question.choice_set.all %}
        <li>{{ choice.choice_text }} - {{ choice.votes }} vote{{ choice.votes | pluralize}}</li>
    {% endfor %}
    </ul>

    <a href="{% url 'polls:detail' question.id %}">vote again?</a>

.. code-block:: python

    # polls/urls.py

    from django.urls import path

    from . import views

    app_name = 'polls'
    urlpatterns = [
        path('', views.IndexView.as_view(), name='index'),
        path('<int:pk>/', views.DetailView.as_view(), name='detail'),
        path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
        path('<int:question_id>/vote/', views.vote, name='vote'),
    ]

test
****

Launch with python manage.py test polls

.. code-block:: python

    # polls/test.py

    import datetime

    from django.test import TestCase
    from django.utils import Timezone

    from .models import Question

    class QuestionModelTests(TestCase):
        def test_was_published_recently_with_futur_question(self):
            """
            was_published_recently() returns False for questions whose pub_date
            is in future.
            """
            time = timezone.now() + datetime.timedelta(days=30)
            future_question = Question(pub_date=time)
            self.assertIs(future_question.was_published_recently(), False)

        def test_was_published_recently_with_old_question(self):
            """
            was_published_recently() returns False for questions whose pub_date
            is older than 1 day.
            """
            time = timezone.now() - datetime.timedelta(days=1, seconds=1)
            old_question = Question(pub_date=time)
            self.assertIs(old_question.was_published_recently(), False)

        def test_was_published_recently_with_recent_question(self):
            """
            was_published_recently() returns True for questions whose pub_date
            is within the last day.
            """
            time = timezone.now() - datetime.timedelta(hours=23, minutes=59, seconds=59)
            recent_question = Question(pub_date=time)
            self.assertIs(recent_question.was_published_recently(), True)

Fix:

.. code-block:: python

    # polls/models
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now

Test a view

https://docs.djangoproject.com/en/2.2/intro/tutorial05/