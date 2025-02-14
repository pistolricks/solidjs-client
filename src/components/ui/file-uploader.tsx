import {Component, createEffect, createSignal, JSX, Show} from "solid-js";
import {getContents, uploadFileHandler} from "~/lib/contents";
import {Button} from "~/components/ui/button";
import {UploadCloud, XMark} from "~/components/svg";
import {showToast} from "~/components/ui/toast";
import Dialog from "@corvu/dialog";
import {revalidate} from "@solidjs/router";


type PROPS = {}

const FileUploader: Component<PROPS> = props => {

    const [getRef, setRef] = createSignal<HTMLFormElement | undefined>()

    const [getImageUrl, setImageUrl] = createSignal<string | undefined>()


    const handleInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (event) => {
        console.log("ImageInput Input changed to", event.currentTarget.value)
        const imageUrl = URL.createObjectURL(event.currentTarget.files?.item(0) as File)
        setImageUrl(imageUrl)
    }

    const onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        // handle form submission.
        const formData = new FormData(getRef());
        const src: FormDataEntryValue[] = formData.getAll("src");
        console.log(src)
        let res: any = await uploadFileHandler(src)


        getRef()?.reset()
        setImageUrl(undefined)

        if (res?.error) {
            showToast({
                variant: "error",
                title: "Error",
                description: res?.error
            })
        }

        await revalidate(getContents.keyFor(), true);

    };

    createEffect(() => {
        console.log(getImageUrl())

    })

    return (

        <form ref={setRef} onSubmit={onSubmit}>
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <div class="mt-2 sm:col-span-3 sm:mt-0">
                    <div
                        class="flex max-w-2xl justify-center rounded-lg bg-white border border-dashed border-gray-9/25 hover:border-gray-9 px-6 py-10">
                        <div class="text-center">
                            <Show
                                fallback={
                                    <svg class="mx-auto size-12 text-gray-6" viewBox="0 0 24 24" fill="currentColor"
                                         aria-hidden="true" data-slot="icon">
                                        <path fill-rule="evenodd"
                                              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                }
                                when={getImageUrl()}>
                                <img src={getImageUrl()} class={'h-72 w-full object-contain'} alt={""}/>
                            </Show>
                            <div class="mt-4 flex text-sm/6 text-gray-11/80">
                                <label for="src"
                                       class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-11/80 focus-within:outline-hidden  hover:text-indigo-6">
                                    <span>Upload a file</span>
                                    <input id="src" name="src" type="file"
                                           onInput={handleInput}
                                           class="sr-only"/>
                                </label>
                                <p class="pl-1">or drag and drop</p>
                            </div>
                            <p class="text-xs/5 text-gray-11/70">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class={'items-center flex flex-row-reverse space-x-4 space-x-reverse py-3'}>
                <Dialog.Close contextId={'albd1'} class={''}>
                    <Button as={"button"} variant={'default'} class={'bg-white'} size={"icon"}
                            type={"submit"}><UploadCloud class={'stroke-sky-11 p-1 size-12 fill-sky-2'}/></Button>
                </Dialog.Close>
                <Dialog.Close contextId={'albd1'} class={''}>
                    <Button as={"button"} variant={'default'} class={'bg-white'} size={"icon"} type={"button"}><XMark class={'size-12 p-1.5 stroke-sky-11'}/></Button>
                </Dialog.Close>
            </div>
        </form>
    )
};

export default FileUploader;