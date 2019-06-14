# PBP Travel/Training

PBP Travel/Training is a BaaS service that facilitates the approval workflow for travel/training reimbursement for the Bureau of Police at the City of Pittsburgh.  It was developed to replace a heinous soup of Sharepoint workflows.  It still uses Sharepoint as the data store, and interfaces through the [365-proxy](https://github.com/CityofPittsburgh/365-api).

The only remaining business logic remaining in the Sharepoint application are http calls to these triggers whenever records are created or updated.

## approvalStatus
Triggered by HTTP every time a record is modified.  Checks to see if the record has received final approval, or rejection.  Sends out email notifications as necessary.

## approverStatus
Triggered by HTTP every time a record is created or modified.  Calculates the current position in the approval flow, and sends email notifications as necessary.    

## confirmSubmission
Triggered by HTTP every time a record is created.  Sends a confirmation email to the submitter.

## followUp
Triggered by HTTP every 48 hours per every record still stuck in the approval pipeline.  Calculates the current position of the record, and if the last notice was sent more than 48 hours ago, sends another reminder.

## Authorization

Keys! For the http triggers.

## Running Locally

### Prerequisites
* [.Net Core](https://dotnet.microsoft.com/download) - BaaS execution environment
* [Node.js](https://nodejs.org) - JS runtime
* local.settings.json - See local.settings.json.example for all required secrets

### Installation
```
git clone https://github.com/CityofPittsburgh/pbp-travel-training
cd pbp-travel-training
func extensions install
func host start
```

## Deployment

Deployed as an Azure Function.  Application is deployed directly from github, and can be triggered either (a) through the Azure GUI, (b) through the [CLI](https://docs.microsoft.com/en-us/cli/azure/webapp/deployment/source?view=azure-cli-latest#az-webapp-deployment-source-sync), or (c) through the [proxy service](https://github.com/CityofPittsburgh/azure-proxy).

For complete documentation on the azure environment, see [here](https://github.com/CityofPittsburgh/all-things-azure.git).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details