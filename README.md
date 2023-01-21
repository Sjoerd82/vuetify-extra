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
import 'vuetify-extra/styles.css'
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
| Name                 | Type    | Default        | Description        |
|----------------------|---------|----------------|--------------------|
| languages            | array   | ***required*** | array of languages, *see example* |
| prefix               | string  | *undefined*    | Text to be prefixed before the language name. For example *"Select language"*. A colon will automatically be added when used (e.g. the prefix becomes *"Select language: "*).
| flag-select-location | "left", "right", "start", "end", "none" | `left` | Values "left" and "start" both place the flag in front of the language name; "right" places the flag directly after the language name; "end" place the flag at the far right of the selection box, before the caret. To not show a flag, use "none", or any other value.
| flag-items-location  | "left", "right", "start", "end", "none" | `left` | Values "left" and "start" both place the flag in front of the language name; "right" places the flag directly after the language name; "end" place the flag at the far right of the selection box. To not show a flags, use "none", or any other value.
| round                | boolean | `false`       | Circular instead of square flags.
| naked                | boolean | `false`       | Removes all styling except for the caret. This way you can incorporate it in a v-menu / v-list-item.

```js
export const languages = [
    {
        code: "en",
        name: "English",
        flagCode: "usa",
    },
    {
        code: "nl",
        name: "Nederlands",
        flagCode: "nl",
    }
]
```

#### Suggested installation

A good approach could be to include the available languages array in the i18n.ts file, as an extra export.

##### i18n.ts

```ts
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

export default createI18n({
    legacy: false,
    locale: 'nl', // Current locale
    messages
})
export const languages = [
    {
        code: "en",
        name: "English",
        flagCode: "usa",
    },
    {
        code: "nl",
        name: "Nederlands",
        flagCode: "nl",
    }
]
```

And in the component that houses the YSwitchLang:
```ts
import { languages } from '../plugins/i18n'
import { YSwitchLang } from "vuetify-extra"
import 'vuetify-extra/styles.css'
```

### Unstable (you have been warned)

This package currently uses `vue-country-flag-next`, but will migrate to `vue-flagpack`.
It is currently in development AND WILL CHANGE.