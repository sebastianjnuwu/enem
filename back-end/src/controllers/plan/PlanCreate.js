import { logger } from "#services/logger";
import prisma from "#db/prisma";
import Joi from "joi";

const PlanCreate = async (req, res) => {
  try {
    const schema = Joi.object({
      UID: Joi.string().required(),
      name: Joi.string().min(3).required(),
      content: Joi.string().allow(null, ""),
      always: Joi.boolean().default(false),
      price: Joi.number().positive().required(),
      EXPIRED: Joi.string().allow(null, ""),
      HAS_THEMES: Joi.boolean().default(false),
      HAS_CLASSES: Joi.boolean().default(false),
      TYPE_CLASS: Joi.string().allow(null, ""),
      HAS_MATERIALS: Joi.boolean().default(false),
      HAS_CORRECTION: Joi.boolean().default(false),
      QUANTITY_CORRECTION: Joi.number().integer().min(0).default(0),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: false,
        error: error.details[0].message,
      });
    }

    const user = await prisma.User.findUnique({ where: { uid: value.UID } });

 /*   if (user?.role !== "ADMIN") {
      return res.status(403).json({
        status: false,
        error: "Acesso negado!",
      });
    }
*/
const { UID, ...data } = value;

const plan = await prisma.plan.create({
  data: {
    ...data,
  }
});

    return res.status(201).json({
      status: true,
      plan,
    });

  } catch (err) {
    logger.error(`(ROUTE:PLAN:CREATE): ${err.message}`);
    return res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};

export default PlanCreate;