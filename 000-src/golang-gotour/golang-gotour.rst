Golang - Gotour
###############

Config
******

.. code-block:: bash

    https://dl.google.com/go/go1.13.5.linux-amd64.tar.gz
    tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz
    echo "export PATH=$PATH:/usr/local/go/bin" > ~/.bashrc
    # for me
    # echo "export PATH=$PATH:/home/florianccj/software/go/bin" > ~/.bashrc
    go env -w GOPATH=$HOME/go
    go env GOPATH

* :code:`godoc -http=:6060`: permit to acces to golang doc on localhost:6060 
* `<https://golang.org/pkg/>`_ : package for golang

.. code-block:: golang

    // hello.go
    // launch by `go run src/hello.go`
    package main

    import "fmt"

    func main() {
        fmt.Println("Hello, 世界")
    }

Execute
********

* :code:`go run <file.go>`: execute the file
* :code:`go build <dir or file>`: build with dir name for exe

    * :code:`-o`: give a output file name/path

* :code:`go install`: need to be in :code:`<gopath>/src/<package dir>`
* :code:`go test`: need to be in :code:`<gopath>/src/<package dir>`
* :code:`go test -v`: need to be in :code:`<gopath>/src/<package dir>`
* :code:`go test -cover`: need to be in :code:`<gopath>/src/<package dir>`

Basics
******

Packages
========

each program are used in a package. The forst package is the main package

usually, when you import a package, the use name is the last of the import path

.. code-block: golang

    package main

    import (
        "fmt"
        "math/rand"
    )
    // or
    // import "fmt"
    // import "math/rand"

    func main() {
        fmt.Println("My favorite number is", rand.Intn(10))
    }

Function
========

You need to explicite the function and args type
:code:`func add(x int, y int) int {`
:code:`func add(x, y int) int {`
:code:`return x + y`
:code:`return x, y // return both variable`

Variable
========

:code:`var i int`
:code:`var c, python, java bool`
:code:`var i, j int = 1, 2`
:code:`var c, python, java = true, false, "no!"`

.. code-block:: golang

    package main

    import (
        "fmt"
        "math/cmplx"
    )

    var (
        ToBe   bool       = false
        MaxInt uint64     = 1<<64 - 1
        z      complex128 = cmplx.Sqrt(-5 + 12i)
    )

    func main() {
        const f = "%T(%v)\n"
        fmt.Printf(f, ToBe, ToBe)
        fmt.Printf(f, MaxInt, MaxInt)
        fmt.Printf(f, z, z)
    }

.. code-block:: golang

    package main

    import "fmt"

    func main() {
        var i int, f float64, b bool, s string
        fmt.Printf("%v %v %v %q\n", i, f, b, s)
    }

Constant just need the keyword const :code:`const hello = "world"`

Flow control statements: for, if, else, switch and defer
========================================================

.. code-block:: golang

    // for
	for i := 0; i < 10; i++ {
		sum += i
	}

    // for continue
    sum := 1
	for ; sum < 1000; {
		sum += sum
		fmt.Println(sum)
	}

    // while
    sum := 1
	for sum < 1000 {
		sum += sum
	}

    // boucle infini
    for {
	}

.. code-block:: golang

    // if
	if x < 0 {
		return sqrt(-x) + "i"
	}

    // if avec variable courte
    if v := math.Pow(x, n); v < lim {
		return v
	}

    // switch
    // avec un import "runtime"
    switch os := runtime.GOOS; os {
        case "darwin":
            fmt.Println("OS X.")
        case "linux":
            fmt.Println("Linux.")
        default:
            // freebsd, openbsd,
            // plan9, windows...
            fmt.Printf("%s.", os)
	}

    // switch with function
    today := time.Now().Weekday()
	switch time.Saturday {
        case today + 0:
            fmt.Println("Today.")
        case today + 1:
            fmt.Println("Tomorrow.")
        case today + 2:
            fmt.Println("In two days.")
        default:
            fmt.Println("Too far away.")
	}

    // switch without variable
    t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}

.. code-block:: golang

    // Les arguments de l'appel différé sont évalués immédiatement, mais l'appel de fonction n'est pas exécuté jusqu'à ce que la fonction environnante retourne. 
    defer fmt.Println("world")
	fmt.Println("hello")

    // defer work in LIFO
    fmt.Println("counting")
	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}
	fmt.Println("done")

More types: structs, slices, and maps
=====================================

Pointeur
--------

.. code-block:: golang

    func main() {
        i, j := 42, 2701

        p := &i         // point to i
        fmt.Printf("*p: %d \n", *p) // read i through the pointer
        *p = 21         // set i through the pointer
        fmt.Printf("i: %d \n", i)  // see the new value of i

        p = &j         // point to j
        *p = *p / 37   // divide j through the pointer
        fmt.Printf("j: %d \n", j) // see the new value of j
    }

Struct
------

