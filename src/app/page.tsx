import {getAuthUser} from "@/api/api";
import {redirect} from "next/navigation";
import Home from "@/components/layout/home/Home";

export default async function HomePage() {
    const user = await getAuthUser();
    if (!user) redirect('/signin')

    return (
        <div className={'flex w-full max-w-338 '}>
            <Home/>
        </div>
    )
}
