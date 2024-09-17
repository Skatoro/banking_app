import {Metadata} from "next";
import Auth from "@/components/screens/auth/Auth";
import {getAuthUser} from "@/api/api";
import {redirect} from "next/navigation";
export const metadata: Metadata = {
    title: '',
}

export default async function LoginPage() {
    const user = await getAuthUser();
    if (user) redirect('/');
    return <Auth type={'Login'}/>
}
