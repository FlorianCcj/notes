RxJs - Tricks
#############

avoid double http request
*************************

:source: https://angular-university.io/lesson/reactive-angular-duplicate-http-requests-sharereplay

when you use :code:`httpClient`


.. code-block:: JS
    :name: courses.service.ts
    :caption: courses.service.ts

    loadAllCourses(): Observable<Course[]> {
      return this.http.get<Course[]>("/api/courses")
        .pipe(
          map(res => res("payload"))
        );
    }

.. code-block:: JS
    :name: home.component.ts
    :caption: home.component.ts

    beginnerCourses$ = Observable<Course[]>
    advancedCourses$ = Observable<Course[]>

    ngOnInit() {
      const courses$ = this.coursesService.loadAllCourses()
        .pipe(
          map(courses => courses.sort(sortCoursesBySeqNo))
        )
      this.beginnerCourses$ = courses$
        .pipe(
          map(courses => courses.filter(courses => course.category == "BEGINNER"))
        )
      this.advancedCourses$ = courses$
        .pipe(
          map(courses => courses.filter(courses => course.category == "ADVANCED"))
        )
    }

two call -> so two request ...

to avoid it

.. code-block:: JS
    :name: courses.service.ts
    :caption: courses.service.ts

    loadAllCourses(): Observable<Course[]> {
      return this.http.get<Course[]>("/api/courses")
        .pipe(
          map(res => res("payload")),
          shareReplay()
        );
    }