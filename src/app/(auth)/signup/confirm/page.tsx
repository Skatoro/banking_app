import {Metadata} from "next";
import ConfirmEmail from "@/components/screens/auth/confirm/ConfirmEmail";
import {getAuthUser} from "@/api/api";
import {redirect} from "next/navigation";
export const metadata: Metadata = {
    title: '',
}

export default async function ConfirmEmailPage() {
    const user = await getAuthUser();
    if (user) redirect('/');
    return <ConfirmEmail />
}
