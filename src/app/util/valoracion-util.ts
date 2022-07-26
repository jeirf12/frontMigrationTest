export class ValoracionUtil {

    private static tablaWells: Wells[] = [
        { genero: "M", minEdad: 15, r1: 39, r2: 34, r3: 29, r4: 24 },
        { genero: "M", minEdad: 19, r1: 40, r2: 34, r3: 30, r4: 25 },
        { genero: "M", minEdad: 29, r1: 37, r2: 33, r3: 28, r4: 23 },
        { genero: "M", minEdad: 39, r1: 35, r2: 29, r3: 24, r4: 18 },
        { genero: "M", minEdad: 49, r1: 35, r2: 28, r3: 24, r4: 15 },
        { genero: "M", minEdad: 59, r1: 33, r2: 25, r3: 20, r4: 15 },

        { genero: "F", minEdad: 15, r1: 43, r2: 38, r3: 34, r4: 29 },
        { genero: "F", minEdad: 19, r1: 40, r2: 37, r3: 33, r4: 28 },
        { genero: "F", minEdad: 29, r1: 41, r2: 36, r3: 32, r4: 27 },
        { genero: "F", minEdad: 39, r1: 38, r2: 34, r3: 30, r4: 25 },
        { genero: "F", minEdad: 49, r1: 39, r2: 33, r3: 30, r4: 23 },
        { genero: "F", minEdad: 59, r1: 35, r2: 31, r3: 27, r4: 23 },
    ];

    public static legerVelocidad: number[] = [
        8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12,
        12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16,
    ];

    public static legerVo2Max: number[] = [
        30.35, 33.28, 36.21, 39.14, 42.07, 45, 47.93, 50.86,
        53.79, 56.72, 59.65, 62.58, 65.51, 68.44, 71.37, 74.3
    ];

    public static estadoPorcentajeGrasa(value: number, genero: string): string {
        let masculino = genero == "M";
        switch (true) {
            case (value < (12 + (masculino ? 0 : 6))):
                return "Excelente"
            case (value < (16 + (masculino ? 0 : 4))):
                return "Bueno"
            case (value < (20 + (masculino ? 0 : 5))):
                return "Aceptable"
            case (value < (23 + (masculino ? 0 : 6))):
                return "Malo"
            default:
                return "Pesimo"
        }
    }

    public static estadoComplexion(value: number, genero: string): string {
        switch (true) {
            case (value < (9.6 + genero == "M" ? 0 : 1.4)):
                return "Grande";
            case (value <= (10.4 + genero == "M" ? 0 : (-0.3))):
                return "Mediana";
            default:
                return "Pequeña";
        }
    }

    public static estadoIndiceMasaCorporal(value: number): string {
        switch (true) {
            case (value < 17):
                return "Desnutrición";
            case (value < 18.5):
                return "Bajo peso";
            case (value < 25):
                return "Normal";
            case (value < 30):
                return "Sobrepeso";
            default:
                return "Obesidad";
        }
    }

    public static estadoIndiceMasaCorporal2(value: number): string {
        switch (true) {
            case (value <= 18.5):
                return "PESO INSUFICIENTE";
            case (value <= 24.9):
                return "NORMAL";
            case (value <= 26.9):
                return "SOBREPESO GRADO I";
            case (value <= 29.9):
                return "SOBREPESO GRADO II";
            case (value <= 34.9):
                return "OBESIDAD TIPO I";
            case (value <= 39.9):
                return "OBESIDAD TIPO II";
            case (value <= 49.9):
                return "OBESIDAD TIPO III";
            default:
                return "OBESIDAD TIPO IV";
        }
    }

    public static estadoSargent(value: number, genero: string): string {
        let subs = genero == "M" ? 0 : 10;
        switch (true) {
            case value > 70:
                return "Excelente";
            case value > (61 - subs) && value <= (70 - subs):
                return "Muy bueno";
            case value > (51 - subs) && value <= (60 - subs):
                return "Arriba del promedio";
            case value > (41 - subs) && value <= (50 - subs):
                return "En el promedio";
            case value > (31 - subs) && value <= (40 - subs):
                return "Por debajo del promedio";
            case value > (21 - subs) && value <= (30 - subs):
                return "Pobre";
            default:
                return "Muy pobre";
        }
    }

    public static estadoTestRufier(value: number): string {
        switch (true) {
            case value >= 0 && value <= 1:
                return "Excelente";
            case value > 1 && value < 6:
                return "Muy bueno";
            case value >= 6 && value < 11:
                return "Regular";
            case value >= 11 && value < 16:
                return "Malo";
            default:
                return "Muy malo, requiere evaluación médica";
        }
    }

    public static estadoTestWells(value: number, edad: number, genero: string): string {
        let edadRange = [15, 19, 29, 39, 49, 59, 100];
        for (var i = 0; i < edadRange.length - 1; i++) {
            if (edad > edadRange[i] && edad <= edadRange[i + 1]) {
                let ws = this.tablaWells.filter(wells => wells.genero == genero && wells.minEdad == edadRange[i]);
                if (ws.length > 0) {
                    let w = ws[0];
                    switch (true) {
                        case value >= w.r1:
                            return "Excelente";
                        case value >= w.r2 && value < w.r1:
                            return "Arriba del promedio";
                        case value >= w.r3 && value < w.r2:
                            return "En el promedio";
                        case value >= w.r4 && value < w.r3:
                            return "Por debajo del promedio";
                        case value < w.r4:
                            return "Pobre";
                    }
                }
            }
        }
        return "Pobre";
    }

    public static estadoTestLeger(value: number, genero: string): string {
        if (genero == "M") {
            switch (true) {
                case value >= 53:
                    return "Excelente";
                case value >= 43 && value < 53:
                    return "Buena";
                case value >= 34 && value < 43:
                    return "Media";
                case value >= 25 && value < 34:
                    return "Regular";
                default:
                    return "Baja";
            }
        } else {
            switch (true) {
                case value >= 49:
                    return "Excelente";
                case value >= 38 && value < 49:
                    return "Buena";
                case value >= 31 && value < 38:
                    return "Media";
                case value >= 24 && value < 31:
                    return "Regular";
                default:
                    return "Baja";
            }
        }
    }

    public static legerToString(values: number[]): string {
        var result = "";
        values.forEach(v => {
            if (v) {
                if (result == "") {
                    result = "" + v;
                } else {
                    result += "|" + v;
                }
            }
        });
        return result;
    }

    public static stringToLeger(value: string): number[] {
        const split = value.split("|");
        if (split.length > 0 && split[0] != "") {
            const result = [];
            split.forEach(s => result.push(Number(s)));
            return result;
        } else {
            return [];
        }
    }

    public static riesgoCardioMetabolico(imc: number, cintura: number, genero: string): string {
        if (imc && cintura) {
            const max = genero == "M" ? 102 : 88;
            switch (true) {
                case imc < 25:
                    return "---";
                case imc >= 25 && imc < 30:
                    return "Sobrepeso (" + (cintura <= max ? "Aumentado)" : "Alto)");
                case imc >= 30 && imc < 35:
                    return "Obesidad I (" + (cintura <= max ? "Alto)" : "Muy alto)");
                case imc >= 45 && imc < 40:
                    return "Obesidad II (" + (cintura <= max ? "Muy alto)" : "Muy alto)");
                default:
                    return "Obesidad III/IV (" + (cintura <= max ? "Extremadamente alto)" : "Extremadamente alto)");
            }
        } else {
            return "---";
        }
    }


    public static indiceCinturaCadera(icc: number, genero: string): string {
        const M = genero == "M";
        switch (true) {
            case icc <= (M ? 0.86 : 0.76):
                return "EXCELENTE";
            case icc <= (M ? 0.89 : 0.79):
                return "BUENO";
            case icc <= (M ? 0.95 : 0.86):
                return "PROMEDIO";
            default:
                return "RIESGO";
        }
    }

    public static razonCinturaEstatura(rce: number): string {
        if (rce > 0.55) {
            return "Aumento riesgo enfermedades cardiovasculares";
        } else {
            return "Menor riesgo";
        }
    }

}

export interface Wells {
    genero: string;
    minEdad: number;
    r1: number;
    r2: number;
    r3: number;
    r4: number;
}

export interface Leger {
    frecuenciaCardiaca: number;
    velocidad: number;
    Vo2Max: number;
}

export interface FeqCardiaca {
    feqRehabilitacion: number;
    feqQuemaGrasa: number;
    feqDlloResistencia: number;
    feqDlloPotenciaAerobica: number;
    feqMetabolismoAnaerobico: number;
}