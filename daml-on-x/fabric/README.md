Prerequisites
-------------
 - The following utility programs need to be installed:
    - git
    - wget
    - tar
 - Working directory needs to be the root of ex-bond-issuance application repository.
 - The application needs to be built (see the README).
 - Four terminal windows need to be opened.

Installation & startup
----------------------

1) [Terminal 1] Clone DAML on Fabric:
`git clone https://github.com/hacera/daml-on-fabric.git`

2) Following README.md of Daml-on-Fabric to build it one needs to execute:
`cd daml-on-fabric/src/test/fixture/`
`./restart_fabric.sh`

3) [Terminal 2] Then, one can start the ledger **from daml-on-fabric directory**:
`sbt "run --role provision,time,ledger,explorer --port 7600 ../target/bond-issuance.dar"`

4) [Terminal 3] Start the bots **from ex-bond-issuance repo root directory**:
`java -jar target/bond-issuance-0.0.1-SNAPSHOT.jar`

5) [Terminal 4] Start Navigator:
`daml navigator server localhost 7600`
