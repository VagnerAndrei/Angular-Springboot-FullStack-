import { FormControl, FormGroup } from "@angular/forms";

export function markAllControlsAsDirty(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        control.markAsDirty({ onlySelf: true });
    });
}

export function markAllControlsAsDirty2(form: FormControl) {
    Object.keys(form).forEach(field => {
        const control = form.get(field);
        control.markAsDirty({ onlySelf: true });
    });
}