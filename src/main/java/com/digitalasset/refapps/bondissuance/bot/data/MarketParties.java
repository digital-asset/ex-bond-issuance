package com.digitalasset.refapps.bondissuance.bot.data;

public class MarketParties {
    public final String operator;
    public final String regulator;
    public final String auctionAgent;
    public final String bank1;
    public final String bank2;
    public final String bank3;
    public final String csd;
    public final String issuer;
    public final String centralBank;

    public MarketParties(String operator, String regulator, String auctionAgent, String bank1, String bank2, String bank3, String csd, String issuer, String centralBank) {
        this.operator = operator;
        this.regulator = regulator;
        this.auctionAgent = auctionAgent;
        this.bank1 = bank1;
        this.bank2 = bank2;
        this.bank3 = bank3;
        this.csd = csd;
        this.issuer = issuer;
        this.centralBank = centralBank;
    }
}
