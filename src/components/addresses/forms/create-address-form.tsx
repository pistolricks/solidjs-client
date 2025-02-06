import {Component, createEffect, createMemo, Show} from "solid-js";
import {useSubmission} from "@solidjs/router";
import {addVendor} from "~/lib/vendors";
import {TextField, TextFieldErrorMessage, TextFieldInput} from "~/components/ui/text-field";
import {Button} from "../../ui/button";
import {showToast} from "~/components/ui/toast";
import {ChevronLeft} from "~/components/users/forms/login-user-form";
import {addAddress} from "~/lib/addresses";

type PROPS = {}

const CreateAddressForm: Component<PROPS> = props => {
    const submission = useSubmission(addAddress);

    const results = createMemo(() => {
        return submission.result
    })

    createEffect(() => {
        if (results()?.error) {
            showToast({
                variant: "error",
                title: "Error",
                description: results()?.error
            })
        }
    })

    return (
        <>

            <form class={'space-y-4'} action={addVendor} method="post">
                <TextField>
                    <TextFieldInput type="text" autocomplete="none" name="street_address" placeholder="street_address"/>
                    <Show when={results()?.error?.street_address}>
                        <TextFieldErrorMessage>
                            {results()?.error?.street_address}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <TextField>
                    <TextFieldInput type="text" autocomplete="none" name="locality" placeholder="locality"/>
                    <Show when={results()?.error?.locality}>
                        <TextFieldErrorMessage>
                            {results()?.error?.locality}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <TextField>
                    <TextFieldInput type="text" autocomplete="none" name="administrative_area" placeholder="administrative_area"/>
                    <Show when={results()?.error?.administrative_area}>
                        <TextFieldErrorMessage>
                            {results()?.error?.administrative_area}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <TextField>
                    <TextFieldInput type="number" autocomplete="none" name="post_code" placeholder="post_code"/>
                    <Show when={results()?.error?.post_code}>
                        <TextFieldErrorMessage>
                            {results()?.error?.post_code}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <div class={'flex justify-end space-x-2'}>
                    <Button as={"A"} href={'/addresses'} variant={'secondary'} size={"icon"}
                            type={"button"}><ChevronLeft/></Button>
                    <Button as={"button"} variant={'default'} type={"submit"}>Add Address</Button>
                </div>
            </form>
        </>
    );
};

export default CreateAddressForm;