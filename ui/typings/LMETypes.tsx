/*
 * File: /home/geoff/KTDA/ui/typings/LMETpyes.tsx
 * Project: /home/geoff/KTDA/ui
 * Created Date: Sunday, May 15th 2022, 2:54:18 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * Last Modified: Sunday May 15th 2022 2:54:18 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffrey@swiftlab.tech> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Swift Lab Limited.
 * -----
 * Copyright (c) 2022 Swift Lab Limited.
 */
export interface ILME {
  id: number;
  factory: string;
  all_sales: {
    stove_price__sum: null | number;
  };
  name: string;
  email: string | null;
  no_of_employees: number;
  no_of_female_employees: 1;
  no_of_male_employees: 1;
  county: string;
  sub_county: string;
  ward: string;
  contact_person: string;
  year_of_birth: string;
  phone_number: string;
  date_created: string;
  date_modified: string;
  types_of_stove: [number];
}
