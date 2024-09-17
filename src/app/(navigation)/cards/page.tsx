import DetailedCards from "@/components/layout/cards/DetailedCards";
import {getAuthUser} from "@/api/api";
import {redirect} from "next/navigation";

export default async function CardsPage() {
    const user = await getAuthUser();
    if (!user) redirect('/signin')

    return (
        <div className={'w-full max-w-338 rounded-3xl bg-white dark:bg-bang mb-5 flex'}>
            <div className={'p-10 w-full '}>
                <h2 className={'mb-5 '}>All Cards</h2>
                <DetailedCards/>
            </div>
        </div>
    )
}
