import Result from "../models/resultModel.js";
export async function createResult(req,res){
    try{
        if(!req.user || !req.user.id){
            return res.status(401).json({
                success:false,
                message:"Not authorized"
            })
        }
        const {title,technology,level,totalQuestions,correct,wrong}= req.body;
        if(!technology||!level||totalQuestions ==undefined || correct==undefined){
            return res.status(400).json({
                success:false,
                message:"Missing fields"
            })
        }

        //compute wrong
        const computedWromg = wrong!==undefined?Number(wrong):Math.max(0,Number(totalQuestions)-Number(correct));
        if(!title){
            return res.status(400).json({
                success:false,
                messgae:"Title is missing"
            })
        }
        const payload = {
            title:String(title).trim(),
            technology,
            level,
            totalQuestions:Number(totalQuestions),
            correct:Number(correct),
            wrong:computedWromg,
            user:req.user.id
        };
        
        // Calculate score and performance
        const total = Number(totalQuestions) || 0;
        const correctCount = Number(correct) || 0;
        payload.score = total ? Math.round((correctCount/total)*100) : 0;
        
        if(payload.score >= 85) payload.performance = 'Excellent';
        else if(payload.score >= 65) payload.performance = 'Good';
        else if(payload.score >= 45) payload.performance = 'Average';
        else payload.performance = 'Needs Work';
        
        const created = await Result.create(payload);
return res.status(201).json({
    success:true,
    message:"Result created",
    result:created
})


    }catch(error){
            console.error("Create Result error",error);
            return res.status(500).json({
                success:false,
                message:"Server Error"
            })
    }
}


//List the result

export async function listResult(req,res){
    try {
        if(!req.user ||  !req.user.id){
            return res.status(400).json({
                success:false,
                message:"User not Authorized"
            })
            
        }
        const {technology}= req.query;
        const query= {user:req.user.id};
        if(technology && technology.toLowerCase()!=='all'){
            query.technology= technology;
        }
        const items = (await Result.find(query)).sort({createdAt: -1}).lean();
        return res.json({
            success:true,
            result:items
        })


    } catch(error){
            console.error("List Result error",error);
            return res.status(500).json({
                success:false,
                message:"Server Error"
            })
    }
}