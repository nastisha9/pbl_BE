import { ApiProperty } from "@nestjs/swagger";


export class UpdateMarkerDto{
    @ApiProperty()
    readonly name: String;
    @ApiProperty()
    readonly latitude: Number;
    @ApiProperty()
    readonly longitude: Number;
    @ApiProperty()
    // readonly recycleTypeNames: Array<String>;
    // @ApiProperty()
    // readonly marker_color: String;
    // @ApiProperty()
    // readonly description: String;
    // @ApiProperty()
    // readonly icon: String;
    // @ApiProperty()
    readonly createdBy: Number;
}
