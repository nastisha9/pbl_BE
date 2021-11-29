import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export class RecycleType extends Document{
    @ApiProperty()
    id: String;
    @ApiProperty()
    marker_color: String;
    @ApiProperty()
    label: String;
    @ApiProperty()
    description: String;
}
