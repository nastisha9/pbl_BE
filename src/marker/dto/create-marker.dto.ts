export class CreateMarkerDto {
    name: String;
    latitude: Number;
    longitude: Number;
    recycleTypeNames: Array<String>;
    marker_color: String;
    description: String;
    icon: String;
    createdBy: Number;
}
