export const evaluarActivo = (activo) => {
  let riesgo = "Bajo";
  let recomendacion = "Monitoreo periódico";
  let impacto = "Pérdida mínima"; // agrega esta línea

  switch (activo.tipo) {
    case "Base de Datos":
      riesgo = "Alto";
      recomendacion = "Habilitar cifrado y controles de acceso";
      impacto = "Pérdida de información sensible";
      break;
    case "Aplicación":
      riesgo = "Medio";
      recomendacion = "Revisar validación de entradas y permisos";
      impacto = "Posible falla en el servicio";
      break;
    case "Seguridad":
      riesgo = "Alto";
      recomendacion = "Actualizar configuraciones y parches";
      impacto = "Vulnerabilidad crítica en el sistema";
      break;
    default:
      riesgo = "Bajo";
      recomendacion = "Monitoreo periódico";
      impacto = "Pérdida mínima";
  }

  return { activo: activo.nombre, riesgo, impacto, recomendacion };
};
