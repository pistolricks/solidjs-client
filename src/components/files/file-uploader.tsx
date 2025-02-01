import {Component, createSignal} from "solid-js";
import {uploadFileHandler} from "~/lib/contents";
import {Button} from "~/components/ui/button";
import {ChevronLeft} from "~/components/users/forms/login-user-form";


type PROPS = {}

const FileUploader: Component<PROPS> = props => {


    let formRef: HTMLFormElement | undefined;
    const [getRef, setRef] = createSignal<HTMLFormElement | undefined>()
    const onSubmit = async (e: SubmitEvent) => {
        // handle form submission.
        const formData = new FormData(getRef());
        const src: FormDataEntryValue[] = formData.getAll("src");
        console.log(src)
        await uploadFileHandler(src)
    };


    return (

        <form ref={setRef} onSubmit={onSubmit}>
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <div class="mt-2 sm:col-span-3 sm:mt-0">
                    <div
                        class="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-9/25 hover:border-gray-9 px-6 py-10">
                        <div class="text-center">
                            <svg class="mx-auto size-12 text-gray-3" viewBox="0 0 24 24" fill="currentColor"
                                 aria-hidden="true" data-slot="icon">
                                <path fill-rule="evenodd"
                                      d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                      clip-rule="evenodd"/>
                            </svg>
                            <div class="mt-4 flex text-sm/6 text-gray-6">
                                <label for="src"
                                       class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-5/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-6 focus-within:ring-offset-2 hover:text-indigo-6">
                                    <span>Upload a file</span>
                                    <input id="src" name="src" type="file" class="sr-only"/>
                                </label>
                                <p class="pl-1">or drag and drop</p>
                            </div>
                            <p class="text-xs/5 text-gray-6">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class={'flex justify-end space-x-2'}>
                <Button as={"A"} href={'/vendors'} variant={'secondary'} size={"icon"}
                        type={"button"}><ChevronLeft/></Button>
                <Button as={"button"} variant={'default'} type={"submit"}>Upload Image</Button>
            </div>
        </form>
    )
};

export default FileUploader;