
Golang - Udemy - Bootcamp
##########################

Section 1: Basics
******************

058 214 058

1.2 - Variable
===============

```
package main
func main() {
  var speed int
}
```

```
package main
import ("fmt"; "path")

func main() {
  var dir, file string

  // replace one of the variable by _ if you do not use it
  dir, file = path.Split("css/main.css")

  // or use short Declaration
  dir, file := path.Split("css/main.css")

  fmt.Println("dir: ", dir)
  fmt.Println("file: ", file)
}
```

4. When to use a short declaration?
====================================

when to use declaration? % when you don't know the variable, when you group variable declaration, when you make package scoped variable

5. Let's convert a value!
==========================

speed := 200
force := 2.5
speed = int(float64(speed) * force)

6. ⭐️ Get input from terminal ⭐️
=================================

What type and name will get the argument of a binary? % var Args []string

7. Learn the basics of os.Args
===============================

```
import (
  "fmt"
  "os"
)

func main() {
  fmt.Printf("%#v\n", os.Args)
}
```

What command can you use to build and give the output path? % go build -o greeter
How to get the path of the running script? % fmt.Printf("%#v\n", os.Args)
How to get the size of a slice? % len(<slice variable>)

8. Naming Things: Recommendations
==================================

When to use abreviation? % When the scope of the variable is short, example in functions
Do you I have to use abbreviation everywhere? % No, for big scope as package scoped prefer full word
What are the naming synthax convention? % MixedCaps, never user underscore

9. ★ EXERCISES ★
===================

10. What is a Raw String Literal?
==================================

What is a Raw String Literal? % `raw <br/>string <br/>literal` can do it multiline
What is a String Literal? % "string literal", one line

11. How to get the length of a utf-8 string?
=============================================

What hapened if I ask the length of a word which get non english character? % Non english caracter is composed by 2 bytes
How to count utf8 string? % import ("unicode/utf8") then utf8?RuneCountInString(name)

12. Example: Banger: Yell it back!
===================================

13. ★ STRINGS EXERCISES ★
============================

14. Constants and iota
=======================

What is a iota? % iota is a built-on constant generator which generates ever increasing number

```
func main() {
  const (
    monday = 0
    tuesday = 1
    wednesday = 2
    thursday = 3
    friday = 4
    saturday = 5
    sunday = 6
  )

  fmt.Println(monday, tuesday, wednesday, thursday, friday, saturday, sunday)
}
```


```
func main() {
  const (
    monday = iota // if you want to begin at 1 use iota + 1
    tuesday
    wednesday
    thursday
    friday
    saturday
    sunday
  )

  fmt.Println(monday, tuesday, wednesday, thursday, friday, saturday, sunday)
}
```

15. ★ IOTA EXERCISES ★
=========================

16. ⭐️ Print Formatted Output ⭐️
=================================

Printf is like in C

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

17. Println vs Printf
======================

18. What is an Escape Sequence?
================================

19. How to print using Printf?
===============================

20. The verbs can be type-safe too!
====================================

21. ★ PRINTF EXERCISES ★
===========================

22. ⭐️ If Statement ⭐️
=======================

What is the if statetement synthax? % if <condition1> {} else if <condition2> {} else {}
What can you add in if condition? % only bool
How to combine condition in if statement? % with && or ||

23. If Statement
=================

24. Else and Else If
=====================

25. ★ IF STATEMENT EXERCISES ★
=================================

26. Tiny Challenge: Validate a single user
===========================================

27. Solution: Validate a single user
=====================================

28. Tiny Challenge: Validate multiple users
============================================

29. Solution: Validate multiple users
======================================

30. ⭐️ Error Handling ⭐️
=========================

31. What is a nil value?
=========================

What is the value for un-initialize variable? % nil

32. What is an error value?
============================

How error are handle? % function return 2 value, the function response and a possible error message

33. Error handling example
===========================

34. Challenge: Feet to Meter
=============================

35. Solution: Feet to Meter
============================

36. What is a Simple Statement?
================================

What is a Short Statement? % if <var statement>; <condition> { fmt.Println("Error") } <br/> if n, err := strconv.Atoi("42"); err == nil { fmt.Println("Error") }
Where can I use variable init in short statement? % only in the if

