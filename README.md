# Nueva Ronda – Bar de Tapas en Córdoba

Web profesional para el bar de tapas **Nueva Ronda** (también conocido como Bar Ronda), ubicado en el Distrito Sur de Córdoba.

## Estructura

```
nueva-ronda/
├── index.html          # Página principal
├── style.css           # Estilos CSS
├── script.js           # JavaScript
├── assets/             # Recursos estáticos (imágenes, etc.)
├── README.md           # Este archivo
└── design-document.md  # Documentación de diseño
```

## Despliegue

### Opción 1: Servidor HTTP estático (recomendado)

```bash
# Con Python
python3 -m http.server 8000 --directory .

# Con Node.js (npx)
npx serve .

# Con PHP
php -S localhost:8000
```

Abrir en el navegador: `http://localhost:8000`

### Opción 2: GitHub Pages

1. Crear un repositorio en GitHub
2. Subir los archivos al repositorio
3. Ir a Settings > Pages > Source > seleccionar `main` / `master`
4. La web estará disponible en `https://[usuario].github.io/[repositorio]/`

### Opción 3: Netlify / Vercel

Arrastrar la carpeta `nueva-ronda/` al panel de Netlify o Vercel, o conectar el repositorio de GitHub.

## Personalización

- **Imágenes**: Reemplazar los SVG inline en `index.html` por imágenes reales en `assets/`
- **Teléfono**: Actualizar `+34957290801` si cambia
- **Horarios**: Revisar apertura domingos / festivos en el Schema.org
- **Google Maps API key**: Sustituir `AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8` por una clave propia

## SEO

- Schema.org LocalBusiness integrado
- Open Graph y Twitter Cards
- Meta description y keywords
- Sitemap y robots.txt (pendiente de generar según dominio final)

## Tecnologías

- HTML5 semántico
- CSS3 (Flexbox, Grid, Variables, Animaciones, Media Queries)
- JavaScript ES6 (sin librerías externas)
- Google Fonts (Playfair Display + Inter)
- Diseño responsive (móvil, tablet, escritorio, 4K)
- Accesibilidad WCAG (ARIA, contraste, foco visible)
