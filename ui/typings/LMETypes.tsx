/*
 * File: /home/geoff/KTDA/ui/typings/LMETpyes.tsx
 * Project: /home/geoff/KTDA/ui
 * Created Date: Sunday, May 15th 2022, 2:54:18 pm
 * Author: Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )
 * -----
 * Last Modified: Sunday May 15th 2022 2:54:18 pm
 * Modified By:  Geoffrey Nyaga Kinyua ( <geoffreynyagagk@gmail.com> )
 * -----
 * This file should not be copied and/or distributed without the express
 * permission of Geoffrey Nyaga Kinyua.
 * -----
 * Copyright (c) 2022 Geoffrey Nyaga Kinyua.
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
    age_group: string;
    phone_number: string;
    date_created: string;
    date_modified: string;
    types_of_stove: [number];
}

export interface IMonthlySales {
    lme: number;
    factory: string;
    month: string;
    month_string: string;
    year_number: number;
    jiko_kisasa: number;
    kcj: number;
    multipurpose: number;
    liners: number;
    rocket: number;
}

interface ICNM {
    course_name: string;
    factory: string;
    venue: string;
    lme_attendees: number[];
    start_date: string;
    end_date: string;
    number_of_attendees: number;
    number_of_female_attendees: number;
    number_of_male_attendees: number;
    number_below_20: number;
    number_20_29: number;
    number_30_39: number;
    number_40_49: number;
    number_50_59: number;
    number_60_69: number;
    number_70_79: number;
    number_80_above: number;
}
