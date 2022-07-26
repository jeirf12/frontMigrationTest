export class FiltroReporteRequest {

    public fechaDesde: Date;
    public fechaHasta: Date;
    public dependenciaId: number;
    public programaId: number;
    public clasificacion: string;
    public tipoDeportista: string;

    constructor() {
        this.dependenciaId = -1;
        this.programaId = -1;
        this.clasificacion = "";
        this.tipoDeportista = "";
    }

}