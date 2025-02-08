import {Format} from '@ark-ui/solid/format'
import {LocaleProvider} from '@ark-ui/solid/locale'
import {Component, For} from 'solid-js'

export const ByteWithLocale: Component<{
    locales?: string[]
    value?: number
}> = props => {
    const locales = () => props.locales ?? ["en-US"];

    const value = () => props.value ?? 0;

    return (
        <div>
            <For each={locales()}>
                {(locale) => (
                    <LocaleProvider locale={locale}>
                        <div class={'text-xs py-1'}>
                            <Format.Byte value={value()}/>
                        </div>
                    </LocaleProvider>
                )}
            </For>
        </div>
    )
}
