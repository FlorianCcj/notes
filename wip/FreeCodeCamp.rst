FreeCodeCamp
############

Objectifs
*********

Git - Advanced Git Tutorial - Interactive Rebase, Cherry-Picking, Reflog, Submodules and more: https://www.youtube.com/watch?v=qsTthZi23VE
to low - Git - Git and GitHub for Beginners - Crash Course: https://www.youtube.com/watch?v=RGOj5yH7evk
Git - Git Branches Tutorial: https://www.youtube.com/watch?v=e2IbNHi4uCI
to low - Git - Git for Professionals Tutorial - Tools & Concepts for Mastering Version Control with Git: https://www.youtube.com/watch?v=Uszj_k0DGsg
Git - How to Undo Mistakes With Git Using the Command Line: https://www.youtube.com/watch?v=lX9hsdsAeTk
nok - Go - Learn Go Programming - Golang Tutorial for Beginners: https://www.youtube.com/watch?v=YS4e4q9oBaU
nok - Python - Python Automation Tutorial – How to Automate Tasks for Beginners [Full Course]: https://www.youtube.com/watch?v=s8XjEuplx_U
nok - Secu - Create a Design System with CSS - Web Development Course: https://www.youtube.com/watch?v=lRaL-8qZ0mM
nok - Secu - Ethical Hacking 101: Web App Penetration Testing - a full course for beginners: https://www.youtube.com/watch?v=2_lswM1S264
nok - Secu - Full Ethical Hacking Course - Network Penetration Testing for Beginners (2019): https://www.youtube.com/watch?v=3Kq1MIfTWCE
nok - Secu - Linux for Ethical Hackers (Kali Linux Tutorial): https://www.youtube.com/watch?v=lZAoFs75_cs
nok - Secu - Web App Vulnerabilities - DevSecOps Course for Beginners: https://www.youtube.com/watch?v=F5KJVuii0Yw

Git - Advanced Git Tutorial - Interactive Rebase, Cherry-Picking, Reflog, Submodules and more
*********************************************************************************************

:source: https://www.youtube.com/watch?v=qsTthZi23VE

1. Interactive rebase
2. Cherry-pick
3. reflog: a protocol pointer movements
  * if you reset and it was a mistaque .. catastrophe
    * :code:`git reflog` -> get your commit reference
    * :code:`git branch happy-ending e5b19e4`
  * if you delete a branch you do not need anymore
4. Submodules
5. Search and find
  * by date :code:`--before <date>` :code:`--after <date>` (:code:`--after="2021-7-1"`)
  * by message :code:`--grep <string>`
  * by author :code:`--author <author name>`
  * by file :code:`-- <filename>` (:code:`-- README.md`)
  * by branch :code:`<branch name>..<main branch>` show diff with main

Git - Git and GitHub for Beginners - Crash Course
*************************************************

:source: https://www.youtube.com/watch?v=RGOj5yH7evk

Git - Git Branches Tutorial
***************************

:source: https://www.youtube.com/watch?v=e2IbNHi4uCI

* HEAD branch: currently active or checkout branch
* local vs remote branch
* :code:`git branch toto`
* :code:`git branch toto-from-e5b19e4 e5b19e4`: begin the branch at the reference
* :code:`git checkout <branch name>`: switch branch
* :code:`git switch <branch name>`: switch branch, only purpose
* :code:`git branch -m <new-name>`: rename the head branch
* :code:`git branch`: list branche
* :code:`git branch -m <old-name> <new-name>`: rename a non head branch
* :code:`git push origin --delete <old-name>`: delete old branch in remote
* :code:`git push origin -u <new-name>`: push new branch
* :code:`git branch --track feature/login origin/feature/login`: link local branch with remote branch
* :code:`git checkout --track origin/feature/login`: create local branch which will be automatically track remote branch (with same name)
* with track connection activated just need to :code:`git pull` or :code:`git push`
* :code:`git branch -v`: show diversion
* :code:`git branch -d <branch name>`
* :code:`git merge <branch_name>`
* :code:`git rebase <branch_name>`
* :code:`git log main..feature/uploader`
* www.bit.ly/git-branches-cheatsheet

Git - Git for Professionals Tutorial - Tools & Concepts for Mastering Version Control with Git
**********************************************************************************************

:source: https://www.youtube.com/watch?v=Uszj_k0DGsg

* The perfect commit
  * add the right changes
  * compose a good commit message
* Branching strategies
* Pull requests
* Merge conflicts
* Merge vs rebase
* Advanced git kit

Git - How to Undo Mistakes With Git Using the Command Line
**********************************************************

