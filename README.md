# Árbol Genealógico de Daxcsa

Una visualización moderna e interactiva del árbol genealógico para la red de distribuidores de la empresa Daxcsa. Esta aplicación proporciona una representación gráfica de la estructura de árbol binario que muestra las relaciones entre distribuidores independientes.

![Vista Principal del Árbol Genealógico](/public/home.png)

## Características

### 🌳 **Visualización Interactiva del Árbol**
- **Estructura de Árbol Binario**: Muestra la relación jerárquica entre distribuidores
- **Diseño Responsivo**: Se adapta a diferentes tamaños de pantalla (compatible con móviles)
- **Optimizado para Rendimiento**: Maneja grandes conjuntos de datos eficientemente con limitación de niveles
- **Navegación Visual**: Indicadores visuales claros para la colocación binaria (Izquierda/Derecha)

### 🎯 **Información Detallada de Nodos**
Cada nodo muestra información detallada sobre los distribuidores:
- **Nombre Completo**: Nombre completo del distribuidor
- **Nombre de Usuario**: Identificador único del distribuidor
- **Estado**: Estado Activo/Inactivo con codificación de colores
- **Producto**: Tipo de paquete de criptomonedas
- **Categoría**: Categoría del producto (Bitcoin, Ethereum, etc.)
- **Cantidad de Hijos**: Número de referencias directas
- **Colocación Binaria**: Posición Izquierda o Derecha en el árbol

![Tarjeta de Detalles](/public/detail_card.png)

### 🧭 **Características de Navegación**
- **Navegación por Migas de Pan**: Rastrea tu posición en la jerarquía del árbol
- **Navegación Padre/Hijo**: Navega hacia arriba y abajo en la estructura del árbol
- **Reinicio a Raíz**: Retorno rápido al distribuidor de nivel superior
- **Seguimiento de Historial**: Mantiene el historial de navegación para retroceder fácilmente

### 📱 **Optimización para Móviles**
- **Niveles Adaptativos**: Muestra menos niveles en dispositivos móviles (3 vs 5 en escritorio)
- **Interacciones Táctiles**: Optimizado para interacciones táctiles
- **Diseño Responsivo**: Ajusta el diseño del árbol para pantallas más pequeñas
- **Vistas Colapsables**: Alterna entre vistas compactas y detalladas

### 🎨 **Mejoras Visuales**
- **Codificación de Colores**: Diferentes colores para estado activo y niveles de volumen
- **Efectos de Hover**: Retroalimentación interactiva en las interacciones de nodos
- **Detalles Modales**: Ventana emergente con información detallada para cada distribuidor
- **Animaciones Suaves**: Transiciones fluidas y estados de carga

![Vista Alternativa](/public/home_2.png)

## Comenzando

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn como gestor de paquetes

### Instalación

1. **Clona o descarga el proyecto**
   ```bash
   git clone <url-del-repositorio>
   cd genealogyTree
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   Navega a `http://localhost:5174`

### Construcción para Producción

```bash
npm run build
```

## Guía de Uso

### Navegación Básica
1. **Ver Árbol**: La aplicación se carga mostrando el distribuidor raíz
2. **Hacer Clic en Nodos**: Haz clic en cualquier nodo para ver información detallada en un modal
3. **Navegar Hacia Abajo**: Usa el botón 👥 para ver los hijos de un distribuidor
4. **Navegar Hacia Arriba**: Usa el botón ⬆️ para ver el distribuidor padre
5. **Migas de Pan**: Haz clic en los elementos de migas de pan para navegar a niveles específicos

### Controles
- **Reiniciar a Raíz**: Regresa al distribuidor de nivel superior
- **Alternar Vista**: Cambia entre mostrar 3 o 5 niveles de profundidad
- **Cerrar Modal**: Haz clic en el botón × o fuera del modal para cerrar los detalles

