import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Heading from "@ckeditor/ckeditor5-heading/src/heading";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import cloudinaryConfiguration from "../../config/Config";
import CloudinaryUploadAdapter from "./UploadAdapter";
import { fontFamilyArray, toolbarArray, codeSnippet } from "../../utils";

const MyEditor = ({ field, form }) => {
  const onEditorChange = (event, editor) => {
    const data = editor.getData();
    form.setFieldValue(field.name, data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        cloudServices: cloudinaryConfiguration,
        // plugins: [CodeBlock],
        toolbar: toolbarArray,
        fontFamily: {
          options: fontFamilyArray,
        },
        codeBlock: {
          languages: [
            { language: "plaintext", label: "Plain text" },
            { language: "javascript", label: "JavaScript" },
            { language: "html", label: "HTML" },
            { language: "css", label: "CSS" },
          ],
        },
      }}
      onReady={(editor) => {
        console.log("Ready.", editor);
        // configure uploadAdapter for image
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          return new CloudinaryUploadAdapter(loader);
        };
      }}
      onChange={onEditorChange}
      onBlur={(editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(editor) => {
        console.log("Focus.", editor);
      }}
    />
  );
};

export default MyEditor;
