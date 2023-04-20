import React from "react";
import HeroBanner from "../components/hero/HeroBanner";
import EditorForm from "../components/ckEditor/CkEditorForm";

const CKEditor = () => {
  return (
    <>
      <HeroBanner
        headingText="CKEditor"
        paraText="You have to purchase Membership to post Article"
      />
      <EditorForm />
    </>
  );
};

export default CKEditor;
