import { FunctionComponent } from "react";
import { FormikErrors } from "formik";

interface IUploadFile {
  data: { image?: File };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<{ image?: File }>> | Promise<void>;
  errors: FormikErrors<{ image?: File }>;
}

const UploadFile: FunctionComponent<IUploadFile> = ({
  data,
  setFieldValue,
  errors,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          const fileDataUrl = event.target.result as string;

          // Set the actual image data (e.g., base64 data URL) in your form field
          setFieldValue("image", fileDataUrl);
        }
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        name="image"
        accept="image/png, .svg"
        // onChange={(e) => {
        //   if (e.currentTarget.files) {
        //     setFieldValue("image", e.currentTarget.files[0]);
        //   }
        // }}
        onChange={handleFileChange}
      />
      {errors.image && (
        <>
          <br />
          <span id="error">{errors.image}</span>
          <br />
        </>
      )}
    </div>
  );
};

export default UploadFile;
