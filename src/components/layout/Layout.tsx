import {PropsWithChildren} from "react";
import {Header} from "@/components/layout/header/Header";
import MainProvider from "./MainProvider";

export default async function LayoutClient({children}: PropsWithChildren<unknown>){

    return (
        <MainProvider>
            <main className={'h-screen flex flex-col overflow-y-scroll text-black dark:text-white'}>
                <Header/>
                <section>
                    {children}
                </section>
            </main>
        </MainProvider>
    )
}