import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "./config";
import { v4 as uuidv4 } from 'uuid';

const storage = getStorage(app);

interface UploadPDFResponse {
  success: boolean;
  message?: string;
  url?: string;
}

export const uploadPDF = async (pdf: File, id: string, onProgress?: (progress: number) => void): Promise<UploadPDFResponse> => {
  const pdf_Id = uuidv4();
  const storageRef = ref(storage, `user_${id}/files/${pdf_Id}`);
  const metadata = {
    contentType: "application/pdf",
  };

  try {
    const task = uploadBytesResumable(storageRef, pdf, metadata);

    task.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      
      //callback function
      if (onProgress) {
        onProgress(progress);
      }
    });

    await task;

    const url = await getDownloadURL(storageRef);
    
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
