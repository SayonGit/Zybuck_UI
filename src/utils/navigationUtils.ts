import type { NavigateFunction } from "react-router-dom";

export type FormType = "flights" | "stay" | "car";

export const navigateToForm = (
  navigate: NavigateFunction,
  formType: FormType,
  preserveExistingParams: boolean = true
) => {
  let params: URLSearchParams;

  if (preserveExistingParams) {
    // Keep existing parameters but update the tab
    params = new URLSearchParams(window.location.search);
    params.set("tab", formType);
  } else {
    // Clear all parameters and set only the tab
    params = new URLSearchParams();
    params.set("tab", formType);
  }

  navigate(`/?${params.toString()}`);
};

export const getFormTypeFromUrl = (): FormType | null => {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab") as FormType;

  if (tab && ["flights", "stay", "car"].includes(tab)) {
    return tab;
  }

  return null;
};

export const isFormActive = (formType: FormType): boolean => {
  return getFormTypeFromUrl() === formType;
};
