Azure - AZ204
##############

Introduction et présentation de l'environnement pédagogique
************************************************************

- Tenant
- each abonement are attach to a tenant

https://www.skillpipe.com/
https://gkfrance.learnondemand.net/
https://www.microsoftazurepass.com/
olivier.faivre@skillsoft.com
resource/azure.com

Labs
https://github.com/MicrosoftLearning/AZ-204-DevelopingSolutionsforMicrosoftAzure/tree/master/Instructions/Labs

Site pour bachoter
https://vceplus.io/
https://examcollection.com/
https://www.examtopics.com/

aide a la redaction de template
https://docs.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview?tabs=bicep 

Solution gerer: microsoft gere la ferme de serveur (azure apps)

https://lms.gklearn.online/ 
florian.palmade@prologism.fr

Rappel des objectifs
*********************

Module 1 Creating Appservice
****************************

App service: manage scaling and load balancing
App service
- auto scaling
- CICD support
- Deploy slot
- on Linux
capacity:

app service plan
acu: azure compute unit

- some config file could be map directly in web app configuration

server iis: if inactive 20 min, remove resource
always on: do not unalocate resource

Auto scalling
au niveau du app service plan

Module 01 - Labs
*****************

# get a list of your subscriptions with the az account list command
az account list --output table

# get the current default subscription using show
az account show --output table

# to switch to a different subscription, use az account set with the subscription ID or name you want to switch to.
az account set --subscription "Subscription Name" or "Subscription ID"

Task 2
=======

- search > storage accounts > create
- blade > basics > review > + create
  - subscription > default
  - group > create new > ManagedPlatform
  - account name > imgstorflorian
  - Region > US East US
  - Perf > Standart
  - Redundaancy > LRS
- Overview > Go to resource
- Storage account blade > Security + networking > access keys
- access keys blade > show keys
  - copy connection string

Task 3
=======

- Storage account blade > Data storage > containers
- Containers blade > + Container
  - name > images
  - public access lvl > Blob
- Containers blade > container images
- images blade > upload
  - files: f:\\allfiles\\labs\\01\\Starter\\Images\\grilledcheese.jpg

Task 4 - Create web app
========================

- Azure portal navigation pane > create a resource
- create a resource blade > search sevc and marketplace > Web App
- Marketplace search result > Web App
- Web App blade > create
- Create Web App blade > basic tab
  - Subscrtiption > default
  - Resource group > ManagedPlatform
  - Name > imgapiflorian
  - Publish > code
  - Runtime stack > .NET Core 3.1 LTS
  - OS > Windows
  - Region > East US
  - Windows Plan East US > Create new > Name > ManagedPlan
  - SKU > default of SKU - Standard S1
- Create Web App blade > deploy tab
  - next
- Create Web App blade > Monitoring tab > Enable Application Insight > No > Review and create

Task 5 - Configure web app
===========================

- App service Blade > Settings section > Configuration
- Configuration Section > Save > Continue
  - Application settings > New application settings
  - Add/Edit application setting > Name > StorageConnectionString
  - Value > Storage Connection String previously copy
  - Deployment slot setting > default
- App Service blade > settings section > properties
  - url > copy

Task 6 - Deploy an ASP.NET web application to Web Apps
=======================================================

- VSCode > Open > F\Allfiles\Labs\01\Starter\API
- Controller > ImagesController > lf l26 l36 and l55 method
- Terminal az login

az webapp list --resource-group ManagedPlatform
az webapp list --resource-group ManagedPlatform --query "[?starts_with(name, 'imgapi')]"
az webapp list --resource-group ManagedPlatform --query "[?starts_with(name, 'imgapi')].{Name:name}" --output tsv
cd F:\Allfiles\Labs\01\Starter\API\
az webapp deployment source config-zip --resource-group ManagedPlatform --src api.zip --name <name-of-your-api-app>

- azure portal >  resource group > imgapiflorian

Exercise 2: Build a front-end web application by using Azure Web Apps
======================================================================

Task 1: Create a web app
=========================

- create resource > Search svc > Web App
- Marketplace > webapp
  - Subscrtiption > default
  - Resource group > ManagedPlatform
  - Name > imgwebflorian
  - Publish > code
  - Runtime stack > .NET Core 3.1 LTS
  - OS > Windows
  - Region > East US
  - Windows Plan East US > ManagedPlan (S1)
