# lindo-vtexio-highlight-images

## Aplicacion para agregar cucardas sobre las imagenes de los productos. Se puede definir a traves de las props que ofertas mostrar, por default se usan las 
## 3 ofertas: 'offer' | 'teaser' | 'collection'.

## Props:

| Property        | Description                                | Type              | Default value       |
| --------------- | ------------------------------------------ | ----------------- | ------------------- |
| types?          | Tipos de ofertas a combinar, o posibilidad de usar una sola. Default usa las 3                      | `('offer' | 'teaser' | 'collection')[]`          | ['offer', 'teaser', 'collection']                  |
| gap?        | Espacion entre cucardas      | `Number`          | 6                   |
| imageExtension?   | Extension de imagen          | `png | jpeg`         | png                |
| maxWidth?   | Width maximo para la cucarda         | `string`         | 60px                |


## Usar app combinada con stack-layout (app de vtex para posicionar en el top sobre cualquier bloque).
### En product-list (summary) se combina con product-summary-image, para PDP se combina con product-images.

```json
{
"stack-layout#card": {
    "children": [
      "product-summary-image#stack",
      "stack-layout#cucardas"
    ]
  },
"product-summary-image#stack": {
      "props": {
        "showBadge": false,
        "height": 220
      }
  },
"stack-layout#cucardas": {
    "children": [
      "highlight-images"
    ]
  },
  "highlight-images": {
    "props": {"gap": 2 }
  }
}
```

## 1- En el ejemplo usado en store-theme se creo un archivo global (stack-layount.jsonc) para reutilizarlo en varias secciones (pages, blocks, etc.).

```json 
"list-context.product-list#demo1": {
    "blocks": ["product-summary.shelf#demo1"],
    "children": ["slider-layout#home"],
    "props": {
      "category": "2"
    }
  },
  "product-summary.shelf#demo1": {
    "children": [
      // "stack-layout#prodsum",
      "stack-layout#card",
      "product-summary-name",
      "product-rating-inline",
      "product-summary-space",
      "custom-product-price",
      "product-quantity#home"
    ]
  },
```

### store/blocks/stack-layout.json

## 2- Para PDP solamante se hace la llamada al stack-layout que posiciona las cucardas (reutlizandolo desde stack-layout.json).

```json
"flex-layout.col#product-image": {
    "props": {
      "width": "60%",
      "rowGap": 0
    },
    "children": ["stack-layout#pdp"]
  },
  "stack-layout#pdp":{
    "children":[
      "product-images", "stack-layout#cucardas"
    ]
  }
```