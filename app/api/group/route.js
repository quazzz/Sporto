import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()
export async function POST(req){
    const {namer,id} = await req.json()
    if(!namer || !id){
        return new Response(JSON.stringify({message:'All fields must be fielded in'}),{
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