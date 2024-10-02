import { Profile } from "./profile.model";

export interface StrenneProfile extends Profile {
    receiver_fullname?: string;
    receiver_name?: string;
    receiver_surname?: string;
    receiver_id?: string;
    sender?: string;
    sender_matricola?: string;
}