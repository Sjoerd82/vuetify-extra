# vuetify-extra
Additional components for use with Vuetify 3.

This package contains two components:

* Language (i18n) switcher
* Vuetify theme switcher

### Installation

You can use this package with your exiting Vuetify 3 (Vue 3) project.

```dos
npm -i vuetify-extra
```

```dos
pnpm add vuetify-extra
```

```dos
yarn add vuetify-extra
```

### Usage

#### Language Switcher

The language switcher displays a drop down (v-select) containing a list of languages to select from.

Import the component from the package.
```js
import { YSwitchLang } from "vuetify-extra"
```

```html
<YSwitchLang
    :languages="languages"
    :selection-prefix="t('site.language')"
    naked
    flag flag-right
    variant="solo"
    v-model="$i18n.locale"
/>
```

##### Props
| Name      | Type  | Default |
|-----------|-------|---------|
| languages | array | x       |
| array of languages ||


### Unstable (you have been warned)

This package currently uses `vue-country-flag-next`, but will migrate to `vue-flagpack`.
It is currently in development AND WILL CHANGE.