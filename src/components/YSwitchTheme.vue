<template>
    <div
        class="my-2 text-center"
        style="width:100%"
    >
        <div v-if="!hideTitle">
            <slot name="title">
                <div class="text-overline">{{ selectTheme }}</div>
            </slot>
        </div>
        <div class="mb-4 d-flex justify-center">
            
            <v-card
                v-for="(theme, index) in arrThemes" :key="index"
                class="ma-2 pa-3 elevation-4"
                :style="`background-color:${theme.background}; width:10em; border-radius:14px;`"
                :image="(theme.backgroundImage) ? theme.backgroundImage : ''"
                Xvariant="theme.variant"
                @click="setTheme(theme.name)"
            >
                <div
                    class="mb-3 text-subtitle-2"
                    :style="`color:${theme.text}`"
                >
                    {{ getThemeName(theme) }}
                </div>

                <div>
                    <span class="themepicker__swatch" :style="`background-color:${theme.primary};`"></span>
                    <span class="themepicker__swatch" :style="`background-color:${theme.secondary};`"></span>
                </div>
            </v-card>
            
        </div>
    </div>
</template>

<script lang="ts">
    //
    // Additional properties, all optional!
    //
    interface ExpandedThemeDefinition extends ThemeDefinition {
        title?: string
        backgroundImage?: string
    }
</script>

<script setup lang="ts">
    import { computed } from 'vue'
    import type { ThemeDefinition } from 'vuetify'

    export interface Props {
        modelValue?: string
        themes: Record<string, ExpandedThemeDefinition>
        translation?: any
        hideTitle?: boolean
        title?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        hideTitle: false,
    })

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>()

    let hasCustom = false

    const selectTheme = computed(() => {
        if (props.title) {
            return props.title
        } else if (props.translation) {
            return props.translation('theme.select-theme')
        } else {
            return "Select theme"
        }
    })

    interface Theme {
        name: string,
        variant: string,
        background: string,
        primary: string,
        secondary: string,
        text: string,
        dark: boolean,
        isSystem: boolean,
        // Expanded
        title?: string,
        backgroundImage?: string,
    }

    let arrThemes: Array<Theme> = []

        Object.entries(props.themes).forEach(([themeName,themeDef]) => {

            const isSystem = (themeName == 'light' || themeName == 'dark')
            hasCustom = hasCustom || !isSystem

            arrThemes.push({
                name: themeName,
                variant: (themeName == props.modelValue) ? 'outlined' : '',
                background: themeDef.colors.background,
                primary: themeDef.colors.primary,
                secondary: themeDef.colors.secondary,
                text: (themeDef.dark) ? '#ffffff' : '#000000', // We have no access to the calculated "on-background" value, it seems
                dark: themeDef.dark,
                isSystem: isSystem,
                // Expanded properties
                title: themeDef.title,
                backgroundImage: themeDef.backgroundImage,
            })
        })

    if (hasCustom) {
        arrThemes = arrThemes.filter(o => o.isSystem == false)
    }

    const getThemeName = (theme:Theme) => {
        if (props.translation) {
            return props.translation(`theme.${theme.name}`, theme.title) // Fallback on theme title
        } else {
            return theme.title || theme.name
        }
    }

    const setTheme = (themeName:string) => {
        emit('update:modelValue', themeName)
    }

</script>