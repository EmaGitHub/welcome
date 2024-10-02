export interface StrennaResponseDTO{
    id_response?: number;
    id_strenna?: number;
    handling?: string;
    delegate?: string;
    delegate_name?: string;
    delegate_surname?: string;
    delegate_mail?: string;
    withdrawal_date?: string; 
    withdrawal_hour?: string; 
    actual_withdrawal_date?: string; 
    user_id_withdrawal_strenna?: string;   
    user_name_withdrawal_strenna?: string;
    user_surname_withdrawal_strenna: string;
}