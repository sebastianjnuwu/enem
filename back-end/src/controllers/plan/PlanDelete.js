import { logger } from "#services/logger";
import prisma from "#db/prisma";
import Joi from "joi";

const PlanDelete = async (req, res) => {

  try {

    const { error, value } = Joi.object({
      id: Joi.number().required(),
      UID: Joi.string().required(),
    }).validate(req.query);

    if (error) {
      return res.status(400).json({
        status: false,
        error: error.details[0].message
      });
    }

    const { id, UID } = value;

    const user = await prisma.user.findUnique({ where: { uid: UID } });
    /*  
      if (user?.role !== "ADMIN") {
        return res.status(403).json({
          status: false,
           error: "Acesso negado!",
        });
      }*/

    const plan = await prisma.plan.findUnique({ where: { id } });

    if (!plan) {
      return res.status(404).json({
        status: false,
        error: `Plano com id ${id} não encontrado`
      });
    }

    await prisma.plan.delete({ where: { id } });

    return res.status(200).json({
      status: true,
      message: `O plano "${plan.name}" foi deletado.`
    });

  } catch (err) {
    logger.error(`(ROUTE:PLAN:DELETE): ${err.message}`);
    return res.status(500).json({
      status: false,
      error: err.message
    });
  }
};

export default PlanDelete;