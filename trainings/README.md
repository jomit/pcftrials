# Notes from Cloud Foundation Trainings
(at https://www.cloudfoundry.org/training/)


Prerequisites:
--------------------------------------
- SignUp for Cloud Fountry : https://run.pivotal.io/
- Install Cloud Foundry CLI : https://github.com/cloudfoundry/cli#downloads


Pushing Your First App
--------------------------------------
	$ cf login
	(use "api.run.pivotal.io" for API Endpoint and your credentials used during the Cloud Foundry signup)

	$ cf target
	$ cf target -o <ORG> -s <SPACE>	(target different org/space without login again)

(Clone Sample Apps Repo : https://github.com/EngineerBetter/training-zero-to-hero)

	$ cd 03-push\webapp
	$ cf push
	$ cf apps
	$ cf app web-app	(see health of a specific app)

(see the url of the app in the PWS dashboard and test it)

	$ cd 03-push\worker-app
	$ cf push
	$ cf logs worker-app	(to see the trailing logs)


Build Packs
--------------------------------------
	$ cf buildpacks
	
	$ cd 04-buildpacks\static-app
	$ cf push
	$ cf app static-app
	$ cf ssh static-app

	$ cf scale static-app -i 32
	(see the # of instances in the PWS dashboard)

	$ cf scale static-app -i 1


	$ cd 04-buildpacks\node-app
	$ cf push jomitnodeapp -c "node app.js" -b https://github.com/cloudfoundry/nodejs-buildpack


Resiliency
-----------------------------------------
	$ cd 05-resilience\imperfect-app

	$ cf push
	(click on the Crash Me link on the app)


Debugging
-----------------------------------------
	$ cd 06-debugging\debug-app
	$ cf push
	(click on the Url, it will generate 500 error)

	$ cf logs debug-app

	$ cf set-env debug-app FIXED 1
	(set environment variable to fix the error)

	$ cf restage debug-app

	(use the links on the site to crash the app and see events & logs)

	$ cf events debug-app
	$ cf logs debug-app
	$ cf logs debug-app --recent


App Instrumentation using New Relic
-----------------------------------------------------
	$ cf create-service newrelic standard newrelic
	$ cf bind-service debug-app newrelic

	(get key for newrelic from environment)
	$ cf env debug-app   

	(re push the app)
	$ cf push 

	(get the newrelic dashboard url)
	$ cf service newrelic


Stateful Services
-----------------------------------------------------
	$ cf marketplace
	$ cf marketplace -s rediscloud  
	$ cf create-service rediscloud 30mb redis
	$ cf services

	(bind the app to redis service)

	$ cd 07-shared-state\stateful-app
	$ cf push --no-start
	$ cf bind-service stateful-app redis
	$ cf start stateful-app

	(see environment variables for the app)
	$ cf env stateful-app

	(unbind the service and re-bind it to see that the data is persisted)

	$ cf stop stateful-app
	$ cf unbind-service stateful-app redis
	$ cf bind-service stateful-app redis
	$ cf start stateful-app

	(delete service instance and create a new one)

	$ cf unbind-service stateful-app redis
	$ cf delete-service redis
	$ cf create-service rediscloud 30mb redis
	$ cf bind-service stateful-app redis
	$ cf restart stateful-app

Domain Route
-----------------------------------------------------
	$ cf create-route development cfapps.io --hostname jomitapp
	$ cd 08-domains-routes\v1.0\
	$ cf push
	$ cf map-route v1.0 cfapps.io --hostname jomitapp
	$ cf push

	$ cf create-route development cfapps.io --hostname jomitappnew
	$ cd 08-domains-routes\v1.1\
	$ cf push
	$ cf map-route v1.1 cfapps.io --hostname jomitappnew
	$ cf push

	$ cf map-route v1.1 cfapps.io --hostname jomitapp
	$ cf unmap-route v1.0 cfapps.io --hostname jomitapp
	$ cf apps

	$ cf routes
	$ cf delete-orphaned-routes








