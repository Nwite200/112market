import type { ConditionGrade } from "../../types"
import { getConditionGradeShort } from "../../services/sections"

const TONES: Record<ConditionGrade, string> = {
  A: "bg-brand-100 text-brand-800 ring-brand-200",
  B: "bg-accent-100 text-accent-800 ring-accent-200",
  C: "bg-stone-100 text-stone-700 ring-stone-200",
}

/** Badge that shows the used-item condition grade. */
export default function ConditionBadge({
  grade,
  className = "",
}: {
  grade: ConditionGrade
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide ring-1 ${TONES[grade]} ${className}`}
    >
      {getConditionGradeShort(grade)}
    </span>
  )
}
