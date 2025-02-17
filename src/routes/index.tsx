import {RouteSectionProps} from "@solidjs/router";
import {Button} from "~/components/ui/button";


export default function Home(props: RouteSectionProps) {

    return (
        <>
            <div class="text-center mx-auto p-4">
                <h1 class="max-6-xs text-6xl text-red-7 font-thin uppercase my-16">
                    SS FE
                </h1>

                <Button variant={'outline'} size={'lg'}>
                    Test
                </Button>
            </div>
        </>
    );
}
