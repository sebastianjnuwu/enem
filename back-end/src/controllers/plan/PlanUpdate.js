import { logger } from "#services/logger";
import prisma from "#db/prisma";
import Joi from "joi";

const PlanUpdate = async (req, res) => {
  
  try {
    
    const { error, value } = Joi.object({
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
    }).validate(req.body);

    if (error) {
      return res.status(400).json({
        status: false,
        error: error.details[0].message,
      });
    }

    const id = Number(req.query.id);
    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: false,
        error: "ID inválido para atualização.",
      });
    }

    const existingPlan = await prisma.plan.findUnique({ where: { id } });
    
    if (!existingPlan) {
      return res.status(404).json({
        status: false,
        error: "Plano não encontrado.",
      });
    }

    // verificar usuário (comentado, igual create)
    /*
    const user = await prisma.User.findUnique({ where: { uid: value.UID } });
    if (user?.role !== "ADMIN") {
      return res.status(403).json({
        status: false,
        error: "Acesso negado!",
      });
    }
    */

    const { UID, ...data } = value;

    const updated = await prisma.plan.update({
      where: { id },
      data,
    });

    return res.status(200).json({
      status: true,
      updated,
    });

  } catch (err) {
    logger.error(`(ROUTE:PLAN:UPDATE): ${err.message}`);
    return res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};

export default PlanUpdate;