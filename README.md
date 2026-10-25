<p align="center">
  <img src="./basecraft-logo.jpg" alt="Basecraft" width="100%" />
</p>

<h1 align="center">Basecraft</h1>

<p align="center">
  Paquetes TypeScript para aplicar Clean Architecture con tipos, utilidades y errores de dominio.
</p>

---

Basecraft es un conjunto de paquetes diseñados para ayudarte a estructurar la lógica de negocio de tus aplicaciones siguiendo los principios de **Clean Architecture**.

Incluye tipos compartidos, utilidades para construir casos de uso y validadores, y errores de dominio tipados.

Su principal ventaja es la **modularidad**: no necesitas instalar todo el ecosistema. Puedes incorporar únicamente los paquetes que necesites y sumar otros a medida que lo necesites.

## Paquetes

| Paquete | Descripción | Instalación |
| --- | --- | --- |
| [`@basecraft/types`](./packages/basecraft-types/README.md) | Tipos compartidos para mantener contratos consistentes entre las distintas capas de la aplicación. | `npm install -D @basecraft/types` |
| [`@basecraft/errors`](./packages/basecraft-errors/README.md) | Errores base de dominio, como `DomainError`, para representar y manejar errores de negocio de forma explícita. | `npm install @basecraft/errors` |
| [`@basecraft/core`](./packages/basecraft-core/README.md) | Implementaciones y utilidades para crear esquemas de validación, validadores, casos de uso y resultados tipados. | `npm install @basecraft/core` |

> **¿Qué necesitas?**
>
> - Solo los tipos compartidos: instala `@basecraft/types` como dependencia de desarrollo.
> - Manejar errores de dominio: instala `@basecraft/errors`.
> - Construir casos de uso y validaciones: instala `@basecraft/core`.
> - Necesitas varias funcionalidades: combina los paquetes según los requisitos de tu proyecto.

## Instalación

Instala únicamente los paquetes que necesites:

```bash
# Tipos compartidos (dependencia de desarrollo)
npm install -D @basecraft/types

# Errores de dominio (dependencia de producción)
npm install @basecraft/errors

# Casos de uso, validaciones y resultados (dependencia de producción)
npm install @basecraft/core
```

## Documentación

Consulta la documentación de cada paquete para conocer sus funcionalidades, API y ejemplos de uso:

- [@basecraft/core — README](./packages/basecraft-core/README.md)
- [@basecraft/types — README](./packages/basecraft-types/README.md)
- [@basecraft/errors — README](./packages/basecraft-errors/README.md)