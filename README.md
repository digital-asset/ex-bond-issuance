[![CircleCI](https://circleci.com/gh/digital-asset/ex-bond-issuance.svg?style=svg)](https://circleci.com/gh/digital-asset/ex-bond-issuance)
# Reference Application: Bond Issuance

## Overview

Issuing a new bond is currently a fragmented process. A Distributed Ledger Technology (DLT) approach to bond issuance creates opportunity for Issuers, Auction Agents, CSDs, and Banks to reduce costs and risks associated with the process, while at the same time providing additional benefits.

## Getting Started

### Installing

#### Prerequisites
Be sure you have the following installed:
* DAML SDK
* Docker
* Java
* Maven


#### Build with Maven

Type:
```
mvn clean package
```
**Note:** If you change the DAML models locally, you need to run re-run this command before starting the application.

### Starting the App
There are two options:

#### Option 1: Start App with Docker

1.  Make sure you have built the application with Maven (see Build with Maven step)
2.  Type:
```
docker-compose up --build
```
3.  Open UI in a new browser tab with http://localhost:7500.

**Note:** If you run on Windows or MacOS, you may need to increase the memory limit of the Docker Engine in the preferences if you encounter a `java.lang.OutOfMemoryError: GC overhead limit exceeded` error.

#### Option 2: Start App in Stand-Alone

Make sure you have built the application with Maven (see Build with Maven step).

1.  Start the DA Sandbox and the Navigator.
Type:
```
DAML_PROJECT="$(pwd)" da start
```
The Navigator automatically opens in a new browser tab

2.  Start the automation logic by starting bots. Type:
```
java -jar ./target/bond-issuance-0.0.1-SNAPSHOT.jar -p 6865
```

### Stopping the App

#### Stopping Dockerized Run
1.  Close the browser tab
2.  Stop the Docker containers or bots by pressing **Ctrl+C**.

#### Stopping Stand-Alone Run
1.  Close the browser tab.
2.  Stop the bots by pressing **Ctrl+C**.
3.  Stop the Sandbox: type:
```
da stop
```

### Resetting the Prototype

Reset the application by following these steps:

1.  Stop the App by following the steps in Stopping the App section.
2.  Start the App in Docker or Standalone by following the steps in the relevant section.

## This Guide

This User Guide will take you step-by-step through the whole bond issuance, bond auction, and redemption process. It will lead you through all the major Navigator screens and data fields that you will need to use.

After working through these steps, you can use the Navigator interface to explore other functionality that is available in the application.

**Note**: This demo is designed to show successful conclusion of the Bond Issuance workflow without exceptions or error conditions. A full production implementation would include additional features, handle errors and exceptions, and incorporate appropriate security controls.

## Workflow

**Roles and Responsibilities**

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
   <td>Requests creation of a new bond
<p>
Defines parameters of a bond “auction”
<p>
Starts redemption at bond maturity
   </td>
  </tr>
  <tr>
   <td>CSD
   </td>
   <td>Approves and issues a new bond
<p>
Approves redemption of the bond at maturity
   </td>
  </tr>
  <tr>
   <td>Auction Agent
   </td>
   <td>Commissions the auction
<p>
Invites bidding banks
<p>
Finalizes the auction
   </td>
  </tr>
  <tr>
   <td>Bank
   </td>
   <td>Bids on bond auction
   </td>
  </tr>
  <tr>
   <td>Central Bank
   </td>
   <td>Backer of money on the ledger
   </td>
  </tr>
  <tr>
   <td>Regulator
   </td>
   <td>Plays no part in the functional workflow. Role was added to indicate that there is a role for regulators.
   </td>
  </tr>
  <tr>
   <td>Operator
   </td>
   <td>System operator
   </td>
  </tr>
</table>

There are three parties set up with the Bank role, other roles have a single corresponding party configured. Setting up a given role with different parties (e.g. having two parties with the AuctionaAgent role) would require changing the DAML models.

The Bond Issuance application includes these steps:

1. **Market Set Up:** The application starts with an automated market set-up process. Participants and their roles are created, relationships are set up, and Participants also have their cash account set up in the Central Bank, with an initial balance.
2. **Bond Issuance:** The entire issuance process is modeled in DAML, with transparency and accuracy. The Bond Issuer requests the issuance, and the CSD approves the request and issues the bond. The ledger keeps an immutable, auditable history of the bond issuance.
3. **Create a Bond Auction:** The entire auction logic is modeled in DAML, enforcing the actions of the Auction Agent and market participants. The process starts with the Issuer defining the key parameters of the bond auction, including the start and end date of the auction, and the minimum price for the bond. The Issuer submits the auction request to its Auction Agent. The Auction Agent reviews the auction parameters and can commission the auction.
4. **Execute a Bond Auction:** The application uses the example of the Dutch auction to calculate winning bids and quantities.
Invited banks can start bidding on the auction. The banks cannot see the minimum price for the auction, only the denomination and total quantity of available bonds. Banks can place multiple bids for an auction to ensure that they have different bids at different prices.

    All investors are guaranteed to be treated equally and according to the auction rules.

   **Note:** The settlement is guaranteed to be successful if Investors have a valid bid at the close of the auction as the Bond is already locked.

5. **Redemption:** The Issuer can start the redemption of a bond, where all bonds are redeemed, and the face value of the bond plus interest is paid to owners. The CSD must approve the redemption. Communication to all relevant market participants occurs in real time.

## Running the Application

### Choosing and Changing Roles

When you launch Bond Issuance application, you will see the Navigator screen with the option to choose your role.

To log in:

*   On the home screen, select the party from the list.

To switch users:

1. Click the name of the current party at the top of the screen.
2. On the home screen, select a different party.

### Setting the System Date

The system date is visible in the top-right corner after you log in. The application starts with the example system date of March 21, 2019.

To change the system date:

1. Log-in as any role.
2. Click on current date.
3. Select the new date in the calendar view.
4. Choose the **Set** button.

### Market Setup

The participants listed above in Roles and Responsibilities are added automatically at market setup along with other required reference data.

### Creating a New Bond Issuance

This part of the workflow shows how to issue a new bond.

#### Entering New Bond Issuance Request

The Issuer creates a request for the CSD to issue a new bond with the parameters defined by the Issuer.

To request a new bond issuance:

1. Log in as **Issuer**.
2. Choose the **Issuer Actions** tab.
3. Click on the Issuer **role contract.**
4. Select the **IssuerRole_Issuance** choice.
5. Fill out the new issuance parameters:
    *   Issue size: quantity of new bonds to be issued: e.g.:1000000
    *   Issue date: date for the issue date, e.g., today
    *   Currency: USD
    *   Denomination: bond’s value at maturity and the initial price for the bond set for the auction. e.g.: 100
    *   Maturity date: Note that redemption of the bond will be only possible on the defined maturity date. At redemption the face value of the bond plus the coupon rate is paid to the buyer.
    *   Coupon rate: rate expressed in numeric value for the duration of the bond: 0.01 = 1%
    *   Coupon Dates: Leave blank (**Note**: The application does not handle interim coupon payments.)
6. Choose **Submit**.

#### Approving New Bond Issuance Request

Once the Issuer submitted its new bind issuance request, the CSD receives a notification of the request. The CSD needs to approve the bond issuance request to issue the bonds and assign the ISIN.

To approve:

1. Log in as the **CSD**.
2. Choose the **Issuance and ISIN Request** tab.
3. Select the contract in the table view.
4. View the parameters of the new issuance request.
5. Choose **IssuanceRequest_Accept**.
6. Add and ISIN. enter an arbitrary ISIN manually. e.g.: Bond007.
7. Choose **Submit**.

#### Viewing New Bond Issue

The Issuer can view the newly issued Bonds.

To view:

1. Log in as the **Issuer**.
2. Go to the **Balance** tab.

   The newly issued bond will be visible.

### Creating a New Bond Auction

Bond Auction is the process of taking a new bond issuance to the market. The application models the workflow of a Dutch auction in which the price of the offering is set after taking in all bids to determine the price at which the total offering can be sold. Banks place bids for the amount they are willing to buy in terms of quantity and price. Winners of the auction are announced after finalizing the results of all valid bids. In a real world implementation, the minimum price set by the Issuer is not visible to the bidding banks, only the denomination (face value) of the bond.

#### Creating a New Bond Auction Request

The Issuer can define the key parameters of the bond auction, including the start and end date of the auction and the minimum price for the bond. The Issuer then submits the auction request to its Auction Agent.

To create an auction request:

1. Log in as the **Issuer**.
2. Select the **Issuer Actions** tab.
3. Click on the Issuer **role contract.**
4. Select the **IssuerRole_CommissionAuction** choice.
5. Enter parameters of New Bond Auction:
    *  Bond asset deposit ID: #12:2 (Copy contract id for the Bond from the **Balance** tab).
    *  Start date
    *  End date
    *  Minimum price: e.g: 96 (must be smaller the the bond's denomination)
    *  Size: e.g.: 500000 (The size of the auction cannot be larger than the balance of available bonds).
6. Choose **Submit**.

#### Commissioning New Bond Auction

The Auction Agent reviews the auction parameters and commissions the auction.

To commission the auction:

1. Log in as the **Auction Agent**.
2. Select the **Auction Requests** tab.
3. Select a new auction commission request.
4. Click on the **AuctionInvitation_Accept** choice and enter the name of the auction, e.g., Auction 1.
5. Choose **Submit**.

Once the auction had been approved, the auction disappears from the **Auction Request** tab and appears in the **Ongoing Auctions** tab.

#### Inviting Banks to Auction

 For the commissioned auction, the Auction Agent invites Banks to bid.

To invite Banks:

1. Stay logged in as the **Auction Agent**.
2. Select the **Ongoing Auctions** tab.
3. Click on **Auction**.
4. Select the **Auction_InviteBidders** choice and invite bank by clicking on the **Add new element** button. Invite:
    *  Bank1
    *  Bank2
    *  Bank3
5. Choose **Submit**.

#### Viewing the Auction Invite

To view the invitation as a Bank:

1. Log in as any **bank (Bank1, Bank2, Bank3)**.
2. Select the **Ongoing Auctions** tab.

    See that the auction is now active

### Bidding and Finalizing Auction

#### Bidding on an Auction

Invited banks can start bidding to an auction. As discussed above, Banks cannot see the minimum price for the auction, only the denomination and total quantity of available bonds. They can place multiple bids for an auction to ensure that they have different bids at different prices.

To bid:

Banks can start bidding only on the set auction start date. Move the system date to the Auction start date. This must be the start date as defined by the Issuer in the auction request contract.

1. Log in as a **bank (Bank1, Bank2, or Bank3)**.
2. Select the **Ongoing Auctions** tab.
3. Click on the relevant auction.
4. Select the **AuctionBidderParticipation_PlaceBid** choice and enter details:
    *  Price
    *  Quantity
5. Choose **Submit**.

Repeat this process for other Banks or for multiple bids for the same Bank.

#### Finalizing an Auction

On the end date, the Auction Agent finalizes the auction and the automated delivery of bonds and cash occurs. The Auction Agent can only finalize an Auction at the auction end date. When finalizing an auction, the application will automatically calculate the winning bids based on the Dutch auction logic. A bid that is under the minimum price will be regarded as an invalid bid.

To finalize:

1. Log is as the **Auction Agent*.
2. Move the system date to the auction end date.
3. Click on the **Ongoing Auctions** tab.
4. Select the auction.
5. Select the **Auction_Finalize** choice.
6. Choose **Submit**.

#### Committing Cash for Simultaneous Settlement of Cash and Bonds

A bank has a final step. It needs to commit its cash to approve the settlement if it wins the auction.

To commit cash:

1. Log in as a bidding **Bank**.
2. Select the **Pending Settlements** tab.
3. Select the auction.
4. Select the **AuctionParticipantSettleRequest_Settle** choice.
5. Choose **Submit**.

Simultaneous delivery of cash from the bidding Banks account to the Issuer cash account in exchange of bonds will occur.

### Redemption at Maturity

#### Kicking off the Redemption Process

The Issuer can start the redemption at maturity date.

To start the redemption:

1. Log in as the **Issuer**.
2. Set the calendar date to the Redemption date.
3. Select the **Issuer Actions** tab and click on the contract.
4. Select the **IssuerRole_Redeem** choice.
5. Enter the Fixed rate bond fact contract id. You can find the contract id by searching for fixedRateBondFact on the **Contracts** tab.
6. Choose **Submit**.

A redemption request is now sent to the CSD for its approval.

#### Approving the Redemption

When the Issuer kicks off the redemption process, the CSD needs to approve it. Upon the CSD’s approval the bonds will be redeemed, and all bonds created during the Issuance will be archived on the ledger. At the same time the Issuer pays back the cash for the denomination of the bond with the defined interest to the Banks cash account.

To approve:

1. Log in as the **CSD**.
2. Select the **Redemption Requests** tab.
3. Select the redemption request.
4. Select **RedemptionRequest_Accept**.
5. Choose **Submit**.

## Additional Exploration

After completing the workflow, you can explore the application to try other paths, submit higher or lower bids, revoke a bid once entered, and so on.

CONFIDENTIAL © 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
Any unauthorized use, duplication or distribution is strictly prohibited.
