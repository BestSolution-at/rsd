# RSD - Remote Service Description

RSD is a DSL to define services and generated client and server code for it.

## Supported protocols

### REST

RSD provides the possibility to define REST-APIs and generated:
- Java Server Code
  - Jakarta WS (eg to use in Quarkus)
- Java Client Code
  - Backed by JDK HTTP Client
- Typescript Client Code
  - Backed by `fetch` use able in any JS/TS environment (Node, Browser, bun, ...)

The following encodings are supported:
- Java Server: JSON, msgpack
- Java Client: JSON, msgpack
- TS/JS Client: JSON, msgpack

