# System Security Plan

The information below covers both the UI and API.

## Privacy

> No PII data is stored in the database. All data fields are either strings or numbers.

## Authentication / Authorization mechanisms

> Midas is hosted on P1 and used their Keycloak authentication service. If an unauthenticated user attempts to access the application, Istio redirects them to P1 SSO before connecting to the Midas. Every network request made is injected with the user's token via the ISTIO sidecar.

## Data protection methods

> Data in transit is encrypted through TLS. Sensitive data fields stored in the database are encrypted.

## Emergency procedures

> N/A.

## Backup/restore, logging, and auditing features

> All data CRUD requests are logged upon hitting the API server. 

> Midas relies on P1 for manual backup and recovery of the database.

## Communication with other software/devices

> Midas uses our Gitlab client to connect to a Gitlab server and pull project data. Connecting to Gitlab requires a Midas admin to add a Gitlab config specifying the GitLab URL and a token with the appropriate permissions. Each project, product, or portfolio can select the GitLab server they are on and input their project or group id. If any of this data is missing, no connection to GitLab will be attempted.

> Midas does not connect with any external devices or software on the client's machine.

## Physical security

> N/A

## Virus and malware protection mechanisms

> The containers are scanned by Twistlock in the pipeline.

## Device sanitization

> Midas does not store personal data