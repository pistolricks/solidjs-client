import {Component, createEffect, createSignal, For} from "solid-js";
import {Button} from "~/components/ui/button";
import {MagnifyingGlass, MapPin} from "~/components/svg";


type PROPS = {
    background_images: string[]
}

const HomeSection: Component<PROPS> = props => {

    const [currentIndex, setCurrentIndex] = createSignal(0)

    const images: () => string[] = () => props.background_images as string[];

    createEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((p) => (p + 1) % images().length)
        }, 5000)
        return () => clearInterval(interval)
    })

    return (
        <div class={'h-full w-full'}>
            <For each={images()}>
                {(image: string, index) => (
                    <div class={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        index() === currentIndex() ? "opacity-100" : "opacity-0"
                    }`}
                    >
                        <img src={image} alt={`Hero background ${index() + 1}`}
                             class="w-full h-full object-cover"/>
                    </div>
                )}
            </For>
            <div class="absolute inset-0 bg-black/50 z-10"/>
            <div
                class="relative z-20 container mx-auto h-full flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 space-y-6">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-pretty text-center">
                    {import.meta.env.VITE_WELCOME_TITLE}
                </h1>
                <p class="text-lg md:text-xl lg:text-2xl text-gray-200 text-center text-balance">
                    {import.meta.env.VITE_WELCOME_SUBTITLE}
                </p>
                <div class="w-full max-w-xl">
                    <div class="relative">
                        <MapPin class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"/>
                        <input
                            id={'search-1'}
                            type="search"
                            placeholder="Search..."
                            class="pl-12 pr-16 py-3 w-full rounded-full bg-white/90 focus:bg-white shadow-lg"
                        />
                        <div class="absolute right-1 top-1/2 -translate-y-1/2 flex">
                            <Button size="icon" class={'rounded-full'}>
                                <MagnifyingGlass class="w-6 h-6 p-1 text-blue-400"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSection;