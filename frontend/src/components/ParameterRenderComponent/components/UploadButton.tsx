import React, { useRef, useState } from "react";
import Button from "@mui/joy/Button";

import closeCircled from "@assets/images/close-circled.svg";

function UploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleClearFile = () => {
    setFile(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <div>
        {file && (
          <div className="relative pl-2 pb-2 flex items-baseline justify-between before:content-[''] before:absolute  before:left-0 before:w-[4px] before:h-[4px] before:bg-blue-500 before:rounded-full before:-top-[-0.6rem]">
            <span>
              {file.name} - {(file.size / 1024).toFixed(1)} KB
            </span>
            <img
              src={closeCircled}
              className="w-3 h-3"
              onClick={handleClearFile}
            />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={handleChange}
        multiple
      />
      <Button className="w-full" onClick={handleClick}>
        Upload
      </Button>
    </div>
  );
}

export default UploadButton;
