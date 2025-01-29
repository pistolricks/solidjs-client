import {Component, createEffect, createMemo, createSignal, JSX, Show} from "solid-js";
import {activateUserHandler} from "~/lib/users";
import {TextField, TextFieldErrorMessage, TextFieldInput} from "~/components/ui/text-field";
import {Button} from "../../ui/button";
import {showToast} from "~/components/ui/toast";

type PROPS = {}

const ActivateUserForm: Component<PROPS> = props => {

    const [getToken, setToken] = createSignal("")

    const [getResponse, setResponse] = createSignal<any>()

    const handleToken: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
        console.log("Input changed to", event.currentTarget.value)
        setToken(event.currentTarget.value)
    }

    const token = createMemo(() => {
        console.log(getToken())
        return getToken()
    })


    const handleSubmit = async() => {
        let res = await activateUserHandler(token())
        setResponse(await res)
    }


    const results = createMemo<any>(async () => {
        console.log(getResponse())
        return getResponse()
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
            <div class={'space-y-4'}>

                <TextField>
                    <TextFieldInput onInput={handleToken} type="text" autocomplete={'none'} required name="token"
                                    placeholder="activation token"/>
                    <Show when={results()?.error?.token}>
                        <TextFieldErrorMessage>
                            {results()?.error?.token}
                        </TextFieldErrorMessage>
                    </Show>
                </TextField>
                <div class={'flex justify-end space-x-2'}>
                    <Button as={"A"} href={'/resend'} variant={'secondary'} type={"button"}>Resend</Button>
                <div class={'flex justify-end space-x-2'}>
                    <Button onClick={handleSubmit} as={"button"} variant={'default'} type={"button"}>Activate</Button>
                    <Button as={"A"} href={'/'} variant={'secondary'} type={"button"}>Go Back</Button>
                </div>
                </div>
            </div>
        </>
    );
};

export default ActivateUserForm;