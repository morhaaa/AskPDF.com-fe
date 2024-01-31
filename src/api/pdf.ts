import { uploadPDF } from "@/firebase/storage";
import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_BE_URL}/v1/pdf`;

export async function postPDF(pdf: File, user_id: string, onProgress?: (progress: number) => void) {
  try {
    let totalProgress = 0;

    // Callback function to handle Firebase upload progress
    const firebaseUploadProgress = (fileUploadProgress: number) => {
      totalProgress = fileUploadProgress * 0.8;
      if (onProgress) {
        onProgress(totalProgress);
      }
    };

    // Upload PDF to Firebase
    const resFirebase = await uploadPDF(pdf, user_id, firebaseUploadProgress);

    if (resFirebase.success) {
      // Set progress to 80% after successful Firebase upload
      totalProgress = 80;

      const pdfData: PDF = {
        name: pdf.name,
        url: resFirebase.url!,
        createAt: new Date(),
        updateAt: new Date(),
        size: pdf.size,
      };

      // Send PDF metadata to the server
      const response = await axios.post(url, JSON.stringify(pdfData), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.success) {
        // Set progress to 100% after successful server response
        totalProgress = 100;
        if (onProgress) {
          onProgress(totalProgress);
        }
        // Return the server response data
        return response.data;
      }
    } else {
      // Return an error message if Firebase upload fails
      return { success: false, message: 'Error during upload to Firebase' };
    }
  } catch (error: any) {
    console.error('Error:', error);
    return { success: false, message: 'Error' };
  }
}

export async function getAllPDF(): Promise<PDF[]> {
  try {
    const res = await axios.get(`${url}/all`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (res.data) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getPDF(pdf_id: string): Promise<PDF | null> {
  try {
    const res = await axios.get(`${url}/${pdf_id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (res.data) {
      return res.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function deletePDF(pdf_id: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await axios.delete(`${url}/${pdf_id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (res.data.success) {
      return { success: true, message: 'Deleted successfully' };
    } else {
      return { success: false, message: 'Error deleting PDF' };
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
