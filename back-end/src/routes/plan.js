import express from "express";

import PlanGet from "#controllers/plan/PlanGet";
import PlanGetAll from "#controllers/plan/PlanGetAll";
import PlanCreate from "#controllers/plan/PlanCreate";
import PlanUpdate from "#controllers/plan/PlanUpdate";
import PlanDelete from "#controllers/plan/PlanDelete";

const Plan = express.Router();

Plan.get("/", PlanGet);
Plan.get("/all", PlanGetAll);
Plan.put("/create", PlanCreate);
Plan.put("/update", PlanUpdate);
Plan.delete("/delete", PlanDelete);

export default Plan;
 