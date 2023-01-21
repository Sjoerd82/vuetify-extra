
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
                v-if="flagSelectLocation == 'left' || flagSelectLocation == 'start'"
                class="mr-2"
                style="margin-top:-8px;"
                :country="item.raw.flagCode"
            />
            <span v-if="prefix" class="mr-2">{{ prefix }}:</span>
            <span>{{ item.title }}</span>
            <CountryFlag
                v-if="flagSelectLocation == 'right'"
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
                        v-if="flagItemsLocation == 'left' || flagItemsLocation == 'start'"
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
        prefix?: string
        flagSelectLocation?: "left" | "right" | "start" | "end" | "none"
        flagItemsLocation?: "left" | "right" | "start" | "end" | "none"
        round?: boolean
        naked?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        flagSelectLocation: "left",
        flagItemsLocation: "left",
        round: false,
        naked: false,
    })

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