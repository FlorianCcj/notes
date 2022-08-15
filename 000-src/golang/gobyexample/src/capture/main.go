package main

import (
	"github.com/kbinani/screenshot"
	"image/png"
	"os"
	"fmt"
)

func Capture() (img image.Image, err error) {
	img, err = screenshot.Capture()
	return
}

func main() {

	img, err := screenshot.Capture(10, 10, 100, 100)
	if err != nil {
			panic(err)
	}
	fileName := fmt.Sprintf("%d_%dx%d.png", i, bounds.Dx(), bounds.Dy())
	file, _ := os.Create(fileName)
	defer file.Close()
	png.Encode(file, img)

	fmt.Printf("#%d : %v \"%s\"\n", i, bounds, fileName)
}
