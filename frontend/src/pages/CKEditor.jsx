import React from "react";
import HeroBanner from "../components/hero/HeroBanner";
import EditorForm from "../components/ckEditor/CkEditorForm";

const CKEditor = () => {
  return (
    <>
      <HeroBanner
        headingText="CKEditor"
        paraText="Here are the CKeditor tool for editing"
      />
      <EditorForm />
    </>
  );
};

export default CKEditor;
