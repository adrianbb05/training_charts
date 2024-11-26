import {SetType} from "../entities/SetType";

export function mapToSetType(set_type: string) {
    switch (set_type) {
        case "failure":
            return SetType.FAILURE
        case "dropset":
            return SetType.DROPSET
        case "warmup":
            return SetType.WARMUP
        default:
            return SetType.NORMAL
    }
}
