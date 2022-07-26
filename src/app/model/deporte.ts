export interface Deporte {
    valor: number;
    descripcion: string;
}

export class DeportePorcentajeGrasa {
    private static valores: Deporte[] = [
        { valor: 7.04, descripcion: "Atletismo" },
        { valor: 14.61, descripcion: "Atletismo" },
        { valor: 8.40, descripcion: "Baloncesto" },
        { valor: 6.48, descripcion: "Ciclismo" },
        { valor: 6.97, descripcion: "Gimnasia" },
        { valor: 10.92, descripcion: "Tiro" },
        { valor: 8.09, descripcion: "Boxeo" },
        { valor: 7.93, descripcion: "Karate Do" },
        { valor: 8.82, descripcion: "Tenis de Mesa" },
        { valor: 8.23, descripcion: "Voleibol" },
        { valor: 8.83, descripcion: "Futbol" },
        { valor: 9.33, descripcion: "Microfutbol" },
        { valor: 9.16, descripcion: "Tenis de Campo" },
        { valor: 8.98, descripcion: "Natacion" },
        { valor: 9.23, descripcion: "Lucha Olimpica" },
        { valor: 7.78, descripcion: "Levantamiento de Pesas" },
        { valor: 7.86, descripcion: "Judo" },
        { valor: 8.28, descripcion: "Taekondo" },
        { valor: 9.55, descripcion: "Esgrima" },
    ]

    public static getPorcentajeByDeporte(deporte: string, genero: string): number {
        var resultado = 0;
        if (deporte == "Atletismo") {
            if (genero == "M") {
                resultado = 7.04;
            } else {
                resultado = 14.61;
            }
        } else {
            this.valores.forEach(d => {
                if (d.descripcion == deporte) {
                    resultado = d.valor;
                }
            });
        }
        return resultado;
    }

}