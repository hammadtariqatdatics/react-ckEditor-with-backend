import HOME_PAGE from "../pages/Home";
import OpenEditor from "../pages/CKEditor";
import ViewCkEditorData from "../components/ckEditor/ViewCkEditorData";
import Membership from "../pages/Membership";
import Support from "../pages/Support";

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
  {
    id: 3,
    path: "membership",
    element: <Membership />,
  },
  {
    id: 4,
    path: "support",
    element: <Support />,
  },
];

const codeSnippet = {
  languages: [
    { language: "plaintext", label: "Plain text" },
    { language: "javascript", label: "JavaScript" },
    { language: "html", label: "HTML" },
    { language: "css", label: "CSS" },
  ],
};

const toolbarArray = [
  "heading",
  "|",
  "bold",
  "italic",
  "link",
  "bulletedList",
  "numberedList",
  "blockQuote",
  "ckfinder",
  "|",
  "imageTextAlternative",
  "imageUpload",
  "imageStyle:side",
  "|",
  "mediaEmbed",
  "insertTable",
  "tableColumn",
  "tableRow",
  "mergeTableCells",
  "|",
  "undo",
  "redo",
  "codeBlock",
];

const fontFamilyArray = [
  "default",
  "Ubuntu, Arial, sans-serif",
  "Roboto, Arial, sans-serif",
  "Oswald, Arial, sans-serif",
];

function calculateReadingTime(content) {
  const wordsPerMinute = 250;
  const wordCount = content?.split(/\s+/g).length;
  const readingTimeMinutes = wordCount / wordsPerMinute;
  const readingTimeSeconds = readingTimeMinutes * 60;
  const readingTime = Math.ceil(readingTimeSeconds);
  return readingTime;
}

const linksStyle = {
  color: "#ff3366",
  textDecoration: "none",
};

export {
  routes,
  fontFamilyArray,
  toolbarArray,
  codeSnippet,
  calculateReadingTime,
  linksStyle,
};
