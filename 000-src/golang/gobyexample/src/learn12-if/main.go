package main

import "fmt"

func main() {
    age := 29
    if age < 18 {
        fmt.Println("Kid")
    } else if age >= 18 && age < 40 {
        fmt.Println("Young")
    } else {
        fmt.Println("Old")
    }

		// can add statement before condition
		if a := 6; a > 5 {
			fmt.Println("a is greater than 5")
		}
}
