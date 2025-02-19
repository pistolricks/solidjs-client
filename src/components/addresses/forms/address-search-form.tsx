import {Component, createEffect, createMemo, createSignal, JSX, Show} from "solid-js";
import {useSubmission} from "@solidjs/router";
import {TextField, TextFieldErrorMessage, TextFieldInput} from "~/components/ui/text-field";
import {Button} from "../../ui/button";
import {showToast} from "~/components/ui/toast";
import {MagnifyingGlassCircle} from "~/components/svg";
import {addressSearchHandler} from "~/lib/addresses";
import {CountryData} from "~/lib/store";
import {useLayoutContext} from "~/context/layout-provider";

type PROPS = CountryData & {class?: string};

const AddressSearchForm: Component<PROPS> = props => {
    const {getViewbox, getQuery, setQuery} = useLayoutContext();
    const submission = useSubmission(addressSearchHandler);

    const className = () => props.class ?? 'flex justify-center items-center';

    const results = createMemo(() => {
        console.log("result", submission.result)
        return submission.result
    })


    createEffect(() => {
        console.log("search", getQuery())
        if (results()?.error) {
            showToast({
                variant: "error",
                title: "Error",
                description: results()?.error
            })
        }
    })


    const handleSearch: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
        console.log("Search Input changed to", event.currentTarget.value)

        setQuery(event.currentTarget.value)
    }

    return (
        <>

            <form class={className()} action={addressSearchHandler} method="post">
                <TextField class={'w-full relative'}>
                    <TextFieldInput onInput={handleSearch} value={getQuery()} class={"w-full"} type="text" autocomplete="none" id="search"
                                    name="search" placeholder="Search"/>
                    <input class={'sr-only'} id={'viewbox'} name={'viewbox'} type={'text'} value={String(getViewbox())}/>


                    <Show when={results()?.error?.search}>
                        <TextFieldErrorMessage>
                            {results()?.error?.search}
                        </TextFieldErrorMessage>
                    </Show>
                    <Button disabled={getQuery()?.length < 1} as={"button"}
                            class={'absolute right-0 inset-y-0 z-40 w-12 h-full flex items-center bg-mint-3 hover:bg-mint-4 border border-gray-10 rounded-l-none rounded-r-md'}
                            variant={'link'} type={"submit"}
                            size="icon">
                        <MagnifyingGlassCircle class={"p-0.5 stroke-red-8 hover:stroke-red-7 "}/>
                    </Button>
                </TextField>


            </form>
        </>
    );
};

export default AddressSearchForm;