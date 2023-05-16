import { FormGroup } from '@angular/forms';


export const sumValidator = (limit: number, ...controlerName: string[]) => {
  console.log('Limit---', limit)
  return (formGroup: FormGroup) => {
    if (formGroup.value['share'] == 2) {
       
      const sum = controlerName.reduce((x, y) => x + parseFloat(formGroup.value[y] || '0'), 0)
      const status = limit !== sum;
       
      // Filter control Name to show error------------
      if (formGroup.value['role'] == 1) {
        controlerName = ['isp', 'dshare']
      }
      if (formGroup.value['role'] == 2) {
        controlerName = ['isp', 'dshare', 'sub_share']
      }
      if (formGroup.value['role'] == 3) {
        if (formGroup.value['re_type'] == 1) {
          controlerName = ['isp', 'reseller_share']
        }
        if (formGroup.value['re_type'] == 2 && formGroup.value['d1_type'] == 1) {
          controlerName = ['isp', 'dshare', 'reseller_share']
        }
        if (formGroup.value['re_type'] == 2 && formGroup.value['d1_type'] == 2) {
          controlerName = ['isp', 'dshare', 'sub_share', 'reseller_share']
        }
      }
      for (let ctrlName of controlerName) {
        const ctrl = formGroup.controls[ctrlName]
        if (ctrl.errors && !ctrl.errors.limitNotMatch) continue;
        if (status) {
          ctrl.setErrors({
            limitNotMatch: true
          });
        } else {
          ctrl.setErrors(null);
        }
      }
    }
  }
}

