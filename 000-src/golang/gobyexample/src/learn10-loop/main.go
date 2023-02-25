package main

import "fmt"

func main() {
    for i := 0; i < 5; i++ {
        fmt.Println(i)
    }

		i := 0
    for i < 5 {
        fmt.Println(i)
        i++
    }

		i := 0
    for {
        fmt.Println(i)
        i++
        if i >= 5 {
            break
        }
    }

    for i := 1; i < 10; i++ {
			if i%3 == 0 {
					continue
			}
			fmt.Println(i)
	}
}
