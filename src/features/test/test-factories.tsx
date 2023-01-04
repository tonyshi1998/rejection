import { Question, QuestionStatus } from "../questions/questions-reducer";

export const createQuestion = (
    {
      status,
      question,
      askee,
      timestamp,
    }: {
      status?: QuestionStatus;
      question?: string;
      askee?: string;
      timestamp?: number;
    } = {}
  ) => {


      return {
      status: status || QuestionStatus.Accepted,
      question: question || "question",
      askee: askee || "askee",
      timestamp: timestamp || Math.random() * 1e6,
    } as Question
  };
