<!-- 
    DEPENDENCIES:
    - vue-country-flag-next

    pnpm add -D vue-country-flag-next

-->
<template>
    <v-select
        :class="{'nkd':naked}"
        :items="languages"
        item-title="name"
        item-value="code"
        :menu-props="{closeOnContentClick:true}"
        hide-details
        v-model="i18nLocale"
    >
        <template #selection="{ item }">
            <CountryFlag
                v-if="flag && !flagRight"
                class="mr-2"
                style="margin-top:-8px;"
                :country="item.raw.flagCode"
            />
            <span v-if="selectionPrefix" class="mr-2">{{ selectionPrefix }}:</span>
            <span>{{ item.title }}</span>
            <CountryFlag
                v-if="flag && flagRight"
                class="ml-2"
                style="margin-top:-8px; margin-right:-4px;"
                :country="item.raw.flagCode"
            />
        </template>

        <template #item="{ item }">
            <v-list-item
                :title="item.title"
                @click="i18nLocale = item.value"
            >
                <template #prepend>
                    <CountryFlag
                        v-if="flag || flagItems"
                        class="mr-2"
                        style="margin-top:-8px;"
                        :country="item.raw.flagCode"
                    />
                </template>
            </v-list-item>
        </template>
    </v-select>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue'
    import CountryFlag from 'vue-country-flag-next'
    import '@/components/style.css'

    export interface Languages {
        code: string
        name: string
        flagCode: string
    }

    export interface Props {
        modelValue?: string
        languages: Array<Languages>
        selectionPrefix?: string
        flag?: boolean
        flagRight?: boolean
        flagItems?: boolean
        naked?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        flag: false,
        flagRight: false,
        flagItems: false,
        naked: false,
    })

    /*
    const props = defineProps<{
        modelValue?: string
        languages: Array<Languages>
        selectionPrefix?: string
        flag?: boolean
        flagRight?: boolean
        flagItems?: boolean
        naked?: boolean
    }>()
    */
    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>()

    const i18nLocale = ref(props.modelValue)
    watch(i18nLocale, (newLocale:string) => {
        emit('update:modelValue', newLocale)
    })

    watch(() => props.modelValue, (newLocale:string) => {
        i18nLocale.value = newLocale
    })

</script>