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

export const filterCodesApiluna = ["USDTRY", "EURTRY", "ALTIN",  "KULCEALTIN", "GBPTRY", 
                                   "CHFTRY", "AUDTRY", "CADTRY", "SARTRY", "JPYTRY", "AEDTRY",
                                   "CEYREK_YENI", "YARIM_YENI", "TEK_YENI", "ATA_YENI",   
                                   "ATA5_YENI", "GREMESE_YENI",  "AYAR22", "AYAR14", "GUMUSTRY"];
export const adjustedCodesApiluna = ["Dolar", "Euro", "Gram Altın", "Külçe Altın", "Pound", "Isveç Frankı", 
                                     "Avustralya Doları", "Kanada Doları", "(SAR) Riyal", "Japon Yeni",
                                     "(AED) Dirham", "Çeyrek Yeni", "Yarım Yeni", "Tam Yeni", "Ata Yeni",   
                                     "Ata Yeni 5'li", "Gremese Yeni",  "22 Ayar", "14 Ayar", "Gümüş"];

export const codeMap: Record<string, string> = 
                        { TRYTRY: "Türk Lirasi", USDTRY: "Dolar", EURTRY: "Euro", ALTIN: "Gram Altin", KULCEALTIN: "Külçe Altin", 
                          GBPTRY: "Pound", CHFTRY: "Isveç Franki", AUDTRY: "Avustralya Dolari", CADTRY: "Kanada Dolari", SARTRY: "(SAR) Riyal",
                          JPYTRY: "Japon Yeni", AEDTRY: "(AED) Dirham", CEYREK_YENI: "Çeyrek Yeni", YARIM_YENI: "Yarim Yeni", 
                          TEK_YENI: "Tam Yeni", ATA_YENI: "Ata Yeni", ATA5_YENI: "Ata Yeni 5'li", GREMESE_YENI: "Gremese Yeni", 
                          AYAR22: "22 Ayar", AYAR14: "14 Ayar", GUMUSTRY: "Gümüş", PLATIN: "Platin", PALADYUM: "Paladyum"};

export const filterCodesTruncgil = ["USD", "EUR", "CHF", "GBP", "GRA",  "ONS", 
                                    "HAS", "CEY", "YAR", "TAM", "CUM", "BES",  
                                    "RES", "GRE",  "YIA", "ODA", "GUM"];
export const adjustedCodesTruncgil = ["USD / TRY", "EUR / TRY", "CHF / TRY", "GBP / TRY", "ALTIN",  "ONS", 
                                      "KÜLÇE ALTIN", "ÇEYREK ALTIN", "YARIM ALTIN", "TAM ALTIN", "ATA ALTIN",   
                                      "ATA YENİ 5'Lİ", "REŞAT ALTIN", "GREMESE",  "22 AYAR", "14 AYAR", "GÜMÜŞ"];

export const currencyCodes = ["TRY", "USD", "EUR", "GBP"];
export const currencyCodeMap = {TRY: "TRY", USD: "USD", EUR: "EUR", GBP: "GBP"};
export const currencyFilterCodesApiluna = ["TRYTRY", "USDTRY", "EURTRY", "GBPTRY"];
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