:source: https://www.youtube.com/watch?v=lX9hsdsAeTk

* Discard all local changes in a file
  * :code:`git status`: list file changes
  * :code:`git diff <file_path>`: list changes in the file
  * :code:`git checkout <file_path>`: undo all changes in the file
  * :code:`git restore <file_path>`: same but less ambiguing
* Restoring deleted files
  * :code:`git restore <file_path>`: undo the deletion too
* Discard chunks / lines in a file
  * :code:`git restore -p <file_path>`: to choos for each chunk
* Discarding all local changes
  * :code:`git restore .`: affect all the directory and sub dir
* Fixing the last commit
  * :code:`git commit --amend -m "My super message to replace old one"`: add modification on file or message
* What "rewriting history" means
  * commit hash is changing
  * a new object is create
* Reverting a commit in the middle
  * :code:`git revert <commit hash>`: creates a new commit that reverts the effects of a specified commit (it is a new commit, it needs a new commit message)
* Resetting to an old revision
  * :code:`git reset --hard <commit hash>`
  * :code:`--hard`: no local change should survived
  * :code:`--mixed`: keeps local change
  * :code:`--soft`
* Resetting a file to an old revision
  * :code:`git log <file_path>`
  * :code:`git restore --source <commit hash> <file_path>`
  * :code:`git reset --hard <commit hash> <file_path>`
  * :code:``
* The Reflog
  * you want to reset
  * you reset
  * you notice it was a bad idea
  * :code:`git reflog`
  * identifie the hash corresponding at the state just before your action (can be before a checkout )
  * git branch <branch to get my data back> <hash>
* Recovering deleted commits
  * same as Reflog
* Recovering deleted branches
  * same as Reflog
* Moving a commit to a new branch
  * go to the branch which have the extra commit (e.g. : master)
  * :code:`git branch <my_super_new_branch>`
  * :code:`get reset HEAD~1 --hard`: do not forget to clean up
* Moving a commit to a different branch
  * the feature branch already exist
  * :code:`git checkout feature/newsletter`
  * :code:`git cherry-pick <hash>`
  * :code:`git checkout master`: get the commit in the current branch
  * :code:`git reset --hard HEAD~1`
* Interactive Rebase: an overview of what you can do
  * the swiss army knife of git tools ... so carefull to do not cut yourself
* Interactive Rebase: how it works in general
  * how far back I want to go ? how much I want to edit ?
  * :code:`git rebase -i HEAD~3`
  * carrefull it is reverse
  * it will re apply commit by commit
  * on the first page, we just indicate what we intend to do
  * use :code:`reword` option
* Editing old commit messages with Interactive Rebase
  * :code:``
* Deleting commits with Interactive Rebase
  * :code:``
* Squashing multiple commits into one with Interactive Rebase
  * :code:``
* Adding changes to an old commit with Interactive Rebase
  * correct
  * rebase -i
  * place the new commit under thisone to correct
  * use :code:`fixup` option
* Splitting/editing an old commit with Interactive Rebase
  * :code:``
* First Aid Kit for Git: a set of short videos and a cheat sheet, free to download (www.bit.ly/git-first-aid-kit)
  * :code:``

Go - Learn Go Programming - Golang Tutorial for Beginners
*********************************************************

:source: https://www.youtube.com/watch?v=YS4e4q9oBaU

Intro
=======

* why
  * Python: Easy but slow
  * Java: Complex type system
  * C/C++: Complex type system, slow compile times
  * go (golang):
    * Strong and statically typed
    * Excellent community
    * Key features
      * Simplicity
      * Fast compile times
      * Garbage collected
      * Built-in concurrency
      * Compile to standalone binaries

* http://golang.org
* https://pkg.go.dev/std
* targeted at building servers and web application
* some project of mobile application and client side application but not officially supported

Setting Up a Development Environment
=====================================

install go

set go route
* https://dave.cheney.net/2013/06/14/you-dont-need-to-set-goroot-really

export GOROOT=/sur/local/go # where go is installed
export PATH=$PATH:$GOROOT/bin

go version # totest

export GOPATH=/home/<user>/golib # path to your project
export PATH=$PATH:$GOPATH/bin

go get github.com/nsf/gocode # get the gocode bin in $GOPATH/bin and source un $GOPATH/src
export GOPATH=$GOPATH:/home/<user>/gocode # path to your project

First part of GOPATH will be use to go get

The only dir mandatory in go workspace is src
* src: the sources
* pkg: precompile code to avoid recompile it
* bin: compiled binaries

get an editor with extension
for vscode lukehoban go extension is recommended

