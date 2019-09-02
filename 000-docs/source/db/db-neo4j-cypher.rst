create a node
=============

.. code-block:: cypher

    CREATE (ee: Persone {name: "Emil", from: "Sweden"})
    CREATE (me:User {name: "medru"})
    RETURN me

* :code:`(me)` parenthesis say that :code:`me` is a node. :code:`me` is also a temporary name 
* :User add a node s label
* {name: "medru"} properties that you want 
* RETURN permit to print object in ihm

read node
=========

.. code-block:: cypher

    MATCH (ee: Person) WHERE ee.name = "Emil" RETURN ee
    MATCH (me: User {name: "medru"})

add relation
============

.. code-block:: cypher

    // Add company
    MATCH (me:User {name:"medru"})
    CREATE (me)-[w:WORKS_AT]->(st:Company {name: "Steloria"})
    RETURN me, w, st

    // multi directionnal

    //Create many users
    MATCH (st:Company {name:"Steloria"})
    CREATE 
        (n:User {name:"Nymeria"})-[:WORKS_AT]->(st), 
        (p:User {name:"Patrick"})-[:WORKS_AT]->(g:Company {name:"Google"}), 
        (j:User {name:"Josiane"}), 
        (f:User {name:"Francis"}), 
        (c:User {name:"Caroline"})
        //Create friend relation
    MATCH (medru:User {name:"medru"}), (nymeria:User {name: "Nymeria"})
    CREATE (medru)-[:FRIEND_WITH]->(nymeria)

pratice a bit
=============


.. code-block:: cypher

    // recherche touchy

    // Create many relations
    MATCH (j:User {name: "Josiane"}), (m:User {name: "medru"}), (n:User {name: "Nymeria"}), 
        (p:User {name: "Patrick"}), (c:User {name: "Caroline"}), (f:User {name: "Francis"})
    CREATE 
        (n)-[:FRIEND_WITH]->(f), 
        (m)-[:FRIEND_WITH]->(j), 
        (m)-[:FRIEND_WITH]->(c), (c)-[:FRIEND_WITH]->(p)

    //Who works at google ?
    MATCH (m:User {name: "medru"}), (g:User)-[:WORKS_AT]->(google:Company {name: "Google"}),
    path = (m)-[:FRIEND_WITH*]-(g)
    RETURN path, google

other
=====

.. code-block:: cypher
    
    CALL db.schema()

.. code-block:: cypher

    // flush DB
    MATCH (n)
    DELETE DETACH n