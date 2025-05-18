// import React, {useState} from 'react';
// import style from './Variant.module.css'
//
// const Variant = ({variant, answer}) => {
//
//     const [isCorrect, setIsCorrect] = useState(false)
//     const [isSelected, setIsSelected] = useState(false)
//
//     function chooseVariant(e) {
//         setIsSelected(true)
//
//         if (variant.replace("<variant>", "") === answer) {
//             setIsCorrect(true)
//         }
//         else {
//             setIsCorrect(false)
//         }
//     }
//
//     return (
//         <li
//             tabIndex={0}
//             onClick={chooseVariant}
//             className={isCorrect ? `${style['variant']} ${style['correct']}` : style['variant']}
//         >
//             {variant.replace("<variant>", "")}
//         </li>
//     );
// };
//
// export default Variant;

import React, {useState} from 'react';
import style from './Variant.module.css'

const Variant = ({variant, answer, onCorrectAnswer}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    function chooseVariant() {
        // Only allow selection if not already selected
        if (!isSelected) {
            setIsSelected(true);
            const currentVariant = variant.replace("<variant>", "");
            const isAnswerCorrect = currentVariant === answer;

            setIsCorrect(isAnswerCorrect);

            // If correct, call the callback to increment id
            if (isAnswerCorrect) {
                onCorrectAnswer && onCorrectAnswer();
            } else {
                // If answer is incorrect, show which one was correct
                setShowCorrectAnswer(true);
            }
        }
    }

    // Determine the CSS class for the variant
    const getVariantClass = () => {
        if (!isSelected) return style['variant'];

        if (isCorrect) {
            return `${style['variant']} ${style['correct']}`;
        } else {
            return `${style['variant']} ${style['incorrect']}`;
        }
    };

    // Check if this is the correct answer that needs to be highlighted
    const isCorrectAnswer = variant.replace("<variant>", "") === answer;

    return (
        <li
            tabIndex={0}
            onClick={chooseVariant}
            className={
                showCorrectAnswer && isCorrectAnswer && !isSelected
                    ? `${style['variant']}`
                    : getVariantClass()
            }
        >
            {variant.replace("<variant>", "")}
        </li>
    );
};

export default Variant;