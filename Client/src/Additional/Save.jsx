import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";

function SaveToggle() {
  const [saved, setSaved] = useState(false);

  return (
    <button onClick={() => setSaved(!saved)}>
      {saved ? (
        <BookmarkCheck className="w-6 h-6 text-purple-600" />
      ) : (
        <Bookmark className="w-6 h-6 text-gray-600" />
      )}
    </button>
  );
}
export default SaveToggle