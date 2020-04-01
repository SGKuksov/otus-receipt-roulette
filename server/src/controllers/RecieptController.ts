import {Reciept} from "../models/Reciept";
import mongoose from "mongoose";

class RecieptController {
  private upload: any;

  constructor() {
  }

  async getRecieptList() {
    const query = {};

    return await Reciept.find(query).lean();
  }

  async createReciept(data: Reciept) {
    const reciept = new Reciept({
      ...data,
    });

    await reciept.save();
  }

  async checkExist(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        isValid: false,
        error: 'They didn\'t send an object ID'
      };
    }

    const isExist = await Reciept.exists({_id: id})

    if (!isExist) {
      return {
        isValid: isExist,
        error: 'No such post'
      };
    }

    return {
      isValid: isExist,
    }
  }

  async getReciept(id: string) {
    return await Reciept.findById(id).lean();
  }

  async updateReciept(id: string, data: Reciept) {
    let error = null;
    const update = {
      ...data
    };

    const res = await Reciept.findOneAndUpdate({_id: id}, update, {
      new: true,
      upsert: true,
    }).catch(e => {
      console.log('error', e);

      error = {
        code: e.code,
        msg: e.errmsg,
      };
    });
  }

  async deleteReciept(id: string) {
    await Reciept.findByIdAndDelete(id);
  }

}

export default RecieptController;
