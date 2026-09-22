# Colorfly Studio

**Colorfly Studio** es una aplicación web interactiva para generar, personalizar y exportar paletas de colores.

La aplicación permite crear combinaciones de colores aleatorias y trabajar con cada color individualmente, mostrando sus valores en diferentes formatos como **HEX, RGB y HSL**.

El proyecto fue desarrollado utilizando **HTML5, CSS3 y JavaScript Vanilla**, sin frameworks, librerías externas ni llamadas de red.

---

## Funcionalidades

- Generación aleatoria de paletas de colores.
- Paleta inicial de 4 colores.
- Agregar colores hasta un máximo de 9.
- Eliminar colores hasta un mínimo de 2.
- Bloquear colores para conservarlos al generar una nueva paleta.
- Reordenar colores mediante Drag & Drop.
- Visualización de cada color en:
  - HEX
  - RGB
  - HSL
- Copiar individualmente cada valor de color al portapapeles.
- Exportar la paleta como archivo JSON.
- Tooltips para las principales acciones.
- Mensajes de confirmación mediante toast notifications.
- Interfaz adaptable al espacio disponible.

---

## Instrucciones de uso

### Generar una paleta

Al abrir la aplicación se genera automáticamente una paleta inicial de cuatro colores.

Presiona el botón **"Generar paleta"** para crear una nueva combinación aleatoria.

### Agregar colores

Utiliza el botón **"+"** situado junto a la paleta para agregar nuevos colores.

La aplicación permite trabajar con un máximo de **9 colores**.

### Bloquear un color

Utiliza el icono de bloqueo de una tarjeta para conservar ese color.

Cuando se genera una nueva paleta, los colores bloqueados permanecen sin cambios mientras que los demás son reemplazados por nuevos colores aleatorios.

### Eliminar colores

Utiliza el botón de eliminar de cada tarjeta para quitar un color de la paleta.

La aplicación mantiene un mínimo de **2 colores**, por lo que la opción de eliminar se desactiva al alcanzar ese límite.

### Reordenar colores

Las tarjetas pueden reorganizarse mediante **Drag & Drop**.

Arrastra un color y colócalo en otra posición para modificar el orden de la paleta.

### Copiar valores

Cada color muestra sus valores en:

- HEX
- RGB
- HSL

Utiliza el botón de copiar correspondiente para guardar el valor seleccionado en el portapapeles.

### Exportar una paleta

Presiona **"Exportar paleta"** para generar un archivo `.json` con los colores actuales.

Ejemplo:

```json
{
  "name": "Colorfly Palette",
  "colors": [
    {
      "hex": "#7C3AED",
      "rgb": "rgb(124, 58, 237)",
      "hsl": "hsl(262, 83%, 58%)"
    }
  ]
}
```

---

## Decisiones técnicas

### JavaScript Vanilla

El proyecto fue desarrollado utilizando JavaScript puro para practicar los fundamentos del lenguaje y la manipulación del DOM sin depender de frameworks o librerías externas.

La interfaz se actualiza dinámicamente utilizando elementos creados mediante JavaScript.

### Estado de la paleta

La información principal de la aplicación se almacena en un arreglo llamado `palette`.

Cada color se representa mediante un objeto:

```javascript
{
  hex: "#7C3AED",
  locked: false
}
```

Después de modificar el estado de la paleta, la interfaz vuelve a renderizarse mediante `renderPalette()`.

El flujo principal de la aplicación sigue el patrón:

```text
Interacción del usuario
        ↓
Modificar palette
        ↓
renderPalette()
        ↓
Actualizar interfaz
```

### Generación de colores

Los colores se generan inicialmente en formato hexadecimal mediante JavaScript.

A partir del valor HEX se calculan posteriormente sus representaciones en **RGB y HSL**.

Esto permite mantener un único valor principal para cada color y generar los demás formatos cuando la interfaz los necesita.

### Drag & Drop

Para reorganizar los colores se utiliza la **HTML Drag and Drop API** del navegador.

Al mover una tarjeta se modifica el orden de los elementos dentro del arreglo `palette` y posteriormente se vuelve a renderizar la interfaz.

### Clipboard API

La función de copiar utiliza:

```javascript
navigator.clipboard.writeText()
```

Esta API permite enviar los valores HEX, RGB o HSL directamente al portapapeles del usuario.

### Exportación JSON

La exportación se realiza completamente desde el navegador utilizando:

- `JSON.stringify()`
- `Blob`
- `URL.createObjectURL()`
- atributo `download` de HTML

No se necesita servidor para generar el archivo.

### Accesibilidad

Se incorporaron diferentes consideraciones básicas de accesibilidad:

- HTML semántico.
- `aria-label` en botones representados únicamente mediante iconos.
- `aria-live` para mensajes dinámicos.
- Estados `focus-visible`.
- Tooltips descriptivos.
- Texto alternativo cuando corresponde.
- Estados visuales y funcionales para botones deshabilitados.

---

## Estructura del proyecto

```text
colorfly-studio/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   └── script.js
│
├── imgs/
│   ├── Check.svg
│   ├── Lock.svg
│   ├── Unlock.svg
│   ├── Delete.svg
│   ├── Move.svg
│   ├── Copy.svg
│   └── ...
│
└── README.md
```

---

## Ejecutar el proyecto localmente

El proyecto no requiere instalación de dependencias.

### Opción 1 — Abrir directamente

Clona o descarga el repositorio y abre:

```text
index.html
```

en un navegador moderno.

### Opción 2 — Visual Studio Code

Abre la carpeta del proyecto en Visual Studio Code.

Si utilizas una extensión como **Live Server**, puedes iniciar el proyecto desde `index.html`.

> Live Server es opcional. La aplicación no depende de él para funcionar.

---

## Clonar el repositorio

```bash
git clone URL-DEL-REPOSITORIO
```

Después entra a la carpeta:

```bash
cd colorfly-studio
```

No es necesario ejecutar:

```bash
npm install
```

porque el proyecto no utiliza paquetes ni dependencias externas.

---

## Deploy con GitHub Pages

La aplicación puede publicarse directamente utilizando GitHub Pages.

1. Sube el proyecto a un repositorio público de GitHub.
2. Abre el repositorio en GitHub.
3. Entra a **Settings**.
4. Selecciona **Pages**.
5. En **Build and deployment**, selecciona **Deploy from a branch**.
6. Selecciona la rama principal del proyecto (`main` o `master`).
7. Selecciona la carpeta `/ (root)`.
8. Guarda los cambios.

GitHub Pages generará una URL pública para acceder a la aplicación.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- DOM API
- Clipboard API
- HTML Drag and Drop API
- Blob API
- Git
- GitHub
- GitHub Pages

---

## Uso de Inteligencia Artificial

Durante el desarrollo se utilizó Inteligencia Artificial como herramienta de apoyo para:

- Analizar alternativas de implementación.
- Explicar conceptos de JavaScript, CSS y DOM.
- Revisar fragmentos de código.
- Explorar decisiones de UX/UI.
- Apoyar la documentación del proyecto.
- Generar recursos visuales utilizados durante el diseño.

Las decisiones de implementación, integración, pruebas y ajustes del proyecto fueron realizadas durante el proceso de desarrollo.

---

## Autor

**Ernesto Fascinetto**

Proyecto desarrollado como parte del programa **Fullstack Master de Henry**.