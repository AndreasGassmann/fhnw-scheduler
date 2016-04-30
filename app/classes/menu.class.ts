export class Menu {
    public id: number;
    public date: number;
    public offer: number;
    public category: string;
    public title: string;
    public trimmings: string;
    public comboDescription: string;
    public meetOrigin: string;
    public priceInt: number;
    public priceIntCombo: number;
    public priceExt: number;
    public priceExtCombo: number;
    public liveeasy: boolean;
    public combo: boolean;
    public modificationDate: number;

    public toString = () : string => {
        return JSON.stringify(this);
    }
}

