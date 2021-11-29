import { ApiProperty } from "@nestjs/swagger";
import { RecycleType } from "../entities/recycleType.entity";

export class CreateMarkerDto {
    @ApiProperty()
    readonly name: String;
    @ApiProperty()
    readonly latitude: Number;
    @ApiProperty()
    readonly longitude: Number;
    @ApiProperty({type: RecycleType})
    readonly type: RecycleType;
    @ApiProperty()
    readonly createdBy: Number;
}
