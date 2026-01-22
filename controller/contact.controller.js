import contact from "../model/contact.model.js";
// export const getcontacts=async(req,res,next)=>{
//     try{
//         const contacts=await contact.find();
//         res.status(200).json({
//             success:true,
//             data:contacts,
//         })
//     }
//     catch(error){
//         next(error);
//     }
// }
 

// req.query is used for search
export const getcontacts = async (req, res, next) => {
  try {
    const { name, email, phone_number } = req.query;

    // Build a dynamic filter
    const filter = {};
    if (name) {
      // Search by name, email, or phone number 
      filter.$or = [
        { name: { $regex: name, $options: "i" } },
        { email: { $regex: name, $options: "i" } },
        { phone_number: { $regex: name, $options: "i" } },
      ];
    }

    const contacts = await contact.find(filter);
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};




export const getcontact=async(req,res,next)=>{
    try{
       const contactss= await contact.findById(req.params.id)
       if(!contactss){
        res.status(404).json({
            success:false,
            message:"user not found"
        })
       }
        res.status(200).json({
            success:true,
            data:contactss
        })
    }
    catch(error){
        next(error);
    }
}
export const counts = async (req, res, next) => {
  try {
    const total = await contact.countDocuments(); // total contacts
    const active = await contact.countDocuments({ Active: true }); // active contacts
    const inactive = await contact.countDocuments({ Active: false }); // inactive contacts

    // contacts added this month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const thisMonth = await contact.countDocuments({ createdAt: { $gte: startOfMonth } });

    res.status(200).json({
      success: true,
      data: {
        total,
        active,
        inactive,
        thisMonth
      }
    });
  } catch (error) {
    next(error);
  }
};

export const createcontact=async(req,res,next)=>{
    try{
        const {name,phone_number,email,gender}=req.body;
     const image = req.file ? req.file.filename : null;

        const creates=await contact.create({name,phone_number,email,gender,image});
        res.status(200).json({
            success:true,
            data:creates
        })
    }
    catch(error){
        next(error);
    }
}


export const updatecontact=async(req,res,next)=>{
    try{
        const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename; // save only filename
    }
      const update=await contact.findByIdAndUpdate(req.params.id,updateData, { new: true });
      res.status(200).json({
        success:true,
        message: "successfully updated",
        data:update
      })
    }
    catch(error){
        next(error);
    }
}



export const deletecontact=async(req,res,next)=>{
    try{
     const del=await contact.findByIdAndDelete(req.params.id);
     res.status(200).json({
        success:true,
        data:del
     })
    }
    catch(error){
        next(error);
    }
}