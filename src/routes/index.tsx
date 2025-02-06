import {lazy} from "solid-js";
import {RouteSectionProps} from "@solidjs/router";
import {Button} from "~/components/ui/button";

const AppLayout = lazy(() => import("~/components/layouts/app-layout"));


export default function Home(props: RouteSectionProps) {

    return (
        <AppLayout {...props}>
            <main class="text-center mx-auto p-4">
                <h1 class="max-6-xs text-6xl text-red-7 font-thin uppercase my-16">
                    SS FE
                </h1>
                <Button variant={'outline'} size={'lg'}>
                    Test
                </Button>
            </main>
        </AppLayout>
    );
}
