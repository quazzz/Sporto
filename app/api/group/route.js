import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()
export async function POST(req){
    const {namer,id} = await req.json()
    if(!namer || !id){
        return new Response(JSON.stringify({message:'All fields must be fullfilled'}),{
            status: 500,
            headers: {'Content-Type' : 'application/json'}
        })
    }
    const group = await prisma.group.create({
        data: {
            name: namer,
            userId: id
        }
    })
    return new Response(JSON.stringify({message:'All ok'}),{
        status: 200,
        headers: {'Content-Type' : 'application/json'}
    })


} 

export async function GET(req){
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if(!userId){
        return new Response(JSON.stringify({message: 'No auth'}),{
            status:500,
            headers: {'Content-Type' : 'application/json'}
        })
    }
    try{
        const groups = await prisma.group.findMany({
            where:{
                userId: userId
            }
        })
        return new Response(JSON.stringify(groups),{
            status:200,
            headers: {'Content-Type' : "application/json"}
        })
    }
    catch(err){
        console.error(err)
    }
}