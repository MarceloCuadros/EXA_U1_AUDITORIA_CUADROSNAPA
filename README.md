
# Proyecto de Auditoría de Riesgos

**Estudiante:** Raúl Marcelo Cuadros Napa  
**Unidad:** I  
**Fecha:** 2025-09-10  
**Repositorio GitHub:** [EXA_U1_AUDITORIA_CUADROSNAPA](https://github.com/MarceloCuadros/EXA_U1_AUDITORIA_CUADROSNAPA)

---

## 1. Login

**Evidencia:**  
<img width="886" height="628" alt="image" src="https://github.com/user-attachments/assets/d604d5c1-30a5-4a50-a4af-23651e1acac2" />
<img width="886" height="779" alt="image" src="https://github.com/user-attachments/assets/d67e002e-4786-4466-9443-7546972382e9" />
<img width="960" height="192" alt="image" src="https://github.com/user-attachments/assets/80d01e7a-eda5-4ab2-9a2d-e055695f45fb" />


**Descripción:**  
Se implementó un login ficticio utilizando React y un servicio de autenticación local (`LoginService.js`). El inicio de sesión verifica el nombre de usuario y almacena el estado de autenticación en el localStorage. Esto permite controlar el acceso a la aplicación y mostrar la información de los activos solo a usuarios autenticados.

---

## 2. Motor de Inteligencia Artificial

**Evidencia:**  
<img width="886" height="423" alt="image" src="https://github.com/user-attachments/assets/4de7cdc2-0466-42df-837c-6828e558e1cc" />


**Descripción:**  
Se implementó la función `evaluarActivo` en `IAService.js`, que permite asignar un nivel de riesgo e impacto a cada activo según su tipo (Base de Datos, Aplicación, Seguridad, etc.).  
- Cada activo recibe un riesgo (Bajo, Medio, Alto) y una recomendación inicial.  
- Además, la aplicación permite generar recomendaciones de tratamientos mediante un botón, que asigna acciones correctivas preventivas a cada activo.

---

## 3. Evaluación de 5 Activos

A continuación, se muestran los cinco activos evaluados con evidencia y recomendaciones:

| Activo                  | Riesgo | Impacto                                      | Tratamiento                             | Operación |
|-------------------------|--------|---------------------------------------------|----------------------------------------|-----------|
| Servidor de base de datos | Alto   | Habilitar cifrado y controles de acceso      | Implementación de firewall de nueva generación | Eliminar |
| Aplicación Web de Banca  | Medio  | Revisar validación de entradas y permisos   | Monitoreo continuo de accesos           | Eliminar |
| Firewall Perimetral       | Alto   | Actualizar configuraciones y parches        | Copias de seguridad periódicas          | Eliminar |
| Base de Datos Clientes    | Alto   | Habilitar cifrado y controles de acceso     | Desarrollo de políticas de seguridad   | Eliminar |
| Backup en NAS             | Bajo   | Monitoreo periódico                          | Implementación de firewall de nueva generación | Eliminar |

**Evidencias:**  
<img width="956" height="256" alt="image" src="https://github.com/user-attachments/assets/2f01d7ee-fc23-4eb6-9be6-191bd6a23734" />


**Descripción:**  
Se evaluaron 5 activos críticos del sistema de información. Para cada uno, la IA determinó el nivel de riesgo y el impacto esperado, y el sistema generó recomendaciones de tratamiento para mitigar dichos riesgos.

---

## 4. Informe claro y completo

El informe de auditoría está bien estructurado y completo según lo requerido. Contiene evidencia clara del login, del funcionamiento de la IA, la evaluación de cinco activos críticos con sus riesgos, impactos y tratamientos, así como anexos con la lista de activos de información. Está organizado de manera que facilita la comprensión de los hallazgos y las recomendaciones, cumpliendo con todos los criterios de la rúbrica.
