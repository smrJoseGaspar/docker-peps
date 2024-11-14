![Logotipos Fondos Next Generation](../imagenes/Logotipo_ME_FP_GV_FSE.png)
# Integración Continua

## Contenidos:
1. Integración Continua.
2. Herramientas para la CI.
3. Integración Continua con Docker.

## 1. Integración Continua
La **integración continua (CI)** es una práctica de ingeniería de software que consiste en hacer integraciones automáticas de un proyecto lo más a menudo posible para así poder detectar fallos cuanto antes. Es una de las principales prácticas recomendadas de **DevOps**, que permite a los desarrolladores fusionar con frecuencia los cambios de código en un repositorio central donde luego se ejecutan las compilaciones y pruebas. Las herramientas automatizadas sirven para verificar que el nuevo código es correcto antes de la integración. Un sistema de control de versiones del código fuente es el punto clave del proceso de *CI*. El sistema de control de versiones también se complementa con otras comprobaciones como las pruebas automatizadas de calidad del código, las herramientas de revisión de estilo de sintaxis, entre otras.
![¿Qué es la integración continua?](https://somospnt.com/images/blog/articulos/251-integracion-continua.png)

## 2. Herramientas para la CI
Las herramientas de integración continua son herramientas que automatizan el proceso de integración de código en un proyecto de software. Estas herramientas permiten a los desarrolladores integrar, compilar y probar su código de manera continua, lo que ayuda a detectar errores y problemas de manera temprana en el ciclo de desarrollo.

A continuación, se proporciona una explicación detallada de algunas de las herramientas más populares de integración continua:

1. **[Jenkins](https://www.jenkins.io/)**: Jenkins es una herramienta de integración continua de código abierto y ampliamente utilizada. Permite a los desarrolladores automatizar el proceso de construcción, prueba y despliegue de aplicaciones. Jenkins es altamente personalizable y se puede integrar con una amplia variedad de herramientas y tecnologías.

2. **[Bamboo](https://www.atlassian.com/es/software/bamboo)**: Bamboo es una herramienta de integración continua desarrollada por Atlassian. Está diseñada específicamente para proyectos que utilizan el sistema de control de versiones Git. Bamboo proporciona un entorno de construcción y pruebas automatizado, así como capacidades de implementación y despliegue.

3. **[Drone.io](https://www.drone.io/)**: Drone.io es una herramienta de integración continua basada en la nube y de código abierto. Es fácil de configurar y utilizar, y admite una amplia variedad de lenguajes de programación y marcos de prueba. Drone.io también se integra con servicios populares de control de versiones como GitHub y Bitbucket.

4. **[Travis CI](https://www.travis-ci.com/)**: Travis CI es una herramienta de integración continua basada en la nube y ampliamente utilizada. Está especialmente diseñada para proyectos alojados en GitHub y es fácil de configurar. Travis CI admite una amplia variedad de lenguajes y marcos de prueba, y proporciona una interfaz intuitiva para ver los resultados de las pruebas.

5. **[Circle CI](https://circleci.com/)**: Circle CI es una plataforma de integración continua basada en la nube que permite a los desarrolladores automatizar el proceso de construcción, prueba y despliegue de aplicaciones. Circle CI es altamente escalable y se integra con una amplia variedad de herramientas y servicios populares.

Estas son solo algunas de las herramientas más populares de integración continua disponibles en el mercado. Cada una tiene sus propias características y ventajas, por lo que es importante evaluar las necesidades y requisitos específicos de su proyecto antes de elegir una herramienta de integración continua.

## 3. Integración Continua con Docker
Docker es una plataforma de virtualización a nivel de sistema operativo que permite empaquetar aplicaciones y sus dependencias en contenedores. Docker puede desempeñar un papel importante en la integración continua al proporcionar un entorno de desarrollo y prueba consistente y reproducible. A continuación, se detallan algunas formas en que Docker puede ayudar en la integración continua:

1. **Entorno de desarrollo consistente:** Docker permite empaquetar una aplicación y todas sus dependencias en un contenedor. Esto significa que el entorno de desarrollo utilizado para construir y probar la aplicación es consistente en todos los pasos del proceso de integración continua. Esto ayuda a evitar problemas de incompatibilidad entre el entorno de desarrollo de los desarrolladores y el entorno de prueba.

2. **Reproducibilidad:** Al empaquetar una aplicación en un contenedor Docker, se puede garantizar que la misma versión de la aplicación y sus dependencias se utilicen en todas las etapas del proceso de integración continua. Esto permite una mayor reproducibilidad de las pruebas y facilita la detección de errores y problemas.

3. **Aislamiento:** Docker proporciona aislamiento entre los diferentes componentes de una aplicación. Esto significa que cada parte de la aplicación se puede empaquetar en un contenedor separado, lo que facilita la prueba y el despliegue de cada componente de forma independiente. Esto permite una mayor flexibilidad y agilidad en el proceso de integración continua.

4. **Escalabilidad:** Docker facilita la creación de entornos de prueba escalables. Los contenedores Docker se pueden crear y destruir rápidamente, lo que permite ejecutar pruebas en paralelo y acelerar el proceso de integración continua.

5. **Integración con herramientas de integración continua:** Docker se puede integrar fácilmente con herramientas de integración continua como Jenkins, Bamboo, Travis CI, Circle CI, entre otras. Estas herramientas pueden utilizar contenedores Docker para construir, probar y desplegar aplicaciones de manera automatizada.

En resumen, Docker puede ayudar en la integración continua al proporcionar un entorno de desarrollo consistente, reproducible y aislado. Esto facilita la detección temprana de errores, acelera el proceso de integración continua y mejora la calidad del software.

## Referencias:
- [Altassian:¿En qué consiste la integración continua?](https://www.atlassian.com/es/continuous-delivery/continuous-integration)
- [Prácticas de integración continua y herramientas](https://sentrio.io/blog/practicas-de-integracion-continua-ci-y-herramientas/)