37. Scopes of simple statements
================================

38. Famous Shadowing Gotcha
============================

39. ★ ERR HANDLING EXERCISES ★
=================================

40. ⭐️ Switch Statement ⭐️
===========================

What is the switcgh statement synthax? % switch <var> {case "Paris": fmt.Println("France") }

41. Learn the Switch Statement Basics
======================================

42. What is a default clause?
==============================

43. Use multiple values in case conditions
===========================================

If there is multiple condition which do the same effect, how can I manage it in a switch? % You can add as much as you wish condition, case "Paris", "Lyon"...:

44. Use bool expressions in case conditions
============================================

How I test condition on a switch? % switch { case i > 0: fmt.Println("postitive") }

45. How does the fallthrough statement work?
=============================================

How can you make the script browse following steps? % Add the fallthrough keywork in the case that are non blocking (carefull it will not test)
What the fallthrough statement do? % Executes the next clause without checking fot its condition

46. What is a short switch?
============================

47. Tiny Challenge: Parts of a Day
===================================

48. Solution: Parts of a Day
=============================

49. If vs Switch: Which one to use?
====================================

50. ★ SWITCH EXERCISES ★
===========================

51. ⭐️ Loops ⭐️
================

for i:= 1; i <= 1000; i++ {
}
for i <= 1000; i++ {
}
for i <= 1000 {
}
for {
}

how can you make a for loop in go? % for i:= 1; i <= 1000; i++ {}
how can you make an infinite for loop in go? % for {}
how can you go out of an infinite for loop in go? % with the key work break
what does the continue key word do? % quits the current step and repeats the loop from where it left off

52. There is only one loop statement in Go
===========================================

53. How to break from a loop?
==============================

54. How to continue a loop? (+BONUS: Debugging)
================================================

55. Create a multiplication table
==================================

56. How to loop over a slice?
==============================

57. For Range: Learn the easy way!
===================================

how can you iterate getting index and value? % for i, v:= range os.Args {}
how can you iterate getting index and value, but only from the 2nd element? % for i, v:= range os.Args[1:] {}

58. ★ LOOP EXERCISES #1 ★
============================

Section 2: Projects: For Go Basics
***********************************

013 156 071 /214

Section 3: Array and Memory Layout
***********************************

019 143 090 /214

Section 4: Project: Write a Retro Clock
****************************************

007 124 097 /214

Section 5: Slice and Internals
*******************************

034 117 131 /214

Section 6: Project: Write a File Finder
****************************************

005 083 136 /214

Section 7: Project: Animate a Bouncing Ball
********************************************

007 078 143 /214

Section 8: UTF-8: Encode and Decode
************************************

011 071 154 /214

Section 9: Projects: Create a Spam Maker
*****************************************

007 060 161 /214

Section 10: Maps and Internals
*******************************

006 053 167 /214

Section 11: Project: Create a Log Parser
*****************************************

006 047 173 /214

Section 12: Structs: Encode and Decode JSON
********************************************

010 041 183 /214

Section 13: Functions, Pointers and Addressability
***************************************************

015 031 198 /214

Section 14: Methodes: OOP with Go
**********************************

004 016 202 /214

Section 15: Interface: Implicit OOP Way
****************************************

006 012 208 /214

Section 16: Interfaces: Marshaler, Sorter and so on
****************************************************

005 006 213 /214

Section 17: BONUS SECTION: THANK YOU!
**************************************

001 001 214 /214

slice exo
- https://github.com/inancgumus/learngo/tree/master/16-slices/exercises/22-adv-ops-practice
- https://github.com/inancgumus/learngo/tree/master/16-slices/exercises/23-limit-the-backing-array-sharing
- https://github.com/inancgumus/learngo/tree/master/16-slices/exercises/24-fix-the-memory-leak
- https://github.com/inancgumus/learngo/tree/master/16-slices/exercises/25-add-lines
- https://github.com/inancgumus/learngo/tree/master/16-slices/exercises/26-print-daily-requests
- section 6, projecy

letter number: https://youtu.be/1GSjbWt0c9M?t=403
charac computer:
hexa: https://www.youtube.com/watch?v=4EJay-6Bioo
go blog: https://blog.golang.org/strings

string <=> [byte]
"hey" <=> []byte{104,101,121}
