import type { ConditionGrade } from "../../types";
/** Badge that shows the used-item condition grade. */
export default function ConditionBadge({ grade, className, }: {
    grade: ConditionGrade;
    className?: string;
}): import("react").JSX.Element;
