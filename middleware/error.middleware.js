const errorMiddleware=(err,req,res,next)=>{
    try{
        let error={...err}
        error.message=err.message;
        if(err.message==="casterror"){
            res.status(404).json({
                success:false,
                message:"resource is not found"
            })
        }

        if(err.message===11000){
            res.status(400).json({
                success:false,
                message:"dulpicate  field value entered "
            })
        }

        if(err.message===validationerror){
            res.status(401).json({
                success:false,
                message:"validation failed"
            })
        }
        
        res.status(500).json({
            success:false,
            messsage:"server error"
        })
        
    }
    catch(error){
        next(error)
    }
}
export default errorMiddleware;