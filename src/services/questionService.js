import {useEffect, useState} from "react";
import {useQuestionStore} from "../store/questionStore";

export const getQuestion = (id) => {
    const question = useQuestionStore.getState().questions
    return question[0];
}

export const getVariants = (questionId) => {

}