Prerequisites
-------------
 - The following utility programs need to be installed:
    - wget
    - tar
 - Working directory needs to be the root of ex-healthcare-claims-processing application repository.
 - The application needs to be built (see the README).
  - Three terminal windows need to be opened.

Installation & startup
----------------------

1) [Terminal 1] Get Canton:
`wget https://github.com/digital-asset/canton/releases/download/v0.0.27/canton-0.0.27.tar.gz`

2) Unpack:
`tar xvf canton-0.0.27.tar.gz canton-0.0.27/`

3) Start Canton REPL:
`./canton-0.0.27/bin/canton -c daml-on-x/canton/topology.conf`
It should present you with a console.

4) Start all the participants:
`all start`

5) Connect them:
`connect(participant1, mydomain)`
`connect(participant2, mydomain)`

6) Upload the DAR to the participants:
`all_participants upload_dar "./target/healthcare-claims-processing.dar"`

7) Provision the parties:
`enable_party(participant1, "ClearingHouse")`
`enable_party(participant1, "PrimaryCareProvider")`
`enable_party(participant1, "Patient1")`
`enable_party(participant1, "Radiologist")`
`enable_party(participant1, "InsuranceCompany")`

8) Load the DAR:
`scenario.load("./target/healthcare-claims-processing.dar")`

8) Run the market setup scenario:
`scenario.run("DemoOnboardScenario.InsurancePolicies:insurancePoliciesSetSingle")`

9) [Terminal 2] Start the bots:
`java -jar target/healthcare-claims-processing-0.0.1-SNAPSHOT.jar`

10) [Terminal 3] Start Navigator:
`daml navigator server localhost 7600 --config-file daml-on-x/canton/ui-backend.conf`