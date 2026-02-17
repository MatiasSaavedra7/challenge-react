# Job Board Challenge - React

Este proyecto es la solucion al challenge tecnico para construir un listado de trabajos y permitir la postulacion de candidatos.

## Descripcion

La aplicacion es una Single Page Application (SPA) construida con **React**, **TypeScript** y **Vite**. Permite a un usuario (candidato):
1.  Ingresar su email para identificarse y obtener sus credenciales (`uuid`, `candidateId`, `applicationId`).
2.  Ver un listado de posiciones laborales disponibles (Jobs).
3.  Postularse a una posicion enviando la URL de su repositorio de GitHub.

## Requisitos Previos

- Node.js (v18 o superior recomendado)
- npm (o yarn/pnpm)

## Instalacion y Ejecucion

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/MatiasSaavedra7/challenge-react.git
    cd challenge-react
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raiz del proyecto y define la URL base de la API.
    
    ```env
    VITE_BASE_URL=https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net
    ```

4.  **Ejecutar (modo desarrollo):**
    ```bash
    npm run dev
    ```

## Funcionalidades Implementadas

- **Autenticacion:** Login por email para obtener los datos del candidato necesarios para la postulacion.
- **Listado de Trabajos:** Obtiene los datos desde la API.
- **Postulacion:** Envia la URL del repositorio a la API.
- **Manejo de Errores:** Feedback visual al usuario en caso de fallos en la red o respuestas de error de la API.

## Estructura del Proyecto

```
src/
├── api/            # Cliente HTTP y funciones de fetch
├── components/     # Componentes reutilizables (JobItem, JobList)
├── types/          # Definiciones de tipos
├── App.tsx         # Componente principal y manejo de estado global (candidato)
└── main.tsx        # Punto de entrada
```

## Tecnologias

- Vite
- React
- TypeScript
- CSS Modules

---