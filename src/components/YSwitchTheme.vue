<template>
    <div
        class="my-2 text-center"
        style="width:100%"
    >
        <div class="text-overline">
            {{ translation('theme.select-theme') }}
        </div>
        <div class="mb-4 d-flex justify-center">
            
            <v-card
                v-for="(theme, index) in arrThemes" :key="index"
                class="ma-2 pa-3 elevation-4"
                :style="`background-color:${theme.background}; width:10em; border-radius:14px;`"
                Xvariant="theme.variant"
                @click="setTheme(theme.name)"
            >
                <div
                    class="mb-3 text-subtitle-2"
                    :style="`color:${theme.text}`"
                >
                    {{ theme.title }}
                </div>

                <div>
                    <span class="themepicker__swatch" :style="`background-color:${theme.primary};`"></span>
                    <span class="themepicker__swatch" :style="`background-color:${theme.secondary};`"></span>
                </div>
                
            </v-card>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { ThemeDefinition } from 'vuetify'

    const props = defineProps<{
        modelValue?: string
        themes: Record<string, ThemeDefinition>
        activeTheme?: string
        translation?: any
    }>()

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>()
    //const emit = defineEmits<{
    //    (e: 'change', value: string): void
    //}>()

    interface Theme {
        name: string,
        title: string,
        variant: string,
        background: string,
        primary: string,
        secondary: string,
        text: string,
        dark: boolean,
    }

    // Themes; computed, in case language changes
    let arrThemes: Array<Theme> = []
    Object.entries(props.themes).forEach(([themeName,themeDef]) => {
        console.log('theme',themeName,themeDef)
        arrThemes.push({
            name: themeName,
            title: props.translation(`theme.${themeName}`),
            variant: (themeName == props.activeTheme) ? 'outlined' : '',
            background: themeDef.colors.background,
            primary: themeDef.colors.primary,
            secondary: themeDef.colors.secondary,
            text: (themeDef.dark) ? '#ffffff' : '#000000', // We have no access to the calculated "on-background" value, it seems
            dark: themeDef.dark,
        })
    })

    const setTheme = (themeName:string) => {
        emit('update:modelValue', themeName)
    }
</script>