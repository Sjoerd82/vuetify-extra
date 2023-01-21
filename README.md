# vuetify-extra
Additional components for use with Vuetify 3.

This package contains two components:

* Language (i18n) switcher
* Vuetify theme switcher

**This package is currently being developed. Do not install (yet..).**

## Installation

You can use this package with your exiting Vuetify 3 (Vue 3) project using your favorite package manager.

```dos
npm -i vuetify-extra
pnpm add vuetify-extra
yarn add vuetify-extra
```

# Language Switcher

The language switcher displays a drop down (v-select) containing a list of languages to select from.

![Example](https://github.com/Sjoerd82/vuetify-extra/blob/main/doc/example-lang-1.png)
![Example](https://github.com/Sjoerd82/vuetify-extra/blob/main/doc/example-lang-2.png)

Import the component from the package.
```js
import { YSwitchLang } from "vuetify-extra"
import 'vuetify-extra/styles.css'
```

```html
<YSwitchLang
    :languages="languages"
    variant="solo"
    v-model="$i18n.locale"
/>
```

#### Props
| Name                 | Type    | Default        | Description        |
|----------------------|---------|----------------|--------------------|
| languages            | array   | ***required*** | array of languages, *see example* |
| prefix-inner         | string  | *undefined*    | Text to be prefixed before the language name. For example *"Select language"*. A colon will automatically be added when used (e.g. the prefix becomes *"Select language: "*). Unlike `prefix`, which styles the text differently, the `prefix-inner` is part of the actual text.
| flag-select-location | "left", "right", "start", "end", "none" | `left` | Values "left" and "start" both place the flag in front of the language name; "right" places the flag directly after the language name; "end" place the flag at the far right of the selection box, before the caret. To not show a flag, use "none", or any other value.
| flag-items-location  | "left", "right", "start", "end", "none" | `left` | Values "left" and "start" both place the flag in front of the language name; "right" places the flag directly after the language name; "end" place the flag at the far right of the selection box. To not show a flags, use "none", or any other value.
| round                | boolean | `false`       | Circular instead of square flags.
| naked                | boolean | `false`       | Removes all styling except for the caret. This way you can incorporate it in a v-menu / v-list-item.
| value                | i18n locale | | The current/to be changed locale |

Please note that most of Vuetify's v-select (styling) properties can also be specified here and will be passed on to the underlying v-select. For example append-icon, autofocus, bg-color?, clearable, clear-icon, color, density, direction?, disabled, error, error-messages, focused, hide-details?, hide-no-data?, hide-selected, hint, label?, max-errors, menu-icon, messages, open-on-clear, persistent-clear?, persistent-hint, persistent-placeholder, placeholder, prefix, prepend-icon, prepend-inner-icon, readonly, reverse, suffix, and variant.

```js
const languages = [
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

#### Slots

None. If a slot is required, then please raise an issue describing the kind of slot that you need.

#### Translations

None. There are no texts to translate.

### Suggested installation

A good approach could be to include the available languages array in the i18n.ts file, as an extra export.

#### i18n.ts

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

# Theme Switcher

The theme switcher displays a list of 'style-cards' with swatches for the available Vuetify themes. If no custom themes are defined, the two default Vuetify themes can be selected (light, dark). If custom themes are defined, then the two default Vuetify themes will be hidden.

#### Props
| Name                 | Type       | Default        | Description                     |
|----------------------|------------|----------------|---------------------------------|
| themes               | array      | ***required*** | array of Vuetify themes         |
| translation          | t-object   |                | i18n translations               |
| value                | string     |                | The current/to be changed theme |

#### Slots

None. If a slot is required, then please raise an issue describing the kind of slot that you need.

#### Translations

The translations object must contain theme.select-theme and an entry for every Vuetify theme.
Example YAML translations file:

```yaml
theme:
  select-theme: Select a theme
  light: Light
  dark: Dark
  DarkChocolat: Dark Chocolat
```

#### 

### Unstable (you have been warned)

This package currently uses `vue-country-flag-next`, but will migrate to `vue-flagpack`.
It is currently in development AND WILL CHANGE.