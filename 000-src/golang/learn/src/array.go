package main

import (
	"fmt"
	"strings"
	"sort"
	"math/rand"
)

func main() {
	println("-----")
	println("Array")
	println("-----")

	var scores [10]int
	scores[0] = 339
	fmt.Printf("%+v\n", scores)

	scores2 := [4]int{9001, 9333, 212, 33}
	fmt.Printf("%+v\n", scores2)
	for index, value := range scores2 {
		fmt.Printf(index, value)
	}

	println("-----")
	println("Slice")
	println("-----")

	fmt.Println("Scores3")
	scores3 := []int{1,4,293,4,9}
	fmt.Printf("%+v\n", scores3)

	fmt.Println("Scores4")
	scores4 := make([]int,10)
	fmt.Printf("%+v\n", scores4)
	scores4 = append(scores4, 5)
	fmt.Printf("%+v\n", scores4)

	fmt.Println("Scores5")
	scores5 := make([]int, 0, 10)
	fmt.Printf("%+v\n", scores5)
	scores5 = append(scores5, 5)
	fmt.Println(scores5)

	fmt.Println("Scores6")
	scores6 := make([]int, 0, 10)
	scores6 = scores6[0:8]
	scores6[7] = 9333
	scores6 = append(scores6, 5)
	fmt.Println(scores6)

	fmt.Println("Scores7")
	scores7 := make([]int, 0, 10)
	c := cap(scores7)
	fmt.Println(c)
	for i := 0; i < 25; i++ {
		scores7 = append(scores7, i)
		if cap(scores7) != c {
			c = cap(scores7)
			fmt.Println(c)
		}
	}

	/*
	 * fmt.Println("Scores8")
	 * names := []string{"leto", "jessica", "paul"}
	 * checks := make([]bool, 10)
	 * var names []string
	 * scores8 := make([]bool,0, 10)
	 *
	 * 1. when you already know values
	 * 2. to write data in a specific index
	 * 3. to use wit append, unknown number of element
	 */

	fmt.Println("scores9")
	scores9 := []int{1,2,3,4,5}
	// don t understand how to init it ...
	slice := scores9[2:4]
	slice[0] = 999
	fmt.Println(slice)

	haystack := "the spice must flow"
	test := strings.Index(haystack[5:], " ")
	fmt.Println(test)
	fmt.Println(haystack[:len(haystack)-1])

	scores10 := make([]int, 100)
	for i := 0; i < 100; i++ {
		scores10[i] = int(rand.Int31n(1000))
	}
	sort.Ints(scores10)
	worst := make([]int, 5)
	copy(worst, scores10[:5])
	fmt.Println(scores10)
	fmt.Println(worst)

	println("----")
	println("Maps")
	println("----")

	println("map are like json, hashtables, or dictionary")
	println("key, value, CRUD")

	lookup := make(map[string]int)
	// lookup := make(map[string]int, 100)
	lookup["goku"] = 9001
	power, exists := lookup["vegeta"]
	fmt.Println(exists, power)
	fmt.Println(len(lookup))
	delete(lookup, "goku")

	type Saiyan struct {
		Name string
		Friends map[string]*Saiyan
	}
	goku := &Saiyan{
		Name: "Goku",
		Friends: make(map[string]*Saiyan),
	}
	goku.Friends["krilin"] = &Saiyan{
		Name: "Krilin",
		Friends: make(map[string]*Saiyan),
	}

	lookup2 := map[string]int{
		"goku": 9001,
		"gohan": 2044
	}

	for key, value := range lookup2 {
		fmt.Println(key, value)
	}

	/*
	 * a := make([]Saiyan, 10)
	 * b := make([]*Saiyan, 10)
	 */

	println("p52")
}
