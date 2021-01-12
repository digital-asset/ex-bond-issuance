# Reference Application: Bond Issuance

## Overview

Issuing a new bond is currently a fragmented process. A Distributed Ledger Technology (DLT) approach to bond issuance creates opportunity for Issuers, Auction Agents, CSDs (Central Securities Depositories), and Banks to reduce costs and risks associated with the process, while at the same time providing additional benefits.

## Getting Started

### Installing

**Disclaimer:** This reference application is intended to demonstrate the capabilities of the DAML. You are recommended to consider other non-functional aspects, like security, resiliency, recoverability, etc prior to production use.

#### Prerequisites

Be sure you have the following installed:
- [DAML SDK](https://docs.daml.com/)
- Docker
- Java
- Yarn
- Node v12
- Make
- Python

#### Build the App

Type:
```shell
make build
```
**Note:** If you change the DAML models locally, you need to re-run this command before starting the application.

### Starting the App

**Note:** Make sure you have built the application (see: [Build the App](#build-the-app)).

There are two options:

#### Option 1: Start App with Docker

1. Type:
    ```shell
    make docker
    ```
2. Open the new React UI with a browser at http://localhost:3000.

We also keep the deprecated Navigator available at http://localhost:7500.

**Note:** If you run on Windows or MacOS, you need to increase the memory limit of the Docker Engine in the preferences (at least 5 GB).

#### Option 2: Start App in Standalone with Wall Clock Time

This option starts the application with wall clock time. Note that Navigator's time widget won't work in this mode as one cannot modify the time.
1. Start the DAML Sandbox. Type:
    ```shell
    make start
    ```
2. Start the automation logic by starting bots. Type:
    ```shell
    make automation
    ```
3. Start the React UI. The UI will automatically open in a new browser tab at http://localhost:3000.
    ```shell
    make ui
    ```

### Stopping the App

#### Stopping Dockerized Run
1. Stop the Docker containers or bots by pressing **Ctrl+C**. (Alternatively, you can also stop it by typing `docker-compose down`.)

#### Stopping Standalone Run
1. Stop the bots by pressing **Ctrl+C**.
2. Stop the Sandbox by pressing **Ctrl+C** in the DAML assistant.
3. Stop the ui by pressing **Ctrl+C**.
### Resetting the Prototype

Reset the application by following these steps:
1.  Stop the app by following the steps in [Stopping the App](#stopping-the-app) section.
2.  Start the app in [Docker](#option-1-start-app-with-docker) or [Standalone](#option-2-start-app-in-standalone-with-wall-clock-time) by following the steps in the relevant section.

## Working with DAML Hub

1. As a first step, build the whole project:
```
make clean build
```

2. Upload the DARs to DAML Hub (Deployments tab / Upload file, two files `target/bond-issuance*.dar`)

3. Add the parties to DAML Hub.
    - See the example `parties.json` file for a list of parties.
    - Update `parties.json` file with actual party IDs from DAML Hub (Users tab).
    - Download `participants.json` (Ledger settings tab).

4. Run the market setup:
```
daml script \
  --participant-config participants.json \
  --json-api \
  --dar target/bond-issuance.dar \
  --script-name DA.RefApps.Bond.Test.MarketSetupScript:setupMarketWithParties \
  --input-file parties.json
```

5. Run the triggers from the DAML Hub UI:
```
Bank1:
DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger
DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger

Bank2:
DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger
DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger

Bank3:
DA.RefApps.Bond.Triggers.InvestorSettlementTrigger:investorSettlementTrigger
DA.RefApps.Bond.Triggers.PlaceBidTrigger:placeBidTrigger

Issuer:
DA.RefApps.Bond.Triggers.CommissionTrigger:commissionTrigger
DA.RefApps.Bond.Triggers.RedemptionFinalizeTrigger:redemptionFinalizeTrigger

AuctionAgent:
DA.RefApps.Bond.Triggers.AuctionFinalizeTrigger:auctionFinalizeTrigger

CSD:
DA.RefApps.Bond.Triggers.RedemptionCalculationTrigger:redemptionCalculationTrigger

```

6. Run `make buildui`. Copy `participants.json` into `ui-js/src` with `cp participants.json ui-js/src/`. Run `npm run build` in `ui-js`. Then run `zip -r bondui.zip build/`. Upload `bondui.zip` to DAML Hub to deploy the UI.


## User Guide

This User Guide will take you step-by-step through the whole bond issuance, bond auction, and redemption process. It will lead you through all the major UI screens and data fields that you will need to use.

**Note**: This demo is designed to show successful conclusion of the Bond Issuance workflow without exceptions or error conditions. A full production implementation would include additional features, handle errors and exceptions, and incorporate appropriate security controls.

## Workflow

### Roles and Responsibilities

Participants in the following roles are involved in the Bond Issuance workflow.

<table>
  <tr>
   <td><strong>Role</strong>
   </td>
   <td><strong>Responsibilities</strong>
   </td>
  </tr>
  <tr>
   <td>Issuer
   </td>
   <td>Requests creation of a new bond.
<p>
Defines parameters of a bond auction.
<p>
Starts redemption of bond at maturity.
   </td>
  </tr>
  <tr>
   <td>CSD
   </td>
   <td>Approves and issues a new bond.
<p>
Approves redemption of bonds at maturity.
   </td>
  </tr>
  <tr>
   <td>Auction Agent
   </td>
   <td>Commissions the bond auction.
<p>
Invites bidding banks.
<p>
Finalizes the auction.
   </td>
  </tr>
  <tr>
   <td>Bank
   </td>
   <td>Bids on bonds in the auction.
   </td>
  </tr>
  <tr>
   <td>Central Bank
   </td>
   <td>Backer of money on the ledger.
   </td>
  </tr>
  <tr>
   <td>Regulator
   </td>
   <td>Has no functional obligation in the demo.
   <p> Acts as a passive observer of the proceess.
   </td>
  </tr>
  <tr>
   <td>Operator
   </td>
   <td>System operator.
   </td>
  </tr>
</table>

There are three parties set up with the Bank role, other roles have a single corresponding party configured. Setting up a given role with different parties (e.g. having two parties with the Auction Agent role) would require changing the DAML models.

The Bond Issuance application includes these steps:

1. **Market Setup:** The application starts with an automated market setup process. Participants and their roles are created, relationships are set up, and Participants also have their cash account set up in the Central Bank, with an initial balance.
2. **Bond Issuance:** The entire issuance process is modeled in DAML, with transparency and accuracy. The Bond Issuer requests the issuance, and the CSD approves the request and issues the bond. The ledger keeps an immutable, auditable history of the bond issuance.
3. **Create a Bond Auction:** The entire auction logic is modeled in DAML, enforcing the actions of the Auction Agent and market participants. The process starts with the Issuer defining the key parameters of the bond auction, including the start and end date of the auction, and the minimum price for the bond. The Issuer submits the auction request to its Auction Agent. The Auction Agent reviews the auction parameters and can commission the auction.
4. **Execute a Bond Auction:** The application uses a Dutch auction to calculate winning bids and quantities.
Invited banks can bid in the auction. The banks cannot see the minimum price for the auction, only the denomination and total quantity of available bonds. Banks can place multiple bids in the auction so that they have different bids at different prices.

    All investors are guaranteed to be treated equally and according to the auction rules.

   **Note:** The settlement is guaranteed to be successful if Investors have a valid bid at the close of the auction, as the Bond is already locked.

5. **Redemption:** The Issuer can start the redemption of a bond, where all bonds are redeemed, and the face value of the bond plus interest is paid to owners. The CSD must approve the redemption. Communication to all relevant market participants occurs in real time.

## Running the Application

### Choosing and Changing Roles

When you launch the Bond Issuance application, you will see the login screen where you can choose your party with the desired role.

To log in:

*   On the home screen, select the party from the list (no password needs to be entered).

To switch users:

1. In the top right corner, click on the logout icon.
2. On the home screen, select a different party.

### Market Setup

The participants listed above in Roles and Responsibilities are added automatically at market setup along with required reference data.

### Creating a New Bond Issuance

This part of the workflow shows how to issue a new bond.

#### Entering New Bond Issuance Request

The Issuer creates a request for the CSD to issue a new bond with the parameters defined by the Issuer.

To request a new bond issuance:

1. Log in as **Issuer**.
2. Choose the **Issuer Actions** tab.
3. Select the **Issue Bond** choice on the Issuer role contract.
4. Fill out the new issuance parameters:
    *   Issue size: quantity of new bonds to be issued: e.g.:1000000
    *   Issue date: date for the issue date, e.g., today
    *   Currency: USD
    *   Denomination: bond’s value at maturity, and the initial price for the bond set for the auction. e.g.: 100
    *   Maturity date: Note that redemption of a bond is usually only possible on the defined maturity date, but the application does not model this. At redemption the face value of the bond plus the coupon rate is paid to the buyer.
    *   Coupon rate: rate expressed in numeric value for the duration of the bond: 0.01 = 1%
6. Choose **Okay**.

#### Approving New Bond Issuance Request

Once the Issuer submitted a new bond issuance request, the CSD receives a notification of this request. The CSD needs to approve the bond issuance request to issue the bonds and assign the ISIN.

To approve:

1. Log in as the **CSD**.
2. Choose the **Issuance and ISIN Request** tab.
3. Select the contract in the table view.
4. View the parameters of the new issuance request.
5. Add an ISIN (arbitrarily, e.g.: Bond007). Choose **Accept**.

#### Viewing New Bond Issue

The Issuer can view the newly issued Bonds.

To view:

1. Log in as the **Issuer**.
2. Go to the **Balance view** tab.

   The newly issued bond will be visible.

### Creating a New Bond Auction

Bond Auction is the process of taking a new bond issuance to the market. The application models the workflow of a Dutch auction in which the price of the offering is set after taking in all bids to determine the price at which the total offering can be sold. Banks place bids for the amount they are willing to buy in terms of quantity and price. Winners of the auction are announced after finalizing the results of all valid bids. In a real world implementation, the minimum price set by the Issuer is not visible to the bidding banks, only the denomination (face value) of the bond.

#### Creating a New Bond Auction Request

The Issuer can define the key parameters of the bond auction, including the start and end date of the auction and the minimum price for the bond. The Issuer then submits the auction request to its Auction Agent.

To create an auction request:

1. Log in as the **Issuer**.
2. Select the **Issuer Actions** tab.
3. Select the **Commission Auction** choice.
4. Enter parameters of New Bond Auction:
    *  Bond asset deposit: choose the name of the [bond just issued](#approving-new-bond-issuance-request), e.g.: Bond007
    *  Start date
    *  End date
    *  Minimum price: e.g: 96 (must be smaller the bond's denomination)
    *  Size: e.g.: 500000 (The size of the auction cannot be larger than the balance of available bonds).
6. Choose **Okay**.

#### Commissioning New Bond Auction

The Auction Agent reviews the auction parameters and commissions the auction.

To commission the auction:

1. Log in as the **Auction Agent**.
2. Select the **Auction Requests** tab.
3. Next to the **Accept** button, enter an auction name (e.g.: Auction001) and click the button.

Once the auction had been approved, the auction disappears from the **Auction Request** tab and appears in the **Ongoing Auctions** tab.

#### Inviting Banks to Auction

 For the commissioned auction, the Auction Agent invites Banks to bid.

To invite Banks:

1. Stay logged in as the **Auction Agent**.
2. Select the **Ongoing Auctions** tab.
3. In the row of the just started auction, select the **Invite Bidders** choice and invite the banks: 'Bank1, Bank2, Bank3'
5. Choose **Okay**.

#### Viewing the Auction Invite

To view the invitation as a Bank:

1. Log in as any **bank (Bank1, Bank2, Bank3)**.
2. Select the **Ongoing Auctions** tab.

    Observe that the auction is now active.

### Bidding and Finalizing Auction

#### Bidding on an Auction

Invited banks can start bidding on an auction. As discussed above, Banks cannot see the minimum price for the auction, only the denomination and total quantity of available bonds. They can place multiple bids for an auction to ensure that they have different bids at different prices.

To bid:

1. Log in as a **bank (Bank1, Bank2, or Bank3)**.
2. Select the **Ongoing Auctions** tab.
3. Next to the relevant auction, select the **Place Bid** choice and enter details:
    *  Price
    *  Quantity
5. Choose **Okay**.

Repeat this process for other Banks or for multiple bids for the same Bank.

#### Finalizing an Auction

On the end date, the Auction Agent finalizes the auction and the automated delivery of bonds and cash occurs. When finalizing an auction, the application will automatically calculate the winning bids based on the Dutch auction logic. A bid that is under the minimum price will be regarded as an invalid bid.

To finalize:

1. Log is as the **Auction Agent*.
2. Click on the **Ongoing Auctions** tab.
3. Next to the auction, select the **Finalize** choice.

#### Committing Cash for Simultaneous Settlement of Cash and Bonds

A bank has a final step. It needs to commit its cash to approve the settlement if it wins the auction.

To commit cash:

1. Log in as a bidding **Bank**.
2. Select the **Pending Settlements** tab.
4. Select the **Settle** choice for the relevant row.

Simultaneous delivery of cash from the bidding Banks account to the Issuer cash account in exchange of bonds will occur.

### Redemption at Maturity

#### Kicking off the Redemption Process

To start the redemption:

1. Log in as the **Issuer**.
2. Select the **Issuer Actions** tab.
3. Select the **Redeem** choice.
4. Select the appropriate bond you would like to redeem.
6. Choose **Okay**.

A redemption request is now sent to the CSD for its approval.

#### Approving the Redemption

When the Issuer kicks off the redemption process, the CSD needs to approve it. Upon the CSD’s approval the bonds will be redeemed, and all bonds created during the Issuance will be archived on the ledger. At the same time the Issuer pays back the cash for the denomination of the bond with the defined interest to the Banks cash account.

To approve:

1. Log in as the **CSD**.
2. Select the **Redemption Requests** tab.
3. Select **Accept**.

## Additional Exploration

After completing the workflow, you can explore the application to try other paths, submit higher or lower bids, revoke a bid once entered, and so on.

CONFIDENTIAL © 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
Any unauthorized use, duplication or distribution is strictly prohibited.
