import {useFormikContext} from "formik";
import {t} from "i18next";
import {
    BaseInputField,
    InnerFormLayout,
} from "../../molecules";
import {DropFile} from "../../molecules/files/DropFile";
import SelectCategoryBlog from "../../molecules/Select/SelectCategoryBlog";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
    UploadAdapter,
    FileLoader,
} from "@ckeditor/ckeditor5-upload/src/filerepository";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import {useState,} from "react";
import {Editor} from "ckeditor5";
import axios from "axios";
import {useEffect} from "react";

function uploadAdapter(loader: FileLoader): UploadAdapter {
    return {
        upload: () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const file = await loader.file;
                    const response = await axios.request({
                        method: "POST",
                        url: `${"/api/"}/upload_files`,
                        data: {
                            files: file,
                        },
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    resolve({
                        default: `${HOST}/${response.data.filename}`,
                    });
                } catch (error) {
                    reject("Hello");
                }
            });
        },
        abort: () => {
        },
    };
}

function uploadPlugin(editor: Editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: FileLoader) => {
        return uploadAdapter(loader);
    };
}

function BlogsMainData({hideHeader, setRemoved, updateData, resetForm}: any) {
    const {values, setFieldValue} = useFormikContext<any>();
    const [editorDataAr, setEditorDataAr] = useState(values.description_ar || "");
    const [editorDataEn, setEditorDataEn] = useState(values.description_en || "");

    useEffect(() => {
        setEditorDataAr(values.description_ar || "");
        setEditorDataEn(values.description_en || "");
    }, [values.description_ar, values.description_en]);

    return (
        <>
            <InnerFormLayout
                title={`${t("Add")}`}
                showpopuptitle={!hideHeader}
                customStyle={hideHeader ? "max-h-[auto]" : ""}
            >
                <div className="col-span-12 gap-3 grid grid-cols-12">
                    <div className="col-span-12 md:col-span-4">
                        <BaseInputField
                            id="name"
                            label={`${t("Title Arabic")}`}
                            name="title_ar"
                            type="text"
                            placeholder={`${t("Title Arabic")}`}
                            labelProps={{className: "mb-1"}}
                            className=" input-style-maining "
                            required
                        />
                    </div>
                    <div className="col-span-12 md:col-span-4">
                        <BaseInputField
                            id="email"
                            label={`${t("Title English")}`}
                            name="title_en"
                            type="text"
                            placeholder={`${t("Title English")}`}
                            labelProps={{className: "mb-1"}}
                            className="input-style-maining "
                            required
                        />
                    </div>
                    <div className="col-span-12 md:col-span-4">
                        <SelectCategoryBlog
                            name="category_id"
                            label={`${t("choose category")}`}
                        />
                    </div>
                    <div className="col-span-12">
                        <div>
                            <h1 className="my-[10px] text-mainBlack text-lg">
                                {t("Description Arabic")}
                            </h1>

                            <CKEditor
                                editor={ClassicEditor}
                                id="description_ar"
                                data={editorDataAr}
                                config={{
                                    extraPlugins: [uploadPlugin],
                                    toolbar: [
                                        "undo",
                                        "redo",
                                        "|",
                                        "heading",
                                        "|",
                                        "fontfamily",
                                        "fontsize",
                                        "fontColor",
                                        "fontBackgroundColor",
                                        "|",
                                        "bold",
                                        "italic",
                                        "strikethrough",
                                        "subscript",
                                        "superscript",
                                        "code",
                                        "-",
                                        "|",
                                        "alignment",
                                        "link",
                                        "blockQuote",
                                        "codeBlock",
                                        "|",
                                        "bulletedList",
                                        "numberedList",
                                        "todoList",
                                        "outdent",
                                        "indent",
                                    ],
                                    heading: {
                                        options: [
                                            {
                                                model: "paragraph",
                                                title: "Paragraph",
                                                class: "ck-heading_paragraph",
                                            },
                                            {
                                                model: "heading1",
                                                view: "h1",
                                                title: "Heading 1",
                                                class: "ck-heading_heading1",
                                            },
                                            {
                                                model: "heading2",
                                                view: "h2",
                                                title: "Heading 2",
                                                class: "ck-heading_heading2",
                                            },
                                            {
                                                model: "heading3",
                                                view: "h3",
                                                title: "Heading 3",
                                                class: "ck-heading_heading3",
                                            },
                                            {
                                                model: "heading4",
                                                view: "h4",
                                                title: "Heading 4",
                                                class: "ck-heading_heading4",
                                            },
                                            {
                                                model: "heading5",
                                                view: "h5",
                                                title: "Heading 5",
                                                class: "ck-heading_heading5",
                                            },
                                            {
                                                model: "heading6",
                                                view: "h6",
                                                title: "Heading 6",
                                                class: "ck-heading_heading6",
                                            },
                                        ],
                                    },
                                    list: {
                                        properties: {
                                            styles: true,
                                            startIndex: true,
                                            reversed: true,
                                        },
                                    },
                                    fontFamily: {
                                        options: [
                                            "default",
                                            "Arial, Helvetica, sans-serif",
                                            "Courier New, Courier, monospace",
                                            "Georgia, serif",
                                            "Lucida Sans Unicode, Lucida Grande, sans-serif",
                                            "Tahoma, Geneva, sans-serif",
                                            "Times New Roman, Times, serif",
                                            "Trebuchet MS, Helvetica, sans-serif",
                                            "Verdana, Geneva, sans-serif",
                                        ],
                                        supportAllValues: true,
                                    },

                                    htmlSupport: {
                                        allow: [
                                            {
                                                name: /.*/,
                                                attributes: true,
                                                classes: true,
                                                styles: true,
                                            },
                                        ],
                                    },
                                    htmlEmbed: {
                                        showPreviews: true,
                                    },
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setFieldValue("description_ar", data);
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div>
                            <h1 className="my-[10px] text-mainBlack text-lg">
                                {t("Description English")}
                            </h1>
                            <CKEditor
                                editor={ClassicEditor}
                                id="description_ar"
                                data={editorDataEn}
                                config={{
                                    extraPlugins: [uploadPlugin],
                                    toolbar: [
                                        "undo",
                                        "redo",
                                        "|",
                                        "heading",
                                        "|",
                                        "fontfamily",
                                        "fontsize",
                                        "fontColor",
                                        "fontBackgroundColor",
                                        "|",
                                        "bold",
                                        "italic",
                                        "strikethrough",
                                        "subscript",
                                        "superscript",
                                        "code",
                                        "-",
                                        "|",
                                        "alignment",
                                        "link",
                                        "blockQuote",
                                        "codeBlock",
                                        "|",
                                        "bulletedList",
                                        "numberedList",
                                        "todoList",
                                        "outdent",
                                        "indent",
                                    ],
                                    heading: {
                                        options: [
                                            {
                                                model: "paragraph",
                                                title: "Paragraph",
                                                class: "ck-heading_paragraph",
                                            },
                                            {
                                                model: "heading1",
                                                view: "h1",
                                                title: "Heading 1",
                                                class: "ck-heading_heading1",
                                            },
                                            {
                                                model: "heading2",
                                                view: "h2",
                                                title: "Heading 2",
                                                class: "ck-heading_heading2",
                                            },
                                            {
                                                model: "heading3",
                                                view: "h3",
                                                title: "Heading 3",
                                                class: "ck-heading_heading3",
                                            },
                                            {
                                                model: "heading4",
                                                view: "h4",
                                                title: "Heading 4",
                                                class: "ck-heading_heading4",
                                            },
                                            {
                                                model: "heading5",
                                                view: "h5",
                                                title: "Heading 5",
                                                class: "ck-heading_heading5",
                                            },
                                            {
                                                model: "heading6",
                                                view: "h6",
                                                title: "Heading 6",
                                                class: "ck-heading_heading6",
                                            },
                                        ],
                                    },
                                    list: {
                                        properties: {
                                            styles: true,
                                            startIndex: true,
                                            reversed: true,
                                        },
                                    },
                                    fontFamily: {
                                        options: [
                                            "default",
                                            "Arial, Helvetica, sans-serif",
                                            "Courier New, Courier, monospace",
                                            "Georgia, serif",
                                            "Lucida Sans Unicode, Lucida Grande, sans-serif",
                                            "Tahoma, Geneva, sans-serif",
                                            "Times New Roman, Times, serif",
                                            "Trebuchet MS, Helvetica, sans-serif",
                                            "Verdana, Geneva, sans-serif",
                                        ],
                                        supportAllValues: true,
                                    },

                                    htmlSupport: {
                                        allow: [
                                            {
                                                name: /.*/,
                                                attributes: true,
                                                classes: true,
                                                styles: true,
                                            },
                                        ],
                                    },
                                    htmlEmbed: {
                                        showPreviews: true,
                                    },
                                }}
                                onReady={(editor) => {
                                    console.log("Editor Ready to use!", editor);
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setFieldValue("description_en", data);
                                }}
                                onBlur={(event, editor) => {
                                    console.log("Blur.", editor);
                                }}
                                onFocus={(event, editor) => {
                                    console.log("Focus.", editor);
                                }}
                            />
                        </div>
                    </div>
                    <div className="g col-span-4 gap-4">
                        <h2 className="dark:text-white"> {`${t("image")}`}</h2>
                        <DropFile name="image" setRemoved={setRemoved}/>
                    </div>
                    <div className="g col-span-4 gap-4">
                        <h2 className="dark:text-white"> {`${t("cover")}`}</h2>
                        <DropFile name="cover" setRemoved={setRemoved}/>
                    </div>
                </div>
            </InnerFormLayout>
        </>
    );
}

export default BlogsMainData;
