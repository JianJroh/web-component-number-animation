# web-component-number-animation

This is a web component that allows you to create numerical animations on your website.

## Features

- 🌀 Works with any framework or no framework at all.
- 🍃 Lightweight and easy to use. (only <2kb gzipped)
- ⚙️ Support multiple attribute configurations including digital formatting, transition duration, etc.

## Demo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vitejs-vite-vzevlr?embed=1&file=index.html)

## Usage

### Installation

```bash
pnpm i web-component-number-animation   # or npm or yarn
```

##### Registration and Usage

```ts
import { NumberAnimation } from 'web-component-number-animation';
customElements.define('x-number-animation', NumberAnimation);
```

```html
<x-number-animation to="12345.6789" />
```

### Using package via CDN

Using ES Module

```html
<script type="module">
  import { NumberAnimation } from 'https://www.unpkg.com/web-component-number-animation/dist/number-animation.js';
  customElements.define('x-number-animation', NumberAnimation);
</script>

<x-number-animation to="12345.6789" />
```

## Configurations

You can customize the behavior of the NumberAnimation component using the following props:

```ts
interface Props {
  to: number;
  from?: number;
  precision?: number;
  duration?: number;
  locale?: string;
  disabled?: boolean;
  hideSeparator?: boolean;
}
```
