
https://fr.wikibooks.org/wiki/Programmation_C%2B%2B/Les_classes

gcc -Wall -c <source_file> -o <object_file>
gcc <object_file> -o <exe_file>
g++ -Wall -c main.cpp -o main.o && g++ main.o -o test && ./test

g++ main.cpp includes/My_class.cpp -o test && ./test

Tout dans un fichier
********************

* :code:`g++ -Wall -c main.cpp -o main.o && g++ main.o -o test && ./test`
* :code:`g++ main.cpp -o test && ./test`

.. code-block:: cpp
    :name: main.cpp

    #include <iostream>

    using namespace std;

    class add {
      public:

        void sum(int int1, int int2)
        {
          _result = int1 + int2;
        }

        int getResult()
        {
          return result();
        }

        int result()
        {
          return _result;
        }

      private:
        int _result;
    };

    int main()
    {
        add first_add;
        first_add.sum(1,2);
        cout << first_add.result() << endl;
        cout << "coucou" << endl;
        return 0;
    }

Sortir les includes
*******************

.. code-block:: cpp
    :name: main.cpp

    #include <iostream>
    #include "includes/My_class.h"

    using namespace std;

    int main()
    {
        Add first_add;
        cout << first_add.result() << endl;
        first_add.sum(1,25);
        cout << first_add.result() << endl;
        cout << "coucou" << endl;
        return 0;
    }

.. code-block:: cpp
    :name: includes/My_class.h

    #ifndef MY_CLASS_H
    #define MY_CLASS_H

    #include <iostream>
    using namespace std;

    class Add {
    public:

      Add();
      Add(int result);
      //~Add();

      void sum(int int1, int int2);
      int getResult();
      int result();

    private:
      int _result;
    };

    #endif

.. code-block:: cpp
    :name: includes/My_class.cpp

    #include "My_class.h" 
    #include <iostream>

    using namespace std;

    Add::Add() : _result(0)
    {}

    Add::Add(int result) : _result(result)
    {}

    //Add::~Add() {
      // delete[] _text;
    //}

    void Add::sum(int int1, int int2)
    {
        _result = int1 + int2;
    }

    int Add::getResult()
    {
        return _result;
    }

    int Add::result()
    {
        return _result;
    }
