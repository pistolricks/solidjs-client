import {Component, createEffect, createMemo, Show} from "solid-js";
import {useSubmission} from "@solidjs/router";
import {addVendor} from "~/lib/vendors";
import {TextField, TextFieldErrorMessage, TextFieldInput} from "~/components/ui/text-field";
import {Button} from "../../ui/button";
import {showToast} from "~/components/ui/toast";
import {ChevronLeft} from "~/components/users/forms/login-user-form";

type PROPS = {}

const CreateVendorForm: Component<PROPS> = props => {
    const submission = useSubmission(addVendor);

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
                    <TextFieldInput type="text" autocomplete="none" name="title" placeholder="title"/>
                    <Show when={results()?.error?.title}>
                        <TextFieldErrorMessage>
                            {results()?.error?.title}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <TextField>
                    <TextFieldInput type="number" autocomplete="none" name="year" placeholder="year"/>
                    <Show when={results()?.error?.year}>
                        <TextFieldErrorMessage>
                            {results()?.error?.year}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <TextField>
                    <TextFieldInput type="number" autocomplete="none" name="runtime" placeholder="runtime"/>
                    <Show when={results()?.error?.runtime}>
                        <TextFieldErrorMessage>
                            {results()?.error?.runtime}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <TextField>
                    <TextFieldInput type="text" autocomplete="none" name="genres" placeholder="genres"/>
                    <Show when={results()?.error?.genres}>
                        <TextFieldErrorMessage>
                            {results()?.error?.genres}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <div class={'flex justify-end space-x-2'}>
                    <Button as={"A"} href={'/vendors'} variant={'secondary'} size={"icon"}
                            type={"button"}><ChevronLeft/></Button>
                    <Button as={"button"} variant={'default'} type={"submit"}>Add Vendor</Button>
                </div>
            </form>
        </>
    );
};

export default CreateVendorForm;