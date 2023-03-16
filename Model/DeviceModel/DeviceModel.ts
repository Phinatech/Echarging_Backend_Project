/** @format */

import mongoose from "mongoose";
import { Idevice } from "../../interface/DeviceInterface";

interface device extends Idevice, mongoose.Document {}

const deviceSchema = new mongoose.Schema<Idevice>(
  {
    ticketNumber: {
      type: String,
      required: [true, "TicketNumber is Required"],
      lowercase: true,
      trim: true,
    },
    ticketPosition: {
      type: String,
      required: [true, "TicketPosition is Required"],
      lowercase: true,
      trim: true,
    },
    collected: {
      type: Boolean,
      default: false,
    },
    deviceDetails: {
      type: String,
    },
    pORb: {
      type: String,
    },
    deviceType: {
      type: String,
    },
    numberOfDeviceBrought: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<device>("deviceSchemaECharging", deviceSchema);
