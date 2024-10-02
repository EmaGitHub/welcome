export const displayedColumns = [
    {
        display: 'destinatario',
        attribute: 'receiver', flex: '1.5'
    },
    {
        display: 'id-strenna',
        attribute: 'id-strenna', flex: '1.5'
    },
    {
        display: 'direttore',
        attribute: 'director', flex: '1'
    },
    {
        display: 'mittente',
        attribute: 'sender', flex: '3', multiple: true
    },
    {
        display: 'data di arrivo',
        attribute: 'date-of-receipt', flex: '3', multiple: true
    },
    {
        display: 'stato',
        attribute: 'status', flex: '3', multiple: true
    },

    { display: '', attribute: 'icons', type: 'icons', flex: '2.5' },

];

export const displayedColumnsUser = [
    {
        display: 'id-strenna',
        attribute: 'id-strenna', flex: '1.5'
    },
    {
        display: 'mittente',
        attribute: 'sender', flex: '3', multiple: true
    },
    {
        display: 'data di arrivo',
        attribute: 'date', flex: '3', multiple: true
    },
    {
        display: 'deperibile',
        attribute: 'perisheable', flex: '1'
    },
    {
        display: 'stato',
        attribute: 'status', flex: '3', multiple: true
    },

    { display: '', attribute: 'icons', type: 'icons', flex: '2.5' },

];

export const showedColumns = ['checkbox', 'name', 'id_strenna', 'is_director_or_board', 'sender', 'date', 'status', 'icons'];
export const showedColumnsUser = [
    'id_strenna', 
    'sender', 
    'date', 
    'perisheable', 
    'bulky',
    'status', 
    'icons'
];
