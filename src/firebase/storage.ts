import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./config";
import { v4 as uuidv4 } from 'uuid';

const storage = getStorage(app);

interface UploadPDFResponse {
  success: boolean;
  message?: string;
  url?: string;
}

export const uploadPDF = async (pdf: File, id: string): Promise<UploadPDFResponse> => {
  const pdf_Id = uuidv4();
  const storageRef = ref(storage, `user_${id}/files/${pdf_Id}`);
  const metadata = {
    contentType: "application/pdf",
  };

  try {
    const task = await uploadBytes(storageRef, pdf, metadata);
    const url = await getDownloadURL(task.ref);
    
    return {
      success: true,
      message: "PDF uploaded successfully.",
      url: url,
    };
  } catch (error) {
    console.error("Error uploading to Firebase:", error);
    
    return {
      success: false,
      message: "Error uploading PDF to Firebase.",
    };
  }
};
