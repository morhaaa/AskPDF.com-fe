import axios from "axios";

export async function streamMessages(file_id: string, message: string) {
  try {
    const reqData = { file_id, message };
    await axios.post(
      `${process.env.NEXT_PUBLIC_BE_URL}/v1/chat/openAIstream`,
      JSON.stringify(reqData),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getMessages(file_id: string): Promise<IMessage[]> {
  try {
    const reqData = { file_id };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BE_URL}/v1/chat/loadMessages`,
      JSON.stringify(reqData),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    return res.data.messages;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getOldMessages(
  file_id: string,
  messageDate: Date
): Promise<IMessage[]> {
  try {
    const reqData = { file_id, messageDate };
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BE_URL}/v1/chat/loadOldMessages`,
      JSON.stringify(reqData),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data.messages;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
