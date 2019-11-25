更改$grid-breakpoints变量将正常工作。请记住，你必须导入/bootstrap或bootstrap/variables在custom.scss，然后引导@import 之后。

例如：
```
$grid-breakpoints: (
  xs: 0,
  sm: 600px,
  md: 800px,
  lg: 1000px,
  xl: 1280px
);
```
有一个工作示例（scss）：
```
// theme.scss
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1900px
);

$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1610px
);

@import "../node_modules/bootstrap/scss/bootstrap";

// ...
```
