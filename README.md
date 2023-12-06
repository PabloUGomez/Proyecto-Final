# Proyecto Final Grupo 1

### Desarrollado por Pablo Uriel Gomez y Matias Ezequiel Bussetti

En este proyecto consiste de un Simple TodoList, con categoría, tarea completada y favorita.

![Alt text](preview.png)

---

# Resumen de Desarrollo

Las tareas se an dividido de la siguiente manera (no estrictamente):

- **FrontEnd: Pablo Uriel Gomez**
- **BackEnd: Matias Ezequiel Bussetti**

## Full Stack

### BackEnd:

#### ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) como Lenguaje Principal

#### ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) como Interprete

#### ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) como Libreria para hacer aplicaciones apiRest

#### ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) como Sistema de almacenamiento temporaneo

#### ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) como Base de Datos no relacional

### FrontEnd:

#### ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) como Lenguaje Principal

#### ![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D) como Framework de Componentes

#### ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white) como Base de Datos de Autenticación

---

# Como utilizar

Se debe considerar tener instalado, **mongoDB** y **Redis**. En el caso de utilizar otro Host que contiene estos, modicar el `.env` ubicado en `/backend`.

_Abir_ una _consola_ o _teminal_ en _raiz_ del proyecto:

```shell
cd backend
npm install
npm run start
```

_Abrir_ otra _consola_ o _terminal_ en _raiz_ del proyecto:

```shell
cd frontend--check
npm install
npm run dev
```

---

# Como Utilizar Docker

Para utilizar `Docker compose` se debe _modificar_ las siguientes cosas:

1. En `/backend` _cambiar_ el nombre del archivo `.env` a `.env.<texto>`
2. Cambiar el nombre del archivo `.env.docker.example` a `.env`
3. _Ir_ a la carpeta `/docker`
4. En la carpeta `/nginx`, se _encuentra_ el archivo `.conf` el cual se debe _modificar_ si se quieren agregar más app node
5. _Ir_ a la carpeta `/docker` y correr `docker compose up`
