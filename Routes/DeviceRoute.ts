import { Router } from "express";
import {
  findOneDevice,
  getAllDevice,
  postTicket,
  querySearch,
  updateDevice,
} from "../controller/DeviceController";

const deviceRouter = Router();

deviceRouter.route("/postdevice").post(postTicket);
deviceRouter.route("/getAllDevice").get(getAllDevice);
deviceRouter.route("/findOne/:deviceId").get(findOneDevice);
deviceRouter.route("/search").get(querySearch);
deviceRouter.route("/update/:id").patch(updateDevice);

export default deviceRouter;
