import {FormControl} from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class CustomValidator {
    static startsWithNumber(control: FormControl): ValidationResult {
        if (control !== null) {
            if (control.value !== '') {
                if (!isNaN(control.value.charAt(0))) {
                    return { 'startsWithNumber': true };
                }
            }
        }
        return null;
    }
    static containsSpecialChars(control: FormControl): ValidationResult {
        var pattern = /^[a-zA-Z0-9+/\s(),-]+$/g;
        if (control !== null) {
            if (control.value !== '' && !pattern.test(control.value)) {
                return { 'containsSpecialChars': true };
            }
        }
        return null;
    }

    static containsSpecialCharsWithSpace(control:FormControl):ValidationResult {
        const pattern = /^[a-zA-Z0-9+\\s( ),-,_]+$/g;
        if (control !== null) {
            if (control.value !== '' && !pattern.test(control.value)) {
                return {'containsSpecialCharsWithSpace': true};
            }
        }
        return null;
    }
    static nameValidate(control: FormControl): ValidationResult {
        const pattern = /^[a-z\d\-_\s\\/'().]+$/i;
        if (control !== null) {
            if (control.value !== '' && ! pattern.test(control.value)) {
                return { 'nameValidate': true };
            }
        }
        return null;
    }
    static containsNumbers(control: FormControl): ValidationResult {
        if (control !== null) {
            if (control.value !== '' && isNaN(control.value)) {
                return { 'containsNumbers': true };
            }
        }
        return null;
    }

    static containsDigitsOnly(control: FormControl): ValidationResult {
        const pattern = /^\d+$/;
        if (control !== null) {
            if (control.value !== '' && ! pattern.test(control.value)) {
                return { 'containsDigitsOnly': true };
            }
        }
        return null;
    }

    static alphabetsOnlyValidation(control: FormControl): ValidationResult {
        var pattern = /^[a-zA-Z+]+$/g;
        if (control !== null) {
            if (control.value !== '' && !pattern.test(control.value)) {
                return { 'alphabetsOnlyValidation': true };
            }
        }
        return null;
    }

    static maxLength(control: FormControl): ValidationResult {
        if (control && control.value && control.value.length && control.value !== '' && control.value.length > 200) {
            return { 'maxLength': true };
        }

        return null;
    }

    static email(control: FormControl): ValidationResult {
        /* tslint:disable */
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:!#$%^&\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
        /* tslint:enable */
        if (control !== null) {
            if (control.value !== '' && !re.test(control.value)) {
                return { 'email': true };
            }
        }
        return null;
    }
    static maxLength100(control: FormControl): ValidationResult {
        return CustomValidator.maxStringLength(control, 100);
    }

    static maxLength500(control: FormControl): ValidationResult {
        return CustomValidator.maxStringLength(control, 500);
    }

    static maxLength50(control: FormControl): ValidationResult {
        return CustomValidator.maxStringLength(control, 50);
    }

    static maxLength45(control: FormControl): ValidationResult {
        return CustomValidator.maxStringLength(control, 45);
    }

    static maxLength250(control: FormControl): ValidationResult {
        return CustomValidator.maxStringLength(control, 250);
    }
    static rangeValidatorRT(control: FormControl): ValidationResult {
        if (control !== null) {
            if ( control.value > 1.00 || control.value < 0.00 )  return { 'rangeValidatorRT': true };
        }
        return null;
    }

    static rangeValidatorMass(control: FormControl): ValidationResult {
        if (control !== null && control.value !== '') {
            if ( control.value > 20.00 || control.value < 1 )  return { 'rangeValidatorMass': true };
        }
        return null;
    }

    static rangeValidatorIntensity(control: FormControl): ValidationResult {
        if (control !== null && control.value !== '') {
            if ( control.value < 10000  )  return { 'rangeValidatorIntensity': true };
        }
        return null;
    }

    static maxStringLength(control: FormControl, maxLength: Number): ValidationResult {
        if (control && control.value && control.value.length && control.value !== '' && control.value.length > maxLength) {
            let key = `maxLength${maxLength}`;
            let result: ValidationResult = {};
            result[key] = true;
            return result;
        }

        return null;
    }

    static factorUnitValidation(control: FormControl): ValidationResult {
        var pattern = /^[a-zA-Z\d\s(\)[\]\-.*/]+$/g;
        if (control !== null) {
            if (control.value !== '' && !pattern.test(control.value)) {
                return { 'factorUnitValidation': true };
            }
        }
        return null;
    }

    static startsWithAlpha(control: FormControl): ValidationResult {
        if (control !== null) {
            if (control.value !== '') {
                if(!/[a-zA-Z]/.test(control.value.charAt(0))) {
                    return { 'startsWithAlpha': true };
                }
            }
        }
        return null;
    }

    static factorCategoricalValueValidation(control: FormControl): ValidationResult {
        var pattern = /^[a-zA-Z\d\s(\)[\]/_-]+$/g;
        if (control !== null) {
            if (control.value !== '' && !pattern.test(control.value)) {
                return { 'factorCategoricalValueValidation': true };
            }
        }
        return null;
    }

    static shouldNotStartsWithSpace(control:FormControl):ValidationResult {
        if (control !== null) {
            if (control.value.charAt(0) === ' ') {
                return {'shouldNotStartsWithSpace': true};
            }
        }
        return null;
    }

    static alphaNumericWithSpace(control:FormControl):ValidationResult {
        var pattern = /^[a-zA-Z\d\s]+$/g;
        if (control !== null) {
            if (control.value !== '' && !pattern.test(control.value)) {
                return { 'alphaNumericWithSpace': true };
            }
        }
        return null;
    }

    static factorNameValidation(control:FormControl):ValidationResult {
        const pattern = /^[a-zA-Z\d\s(\)[\]_-]+$/g;
        if (control !== null) {
            if (control.value !== '' && !pattern.test(control.value)) {
                return {'containsSpecialCharsWithSpace': true};
            }
        }
        return null;
    }

    static pValueMaxValidation(control:FormControl):ValidationResult {
        if (control !== null) {
            if (control.value !== '' && !(parseFloat(control.value) >= 0 && parseFloat(control.value) <= 1)) {
                return {'pValueMaxValidation': true};
            }
        }
        return null;
    }

    static foldChangeValueMin(control:FormControl):ValidationResult {
        if (control !== null) {
            if (control.value !== '' && !(parseFloat(control.value) >= 1)) {
                return {'foldChangeValueMin': true};
            }
        }
        return null;
    }

    static log2FoldChangeValueMin(control:FormControl):ValidationResult {
        if (control !== null) {
            if (control.value !== '' && !(parseFloat(control.value) >= 0)) {
                return {'log2FoldChangeValueMin': true};
            }
        }
        return null;
    }

    static isValidGroupName(control:FormControl):ValidationResult {
        var pattern = /^[a-zA-Z-,\d-_(]+(\s{0,1}[a-zA-Z-0-9,\s'-()])*$/i;
        if (control !== null) {
            if (control.value !== '' && !pattern.test(control.value)) {
                return {'isValidGroupName': true};
            }
        }
        return null;
    }
}
