import {Metadata} from "next";
import Auth from "@/components/screens/auth/Auth";
import {redirect} from "next/navigation";
import {getAuthUser} from "@/api/api";
export const metadata: Metadata = {
    title: '',
}

export default async function SignupPage() {
    const user = await getAuthUser();
    if (user) redirect('/');
    return <Auth type={'Register'}/>
}
