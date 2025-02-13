import {Component, createEffect, createMemo, createSignal, JSX, Show} from "solid-js";
import {useSubmission} from "@solidjs/router";
import {TextField, TextFieldErrorMessage, TextFieldInput} from "~/components/ui/text-field";
import {Button} from "../../ui/button";
import {showToast} from "~/components/ui/toast";
import {MagnifyingGlass} from "~/components/svg";
import {addAddress, addressFieldNames, addressSearchHandler} from "~/lib/addresses";
import {AreaSelect, CountryData} from "~/lib/store";

type PROPS = CountryData;

const CreateAddressForm: Component<PROPS> = props => {
    const submission = useSubmission(addressSearchHandler);

    const results = createMemo(() => {
        console.log("result", submission.result)
        return submission.result
    })

    const [getSearch, setSearch] = createSignal<string>("");

    createEffect(() => {
        console.log("search", getSearch())
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
        setSearch(event.currentTarget.value)
    }

    return (
        <>

            <form class={'flex justify-center items-center space-x-2 md:space-x-2.5'} action={addressSearchHandler} method="post">
                <TextField class={'w-full'}>
                    <TextFieldInput onInput={handleSearch} class={"w-full"} type="text" autocomplete="none" id="search" name="search" placeholder="Search"/>
                    <Show when={results()?.error?.search}>
                        <TextFieldErrorMessage>
                            {results()?.error?.search}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>

                <div class={''}>
                    <Button disabled={getSearch()?.length < 1} as={"button"} variant={'default'} type={"submit"} size="icon"><MagnifyingGlass/></Button>
                </div>
            </form>
        </>
    );
};

export default CreateAddressForm;