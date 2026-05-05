/**
 * Stage 01: Fraction Village - Problem Data
 */

export const stage01Problems = [
    {
        id: "s01q01",
        type: "visual_to_fraction",
        question: "그림에서 색칠된 부분을 분수로 나타내어 보세요.",
        visual: { type: "pizza", total: 4, colored: 1 },
        correctAnswer: { numerator: "1", denominator: "4", whole: "" },
        difficulty: 1,
        hint: "전체 조각 수가 분모, 색칠된 조각 수가 분자예요.",
        explanation: "전체 4조각 중 1조각이 색칠되었으니 1/4입니다.",
        requiresHandwriting: false
    },
    {
        id: "s01q02",
        type: "visual_to_fraction",
        question: "이번에는 어떤 분수일까요?",
        visual: { type: "pizza", total: 6, colored: 3 },
        correctAnswer: { numerator: "3", denominator: "6", whole: "" },
        difficulty: 1,
        hint: "전체 6조각, 색칠된 3조각.",
        explanation: "3/6입니다.",
        requiresHandwriting: false
    },
    {
        id: "s01q03",
        type: "fraction_to_visual",
        question: "2/5만큼 색칠해 보세요.",
        visual: { type: "pizza", total: 5, colored: 0, interactive: true },
        correctAnswer: { numerator: "2", denominator: "5", whole: "" },
        difficulty: 2,
        hint: "5조각 중 2조각을 색칠하면 돼요.",
        explanation: "5조각 중 2조각이 색칠되어 2/5가 됩니다.",
        requiresHandwriting: false
    },
    {
        id: "s01q04",
        type: "visual_to_fraction",
        question: "전체 8칸 중 5칸이 색칠되어 있어요. 분수로 나타내면?",
        visual: { type: "bar", total: 8, colored: 5 },
        correctAnswer: { numerator: "5", denominator: "8", whole: "" },
        difficulty: 2,
        hint: "전체 8칸 중 5칸이 색칠되어 있어요.",
        explanation: "5/8입니다.",
        requiresHandwriting: false
    },
    {
        id: "s01q05",
        type: "comparison",
        question: "다음 중 똑같이 나뉜 그림은 어느 것일까요?",
        visual: {
            type: "multiple_choice_visual",
            options: [
                { id: 0, type: "pizza_unequal", total: 4 },
                { id: 1, type: "pizza", total: 4 },
                { id: 2, type: "pizza_unequal_v2", total: 4 }
            ]
        },
        correctAnswer: 1,
        difficulty: 2,
        hint: "분수가 되려면 모든 조각의 크기가 같아야 해요.",
        explanation: "분수는 '똑같이' 나누어야만 해요!",
        requiresHandwriting: false
    },
    {
        id: "s01q06",
        type: "visual_to_fraction",
        question: "직접 풀어 보세요. 색칠된 부분의 분수는?",
        visual: { type: "pizza", total: 8, colored: 3 },
        correctAnswer: { numerator: "3", denominator: "8", whole: "" },
        difficulty: 3,
        hint: "전체 조각과 색칠된 조각을 차분히 세어 보세요.",
        explanation: "3/8입니다.",
        requiresHandwriting: true
    },
    {
        id: "s01q07",
        type: "explanation",
        question: "분수란 무엇인지 자유롭게 적거나 그려보세요.",
        visual: { type: "blank_canvas" },
        correctAnswer: "free_form",
        difficulty: 4,
        hint: "전체를 똑같이 나누고, 그 중 일부를 표현하는 것이 분수예요.",
        explanation: "잘했어요! 분수의 의미를 이해했다면 1단계 완성!",
        requiresHandwriting: true
    }
];
