package main

import (
	"fmt"
	"time"

	"github.com/inancgumus/screen"
)

func main() {
	type placeholder [5]string

	zero := placeholder{
		"000",
		"0 0",
		"0 0",
		"0 0",
		"000",
	}

	one := placeholder{
		"11 ",
		" 1 ",
		" 1 ",
		" 1 ",
		"111",
	}

	two := placeholder{
		"222",
		"  2",
		"222",
		"2  ",
		"222",
	}

	three := placeholder{
		"333",
		"  3",
		"333",
		"  3",
		"333",
	}

	four := placeholder{
		"4 4",
		"4 4",
		"444",
		"  4",
		"  4",
	}

	five := placeholder{
		"555",
		"5  ",
		"555",
		"  5",
		"555",
	}

	six := placeholder{
		"666",
		"6  ",
		"666",
		"6 6",
		"666",
	}

	seven := placeholder{
		"777",
		"  7",
		"  7",
		"  7",
		"  7",
	}

	eight := placeholder{
		"888",
		"8 8",
		"888",
		"8 8",
		"888",
	}

	nine := placeholder{
		"999",
		"9 9",
		"999",
		"  9",
		"999",
	}

	colon := placeholder{
		"   ",
		" : ",
		"   ",
		" : ",
		"   ",
	}

	digits := [...]placeholder{
		zero, one, two, three, four, five, six, seven, eight, nine,
	}

	for iLine := range digits[0] {
		for iDigit := range digits {
			fmt.Printf(digits[iDigit][iLine], "   ")
		}
		fmt.Println()
	}

	now := time.Now()
	hour, min, sec := now.Hour(), now.Minute(), now.Second()

	fmt.Printf("hour: %d, min: %d, sec: %d\n", hour, min, sec)

	clock := [...]placeholder{
		digits[hour/10], digits[hour%10],
		colon,
		digits[min/10], digits[min%10],
		colon,
		digits[sec/10], digits[sec%10],
	}

	for iLine := range clock[0] {
		for iDigit := range clock {
			fmt.Printf(clock[iDigit][iLine], "   ")
		}
		fmt.Println()
	}

	for {
		// go get -u github.com/inancgumus/screen
		screen.MoveTopLeft()

		now = time.Now()
		hour, min, sec = now.Hour(), now.Minute(), now.Second()

		fmt.Printf("hour: %d, min: %d, sec: %d\n", hour, min, sec)

		clock = [...]placeholder{
			digits[hour/10], digits[hour%10],
			colon,
			digits[min/10], digits[min%10],
			colon,
			digits[sec/10], digits[sec%10],
		}

		for iLine := range clock[0] {
			for index, iDigit := range clock {
				next := clock[index][iLine]
				if iDigit == colon && sec%2 == 0 {
					next = "   "
				}
				fmt.Printf(next, "   ")
			}
			//fmt.Println()
		}
		time.Sleep(time.Second)
	}

}
