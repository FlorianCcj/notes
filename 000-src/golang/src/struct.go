
    package main

    type Saiyan struct {
        Name string
        Power int
    }

    func main() {
        
        goku := Saiyan{
            Name: "Goku",
            Power: 9000,
        }

        println(goku.Name)
        
        geta := Saiyan{Name: "Geta"}
        geta.Power = 8500

        gohan := &Saiyan{"Gohan", 7000}

        Super(gohan)

        println(gohan.Power)
        
        SuperFake(gohan)

        println(gohan.Power)

    }

    func Super(guy *Saiyan) {
        guy.Power += 10000
    }

    func SuperFake (guy *Saiyan) {
        guy = &Saiyan{"Fake", 0}
    }