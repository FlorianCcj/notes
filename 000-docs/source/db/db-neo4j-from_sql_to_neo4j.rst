Db - Neo4j - From SQL to NEO4J
******************************

:source: https://neo4j.com/developer/guide-importing-data-and-etl/

Will use a postgresql database

Export data
===========

:code:`psql -d northwind < export_csv.sql`

.. code-block:: sql

    # export_csv.sql

    COPY (SELECT * FROM customers) TO '/tmp/customers.csv' WITH CSV header;
    COPY (SELECT * FROM suppliers) TO '/tmp/suppliers.csv' WITH CSV header;
    COPY (SELECT * FROM products)  TO '/tmp/products.csv' WITH CSV header;
    COPY (SELECT * FROM employees) TO '/tmp/employees.csv' WITH CSV header;
    COPY (SELECT * FROM categories) TO '/tmp/categories.csv' WITH CSV header;

    COPY (SELECT * FROM orders
        LEFT OUTER JOIN order_details
        ON order_details.OrderID = orders.OrderID)
        TO '/tmp/orders.csv' WITH CSV header
    ;

Import Data
===========

.. code-block:: cypher

    // import_csv.cypher

    // Step 1: Create schema

    // Create customers
    USING PERIODIC COMMIT
    LOAD CSV WITH HEADERS FROM "file:customers.csv" AS row
    CREATE (:Customer {companyName: row.CompanyName, customerID: row.CustomerID, fax: row.Fax, phone: row.Phone});

    // Create products
    USING PERIODIC COMMIT
    LOAD CSV WITH HEADERS FROM "file:products.csv" AS row
    CREATE (:Product {productName: row.ProductName, productID: row.ProductID, unitPrice: toFloat(row.UnitPrice)});

    // Create suppliers
    USING PERIODIC COMMIT
    LOAD CSV WITH HEADERS FROM "file:suppliers.csv" AS row
    CREATE (:Supplier {companyName: row.CompanyName, supplierID: row.SupplierID});

    // Create employees
    USING PERIODIC COMMIT
    LOAD CSV WITH HEADERS FROM "file:employees.csv" AS row
    CREATE (:Employee {employeeID:row.EmployeeID,  firstName: row.FirstName, lastName: row.LastName, title: row.Title});

    // Create categories
    USING PERIODIC COMMIT
    LOAD CSV WITH HEADERS FROM "file:categories.csv" AS row
    CREATE (:Category {categoryID: row.CategoryID, categoryName: row.CategoryName, description: row.Description});

    USING PERIODIC COMMIT
    LOAD CSV WITH HEADERS FROM "file:orders.csv" AS row
    MERGE (order:Order {orderID: row.OrderID}) ON CREATE SET order.shipName =  row.ShipName;

    // Step 2: create index

    CREATE INDEX ON :Product(productID);
    CREATE INDEX ON :Product(productName);
    CREATE INDEX ON :Category(categoryID);
    CREATE INDEX ON :Employee(employeeID);
    CREATE INDEX ON :Supplier(supplierID);
    CREATE INDEX ON :Customer(customerID);
    CREATE INDEX ON :Customer(customerName);

    // Step 3: add constraint

    CREATE CONSTRAINT ON (o:Order) ASSERT o.orderID IS UNIQUE;

    // Step 4: wait asynchronous request ended

    scema await

    // Step 5: create relationships to orders products and employees

    USING PERIODIC COMMIT
    LOAD CSV WITH HEADERS FROM "file:orders.csv" AS row
    MATCH (order:Order {orderID: row.OrderID})
    MATCH (product:Product {productID: row.ProductID})
    MERGE (order)-[pu:PRODUCT]->(product)
    ON CREATE SET pu.unitPrice = toFloat(row.UnitPrice), pu.quantity = toFloat(row.Quantity);

    USING PERIODIC COMMIT
    LOAD CSV WITH HEADERS FROM "file:orders.csv" AS row
    MATCH (order:Order {orderID: row.OrderID})
    MATCH (employee:Employee {employeeID: row.EmployeeID})
    MERGE (employee)-[:SOLD]->(order);

    USING PERIODIC COMMIT
    LOAD CSV WITH HEADERS FROM "file:orders.csv" AS row
    MATCH (order:Order {orderID: row.OrderID})
    MATCH (customer:Customer {customerID: row.CustomerID})
    MERGE (customer)-[:PURCHASED]->(order);

    Step 6: create relationships between products, suppliers, and categories

    USING PERIODIC COMMIT
    LOAD CSV WITH HEADERS FROM "file:products.csv" AS row
    MATCH (product:Product {productID: row.ProductID})
    MATCH (supplier:Supplier {supplierID: row.SupplierID})
    MERGE (supplier)-[:SUPPLIES]->(product);

    USING PERIODIC COMMIT
    LOAD CSV WITH HEADERS FROM "file:products.csv" AS row
    MATCH (product:Product {productID: row.ProductID})
    MATCH (category:Category {categoryID: row.CategoryID})
    MERGE (product)-[:PART_OF]->(category);

    // Step 7: make a relationship between employees and a reporting structure

    USING PERIODIC COMMIT
    LOAD CSV WITH HEADERS FROM "file:employees.csv" AS row
    MATCH (employee:Employee {employeeID: row.EmployeeID})
    MATCH (manager:Employee {employeeID: row.ReportsTo})
    MERGE (employee)-[:REPORTS_TO]->(manager);

:code:`bin/neo4j-shell -path northwind.db -file import_csv.cypher`

Querying the Graph
==================

Which Employee had the Highest Cross-Selling Count of ‘Chocolade’ and Which Product?
------------------------------------------------------------------------------------

.. code-block:: cypher

    MATCH (choc:Product {productName:'Chocolade'})<-[:PRODUCT]-(:Order)<-[:SOLD]-(employee),
        (employee)-[:SOLD]->(o2)-[:PRODUCT]->(other:Product)
    RETURN employee.employeeID, other.productName, count(distinct o2) as count
    ORDER BY count DESC
    LIMIT 5;

How are Employees Organized? Who Reports to Whom?
-------------------------------------------------

.. code-block:: cypher

    MATCH path = (e:Employee)<-[:REPORTS_TO]-(sub)
    RETURN e.employeeID AS manager, sub.employeeID AS employee;

Which Employees Report to Each Other Indirectly?
------------------------------------------------

.. code-block:: cypher

    MATCH path = (e:Employee)<-[:REPORTS_TO*]-(sub)
    WITH e, sub, [person in NODES(path) | person.employeeID][1..-1] AS path
    RETURN e.employeeID AS manager, sub.employeeID AS employee, CASE WHEN LENGTH(path) = 0 THEN "Direct Report" ELSE path END AS via
    ORDER BY LENGTH(path);

How Many Orders were Made by Each Part of the Hierarchy?
--------------------------------------------------------

.. code-block:: cypher

    MATCH (e:Employee)
    OPTIONAL MATCH (e)<-[:REPORTS_TO*0..]-(sub)-[:SOLD]->(order)
    RETURN e.employeeID, [x IN COLLECT(DISTINCT sub.employeeID) WHERE x <> e.employeeID] AS reports, COUNT(distinct order) AS totalOrders
    ORDER BY totalOrders DESC;

Upgrading the Graph
===================

New Manager
-----------

.. code-block:: cypher

    MATCH (mgr:Employee {EmployeeID:5})
    MATCH (emp:Employee {EmployeeID:3})-[rel:REPORTS_TO]->()
    DELETE rel
    CREATE (emp)-[:REPORTS_TO]->(mgr)
    RETURN *;
