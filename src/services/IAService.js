export const evaluarActivo = (activo) => {
  let riesgo = "Bajo";
  let recomendacion = "Monitoreo periódico";

  switch (activo.tipo) {
    case "Base de Datos":
      riesgo = "Alto";
      recomendacion = "Habilitar cifrado y controles de acceso";
      break;
    case "Aplicación":
      riesgo = "Medio";
      recomendacion = "Revisar validación de entradas y permisos";
      break;
    case "Seguridad":
      riesgo = "Alto";
      recomendacion = "Actualizar configuraciones y parches";
      break;
    default:
      riesgo = "Bajo";
      recomendacion = "Monitoreo periódico";
  }

  return { activo: activo.nombre, riesgo, recomendacion };
};
