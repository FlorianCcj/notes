//package main
//
//import "fmt"
//
//func main() {
//	/*
//	 *
//	 */
//    fmt.Println("Hello World")
//}
//
package main

import (
    "encoding/csv"
    "fmt"
    "log"
    "os"
)

func main() {

    f, err := os.Open("users.csv")

    if err != nil {

        log.Fatal(err)
    }

    csv_reader := csv.NewReader(f)
    csv_reader.Comma = ';'
    csv_reader.Comment = '#'

    records, err := csv_reader.ReadAll()

    if err != nil {
        log.Fatal(err)
    }

    fmt.Print(records)
    for
}
