import { RecipientDTO } from "./recipient.model";
import { StrennaDTO } from "./strenna.model";
import { StrennaResponseDTO } from "./strennaResponse.model";

export interface ExtendedStrennaResponseDTO{
    recipient: RecipientDTO;
    strenna: StrennaDTO;
    strennaResponse: StrennaResponseDTO;
}
