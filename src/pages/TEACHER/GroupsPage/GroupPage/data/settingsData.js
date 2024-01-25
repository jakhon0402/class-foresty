export const switchesCourse = [
  {
    name: "isPublic",
    text: "Guruhni shaxsiy web sahifada ko'rsatish",
  },
  {
    name: "isVisiblePaymentsForTeacher",
    text: "O'quvchi to'lov ma'lumotlarini o'qituvchiga ko'rsatish",
  },
];

export const switchesSubject = [
  ...switchesCourse,
  {
    name: "autoMonthlyPayments",
    text: "Oylik to'lov ma'lumotlarini avtomatik shakllantirish",
  },
  {
    name: "autoLessonDays",
    text: "Dars kunlarini avtomatik shakllantirish",
  },
];
