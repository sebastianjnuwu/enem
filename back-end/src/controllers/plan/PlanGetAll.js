import { logger } from "#services/logger";
import prisma from "#db/prisma";

const PlanGetAll = async (req, res) => {
  
  try {
    
    const plans = await prisma.plan.findMany({
      orderBy: { id: "desc" } 
    });

    return res.status(200).json({
      status: true,
      plans
    });

  } catch (err) {
    logger.error(`(ROUTE:PLAN:GET): ${err.message}`);
    return res.status(500).json({
      status: false,
      error: err.message
    });
  }
};

export default PlanGetAll;