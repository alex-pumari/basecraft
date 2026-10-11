### General
- No utilizar comentarios. Si el código necesita comentarios para entenderse, es una señal de que los nombres no son claros, la redacción del código es deficiente o faltan variables que expresen mejor la intención.

### Testing General
- Crear el archivo de test en el mismo directorio que el archivo a testear.
- Seguir Arrange – Act – Assert (AAA).
- Leyendo solamente el testcase, se debe entender qué y cómo se está testeando.
    - Los mocks deben configurarse en el Arrange de cada testcase.
    - Los datos de los mocks deben ser coherentes entre sí (ej.: el total debe coincidir con la suma de los precios de los productos).
- Los nombres de los testcases deben expresar la intención, no la implementación.
- Los nombres de los testcases deben comenzar con `should...`.
- Prohibido usar strings hardcodeados con mayúsculas (ej.: `"Juan"`).
- Un `describe` raíz con el nombre del archivo sin extensión (ej.: `create-result.core.ts` → `create-result`).
- Si se testea un objeto con métodos, crear un `describe` por cada método.
- Cubrir todas las ramas lógicas y los casos límite (*edge cases*).

### Testing Unitario
- Usar Vitest: `describe`, `expect` y `test`.