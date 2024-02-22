import React from "react";
import moment from "moment";

interface MessageSeparatorProps {
  currentDate: any;
  previousDate: any;
}

const MessageSeparator: React.FC<MessageSeparatorProps> = ({
  currentDate,
  previousDate,
}) => {
  // Check if the current message date is different from the previous message date
  const showSeparator =
    !previousDate || currentDate.toDateString() !== previousDate.toDateString();

  const isToday = moment(currentDate).isSame(moment(), "day");
  const formattedDate = isToday
    ? "Today"
    : moment(currentDate).format("DD/MM/YYYY");

  return (
    <>
      {showSeparator && (
        <div className="w-full flex items-center gap-4 justify-center my-4 px-4">
          <div className="flex-1 border-t"></div>
          <p className="text-xs font-semibold text-zinc-500 px-4 py-1 rounded">
            {formattedDate}
          </p>
          <div className="flex-1 border-t"></div>
        </div>
      )}
    </>
  );
};

export default MessageSeparator;
