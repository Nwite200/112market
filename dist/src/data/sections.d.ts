/** Extract unique categories from product catalogue */
export declare const getAllCategories: () => {
    [k: string]: string;
};
/** Extract unique brands from product catalogue */
export declare const getAllBrands: () => string[];
/** Extract specification options from product catalogue */
export declare const getSpecOptionsList: () => {
    id: string;
    label: string;
}[];
/** Extract coverage/delivery options from product catalogue */
export declare const getCoverageOptionsList: () => {
    id: string;
    label: string;
}[];
export declare const getConditionGradeLabel: (grade: string) => string;
