import {NextResponse} from "next/server";
import {createClient} from "@/utils/supabase/server";
export async function GET(request: Request, context: any) {
    const {params} = context
    const cardId = params.id
    const supabase = createClient();
    let {data} = await supabase.from('credit_cards')
        .select()
        .eq('id', cardId)
        .select()

    return NextResponse.json({data: data})
}