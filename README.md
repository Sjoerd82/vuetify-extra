# vuetify-extra
Additional components for use with Vuetify 3.

This package contains two components:

* Language (i18n) switcher
* Vuetify theme switcher

**This package is currently being developed. Do not install (yet..).**

### Installation

You can use this package with your exiting Vuetify 3 (Vue 3) project using your favorite package manager.

```dos
npm -i vuetify-extra
pnpm add vuetify-extra
yarn add vuetify-extra
```

# Language Switcher

The language switcher displays a drop down (v-select) containing a list of languages to select from.

![Example 1](https://github.com/Sjoerd82/vuetify-extra/blob/main/doc/example-lang-1.png)
![Example 2](https://github.com/Sjoerd82/vuetify-extra/blob/main/doc/example-lang-2.png)

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

![Example](https://github.com/Sjoerd82/vuetify-extra/blob/main/doc/example-theme-1.png)

## Props

| Name                 | Type             | Default        | Description                           |
|----------------------|------------------|----------------|---------------------------------------|
| themes               | array            | ***required*** | array of Vuetify themes               |
| translation          | i18n translation |                | Optional, if omitted uses             |
| title                | string           | `Select theme` | Uses this title, if not i18n provided |
| hide-title           | boolean          | `false`        | hides the title                       |
| value                | string           |                | The current/to be changed theme       |

## Slots

| Name              | Description                 |
|-------------------|-----------------------------|
| title             | Title section               |

## Translations

The use of translations is optional. If you use them on your site, you can pass the translation object to this component. The translations object must contain `theme.select-theme` and an entry for every Vuetify theme. Here's an example YAML translations file:

```yaml
theme:
  select-theme: Select a theme
  light: Light
  dark: Dark
  DarkChocolat: Dark Chocolat
```

If a translation is not found, the theme's title is used instead (see Extending the ThemeDefinition below).

## Theme setup (vuetify.ts)

### Built-in color scheme

When it comes to Vuetify themes, there are two approaches. If you only require the built-in light and dark mode, without any modifications, you don't really need to set-up anything. You can set the default theme in vuetify.ts:

```ts
    export default createVuetify({
        theme: {
            defaultTheme: 'dark' // 'dark' or 'light'
        }
    })
```

### Custom and/or multiple color schemes

Add a theme definition for each theme. Here's an example theme definition. It's important that you set `dark: true`, or `dark: false`, for dark and light themes, as Vuetify uses that information to add the correct shadings, etc.

Colors that aren't changed are derived from either the dark or light palette, in this example we have a dark mode theme that is the same as the original, but instead uses blue and grey as its primary and secondary color.

The on-colors are automatically calculated by Vuetify based on the contrast ration, but can be overrided here as well.

```ts
const DarkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        /* Base colors
         *
        background: '#111111',
        surface: '#212121',
        */
        primary: colors.blue.base,   // CHANGED; Default: #bb86fc
        secondary: colors.grey.base, // CHANGED; Default: #03dac4
        /*
         * Base alert colors
         *
        success: '#4caf50',
        warning: '#fb8a00',
        error: '#cf6679',
        info: '#2194f3',
        */
        /*
         *  The following are the text colors on the respective backgrounds.
         *  These are auto calculated based on contrast.
         *  But can be overriden here.
         *
        'on-background': string
        'on-surface': string
        'on-primary': string
        'on-secondary': string
        'on-success': string
        'on-warning': string
        'on-error': string
        'on-info': string
        */
    },
}
```

Your themes then must be added to the `theme` section. Additionally, this is also the place to add variations, if you desire any.

```
export default createVuetify({
    theme: {
        defaultTheme: 'DarkTheme',
        variations: {
            colors: ['surface', 'primary', 'secondary'],
            lighten: 1,
            darken: 1,
        },
        themes: {
            DarkTheme,
            LightTheme,
            GitHubDark,
        },
    },
})
```


### Extending the ThemeDefinition

The ThemeDefinition is rather constraint, in some cases you will want to expand it. The following are properties that are recognized by the ThemeSwitcher, but you can add your own as well.

```ts
interface ExpandedThemeDefinition extends ThemeDefinition {
    title?: string
    backgroundImage?: string
}
```

## Example usage

Inspired by Max Böck. This drawer goes nicely on top of the page.
If you use the Vuetify V-App-Bar, the put it below it, as it is fixed to the top of the page. In this case, also add 64px

```html
<template>
    <v-app>
        <v-app-bar></v-app-bar>
        <Transition name="themeswitcher">
            <div
                v-if="showThemeSwitcher"
                class="themeswitcher"
            >
                <YSwitchTheme
                    class="mb-12"
                    :themes="theme.computedThemes.value"
                    :translation="t"
                    v-model="theme.global.name.value"
                />
                <v-btn
                    class="ma-1 themeswitcher__close"
                    icon flat
                    @click="showThemeSwitcher=false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
        </Transition>
        <v-main>
            <v-btn
                class="ma-6"
                @click="showThemeSwitcher=!showThemeSwitcher"
            >
                Open drawer
            </v-btn>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useTheme } from 'vuetify'
    import { YSwitchTheme } from "vuetify-extra"
    import 'vuetify-extra/styles.css'
    const { t } = useI18n()
    const theme = useTheme()
    const showThemeSwitcher = ref(false)
</script>

<style scoped>
.themeswitcher {
    height: 160px;
    overflow: hidden;
    background: rgba(var(--v-theme-surface-darken-1));
    /* If VAppBar present, add 64px to place it under the VAppBar.
       VAppBar is fixed and has no template slot to place it above the bar. */
    position: relative;
    top: 64px;
}

.themeswitcher__close {
    position: absolute;
    top:0; right:0;
    background-color: transparent;
}

.themeswitcher-enter-active {
    animation: slideY 220ms ease-in-out;
}
.themeswitcher-leave-active {
    animation: slideY 180ms ease-in-out reverse;
}

@keyframes slideY {
  from {
    height: 0;
  }
  to {
    height: 160px;
  }
}
</style>
```

# Unstable (you have been warned)

This package currently uses `vue-country-flag-next`, but will migrate to `vue-flagpack`.
It is currently in development AND WILL CHANGE.