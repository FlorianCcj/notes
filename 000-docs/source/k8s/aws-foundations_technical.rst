AWS - Foundations Technical
###########################

Sumary
******

* Section 1: Introduction and AWS Solution Architect Foundations

  * Module 1: Customers Are Moving to AWS

    * Five core benefits of public cloud
    * Why AWS?
    * AWS customers

  * Module 2: AWS Solution Architects

    * AWS SA roles and responsibilities
    * The multitude of AWS services
    * Guiding principles
    * Keys to success

  * Module 3: You Know More Than You Realize

    * Customer data center technology vs AWS
    * The whole is greater than the sum of its parts

  * Module 4: AWS Architectural Concepts

    * Regions and Availability Zones
    * Points of presence (POPs)
    * Management Continuum
    * Shared Security model
    * Infrastructure as code

  * Module 5: Building Blocks

    * Compute
    * Storage
    * Networking
    * Databases
    * Security
    * Management

* Section 2: Customer Questions and the Well-Architected Framework

  * Module 6: Customer Questions

    * Customer questions

  * Module 7: The AWS Well-Architected Framework

    * Operational Excellence
    * Security
    * Reliability
    * Performance Efficiency
    * Cost Optimization

* Section 3: Solution Architecture Design

  * Module 8: Architecting an AWS Solution Concepts

    * Principles
    * Focus
    * Scope

  * Module 9: Case Study: Customer Engagement

    * Meet the customer
    * Understand the issues and application
    * Identify current and future capabilities
    * Summarize findings
    * Form a preliminary solution

  * Module 10: Engaging Customers and Architecting Solutions

    * Functional vs. Non-Functional Requirements
    * Selecting specific AWS services
    * Additional considerations
    * Migration

  * Module 11: Case Study: Architecting a Solution

    * Data services
    * Compute and storage
    * Network and security
    * Monitoring and management
    * Costs
    * Migration and cutover

  * Module 12: Case Study: Proposed Solution Architecture

    * Cloud migrated
    * Reliability Pillar
    * Performance Efficiency Pillar
    * Cost Optimization Pillar
    * Security Pillar
    * Operational Excellence Pillar
    * Proposed case study solution

* Section 4: Exploring Solution Patterns and Architectures

  * Module 13: Customer Use Cases and Patterns

    * Hybrid Web Application Architecture
    * Modified Hybrid Architecture
    * Container Microservices Architecture
    * Serverless Microservices Architecture
    * Modern Big Data Architecture

* Section 5: Wrap Up

  * Module 14: Takeaways

    * Key points
    * Principles

  * Module 15: Next Steps

    * Resources
    * Additional training

Let's work
**********

Gaby Chaib
gchaib@amazon.com

solution achitect: certifier, guide de passage au cloud
AZ: availlability Zone
ECS: EKS mais deleguer a amazon
fargate: un peu autoscalling

Cloud:

  * agility
  * Elasticity
  * cost reduction
  * global reach
  * breadth of service

amazon leadership principe

* Customer obsession
* Earn Trust
* ...

* TEchnique

  * VMs -> Compute EC2
  * storage -> Storage EBS
  * Network -> Virtual private cloud

https://aws.amazon.com/fr/products/

choisir le lieu:
* la legislation
* le prix
* latence (voir l appli cloudping)
* services disponible

Self manage -> fully manage service
Corporate data center -> AWS cloud DB on instamce -> AWS cloud RDS instance

M3 - Building Block
--------------------

Compute

EC2-EKS-Lamba

* EC2: Elastic Compute Cloud
  * on demand: a la journee
  * reserved: reserver, engagement
  * spot: aux encheres
  * saving plan: engagement sur une consomation

auto-scalling

* vertical = on augmente l'instance
* horizontal = on créé d'autres instances

https://www.qwiklabs.com

FAQ
""""

* What will change when i move on AWS ?
  * reduction d infra
  * besoin de formation
  * facturation a l usage
  * centralisation des data
  * besoin d integration de l existant
  * reorganisation des equipes
  * potentiellement appel a des eternes
* How I secure is my AWS Worload
  * IAM
  * cloudwatch
  * certification
  * security artefact
  * DC certifie ISO et HDS
  * definition des niveaux d acces en fonction des user profile
  * qu est ce qu il entend par securite ? -> permettra de definir des metrics
  * gestion des cles de chiffrement
  * auto remediation (self healing)
  * test d intrusion
* How can AWS improve business continuity and disater recovery ?
  * AZ
  * voir multi region
  * ssd vs hdd
  * quel est votre sla ?
  * bar
  * rto/rpo
  * replication
* How do i mesure and compare workload perf in the cloud to on premise
  * metrics ?
  * definir des objectifs d acceptation
* does it cost more or less in AWS compare to on-premise
  * ca depend
  * on part d ou
  * total cost of ownership

Module 3 - The Well-architected framework
-----------------------------------------

P99 !!!!!!!!

C'est pas noir qui prend l'coin, c'est blanc qui fait san-san TATATA
C'est pas l'homme qui prend la mere c est la mer qui prend l homme

8
