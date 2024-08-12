import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../env/config";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full h-full flex flex-col">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name ={name || "Content:"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={config.tinyMCEKey}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'print', 'preview', 'anchor',
                'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar:
               'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              skin: "oxide-dark",
              content_css: "dark",
              
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
