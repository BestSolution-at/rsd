# RSD Webcomponents

This library contains webcomponents to integrate RSD into Websites, Web-Applications, ...

## Usage

```html
<html>
  <head>
    ...
    <script type="module" src='https://cdn.jsdelivr.net/npm/my-name@0.0.1/dist/myname.js'></script>
  </head>
  <body>
    <!-- Use RSD-Webcomponents -->
  </body>
</html>
```

## Components

## RSD Viewer

The RSD-Viewer is able to render an nice documentation from an RSD-Model exported as JSON from the RSD-CLI.

```html
<html>
  <body>
    <rsd-viewer 
      projectname="Quti Service API"
      model="https://raw.githubusercontent.com/BestSolution-at/quti/main/spec/quti.json"
    />
  </body>
</html>
```