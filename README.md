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
- **Navegación por Breadcrumbs**: Rastrea tu posición en la jerarquía del árbol
- **Navegación Padre/Hijo**: Navega hacia arriba y abajo en la estructura del árbol
- **Reinicio a Raíz**: Retorno rápido al distribuidor de nivel superior
- **Seguimiento de Historial**: Mantiene el historial de navegación para retroceder fácilmente



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

## Soporte

Para preguntas o problemas, por favor crea un issue en el repositorio o contacta al equipo de desarrollo.

---

