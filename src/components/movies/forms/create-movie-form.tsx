import {Component, createEffect, createMemo, Show} from "solid-js";
import {useSubmission} from "@solidjs/router";
import {addMovie} from "~/lib/movies";
import {TextField, TextFieldErrorMessage, TextFieldInput} from "~/components/ui/text-field";
import {Button} from "../../ui/button";

type PROPS = {}

const CreateMovieForm: Component<PROPS> = props => {
    const submission = useSubmission(addMovie);
    createEffect(() => {
        if (submission.pending) console.log(submission.result, "error", submission.result, "result");
    });

    const results = createMemo(() => {
        return submission.result
    })
    return (
        <>
            <form class={'space-y-4'} action={addMovie} method="post">
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
                    <Button as={"button"} variant={'default'} type={"submit"}>Add Movie</Button>
                    <Button as={"A"} href={'/'} variant={'secondary'} type={"button"}>Go Back</Button>
                </div>
            </form>
        </>
    );
};

export default CreateMovieForm;