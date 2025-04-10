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

export interface AssetInfo {
    index: number;
    code: string;
    value: number;
    quantity: number;
    total: number;
}

export const filterCodesApiluna = ["USDTRY", "EURTRY", "CHFTRY", "EURUSD", "ALTIN",  "ONS", 
                                   "KULCEALTIN", "CEYREK_YENI", "YARIM_YENI", "TEK_YENI", "ATA_YENI",   
                                   "ATA5_YENI", "GREMESE_YENI",  "AYAR22", "AYAR14", "GUMUSTRY"];
export const adjustedCodesApiluna = ["USD", "EUR", "CHF", "EUR / USD", "ALTIN",  "ONS", 
                                     "KÜLÇE ALTIN", "ÇEYREK YENİ", "YARIM YENİ", "TAM YENİ", "ATA YENİ",   
                                     "ATA YENİ 5'Lİ", "GREMESE YENİ",  "22 AYAR", "14 AYAR", "GÜMÜŞ"];

export const filterCodesTruncgil = ["USD", "EUR", "CHF", "GBP", "GRA",  "ONS", 
                                    "HAS", "CEY", "YAR", "TAM", "CUM", "BES",  
                                    "RES", "GRE",  "YIA", "ODA", "GUM"];
export const adjustedCodesTruncgil = ["USD / TRY", "EUR / TRY", "CHF / TRY", "GBP / TRY", "ALTIN",  "ONS", 
                                      "KÜLÇE ALTIN", "ÇEYREK ALTIN", "YARIM ALTIN", "TAM ALTIN", "ATA ALTIN",   
                                      "ATA YENİ 5'Lİ", "REŞAT ALTIN", "GREMESE",  "22 AYAR", "14 AYAR", "GÜMÜŞ"];

export const currencyCodes = ["TRY", "USD", "EUR", "CHF"];
export const currencyFilterCodesApiluna = ["TRYTRY", "USDTRY", "EURTRY", "CHFTRY"];
const currencyValue = [1, 0, 0, 0];

export interface CurrencyItem {
    code: string;
    apiCode: string;
    value: number;
}

export const currencyCodeStructure: CurrencyItem[] = currencyCodes.map(
    (code, index) => ({
        code,
        apiCode: currencyFilterCodesApiluna[index],
        value: currencyValue[index],
    })
);