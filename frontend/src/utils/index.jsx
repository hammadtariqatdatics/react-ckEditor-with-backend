import HOME_PAGE from "../pages/Home";
import OpenEditor from "../pages/CKEditor";
import ViewCkEditorData from "../components/ckEditor/ViewCkEditorData";

const routes = [
  {
    id: 0,
    path: "/",
    element: <HOME_PAGE />,
  },
  {
    id: 1,
    path: "open-editor",
    element: <OpenEditor />,
  },
  {
    id: 2,
    path: "view-editor-data",
    element: <ViewCkEditorData />,
  },
];

const toolbarArray = [
  "heading",
  "|",
  "fontfamily",
  "|",
  "bold",
  "italic",
  "underline",
  "strikethrough",
];
const fontFamilyArray = [
  "default",
  "Ubuntu, Arial, sans-serif",
  "Roboto, Arial, sans-serif",
  "Oswald, Arial, sans-serif",
];

export { routes, fontFamilyArray, toolbarArray };