### Uso en Móviles
- **Deslizar**: Desliza horizontalmente para ver diferentes partes del árbol
- **Tocar**: Toca los nodos para ver detalles
- **Vista Compacta**: Automáticamente muestra menos niveles para una mejor experiencia móvil

## Detalles Técnicos

### Arquitectura
- **Framework Frontend**: JavaScript Vanilla con módulos ES6
- **Estilos**: Tailwind CSS con CSS personalizado
- **Herramienta de Construcción**: Vite para desarrollo y construcción rápidos
- **Estructura de Datos**: Datos de árbol jerárquico basados en JSON

### Optimizaciones de Rendimiento
- **Limitación de Niveles**: Previene renderizar demasiados niveles a la vez
- **Carga Perezosa**: Solo renderiza secciones visibles del árbol
- **Delegación de Eventos**: Manejo eficiente de eventos para árboles grandes
- **Renderizado Responsivo**: Se adapta al renderizado basado en el tamaño de pantalla

### Estructura de Datos
La aplicación espera datos JSON con la siguiente estructura:
```json
{
  "data": {
    "type": "distributors",
    "attributes": [
      {
        "distributor_id": 12345,
        "username": "distributor.12345",
        "full_name": "Juan Pérez",
        "status": "Active",
        "product_name": "Light Miner",
        "category_name": "Bitcoin",
        "num_children": 10,
        "binary_placement": "Left",
        "parent_username": "distributor.12344",
        "children": [...]
      }
    ]
  }
}
```

## Capturas de Pantalla

### Vista Principal
![Vista Principal](/public/home.png)
*La aplicación muestra el árbol genealógico con una interfaz moderna y navegación intuitiva.*

### Tarjeta de Detalles
![Tarjeta de Detalles](/public/detail_card.png)
*Modal detallado que muestra toda la información del distribuidor seleccionado.*

### Vista Alternativa
![Vista Alternativa](/public/home_2.png)
*Diferente perspectiva del árbol mostrando la estructura jerárquica de distribuidores.*

## Compatibilidad de Navegadores
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Características Destacadas

### 🎨 **Diseño Moderno**
- Gradientes atractivos y efectos de cristal (glassmorphism)
- Animaciones suaves y transiciones fluidas
- Paleta de colores profesional y accesible

### 📱 **Experiencia Móvil Optimizada**
- Diseño completamente responsivo
- Interacciones táctiles optimizadas
- Niveles adaptativos según el tamaño de pantalla

### ⚡ **Rendimiento Optimizado**
- Renderizado eficiente de grandes árboles
- Carga perezosa de datos
- Navegación fluida sin retrasos

### 🔍 **Funcionalidades Avanzadas**
- Búsqueda y filtrado de distribuidores
- Exportación de datos
- Historial de navegación

## Contribuir

1. Haz un fork del repositorio
2. Crea una rama de características
3. Realiza tus cambios
4. Prueba exhaustivamente
5. Envía una solicitud de pull

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.

## Soporte

Para preguntas o problemas, por favor crea un issue en el repositorio o contacta al equipo de desarrollo.

---

**Nota**: Esta aplicación está diseñada específicamente para visualizar la red de distribuidores de la empresa Daxcsa y puede necesitar modificaciones para otros casos de uso.

## Tecnologías Utilizadas

- **Frontend**: JavaScript ES6+, HTML5, CSS3
- **Framework CSS**: Tailwind CSS
- **Herramienta de Construcción**: Vite
- **Gestión de Paquetes**: npm
- **Control de Versiones**: Git

## Estado del Proyecto

✅ **Completado**: Visualización básica del árbol  
✅ **Completado**: Navegación interactiva  
✅ **Completado**: Diseño responsivo  
✅ **Completado**: Optimización para móviles  
✅ **Completado**: Interfaz moderna con Tailwind CSS  
🔄 **En Desarrollo**: Funcionalidades adicionales  
📋 **Planificado**: Exportación de datos  
📋 **Planificado**: Búsqueda avanzada
