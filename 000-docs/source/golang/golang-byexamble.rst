Golang Basic Tutorial
***************************

Let’s see some basic topics in go first

https://golangbyexample.com/golang-comprehensive-tutorial/

About
======

Chapter 1   – About Golang
---------------------------------

- source: https://github.com/golang/go
- keyword: https://golang.org/ref/spec#Keywords

- Chapter 2 – [GO installation](https://golangbyexample.com/golang-installation/)
--------------

- Chapter 3 – [Set up Go Workspace and hello world program](https://golangbyexample.com/workspace-hello-world-golang)
---------------------------------

GOROOT: localtion of go sdk, default /usr/local/go
GOPATH: where go module are installed, binary are compiled
GOBIN: you can set it to save bin else where

hello world
""""""""""""

go mod init sample.com/hello

in src/hello.go

package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}

go install: will add the binary in $GOBIN
go build
go run hello.go

### **Basics**
===================

- Chapter 4 – [Packages and Modules – Part 1](https://golangbyexample.com/packages-modules-go-first)
---------------------------------

Every GO source file (.go file) in a GO application file belongs to a package. That is why every .go file starts with package
- Excutable package. onlyu main is the executable package
- Utility package

Module
- support for dependency management, a  collection of package, a go.mod at its root
- go.mod defines
  - modele import path
  - dependency

Package naming convention
- Underscore in the package name
- Camel casing or any kind of mixed caps

- Chapter 5 – [Packages and Modules – Part 2](https://golangbyexample.com/packages-modules-go-second/)
---------------------------------

go mod init sample.com/learn

add to go.mod: require github.com/pborman/uuid v1.2.1

export GO111MODULE=on
go get github.com/pborman/uuid

if you had a package in a go file, make go mod tidy

add a vendor dir: go mod vendor

- Chapter 6 – [Variables](https://golangbyexample.com/variables-in-golang-complete-guide/)
---------------------------------

- Chapter 7 – [All basic data types](https://golangbyexample.com/all-basic-data-types-golang/)
---------------------------------

- Chapter 8 – [Functions](https://golangbyexample.com/function-golang-complete-guide/)
---------------------------------

- Chapter 9 – [Constants](https://golangbyexample.com/constant-golang/)
------------------------------------------------------------------

### **Loops/Iterations/Flow Control**
=============================================

- Chapter 10 – [For Loop](https://golangbyexample.com/for-loop-in-golang/)
-------------------------------------------------
- Chapter 11 – [For Range loop](https://golangbyexample.com/understand-for-range-loop-golang/)
-------------------------------------------------
- Chapter 12 – [If Else](https://golangbyexample.com/understand-if-else-statement-golang/)
-------------------------------------------------
- Chapter 13 – [Switch](https://golangbyexample.com/switch-statement-golang/)
-------------------------------------------------
- Chapter 14 – [Defer keyword](https://golangbyexample.com/defer-golang)
-------------------------------------------------

### **More Types**
=======================

- Chapter 15 – [Pointer](https://golangbyexample.com/pointer-golang/)
-------------------------------------------------
- Chapter 16 – [Struct](https://golangbyexample.com/struct-in-golang-complete-guide/)
-------------------------------------------------
- Chapter 17 – [Array](https://golangbyexample.com/understanding-array-golang-complete-guid)
-------------------------------------------------
- Chapter 18 – [Slice](https://golangbyexample.com/slice-in-golang/)
-------------------------------------------------
- Chapter 19 – [Maps](https://golangbyexample.com/maps-in-golang)
-------------------------------------------------
- Chapter 20 – [Method](https://golangbyexample.com/method-in-golang/)
-------------------------------------------------
- Chapter 21 – [Interface](https://golangbyexample.com/interface-in-golang/)
-------------------------------------------------
- Chapter 22 – [Iota](https://golangbyexample.com/iota-in-golang)
-------------------------------------------------

### **Concurrency**
=======================

- Chapter 23 – [Goroutines](https://golangbyexample.com/goroutines-golang/)
- Chapter 24 – [Channel](https://golangbyexample.com/channel-golang/)
- Chapter 25 – [Select Statement](https://golangbyexample.com/select-statement-golang/)

### **Error Handling**
=======================

- Chapter 26 – [Error](https://golangbyexample.com/error-in-golang/)
- Chapter 27 – [Error -Part 2](https://golangbyexample.com/error-in-golang-advanced/)
- Chapter 28- [Panic and Recover](https://golangbyexample.com/panic-and-recover-golang/)

## **Golang Advanced Tutorial**
********************************

Let’s look at some advanced topics in go now.

### **OOPS in Golang**
=======================

- [OOP: Inheritance in GOLANG complete guide](https://golangbyexample.com/oop-inheritance-golang-complete/)
- [Encapsulation in Golang](https://golangbyexample.com/encapsulation-in-go/)
- [Runtime Polymorphism](https://golangbyexample.com/runtime-polymorphism-go/)
- [Compile Time Polymorphism](https://golangbyexample.com/compile-time-polymorphism-go/)

### **Others**
=======================

- [Understanding time and date in Go](https://golangbyexample.com/all-about-time-and-date-golang/)
- [Using Context Package in GO Complete Guide](https://golangbyexample.com/using-context-in-golang-complete-guide/)
- [Goto statement in go](https://golangbyexample.com/goto-statement-go/)
- [More about uintptr](https://golangbyexample.com/understanding-uintptr-golang)
- [Basic HTTP server implementation](https://golangbyexample.com/basic-http-server-go/)

## **All Design Patterns in Golang**
****************************************

Below is the list of all design patterns in go

### **Creational Design Patterns**
======================================

- [Abstract Factory](https://golangbyexample.com/abstract-factory-design-pattern-go/)
- [Builder](https://golangbyexample.com/builder-pattern-golang/)
- [Factory](https://golangbyexample.com/golang-factory-design-pattern/)
- [Object Pool](https://golangbyexample.com/golang-object-pool/)
- [Prototype](https://golangbyexample.com/prototype-pattern-go/)
- [Singleton](https://golangbyexample.com/singleton-design-pattern-go/)

### **Behavioural Design Patterns**
======================================

- [Chain of Responsiblity](https://golangbyexample.com/chain-of-responsibility-design-pattern-in-golang/)
- [Command](https://golangbyexample.com/command-design-pattern-in-golang/)
- [Iterator](https://golangbyexample.com/go-iterator-design-pattern/)
- [Mediator](https://golangbyexample.com/mediator-design-pattern-golang/)
- [Memento](https://golangbyexample.com/memento-design-pattern-go/)
- [Null Object](https://golangbyexample.com/null-object-design-pattern-golang/)
- [Observer](https://golangbyexample.com/observer-design-pattern-golang/)
- [State](https://golangbyexample.com/state-design-pattern-go/)
- [Template Method](https://golangbyexample.com/template-method-design-pattern-golang/)
- [Visitor](https://golangbyexample.com/visitor-design-pattern-go/)

### **Structural Design Patterns**
======================================

- [Adapter](https://golangbyexample.com/adapter-design-pattern-go/)
- [Bridge](https://golangbyexample.com/bridge-design-pattern-in-go/)
- [Composite](https://golangbyexample.com/composite-design-pattern-golang/)
- [Decorator](https://golangbyexample.com/decorator-pattern-golang/)
- [Facade](https://golangbyexample.com/facade-design-pattern-in-golang/)
- [Flyweight](https://golangbyexample.com/flyweight-design-pattern-golang/)
- [Proxy](https://golangbyexample.com/proxy-design-pattern-in-golang/)

## **Data Structures in Golang**
************************************************

- [Queue](https://golangbyexample.com/queue-in-golang/)
- [Stack](https://golangbyexample.com/stack-in-golang/)
- [Set](https://golangbyexample.com/set-implementation-in-golang/)
- [Linked List](https://golangbyexample.com/singly-linked-list-in-golang/)
- [Doubly Linked List](https://golangbyexample.com/doubly-linked-list-golang/)
- Binary Search Tree
    - [Recursive](https://golangbyexample.com/binary-search-tree-in-go)
    - [Iterative](https://golangbyexample.com/iterative-binary-search-tree-go/)
- Heap
    - [Minheap](https://golangbyexample.com/minheap-in-golang/)
    - [Maxheap](https://golangbyexample.com/maxheap-in-golang/)
- [Trie](https://golangbyexample.com/trie-implementation-in-go/)
