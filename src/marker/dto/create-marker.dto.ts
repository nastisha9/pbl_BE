import { ApiProperty } from "@nestjs/swagger";

export class CreateMarkerDto {
    @ApiProperty()
    readonly name: String;
    @ApiProperty()
    readonly latitude: Number;
    @ApiProperty()
    readonly longitude: Number;
    @ApiProperty()
    // readonly recycleTypeNames: String;
    // @ApiProperty()
    // readonly marker_color: String;
    // @ApiProperty()
    // readonly description: String;
    // @ApiProperty()
    // readonly icon: String;
    // @ApiProperty()
    readonly createdBy: Number;
}
