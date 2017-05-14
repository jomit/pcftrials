# Prerequisites 

Azure Trial Subscription : https://azure.microsoft.com/en-us/free/

Azure CLI : https://docs.microsoft.com/en-us/cli/azure/install-azure-cli 

Pivotal Web Services Trial Account : https://run.pivotal.io/

Cloud Foundry CLI : https://github.com/cloudfoundry/cli#downloads

Nodejs : https://nodejs.org/en/

Git : https://git-scm.com/ 


# Lab 1 - Setup Device

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

Create IoT Hub using Azure Portal : https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-create-through-portal

Create IoT Hub using CLI 2.0 : https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-create-using-cli

	$ az login

    $ az account list 

    $ az account set --subscription {subscription id or name}

    $ az provider register -n "Microsoft.Devices"

    $ az group create --name {resource group name} --location westus

    $ az iot hub list

    $ az iot hub show-connection-string

    $ az iot hub create --name {my hub name} --resource-group {resource group name}

Register your Device in IoT Hub

    $ az iot device create --device-id myraspberrypi --hub-name {my hub name}

    $ az iot device list --hub-name {my hub name}

    $ az iot device list --hub-name {my hub name} --query [].deviceId

# Lab 3 - Connect Simulated Device to Azure
    
    $ git clone https://github.com/jomit/pcftrials.git

    $ cd pcftrials/labs/device

    (Update the IoT Hub connectionString in device-simulated-data.js file)

    $ npm install

    $ node device-simulated-data.js
    
# Lab 4 - Connect Raspberry PI to Azure
    
    TODO...

# Lab 5 - Test Sample Client App

    $ cd pcftrials/labs/sampleclientapp

    (Update IoT hub connectionString)

    $ npm install

    $ node server.js

# Lab 6 - Setup DocumentDB

    - Create new DocumentDB in the same resource group as your IoT hub

    - Add a new Collection in DocumentDB


# Lab 7 - Configure Stream Analytics

    - Create new Stream Analytics Job

    - Configure IoT Hub as Input
    
    - Configure DocumentDB as Output

    - Add Pass through query

    SELECT *
    INTO documentdb
    FROM iothubinput

    - Test Query with Live Sample Data

    - Add Threshold alerting query

    SELECT 
        System.Timestamp AS OutputTime,
        DEVICEID AS SensorName,
        Avg(TEMPERATURE) AS AvgTemperature
    INTO
        documentdb
    FROM
        iothubinput TIMESTAMP By EventEnqueuedUtcTime
    GROUP BY 
        TumblingWindow(second,5),DEVICEID
    HAVING 
        Avg(TEMPERATURE)>50

# Lab 8 - Test Dashboard App and Push to PWS

    $ cf --version

    $ cf login

    $ cd pcftrials/labs/dashboard

    (Update IoT hub connectionString)

    $ cf push {app name} -c "node server.js" -b https://github.com/cloudfoundry/nodejs-buildpack

    (Browse to PWS Dasboard the open the Application Url)