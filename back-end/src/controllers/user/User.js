import prisma from "#db/prisma";
import Joi from "joi";

const User = async (req, res) => {
  
  try {
    
  const { error, value } = Joi.object({
    UID: Joi.string().required(),
  }).validate(req.query);

  if (error) {
    return res.status(400).json({
      status: false,
      error: error.details[0].message,
    });
  };

  const user = await prisma.user.findUnique({ where: { uid: value.UID }
  });
    
  if (!user) return res.status(404).json({ 
    status: false, 
    message: 'Usuário não encontrado'
  });

    return res.json(user);
  } catch (err) {
    return res.status(500).json({
      status: false, 
      message: err.message
    });
  }
  
}; 

export default User;