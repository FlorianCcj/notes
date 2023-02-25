Terraform - Get started
#######################

:code:`sudo mv terraform /user/local/bin`
:code:`sudo mv terraform /usr/local/bin`
:code:`terraform`

config bases
************

Terraform uses a declarative model for defining infrastructure
format: Hashicorp Configuration Language
extension: :code:`.tf`
provider: motor to interprete files

.. code-block:: hcl

  provider "azurerm" {
      version = "~>1.32.0"
  }

Make a new a ressource group

.. code-block:: hcl

  resource "<type>" "<name_of_your_choice>" {
      <properties_see_in_doc>: <values_see_in_doc>
  }

.. code-block:: hcl

  resource "azurerm_resource_group" "rg" {
      name     = "myTFResourceGroup"
      location = "eastus"
      tags = { <key value whatever you want> }
  }

* acces property with :code:`<type>.<name_of_your_choice>`
* :code:`azurerm_resource_group.rg`
* :code:`azurerm_resource_group.rg.id`

Command base
************

* command :code:`terraform init`: Initialize the Terraform configuration directory (create a dir :code:`.terraform`)
* command :code:`terraform plan`: Create an execution plan
* command :code:`terraform apply`: Create or modify infrastructure
* command :code:`terraform show`: print the state of your infrastructure
* command :code:`terraform graph`: seems fun :+1:
* command :code:`terraform plan -out=newplan`: Create an execution plan with diff
* command :code:`terraform apply "newplan"`: apply the newplan
