// 3

package main
import "fmt"

const english = "English"
const french = "French"
const spanish = "Spanish"
const englishHelloPrefix = "Hello"
const frenchHelloPrefix = "Salut"
const spanishHelloPrefix = "Hola"

func greetingPrefix(language string) (prefix string) {
	switch language {
	case french:
		prefix = frenchHelloPrefix
	case spanish:
		prefix = spanishHelloPrefix
	default:
		prefix = englishHelloPrefix
	}
	return
	}

func Hello(name string, language string) string {
	if name == "" {
		name = "World"
	}

	return greetingPrefix(language) + ", " + name
}

func main() {
	fmt.Println(Hello("world", ""))
}