- Monitoring > insight > no

Task 2: Configure a web app
============================

- App service blade > settings section > configuration
- configuration section > save > continue
  - application settings > new application setting
  - Add/Edit application setting > name > ApiUrl
  - Value > web app url (wth https://)
  - Deployment slot > default

Task 3: Deploy an ASP.NET web application to Web Apps
======================================================

- VSCode > F/Allfiles/Labs/01/Starter/Web
- Pages > Index.cshtml > l30 l41

az login
az webapp list --resource-group ManagedPlatform
az webapp list --resource-group ManagedPlatform --query "[?starts_with(name, 'imgweb')]"
az webapp list --resource-group ManagedPlatform --query "[?starts_with(name, 'imgweb')].{Name:name}" --output tsv
cd F:\Allfiles\Labs\01\Starter\Web\
az webapp deployment source config-zip --resource-group ManagedPlatform --src web.zip --name <name-of-your-web-app>

- Azure portal > resource group > ManagedPlatform > imgwebflorian
- App service blade > browse
- Contoso Photo Gallery > upload a new image > Browse > F/Allfiles/Labs/01/Starter/images > bahnmi.jpg

Module 2 Implement Azure Function
**********************************

Module 02 - Labs
*****************

- starege account > create
  - subscription > default
  - resource group > create new > serverless
  - account name > funcstorflorian
  - Region East US
  - Performance > Standart
  - Redundancy > LRS
- Go to resource > secu + network > access keys > show keys > copy connection string

Task 3: Create a function app
==============================

Module 3 Develop solution with blob
************************************

1. Azure storage

- necessite un compte de stckage
  - nom de compte
  - cle de stockage
  - jeton oauth (sous RBAC)
  - SAS (shared access signature) (right to anonymous)
- met a dispo 5 Po de stockage
- un abonnement permet de creer 250 comptes de stockage
- type
  - blobs
    - block blobs (4 ko -> 100m / block)
      - modification unitaire: un block
    - page blobs
      - unite de base: page 512 o
      - modif unitaire: 1 page
    - append blob
      - block blobs
      - addapter au log
  - file storage (SMB) (only new directory)
  - tables
  - queues
  - global: full access
  - premium: only one type
- ARM (azure resource manager): easy to manage all your resource via api
- naming: NOM.blob.core.windows.net
- naming: NOM.table.core.windows.net
- tout fichier deposer sur un storage account, a 3 copy
- redondance
  - LRS: same region
  - ZRS: multi region
  - GRS: LRS + back up
  - RA-GRS: LRS + read acces on a second region

Blob storage

- solution de redondance
- stockage de fichier
- blob container
  - add storage on it
  - only one layer
- storage access policy


2. File lifecycle

- access tier
  - hot
  - cool
  - archive
- policy: rules to switch between hot -> cool -> archive -> delete
- rehydratation: 10Go/h/abonnement, manage priorisation

3. Work with blob storage

If no availlable package, you have the api doc

Module 4 Develop solution with cosmos DB
*****************************************

- replication
- varied consistency elvels
- low latency
- elastic scale out (until 100s millions requests
- multi api, like if it is casandra, mongo, sql, ... db

- en cosmo db utilisé un particion id le plus discriminant possible

Module 04 - Labs
*****************

Module 5 Implement IaaS Solution
*********************************

Module 05 - Labs
*****************

Module 6 Implement user authenication and authorization
********************************************************

Module 06 - Labs
*****************

Module 7 Implement secure cloud solution
*****************************************

Module 07 - Labs
*****************

Module 8 Implement API management
**********************************

Module 08 - Labs
*****************

Module 9 Devlop event based solution
*************************************

Module 09 - Labs
*****************

Module 10 Develop message based solutions
******************************************

Module 10 - Labs
*****************

Module 11 Instrument solutions to support monitoring and logging
*****************************************************************

Module 11 - Labs
*****************

Module 12 Integrate caching and content delivery within solutions
******************************************************************

Module 12 - Labs
*****************

Conclusion - Evaluation de l’atteinte des objectifs
****************************************************

Enquête de satisfaction
************************
