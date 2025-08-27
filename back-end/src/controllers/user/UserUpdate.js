import { logger } from "#services/logger";
import prisma from "#db/prisma";
import Joi from "joi";

const UserUpdate = async (req, res) => {

  try {

    const { error, value } = Joi.object({
      uid: Joi.string().required(),
      name: Joi.string().min(2).max(100).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(/^\+?[0-9]{8,15}$/).optional().allow("")
    }).validate(req.body);

    if (error) {
      console.log(error.details[0].message)
      return res.status(400).json({
        status: false,
        error: error.details[0].message
      });
    };

    const { uid, name, email, phone } = value;

    const USER_EXIST = await prisma.User.findUnique({
      where: { uid }
    });

    if (!USER_EXIST) {
      return res.status(404).json({
        status: false,
        error: "Usuário não encontrado"
      });
    }

    const update = await prisma.User.update({
      where: { uid },
      data: { name, email, phone },
    });

    return res.status(201).json({
      status: true,
      user: update
    });

  } catch (err) {
    logger.error(`(ROUTE:USER:UPDATE): ${err.message}`);
    return res.status(500).json({
      status: false,
      error: err.message
    });
  }
};

export default UserUpdate;