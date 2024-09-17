import Activity from "@/components/layout/activity/Activity";
import {getAuthUser} from "@/api/api";
import {redirect} from "next/navigation";

export default async function ActivityPage() {
    const user = await getAuthUser();
    if (!user) redirect('/signin')

    return (
        <div className={'w-full max-w-338 rounded-3xl bg-white dark:bg-bang mb-5 flex'}>
            <div className={'p-10 w-full flex flex-col'}>
                <h2 className={'mb-5 '}>Activities</h2>
                <Activity/>
            </div>
        </div>
    )
}
