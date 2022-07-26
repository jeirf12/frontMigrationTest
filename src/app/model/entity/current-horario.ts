export class CurrentHorario {
    public hora: number;
    public lunes: string;
    public lunesColor: string;
    public martes: string;
    public martesColor: string;
    public miercoles: string;
    public miercolesColor: string;
    public jueves: string;
    public juevesColor: string;
    public viernes: string;
    public viernesColor: string;

    constructor(hora: number) {
        this.hora = hora;
        this.lunes = "";
        this.lunesColor = "transparent";
        this.martes = "";
        this.martesColor = "transparent";
        this.miercoles = "";
        this.miercolesColor = "transparent";
        this.jueves = "";
        this.juevesColor = "transparent";
        this.viernes = "";
        this.viernesColor = "transparent";
    }
}