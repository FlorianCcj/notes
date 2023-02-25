Golang
######

Install
*******

install: https://golang.org/dl/
tar -xzf go1.12.7.linux-amd64.tar.gz
echo "export PATH=$PATH:$(pwd)/go/bin" >> ~/.zshrc

go build -o /bin/hello

go run src/hello.go

godoc -http=:6060 # permit to acces to golang doc on localhost:6060

workspace:
    * bin
    * pkg
    * src

echo 'export GOPATH=$HOME/code/go' >> $HOME/.profile
echo "export GOPATH=$(pwd)" >> $HOME/.profile

.. code-block:: go

    // hello world

    package main

    import "fmt"

    func main() {
        fmt.Printf("hello, world\n")
        println("it'sover9000!")
    }


Variable
********

Need to type your variable
int, string, bool, []byte, etc.

.. code-block:: go

    var power int
	power = 9000
	fmt.Printf("It'sover %d \n",power)

or :code:`power := 9000` or :code:`var power int = 9000`

lazy declaration

..code-block:: go

    name, power := "Goku", 9000
    fmt.Printf("%s's power is over %d\n", name, power)

function declaration
********************

.. code-block:: go

    func log(message string) {}
    func add(a int, b int) int {} // <=> func add(a, b int) int {}
    func power(name string) (int,bool) {}

.. code-block:: go

    _, exists := power("goku")
    if exists==false {
        //handlethiserrorcase
    }

:code:`_` permit to don t asign returned value

Structure
*********

Go is not OO but you can use struct and associated function

To Edit an instance of struct you need to use pointer

.. code-block:: go

    package main

    type Saiyan struct {
        Name string
        Power int
    }

    func main() {

        goku := Saiyan{
            Name: "Goku",
            Power: 9000,
        }

        println(goku.Name)

        geta := Saiyan{Name: "Geta"}
        geta.Power = 8500

        gohan := &Saiyan{"Gohan", 7000}

        Super(gohan)

        println(gohan.Power)

        SuperFake(gohan)

        println(gohan.Power)

    }

    func Super(guy *Saiyan) {
        guy.Power += 10000
    }

    // wtf it don t edit ...
    func SuperFake (guy *Saiyan) {
        guy := &Saiyan{"Fake", 0}
    }

Function of struct
==================

..code-block:: go


    package main

    type Saiyan struct {
        Name string
        Power int
    }

    func (s *Saiyan) Super() {
        s.Power += 10000
    }

    func main() {
        goku := &Saiyan{"Goku", 9001}
        goku.Super()
        println(goku.Power)
        //willprint19001
    }

constructor
===========

can make factory

.. code-block:: go

    func NewSayan(name string, power int) Saiyan {
        return Saiyan{
            Name: name,
            Power: power,
        }
    }

.. code-block:: go

    goku := &Saiyan{}
    // <=> goku = new(Saiyan)

.. code-block:: go

    goku := new(Saiyan)
    goku.Name = "goku"
    goku.Power = 9001

    goku := &Saiyan{
        Name: "goku",
        Power: 9001,
    }

Field in the structure
======================

.. code-block::
    type Saiyan struct {
        Name string
        Power int
        father &Saiyan
    }

    gohan := &Saiyan{
        Name: "Gohan",
        Power: 100000,
        Father: &Saiyan{
            Name: "Goku",
            Power: 9000,
            Father: nil,
        }
    }

Composition
===========

.. code-block:: go

    type Person struct {
        Name string
    }

    func (p *Person) Introduce() {
        println("Hi, I'm %s\n", p.name)
    }

    type Saiyan struct {
        *Person
        Power int
    }

    func main() {
        goku := &Saiyan{
            Person: &Person{"Goku"},
            Power: 9000,
        }
        goku.Introduce()
    }

Overloading
===========

.. code-block:: go

    func (s *Saiyan) Introduce() {
        println("Hi, I'm %s. Ya!\n", s.Name)
    }

Maps, Array, Slices
*******************

Array has fixed size

.. code-clock:: go

    var scores [10]int
    scores[0] = 339
    scores := [4]int[9001, 9333, 212, 33]

    for index, value := range scores {

    }

Slices
======

.. code-block:: go

    scores := []int{1,4,293,6,9}

p41

Code organisation and interface
*******************************

Package
=======



Begin p51

Tidbits
*******

Begin p61

Concurency
**********

Begin p71
