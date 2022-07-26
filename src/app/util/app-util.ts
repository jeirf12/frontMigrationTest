export class AppUtil {

    public static removeSpecialCaracters(value: string): string {
        let prohibidos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
        let permitidos = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
        for (var i = 0; i < prohibidos.length; i++) {
            value = value.replace(prohibidos.charAt(i), permitidos.charAt(i));
        };
        return value;
    }

}