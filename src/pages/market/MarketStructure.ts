export interface MarketInfoApiluna {
    code: string;
    alis: number;
    satis: number;
    dusuk: number;
    yuksek: number;
    kapanis: number;
    tarih: string;
}

export interface MarketInfoTruncgil {
    code: string;
    alis: number;
    satis: number;
    dusuk?: number | null;
    yuksek?: number | null;
    kapanis?: number | null;
    tarih?: string | null;
}

export interface MarketInfoMinimal {
    code: string;
    alis: number;
}

export const filterCodesApiluna = ["USDTRY", "EURTRY", "CHFTRY", "EURUSD", "ALTIN",  "ONS", 
                                   "KULCEALTIN", "CEYREK_YENI", "YARIM_YENI", "TEK_YENI", "ATA_YENI",   
                                   "ATA5_YENI", "GREMESE_YENI",  "AYAR22", "AYAR14", "GUMUSTRY"];
export const adjustedCodesApiluna = ["USD / TRY", "EUR / TRY", "CHF / TRY", "EUR / USD", "ALTIN",  "ONS", 
                                     "KÜLÇE ALTIN", "ÇEYREK YENİ", "YARIM YENİ", "TAM YENİ", "ATA YENİ",   
                                     "ATA YENİ 5'Lİ", "GREMESE YENİ",  "22 AYAR", "14 AYAR", "GÜMÜŞ / TRY"];

export const filterCodesTruncgil = ["USD", "EUR", "CHF", "GBP", "GRA",  "ONS", 
                                    "HAS", "CEY", "YAR", "TAM", "CUM", "BES",  
                                    "RES", "GRE",  "YIA", "ODA", "GUM"];
export const adjustedCodesTruncgil = ["USD / TRY", "EUR / TRY", "CHF / TRY", "GBP / TRY", "ALTIN",  "ONS", 
                                      "KÜLÇE ALTIN", "ÇEYREK ALTIN", "YARIM ALTIN", "TAM ALTIN", "ATA ALTIN",   
                                      "ATA YENİ 5'Lİ", "REŞAT ALTIN", "GREMESE",  "22 AYAR", "14 AYAR", "GÜMÜŞ"];
