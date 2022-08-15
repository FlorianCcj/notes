package main

import "fmt"

func main() {
    //Declare
    var ex *T
		a := new(int)
		*a = 10
		fmt.Println(*a) //Print the value stored at address a

		a := 2
		b := &a
		fmt.Println(*b) //Output will be 2
    
    //Will print a address. Output will be different everytime.
    fmt.Println(b)
    fmt.Println(*b)
    b = new(int)
    *b = 10
    fmt.Println(*b) 
}