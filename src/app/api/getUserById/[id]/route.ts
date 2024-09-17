import {NextResponse} from "next/server";
import {createClient} from "@/utils/supabase/server";
export  async function GET(request: Request, context: any){
    const {params} = context
    const userId = params.id
    const supabase = createClient();
    let {data} = await supabase
        .from('users')
        .select()
        .eq('id', userId);

    return NextResponse.json({
        user: data && data[0]
    })
}