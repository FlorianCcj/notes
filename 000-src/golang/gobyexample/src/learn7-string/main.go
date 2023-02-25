package main

import (
    "fmt"
    "reflect"
    "unsafe"
)

func main() {
    var r byte = 'a'

    //Print Size
    fmt.Printf("Size: %d\n", unsafe.Sizeof(r))

    //Print Type
    fmt.Printf("Type: %s\n", reflect.TypeOf(r))

    //Print Character
    fmt.Printf("Character: %c\n", r)
    s := "abcab£"

    //This will the decimal value of byte
    fmt.Println([]byte(s))

		for _, c := range s {
			fmt.Println(string(c))
	 }
}
