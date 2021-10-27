import { Document } from "mongoose";

export class RecycleType extends Document{
    id: {type: Number, unique:true};
    label: Array<String>;
    marker_color: String;
    description: String;
    icon: String;
}
