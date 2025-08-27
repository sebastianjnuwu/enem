import { logger } from '#services/logger';
import prisma from '#db/prisma';
import Joi from 'joi';

const PlanGet = async (req, res) => {

  try {

    const { error, value } = Joi.object({
      id: Joi.number().integer().positive().required()
    }).validate(req.query);

    if (error) {
      return res.status(400).json({ status: false, error: error.message });
    }

    const plan = await prisma.plan.findUnique({
      where: { id: value.id }
    });

    if (!plan) {
      return res.status(404).json({
        status: false,
        error: 'Plano não encontrado'
      });
    }

    return res.status(201).json({ 
      status: true,
      plan
    });

  } catch (err) {
    return res.status(500).json({ 
      status: false,
      error: err.message
    });
  };
};

export default PlanGet;