How to init a variable without assignation? % var speed int
How to get the return of a function returning 2 value? % dir, file = path.Split("css/main.css")
How do you init and asign a varibale in one line? % dir, file := path.Split("css/main.css")
When to use declaration? % when you don't know the variable, when you group variable declaration, when you make package scoped variable
What type and name will get the argument of a binary? % var Args []string
What command can you use to build and give the output path? % go build -o greeter
How to get the path of the running script? % fmt.Printf("%#v\n", os.Args)
How to get the size of a slice? % len(<slice variable>)
What is a Raw String Literal? % `raw <br/>string <br/>literal` can do it multiline
What is a String Literal? % "string literal", one line
What hapened if I ask the length of a word which get non english character? % Non english caracter is composed by 2 bytes
How to count utf8 string? % import ("unicode/utf8") then utf8?RuneCountInString(name)
How can you print a quote string? % fmt.Printf("%q\n", "Google")
How can you print a string? % fmt.Printf("%s\n", "Google")
How can you print a boolean? % fmt.Printf("%t\n", true)
How can you print a float? % fmt.Printf("%f\n", 12.3124325)
How can you print a float with only 2 digit precision? % fmt.Printf("%.2f\n", 12.3124325)
What does q stand for in printf? % quoted string
How can you print a int? % fmt.Printf("%d\n", 125)
How can you print multiple variable in printf? % fmt.Printf("%d/%d\n", 125, 234)
How can you print the type of a variable? % fmt.Printf("%T\n", "Google")
How can you print a variable withour explicite type? % fmt.Printf("%v\n", "Google")
How can you choose which argument go to which place in printf? % fmt.Printf("%[2]d/%[1]d\n", 232, 125)
How can you print the value of a variable and his type, giving only 2 argument of printf? % fmt.Printf("Type of %d is %[1]T\n", 3)
What is the if statetement synthax? % if <condition1> {} else if <condition2> {} else {}
What can you add in if condition? % only bool
How to combine condition in if statement? % with && or ||
What is the value for un-initialize variable? % nil
How error are handle? % function return 2 value, the function response and a possible error message
What is the switcgh statement synthax? % switch <var> {case "Paris": fmt.Println("France") }
If there is multiple condition which do the same effect, how can I manage it in a switch? % You can add as much as you wish condition, case "Paris", "Lyon"...:
How I test condition on a switch? % switch true { case i > 0: fmt.Println("postitive") }
How can you make the script browse following steps? % Add the fallthrough keywork in the case that are non blocking (carefull it will not test)
What the fallthrough statement do? % Executes the next clause without checking fot its condition
how can you make a for loop in go? % for i:= 1; i <= 1000; i++ {}
how can you make an infinite for loop in go? % for {}
how can you go out of an infinite for loop in go? % with the key work break
how can you iterate getting index and value? % for i, v:= range os.Args {}
how can you generate a random number? % ran.Seed(time.Now().UnixNano())
how to change a string (with spapce) to list of string split by space? % words := string.Fields("lazy cat jumps again and again and again")
What are the composite type in golang? % Array, Slice, String, Maps, Struct
What are the possibility to print an array variable? % fmt.Println("books: ", books), fmt.Printf("books: %q", books), fmt.Printf("books: %#v", books)