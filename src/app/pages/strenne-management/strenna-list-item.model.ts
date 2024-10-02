export interface StrennaListItem {
    receiver: string;
    idStrenna: string;
    isDirector: string;
    sender: string;
    dateOfReceipt: string;
    status: string;
}


export interface StrennaInfo {
    name: string;
    id_strenna: number;
    is_director_or_board: boolean;
    sender: string;
    date: string;
    status: string;
    is_perisheable?: boolean ;
    is_bulky?: boolean ;
  }