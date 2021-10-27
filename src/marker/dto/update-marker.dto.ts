import { PartialType } from '@nestjs/mapped-types';
import { CreateMarkerDto } from './create-marker.dto';

export class UpdateMarkerDto extends PartialType(CreateMarkerDto) {
    id: Number;
    name: String;
    latitude: Number;
    longitude: Number;
    recycleTypeName: Array<String>;
    marker_color: String;
    description: String;
    icon: String;
    createdBy: Number;
}
