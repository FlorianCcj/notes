func sum(a int, b int) int {
  return a + b 
}

func add(numbers ...int) int {
	sum := 0
	for _, num := range numbers {
			sum += num
	}
	return sum
}

// func sum(a, b int) (int, error)
// func sum(a, b int) (result int)