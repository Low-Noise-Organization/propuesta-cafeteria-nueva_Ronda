# Documento de Diseño – Nueva Ronda

## 1. Identidad de Marca

Nueva Ronda es un bar de tapas tradicional andaluz con solera (desde 1998). La web refleja los valores de **autenticidad, cercanía y tradición**, con un toque moderno y profesional.

### Paleta de colores

| Color | Uso | Código |
|-------|-----|--------|
| Rojo tradicional | Primary, CTA, acentos | `#C1292E` |
| Dorado/ocre | Secondary, hover, estrellas | `#D4A24C` |
| Verde oliva | Acento secundario | `#2C5F2D` |
| Blanco roto cálido | Fondo principal | `#FDFBF7` |
| Beige suave | Fondo alternativo (secciones) | `#F8F4EE` |
| Casi negro | Texto principal | `#1A1A1A` |

**Justificación**: El rojo es el color identitario de la cultura andaluza (casetas, toros, tradición). El dorado aporta calidez y evoca el aceite de oliva, el vino y los tonos de la piedra cordobesa. El verde oliva conecta con la tierra y la gastronomía local.

### Tipografía

- **Playfair Display** (títulos): Serif elegante que evoca tradición, artesanía y carácter clásico.
- **Inter** (cuerpo): Sans-serif moderna, legible en pantalla, buen rendimiento en todos los tamaños.

## 2. Arquitectura de la página

Secciones en orden de navegación natural:

1. **Hero** – Impacto visual, CTA claro, badge de confianza (años de historia + rating)
2. **Sobre Nosotros** – Historia, valores, diferenciación
3. **Especialidades** – Tarjetas de platos con precio (6 productos estrella)
4. **Galería** – 6 imágenes representativas con lightbox
5. **Opiniones** – Rating verificable de Google + extractos representativos
6. **Localización** – Mapa + datos prácticos + botones de acción directa
7. **Contacto** – Formulario con validación
8. **Footer** – Enlaces, horario, redes sociales, legal

## 3. Decisiones técnicas

### Sin frameworks externos
Se opta por HTML5 + CSS3 + JS vanilla para evitar dependencias, maximizar rendimiento y mantener el control total sobre el diseño. Los requisitos (Flexbox, Grid, Variables CSS, animaciones) están soportados en todos los navegadores modernos.

### Placeholders visuales
Las imágenes se implementan como SVGs inline con geometrías abstractas que sugieren el contenido (fachada, platos, terraza). Esto permite:
- Carga instantánea (sin HTTP requests)
- Consistencia visual incluso sin imágenes reales
- Fácil sustitución futura por assets reales

### Rendimiento
- Lazy loading del iframe de Maps mediante IntersectionObserver
- Scroll progress con `passive: true` para evitar bloqueo del hilo principal
- Animaciones CSS preferidas sobre JS para compositor-friendly rendering
- `prefers-reduced-motion` para usuarios con sensibilidad al movimiento

### SEO semántico
- Schema.org LocalBusiness con datos completos del restaurante
- Open Graph y Twitter Cards para compartir en redes
- Estructura de encabezados jerárquica (h1 → h2 → h3)
- Atributos `aria-*` y roles semánticos

### Accesibilidad (WCAG)
- Color contrast ratio verificado (texto sobre fondos)
- Navegación por teclado completa (Tab, Enter, Escape)
- ARIA labels en todos los elementos interactivos
- Focus indicators visibles con `:focus-visible`
- Textos alternativos en iconos SVG

## 4. Patrones de interacción

- **Navbar**: Se vuelve opaca con backdrop-filter al hacer scroll
- **Hamburger**: Animación a cruz en mobile
- **Galería**: Lightbox modal con overlay y cierre por Escape/clic fuera
- **Formulario**: Validación en blur + en submit con feedback visual
- **Scroll reveal**: Elementos aparecen al entrar en viewport con efecto fade-up
- **Back to top**: Aparece al superar 400px de scroll
- **Botones**: Efecto hover de elevación con sombra

## 5. Responsive design

| Breakpoint | Target | Comportamiento |
|------------|--------|----------------|
| < 480px | Móvil | 1 columna, botones full-width |
| 481–768px | Tablet small | 2 columnas galería, menú 1 col |
| 769–1024px | Tablet grande / laptop small | 2 columnas en menu/grid |
| 1025–1799px | Escritorio | Layout completo 3 columnas |
| ≥ 1800px | 4K | Tipografía mayor, más espaciado, max-width 1400px |

## 6. Mejoras futuras

- Integración de sistema de reservas online
- Blog de recetas / cultura gastronómica cordobesa
- Galería con fotos reales subidas por el establecimiento
- Menú descargable en PDF
- Modo oscuro
- i18n (inglés)
