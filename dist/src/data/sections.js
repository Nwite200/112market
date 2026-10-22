import { CATEGORIES, BRANDS, SPEC_OPTIONS, COVERAGE_OPTIONS } from "./c7";
/** Extract unique categories from product catalogue */
export const getAllCategories = () => {
    const categoryMap = new Map();
    // Add from explicit categories data
    CATEGORIES.forEach((c) => categoryMap.set(c.slug, c.label));
    return Object.fromEntries(categoryMap);
};
/** Extract unique brands from product catalogue */
export const getAllBrands = () => {
    const brandSet = new Set();
    // Collect brands from all product data files
    // Brands are re-exported from c7.ts
    return BRANDS;
};
/** Extract specification options from product catalogue */
export const getSpecOptionsList = () => {
    return SPEC_OPTIONS;
};
/** Extract coverage/delivery options from product catalogue */
export const getCoverageOptionsList = () => {
    return COVERAGE_OPTIONS;
};
export const getConditionGradeLabel = (grade) => {
    const GRADE_LABEL = {
        A: "Grade A – Like New",
        B: "Grade B – Minor Signs",
        C: "Grade C – Value Tier",
    };
    return GRADE_LABEL[grade] || grade;
};
