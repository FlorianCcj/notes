Db - Neo4j - Cypher
*******************

Key words
=========

:source: https://www.tutorialspoint.com/neo4j/neo4j_cql_introduction.htm

* Read: MATCH, OPTIONAL MATCH, WHERE, START, LOAD CSV
* Write: CREATE, MERGE, SET, DELETE, REMOVE, FOREACH, CREATE UNIQUE
* General: RETURN, ORDER BY, LIMIT, SKIP, WITH, UNWIND, UNION, CALL
* Operator:

    * Math: +, -, /, %, ^
    * comparison: +, <>, <, >, <=, >=
    * Boolean: AND, OR, XOR, NOT
    * string: +
    * list: +, IN, [X], [X ... Y]
    * regex: =-
    * string matching: START WITH, END WITH, CONSTRAINTS

create a node
=============

.. code-block:: Cypher


    CREATE (ee: Persone {name: "Emil", from: "Sweden"})
    CREATE (me:User {name: "medru"})
    CREATE (ma:User:Heros:Necro {name: "Bad"})
    RETURN me

* :code:`(me)` parenthesis say that :code:`me` is a node. :code:`me` is also a temporary name
* :User add a node s label
* {name: "medru"} properties that you want
* RETURN permit to print object in ihm

.. code-block:: Cypher

    // will merge with the node type Person name Emil
    MERGE (te: Persone {name: "Emil", birth: "1998.02.25"})
    MERGE (Jadeja:player {name: "Ravindra Jadeja", YOB: 1988, POB: "NavagamGhed"})
    ON CREATE SET Jadeja.isCreated = "true"
    ON MATCH SET Jadeja.isFound = "true"
    RETURN Jadeja

.. code-block:: cypher

    MATCH (Dhawan:player{name: "shikar Dhawan", YOB: 1985, POB: "Delhi"})
    SET Dhawan.highestscore = 187, YOB = 2012
    RETURN Dhawan

    MATCH (Dhawan:player{name: "shikar Dhawan", YOB: 1985, POB: "Delhi"})
    SET Dhawan: gamer
    RETURN Dhawan

    MATCH (Jadeja:player {name: "Ravindra Jadeja", YOB: 1988, POB: "NavagamGhed"})
    SET Jadeja.POB = NULL
    RETURN Jadeja

.. code-block:: cypher

    MATCH (n) DETACH DELETE n

    MATCH (Ishant:player {name: "Ishant Sharma", YOB: 1988, POB: "Delhi"})
    DETACH DELETE Ishant

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
    CREATE (node1)-[label:Rel_Type {key1:value1, key2:value2, . . . n}]-> (node2)
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

    :sysinfo

.. code-block:: cypher

    // flush DB
    MATCH (n)
    DELETE DETACH n

.. code-block:: cypher

    MATCH (n) RETURN n

.. code-block:: cypher

    MATCH (source {name: "Les Nobles"})<-[*]-(a) RETURN source, a
