import { auth } from "#services/firebase";
import prisma from "#db/prisma";
import Joi from "joi";

const UserLogin = async (req, res) => {

  try {

  const { error, value } = Joi.object({
    id: Joi.string().required(),
  }).validate(req.body);

  if (error) {
    return res.status(400).json({
      status: false,
      error: error.details[0].message,
    });
  };
  
  const { uid, name, picture, email } = await auth.verifyIdToken(value.id);

  let user = await prisma.User.findUnique({
    where: { uid },
  });

  if (!user) {
    user = await prisma.User.create({
      data: { uid, email, name, picture },
    });
  };
     
   user = await prisma.User.update({
     where: { uid },
     data: { name, picture },
   });
  
  console.log(user)
  return res.status(200).json(user);
    
  } catch (err) {
    return res.status(401).json({ 
      status: false,
      message: err.message 
    });
  }
};

export default UserLogin;