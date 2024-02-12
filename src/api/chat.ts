import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_BE_URL}/v1/chat/openAIstream`;

export async function streamMessages(file_id: string, message: string) {
  try {
    const reqData = { file_id, message };
    const res = await axios.post(url, JSON.stringify(reqData), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    console.log(res);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
