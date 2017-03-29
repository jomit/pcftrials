# Prerequisites 
--------------------------------------
Azure Trial Subscription : https://azure.microsoft.com/en-us/free/

Azure CLI : https://docs.microsoft.com/en-us/cli/azure/install-azure-cli 

Pivotal Web Services Trial Account : https://run.pivotal.io/

Cloud Foundry CLI : https://github.com/cloudfoundry/cli#downloads

Nodejs : https://nodejs.org/en/

Git : https://git-scm.com/ 


# Lab 1 - Setup Device
--------------------------------------
Setup Raspberry Pi
    https://www.raspberrypi.org/documentation/setup/

    https://www.hanselman.com/blog/HowToSetUpARaspberryPi3FromScratchWithVideo.aspx

    (Install device-discovery-cli it needed to get the IP of your PI)

    $ npm install -g device-discovery-cli gulp
    
    $ devdisco list --eth   [or]
    $ devdisco list --wifi

SSH into the device and install Node and Git

    $ sudo apt-get update

    $ sudo apt-get install nodejs
    $ node --version

    $ sudo apt-get install git
    $ git --version


# Lab 2 - Create IoT Hub and Register a Device
------------------------------------------------

Create IoT Hub using Azure Portal

    https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-create-through-portal

Create IoT Hub using CLI 2.0

    https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-create-using-cli

	$ az login

    $ az account set --subscription {subscription id or name}

    $ az provider register -n "Microsoft.Devices"

    $ az group create --name {resource group name} --location westus

    $ az iot hub create --name {my hub name} --resource-group {resource group name}

Register your Device in IoT Hub

    (For Windows command prompt)
    $ az iot device create --device-id myraspberrypi --hub-name {my hub name} --x509 --output-dir %USERPROFILE%\.iot-hub-getting-started

    # For macOS or Ubuntu
    az iot device create --device-id myraspberrypi --hub-name {my hub name} --x509 --output-dir ~/.iot-hub-getting-started

# Lab 3 - Connect Device to Azure
--------------------------------------

    # Install Azure CLI
    # Register a new device in IoT Hub
    # Configure App on the Device to connect to IoT Hub
    # Test Messages coming to IoT Hub using iothub explorer    

# Lab 4 - Setup Pivotal Cloud Foundry
--------------------------------------

Signup for PWS Trial Account
    https://run.pivotal.io/
Install Cloud Foundry CLI
    https://github.com/cloudfoundry/cli#downloads

    $ cf --version
    $ cf login
    
# Lab 5 - Configure and Push Apps
--------------------------------------

    $ git clone https://github.com/jomit/pcftrials.git

    $ cd pcftrials/labs/basic



    # Update App Configuration to connect to IoT Hub    
    # Deploy & Test sample app
    
    $ cd pcftrials/labs/dashboard
    
Update Connection String for IoT Hub

    $ cf push jomitdashboard -c "node server.js" -b https://github.com/cloudfoundry/nodejs-buildpack

    # Scale sample app ???
