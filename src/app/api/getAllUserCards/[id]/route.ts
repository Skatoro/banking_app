import {NextResponse} from "next/server";
import {createClient} from "@/utils/supabase/server";

export async function GET(request: Request, context: any) {
    const {params} = context
    const userId = params.id
    const supabase = createClient();
    let {data} = await supabase.from('credit_cards')
        .select()
        .match({
            'user_id': userId,
            'blocked': false,
        })
        .order('created_at', {ascending: true});

    return NextResponse.json({data: data})
}