export class Module {
    public idmodule: number;
    public short: string;
    public description: string;

    public toString = () : string => {
        return JSON.stringify(this);
    }
}