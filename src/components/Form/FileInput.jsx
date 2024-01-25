import React from "react";
import wordFileIcon from "../../assets/file_icons/doc.svg";
import pdfFileIcon from "../../assets/file_icons/pdf.svg";
import xlsFileIcon from "../../assets/file_icons/xls.svg";
import imgFileIcon from "../../assets/file_icons/img.svg";
import unknFileIcon from "../../assets/file_icons/unkn.svg";
import { toast } from "react-toastify";

const FileInput = ({ file, setFile, label, placeholder, name }) => {
  const [fileIcon, setFileIcon] = React.useState(unknFileIcon);

  const handleFileChange = (e) => {
    if (e.target.files) {
      if (e.target.files[0].size / 1024 / 1024 > 2) {
        setFile(null);
        toast.error("Fayl hajmi 2 Mb dan oshmasligi kerak!");
        return;
      }
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
      const splitedName = e.target.files[0].name.split(".");
      console.log(splitedName[splitedName.length - 1]);
      setFileIcon(
        getFileIcon(
          e.target.files[0] == null ? "" : splitedName[splitedName.length - 1]
        )
      );
    }
  };

  const getFileIcon = (type) => {
    if (type === "doc" || type === "docx") return wordFileIcon;
    if (type === "pdf") return pdfFileIcon;
    if (type === "xls" || type === "xlsx") return xlsFileIcon;
    if (type === "png" || type === "jpg" || type === "jpeg") return imgFileIcon;
    return unknFileIcon;
  };

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
  return (
    <>
      <input
        onChange={handleFileChange}
        type='file'
        name={name}
        id='file'
        className='invisible w-[210px] h-0 overflow-hidden'
        accept='.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf'
      />
      <label htmlFor='file' className='w-full cursor-pointer'>
        <div className='flex flex-row justify-between items-center w-full h-fit p-3 relative rounded-2xl bg-forestydark-100/10 overflow-hidden'>
          <div className='flex flex-row items-center gap-3'>
            <img
              src={fileIcon}
              className='w-[40px]'
              style={{ opacity: file == null ? 0.5 : 1 }}
            />
            {!file ? (
              <span>Fayl tanlash</span>
            ) : (
              <span className='text-[14px] break-words w-[180px]'>
                {file.name}
              </span>
            )}
          </div>
          {file && (
            <span className='text-[14px] font-space dark:text-foresty-white/80 text-forestydark-300 mr-2'>
              {formatBytes(file.size)}
            </span>
          )}
        </div>
      </label>
    </>
  );
};

export default FileInput;
