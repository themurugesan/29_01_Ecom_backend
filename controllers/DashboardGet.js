const Image = require("../models/product");
const Userschemadb = require("../models/user");

async function DashboardGet(req,res) {
    try {
        
              const images = await Image.find();
          
              const user = req.user;
          
          
          
              if (!user || !user.email) {
                return res.status(400).send({ message: "User information is missing" });
              }
          
              const check = await Userschemadb.findOne({ email: user.email });
              console.log(check, "for cart display");
          
              if (check) {
                console.log(check.notify, "check notify");
                const productIdsNotify = check.notify.map(item => item._id.toString());
          
               
                const validProducts = images.filter(product => 
                  productIdsNotify.includes(product._id.toString())
                );
                console.log(validProducts,"its presented in notify")
                if(validProducts){
                    return res.status(200).send({images,valid:validProducts})
                }

          
                return res.status(200).send(images) 
              } else {
                return res.status(404).send({ message: "User not found" });
              }
          
            //   res.json(images);
           
              
            
    } catch (error) {
        console.error("Error fetching images:", error);
              res.status(200).send({ message: "Error fetching images", code:401 });
    }
    
}

module.exports=DashboardGet