.. code-block:: golang

    type Vertex struct {
        X int
        Y int
    }

    type Vertex3d struct {
        X, Y, Z int
    }

    func main() {
        v := Vertex{1, 2}
	    v.X = 4
	    fmt.Println(v.X)
        fmt.Println(v)

        p := &v
	    p.Y = 1e9
	    fmt.Println(v)

        v1 = Vertex{1, 2}  // has type Vertex
        v2 = Vertex{X: 1}  // Y:0 is implicit
        v3 = Vertex{}      // X:0 and Y:0
        p  = &Vertex{1, 2} // has type *Vertex
    }

Array
-----

.. code-block:: golang

    var a [2]string
	a[0] = "Hello"
	a[1] = "World"
	fmt.Println(a[0], a[1])
	fmt.Println(a)


Slice
-----

.. code-block:: golang

    // slice and length
    s := []int{2, 3, 5, 7, 11, 13}
    for i := 0; i < len(s); i++ {
		fmt.Printf("s[%d] == %d\n", i, s[i])
	}

    // slice of slice
	game := [][]string{
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
		[]string{"_", "_", "_"},
	}
	game[0][0] = "X"
	game[2][2] = "O"
	game[2][0] = "X"
	game[1][0] = "O"
	game[0][2] = "X"
    printBoard(game)

    // slice subset
    fmt.Println("s ==", s)
	fmt.Println("s[1:4] ==", s[1:4])
	// missing low index implies 0
	fmt.Println("s[:3] ==", s[:3])
	// missing high index implies len(s)
	fmt.Println("s[4:] ==", s[4:])

.. code-block:: golang

    func main() {
        a := make([]int, 5) // len(a)=5
        printSlice("a", a)
        b := make([]int, 0, 5) // len(b)=0, cap(b)=5
        printSlice("b", b)
        c := b[:2]
        printSlice("c", c)
        d := c[2:5]
        printSlice("d", d)
    }

    func printSlice(s string, x []int) {
        fmt.Printf("%s len=%d cap=%d %v\n",
            s, len(x), cap(x), x)
    }

Null
----

.. code-block:: golang 

	var z []int
	fmt.Println(z, len(z), cap(z))
	if z == nil {
		fmt.Println("nil!")
	}

Append
------

.. code-block:: golang

    a = append(a, 1)
    a = append(a, 2, 3, 4)

Range
-----

.. code-block:: golang

    var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
	for i, v := range pow {
		fmt.Printf("2**%d = %d\n", i, v)
	}

    pow := make([]int, 10)
	for i := range pow {
		pow[i] = 1 << uint(i)
	}
	for _, value := range pow {
		fmt.Printf("%d\n", value)
	}

Maps (like dict)
----------------

.. code-block:: golang

	type Vertex struct {
		Lat, Long float64
	}
	var m map[string]Vertex

	m = make(map[string]Vertex)
	m["Bell Labs"] = Vertex{
		40.68433, -74.39967,
	}
	fmt.Println(m["Bell Labs"])

    var m = map[string]Vertex{
        "Bell Labs": Vertex{
            40.68433, -74.39967,
        },
        "Google": Vertex{
            37.42202, -122.08408,
        },
    }

    var m = map[string]Vertex{
    	"Bell Labs": {40.68433, -74.39967},
	    "Google":    {37.42202, -122.08408},
    }

    m[key] = elem
    elem = m[key]
    delete(m, key)
    elem, ok = m[key]
    // i key est dans m , ok est true. Sinon, ok est false


funtion value
-------------

.. code-block:: golang

    func compute(fn func(float64, float64) float64) float64 {
        return fn(3, 4)
    }

    hypot := func(x, y float64) float64 {
		return math.Sqrt(x*x + y*y)
	}
	fmt.Println(hypot(5, 12))

	fmt.Println(compute(hypot))
	fmt.Println(compute(math.Pow))

closure ???
-----------

Methods and interfaces
**********************

Concurrency
***********

Go by test
**********

https://github.com/quii/learn-go-with-tests/tree/master

Dev domain
* Developer empowerment
* Generally “good” code. Sensible separation of concerns, etc etc
* Communication skills
* Architecture
* Observability
* Deployability
* Automated tests
* Feedback loops

p41

Sources
*******

* gotour: https://go-tour-fr.appspot.com/list
* bases: https://golangbot.com/learn-golang-series/
* linter: https://github.com/golang/lint
* full doc: https://github.com/golang/go/wiki/Learn
* Weekly: https://blog.learngoprogramming.com/
* go algo: https://yourbasic.org/
* go game: https://www.youtube.com/watch?v=9D4yH7e_ea8&list=PLDZujg-VgQlZUy1iCqBbe5faZLMkA3g2x&index=1
* tdd: https://quii.gitbook.io/learn-go-with-tests/
* 50 Shades of Go: Traps, Gotchas, and Common Mistakes for New Golang Devs: http://devs.cloudimmunity.com/gotchas-and-common-mistakes-in-go-golang/index.html

Document history
****************

+------------+---------+--------------------------------------------------------------------+
| Date       | Version | Comment                                                            |
+============+=========+====================================================================+
| 2019.12.29 | V1.0    | First write                                                        |
+------------+---------+--------------------------------------------------------------------+
