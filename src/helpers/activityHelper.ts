import { IActivity } from "../app/modules/activity/activity.interface";
import { ActivityService } from "../app/modules/activity/activity.service";
import { User } from "../app/modules/user/user.model";

export async function createActivity(activity: IActivity) {
    const user = await User.findById(activity.user);

    const result = await ActivityService.createAcrivityToDB(activity)
    // @ts-ignore
    const io = global.io;

    io.emit('activity', result);
}