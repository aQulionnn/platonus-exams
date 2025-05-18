import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";

export const useQuestionStore = create(
    persist(
        (set) => ({
            questions: [],
            setQuestions: (data) => set({
                questions: data
            }),
        }),
        {
            name: "questions",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)