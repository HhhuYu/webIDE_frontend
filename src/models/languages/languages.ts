export interface Language {
    lang: string;
    name: string;
    version: string;
    index: string;

}



export type LanguageTable = Array<[string, Language[]]>;

export type LanguageMap = Map<string, Language[]>;