For the directory structure it is recommend to code it as if you want to make it go getable => mirro the path in the source code server

/src/github.com/my-account-key/application-name
/src/github.com/vansimke/firstapp

touch Main.go

.. code-block:: go

  package main

  import "fmt"

  func main() {
      fmt.Println("Hello Go!")
  }

* go run src/github.com/vansimke/firstapp/Main.go: just run it
* go build github.com/vansimke/firstapp/Main.go: build and put it in the launching directory
* go install github.com/vansimke/firstapp/: install the binary in /bin dir

go installed is a valid workspace, so you have all package source code

(35'48)

Variables
==========

39:00 Variable Inline declaration
----------------------------------

.. code-block:: go

  package main

  import "fmt"

  func main() {
    fmt.Println("Hello Go!")
    fmt.Println(42)

    var i int // when it is not the good time to initialize, or when it will be asign in a structure loop or conditional, ...
    var j int = 42 // if go doesn t have enougth information to asign the good type
    k := 42
    l := 42.

    i = 42
    fmt.Println(i)
    i = 27
    fmt.Println(i)
    fmt.Printf("%v, %T", j, j) // to format value and type
    fmt.Printf("%v, %T", k, k)
    fmt.Printf("%v, %T", l, l)

    // but it is imposible to initialize float32 with := synthax
  }

.. code-block:: go

  package main

  import "fmt"

  var i int = 42 // only the full synthaxe for package variable

  func main() {
  }


43:00 Variable grouped declaration
-----------------------------------

.. code-block:: go

  package main

  import "fmt"

  // var actorName string = "Elisabeth Sladen"
  // var companion string = "Sarah Jane Smith"
  // var doctorNumber int = 3
  // var season int = 3

  var (
    // do that when there are related
    actorName string = "Elisabeth Sladen"
    companion string = "Sarah Jane Smith"
    doctorNumber int = 3
    season int = 3
  ]

  func main() {
  }

* when you declare a variable you MUST use it

44:30 Shadowing of variable
----------------------------

46:05 Variable naming & scope
------------------------------

* package variable
  * in lowercase, stay local (package)
  * in uppercase, public
* name
  * should reflect the life of the variable: a short name for a short life
  * keep as short as you can
  * avoid variable name > 50 characters
  * if you use accronym, uppercase them

50:00 Simple number conversion
-------------------------------

.. code-block:: go

  package main

  import "fmt"

  func main() {
		var i int = 42
		var j float32
		j = float32(i)
  }

* string -> stream of byte
* to convert a numbert into string: import ("strconv")
* j = strconv.Itoa(i) #Int to ascii

53:00 Variable Summary
-----------------------

* variable declaration
	* var foo int
	* var foo int = 42
	* foo := 42
* Can t redeclare variables, but can shadow them
* All variables must be used
* Visibility
	* lower case first letter for package scope
	* upper case first letter to export globally
	* no private scope
* Naming conventions
	* Pascal or camelCase
		* Capitalize acronyms
	* As short as reasonable
		* longer names for longer lives
* Type conversions
	* destinationType(variable
	* use strconv package for strings

Primitives
===========

* variable have "0 byte" value, a default value if the var is not initialize
* bool
  * state
    * true
    * false
    * :code:`var n bool`
    * :code:`n := 1 == 1`
* numeric
  * int
    * int8 -126 -> 127
    * int16 -32 768 -> 32 768
    * int32 -2 147 483 648 -> 2 147 483 648
    * int64
    * usigned uint8, uint16, uint32, uint64uint8
    * operator +,-,*,/,%
    * conditional operator &, |, ^, &^ (and, or, xor, and not)
    * with a:= 8
    * a << 3 // 2^3 * 2^3
    * a >> 3 // 2^3 / 2^3
  * float
    * :code:`n := 3.14`
    * :code:`n := 13.7e72`
    * :code:`n := 2.1E14`
  * complex
    * :code:`var n complex64 = 1 + 2i`
    * :code:`n := 1 + 2i`
    * :code:`n := complex(1, 2)`
    * :code:`real(n)`
    * :code:`imag(n)`
* text
  * string = []uint8
  * if you get a sêcific character :code:`s[2]` you will get its value
  * to get the value :code:`string(s[2])`
  * string are immutable
  * :code:`+` permit to concatenate

  .. code-block:: go

    package main
    import "fmt"
    func main() {
      s := "this is a string"
      b := []byte(s)
      fmt.Printf("%v, %T\n", b, b)
    }

* byte = uint8
* rune = utf32 = int32 // can be as long as 32 byte but do not HAVE TO be
* sumary
  * boolean
    * value are true or false
    * zero value is false
    * not an alias (e.g. int)
  * numeric type
    * int
      * sugned int
        * int type has vavrying size, but min 32 bits
        * 8 bit (int8) through 64 (int64)
      * unsigned int
        * 8 bit (byte and uint8) through 32 bit
      * arithmetic operation
        * addition, substraction, multiplication, division, remainder
      * bitwise operation
        * and, or, xor, and not
      * zero value is 0
      * can t mix mix types in same family
    * Floating types
      * Floting point numbers
        * follow IEEE-754 standard
        * zero value is 0
        * 32 and 64 bit versions
        * literal styles
          * decimal 4.14
          * exponentiel 3.14e14 or 3.14E14
      * Complex numbers
        * Zero value 0
        * 64 and 128 bit version
        * built in function
          * complex(x, y)
          * real
          * imag
    * Text types
      * string
        * UTF-8
        * immutable
        * can be concatenate with plus (+) operator
        * can be converted to []byte
      * Rune
        * UTF-32
        * alias for int32
        * special methods normally required to process
          * e.g. strings Reader#ReadRune

Constants
==========

* naming convention
  * if first letter is uppercase => exported
  * same convention as normal variable
  * :code:`const myConst`
* typed constants
  * :code:`const myConst int = 42`
* untyped constants
* enumerated constants
  * :code:`c = iota`
  * iota will increase each time you will affect a variable with :code:`iota` value
  * iota will reset on each shadow block
  * generally 0 is error, so create a error variable to do not get it
  * you can use :code:`_` to avoid alocate a variable (write only variable)
  * if your first variable :code:`_ = iota + 5` the enumeration will begin at 5
  * you can change step with
    * :code:`_ = iota`
    * :code:`KB = 1 << (10 * iota)`
  * to have a value by byte
    * :code:`isAdmin = 1 << iota // 1`
    * :code:`isHeadquarters // 2`
    * :code:`canSeeFinancials // 4`

.. code-block:: go

  package main
  import "fmt"

  const (
    isAdmin = 1 << iota
    isHeadquarters
    canSeeFinancials

    canSeeAfrica
    canSeeAsia
    canSeeEurope
    canSeeNorthAmerica
    canSeeSouthAmerica
  )

  func main() {
    var roles byte = isAdmin | canSeeFinancials | canSeeEurope
    fmt.Printf("%b\n", roles)
    fmt.Printf("Is Admin? %v\n", isAdmin & roles == isAdmin)
    fmt.Printf("Is HQ? %v\n", isHeadquarters & roles == isHeadquarters)
  }

* summary
  * immutable, but can be shadowed
  * replaced by the compiler at compile time
    * value must be calculate at compile time
  * named like variables
    * PascalCase for exported constants
    * camelCase for internal constants
  * Typed constants work like immutable variables
    * Can interoperate only with same type
  * Untyped constants worked like literals
    * Can interoperate with similar types
  * Enumerated constants
    * special symbol :code:`iota` allows related constants to be created easily
    * :code:`iota` starts a 0 in each const block ant increments by one
    * Watch out of constant values that match zero values for variables
  * Enumerated expressions
    * operations that can be determined at compile time are allowed
      * Arithmetic
      * Bitwise operation
      * Bitshifting

(1'47'54) < ---------------------------


Array and Slices
=================

01:49:26 Array declaration
---------------------------

01:51:20 Array declaration literal syntax
------------------------------------------

01:56:03 Arrays are value type
-------------------------------

01:58:30 Slice declaration, len() vs cap()
-------------------------------------------

02:00:43 Slice creation from Array
-----------------------------------

02:03:27 Slice creation using make()
-------------------------------------

02:05:19 append() function in slice
------------------------------------

02:08:03 Slice merge using spread
----------------------------------

02:09:15 Stack operation in slice
----------------------------------

02:12:48 Array & Slice Summary
-------------------------------


Maps and Structs
=================

02:20:48 Ways to create map
----------------------------

02:23:35 Order of items in map change
--------------------------------------

02:24:14 Delete entry from map
-------------------------------

02:24:50 Map key validation*
-----------------------------

02:28:45 Struct data type (~Class)
-----------------------------------

02:33:36 Naming/access modifier of Struct
------------------------------------------

02:35:00 Anonymous Struct
--------------------------

02:36:30 Struct are value type
-------------------------------

02:37:45 Inheritance (embedding) in Struct*
--------------------------------------------

02:41:24 When to use embedding?
--------------------------------

02:42:21 Tags in Struct
------------------------


If and Switch Statements
=========================

02:50:16 If Initialze syntax (key check)
-----------------------------------------

03:08:25 Switch Initialzer syntax
----------------------------------

03:09:14 Switch tagless syntax
-------------------------------

03:12:40 Type switch
---------------------


Looping
========

03:29:50 Conditional loop
--------------------------

03:30:03 While loop with for
-----------------------------

03:33:25 Breaking from all the inner loops*
--------------------------------------------

03:34:50 Loop through collection (range)*
------------------------------------------


Defer, Panic and Recover
=========================

03:42:50 Defer
---------------

03:45:00 Defer use case
------------------------

03:48:29 Defer referring variable
----------------------------------

03:49:23 Panic
---------------

03:51:25 User defined Panic
----------------------------

03:54:05 Panic execute after Defer*
------------------------------------

03:55:15 Panic -> defer -> recover
-----------------------------------

03:55:50 Recover
-----------------

03:56:42 Try Catch - Panic, Defer, Recover*
--------------------------------------------

03:59:35  Summary - defer, panic, recovery.
--------------------------------------------


Pointers
=========

04:04:30 pointers intro
------------------------

04:09:54 No pointer arithmetic
-------------------------------

04:13:06 Pointer default value nil
-----------------------------------

04:17:10 Slice & Map are reference type
----------------------------------------

04:18:22 Reference & Value types
---------------------------------


Functions
==========

04:27:33 If arguments are same type
------------------------------------

04:30:00 Why to pass pointer to function*
------------------------------------------

04:31:20 Variatic parameters
-----------------------------

04:34:07 Function return pointer*
----------------------------------

04:35:50 Named return value *
------------------------------

04:37:16 Multiple return value*
--------------------------------

04:40:17 Common error handling pattern*
----------------------------------------

04:42:33 Anonymous function
----------------------------

04:47:31 Function as methods**
-------------------------------

04:50:50 Summary
-----------------


Interfaces
===========

05:00:00 Interface example
---------------------------

05:03:40 !!??
--------------

05:05:14 Interface naming
--------------------------

05:05:56 Any type can implement Interface *
--------------------------------------------

05:08:02 Compose Interfaces together
-------------------------------------

05:10:35 Constructor method
----------------------------

05:11:57 Type conversion
-------------------------

05:16:27 Empty Interface
-------------------------

05:18:35 Type switch
---------------------

05:20:06 Pointer receiver interface !!!???
-------------------------------------------

05:23:44 Interface best practices
----------------------------------

05:27:27 Summary
-----------------


Goroutinnes
============

05:36:50 Goroutine introduction
--------------------------------

05:40:30 Goroutine as anonymous function
-----------------------------------------

05:42:40 Pass value as arg to Goroutine
----------------------------------------

05:44:00 WaitGroup to synch Goroutines*
----------------------------------------

05:46:11 WaitGroup + Mutex to avoid race
-----------------------------------------

05:48:17 Mutex (lock) example
------------------------------

05:52:50 GOMAXPROCS( )
-----------------------

05:55:55 Best practices
------------------------

05:57:57 Check race condition*
-------------------------------

06:00:19 Summary
-----------------


Channels
=========

06:06:06 Channels introduction
-------------------------------

06:08:05 Channels creation
---------------------------

06:11:55 Sender Receiver deadlock eg.
--------------------------------------

06:14:20 Sender receiver by direction
--------------------------------------

06:15:04 Send or Receive only channel
--------------------------------------

06:17:15 Buffered channel
--------------------------

06:20:53 For range in Channel
------------------------------

06:27:19 Select in Channel
---------------------------


Python - Python Automation Tutorial – How to Automate Tasks for Beginners [Full Course]
***************************************************************************************

:source: https://www.youtube.com/watch?v=s8XjEuplx_U

Secu - Create a Design System with CSS - Web Development Course
***************************************************************

:source: https://www.youtube.com/watch?v=lRaL-8qZ0mM

Secu - Ethical Hacking 101: Web App Penetration Testing - a full course for beginners
*************************************************************************************

:source: https://www.youtube.com/watch?v=2_lswM1S264

Secu - Full Ethical Hacking Course - Network Penetration Testing for Beginners (2019)
*************************************************************************************

:source: https://www.youtube.com/watch?v=3Kq1MIfTWCE

Secu - Linux for Ethical Hackers (Kali Linux Tutorial)
******************************************************

:source: https://www.youtube.com/watch?v=lZAoFs75_cs

Secu - Web App Vulnerabilities - DevSecOps Course for Beginners
***************************************************************

:source: https://www.youtube.com/watch?v=F5KJVuii0Yw
