import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {
    AccordionModule,
    InputNumberModule,
    InputSelectModule,
    InputTextModule,
    InputCheckboxModule,
    InputEmailModule,
    DataGridModule,
    InputDateModule,
    InputTextAreaModule,
    InputRadioModule,
    PlantTreeModule,
    MessageBoxModule,
    SwitchListModule,
    DropdownMenuModule,
    ModalDialogModule,
    BusyIndicatorModule,
    NotificationWrapperModule, MenuTabModule, ButtonModule
} from '@secb/sbtcgc';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AccordionModule,
        BusyIndicatorModule,
        ButtonModule,
        DataGridModule,
        DropdownMenuModule,
        InputNumberModule,
        InputTextModule,
        InputSelectModule,
        InputCheckboxModule,
        InputEmailModule,
        InputTextAreaModule,
        InputRadioModule,
        InputDateModule,
        MessageBoxModule,
        MenuTabModule,
        ModalDialogModule,
        NotificationWrapperModule,
        PlantTreeModule,
        SwitchListModule],
    declarations: [],
    providers: [],
    exports: [
        AccordionModule,
        ButtonModule,
        BusyIndicatorModule,
        DataGridModule,
        DropdownMenuModule,
        InputNumberModule,
        InputTextModule,
        InputSelectModule,
        InputCheckboxModule,
        InputEmailModule,
        InputTextAreaModule,
        InputRadioModule,
        InputDateModule,
        MessageBoxModule,
        MenuTabModule,
        ModalDialogModule,
        NotificationWrapperModule,
        PlantTreeModule,
        SwitchListModule]
})
export class UiLibExtModule {
}
