// 2

package main
import "fmt"

func HelloWorld() string {
  return "Hello, world"
}

func Hello(name string) string {
	if name == "" {
		name = "World"
	}
	return "Hello, " + name
}

func main() {
	fmt.Println(HelloWorld())
	fmt.Println(Hello("world"))
}
