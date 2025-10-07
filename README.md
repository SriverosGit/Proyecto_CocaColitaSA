# TechSolutions Web - CocaColita S.A.

## 🚀 Proyecto de Gestión de Datos y Visualización

**Empresa:** CocaColita S.A.  
**Objetivo:** Soluciones tecnológicas para gestión de datos y visualización de información mediante APIs públicas.

## 👥 Equipo de Desarrollo

- **Dev1:** [Sebastian Riveros] - RF2: Email functionality
- **Dev2:** [Victor Garces] - RF3: Age functionality ✅ 
- **Dev3:** Jim Maldonado - RF1 + RF4: Mostrar lista y corrección
dev 4 Isaias Collao

## 📋 Requerimientos Funcionales (RFs)

### ✅ RF3: Age Functionality (Dev2 - Implementado)
- **Descripción:** Agregar campo de edad a los usuarios con funcionalidades relacionadas
- **Implementación:**
  - Campo `age` agregado a cada usuario (aleatorio entre 18-65 años)
  - Función `filterUsersByAge()` para filtrar por rango de edad
  - Función `getAverageAge()` para calcular edad promedio
  - Botón "Estadísticas de Edad" en la interfaz
  - Display de edad en cada tarjeta de usuario

### 🔄 Pendientes
- **RF2:** Email functionality (Dev1)
- **RF1:** Mostrar lista de usuarios (Dev3)
- **RF4:** Mostrar lista de productos (Dev3)

## 🎯 Conflictos Intencionales Generados

### Área de Conflicto: displayUsers() function
**Dev2 (Age implementation):** 
- Foco en mostrar el campo `age` en las tarjetas de usuario
- Template HTML modificado para incluir edad prominentemente
- Estructura de datos extendida con campo age

**Conflicto esperado con Dev1:**
- Dev1 implementará campo `email` en la misma función `displayUsers()`
- Ambos modificarán el template HTML de user-card
- Posible conflicto en el orden de campos mostrados

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **APIs:** 
  - JSONPlaceholder (usuarios)
  - FakeStore API (productos)
- **Styling:** CSS Grid, Flexbox, Gradientes, Backdrop Filter

## 📂 Estructura del Proyecto

```
techsolutions-web/
├── index.html          # Estructura principal
├── style.css           # Estilos y diseño responsivo
├── script.js           # Lógica JS con funcionalidad Age (Dev2)
├── README.md           # Documentación del proyecto
└── .github/workflows/  # CI/CD Pipeline (pendiente)
    └── deploy.yml
```

## 🔄 Flujo Git Propuesto

1. **Ramas principales:** main, dev, release
2. **Feature branches:** feature/age-functionality (Dev2)
3. **Workflow:** feature → dev → release → main

## 🚦 Estado Actual del Proyecto

- ✅ **Estructura inicial:** Completada
- ✅ **RF3 (Age):** Implementado por Dev2
- 🔄 **RF2 (Email):** Pendiente Dev1
- 🔄 **RF1 + RF4:** Pendiente Dev3
- 🔄 **CI/CD Pipeline:** Pendiente configuración
- 🔄 **Despliegue:** Pendiente Vercel/Netlify

## 📊 Funcionalidades Implementadas (Dev2)

### Age Management System
- **Generación automática de edades:** 18-65 años
- **Filtros por edad:** Jóvenes, maduros, mayores
- **Estadísticas:** Edad promedio, distribución demográfica
- **Visualización:** Campo edad en tarjetas de usuario

### Próximos pasos para el equipo:
1. Dev1: Implementar funcionalidad de email (RF2)
2. Dev3: Revisar y corregir showUsers() + implementar showProducts() (RF1 + RF4)
3. Resolución de conflictos en merge a dev
4. Configuración de CI/CD pipeline
5. Despliegue automático en Vercel/Netlify

---
**Última actualización:** Dev2 - RF3 Age functionality implementada
