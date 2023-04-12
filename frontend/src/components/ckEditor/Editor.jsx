import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import cloudinaryConfiguration from "../../config/Config";
import CloudinaryUploadAdapter from "./UploadAdapter";
import { fontFamilyArray, toolbarArray } from "../../utils";

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
      }}
      onReady={(editor) => {
        console.log("Ready.", editor);
        // configure uploadAdapter for image
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          return new CloudinaryUploadAdapter(loader);
        };
        // Configure the toolbar and plugins
        editor.config.toolbar = toolbarArray;
        editor.config.fontFamily = {
          options: fontFamilyArray,
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
