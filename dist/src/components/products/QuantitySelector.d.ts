interface QuantitySelectorProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    label?: string;
    disabled?: boolean;
}
/** Accessible quantity stepper used on the product page and in the cart. */
export default function QuantitySelector({ value, onChange, min, max, label, disabled, }: QuantitySelectorProps): import("react").JSX.Element;
export {};
