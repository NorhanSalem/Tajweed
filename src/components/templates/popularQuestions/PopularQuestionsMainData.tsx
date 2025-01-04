/////////// IMPORTS
///
import { t } from "i18next";
import {
  BaseInputField,
  InnerFormLayout,
  TextAreaField,
} from "../../molecules";
import SelectTypePopularQuestions from "../../molecules/Select/SelectTypePopularQuestions";

export const PopularQuestionsMainData = () => {
  return (
    <>
      <InnerFormLayout title={`${t("Add")}`} showpopuptitle={true}>
        <div className="grid grid-cols-12 col-span-12 gap-2">
          <div className="col-span-4">
            <BaseInputField
              id="name"
              label={`${t("Question Arabic")}`}
              name="question_ar"
              type="text"
              placeholder={`${t("Question Arabic")}`}
              labelProps={{ className: "mb-1" }}
              className="mb-3"
              required
            />
          </div>
          <div className="col-span-4">
            <BaseInputField
              id="name"
              label={`${t("Question English")}`}
              name="question_en"
              type="text"
              placeholder={`${t("Question English")}`}
              labelProps={{ className: "mb-1" }}
              className="mb-3"
              required
            />
          </div>
          <div className="col-span-4">
            <SelectTypePopularQuestions
              name="type"
              label={`${t("type")}`}
              placeholder={`${t("type")}`}
            />
          </div>
          <div className="col-span-12">
            <TextAreaField
              id="answer_ar"
              name="answer_ar"
              label={`${t("Answer Ar")}`}
              placeholder={`${t("Answer Ar")}`}
              rows={4}
            />
          </div>
          <div className="col-span-12">
            <TextAreaField
              id="answer_en"
              name="answer_en"
              label={`${t("Answer En")}`}
              placeholder={`${t("Answer En")}`}
              rows={4}
            />
          </div>
        </div>
      </InnerFormLayout>
    </>
  );
};
