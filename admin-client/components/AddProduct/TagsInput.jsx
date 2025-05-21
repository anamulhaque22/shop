import { useRef, useState } from "react";

export default function TagsInput({ tags, onSetTags }) {
  const [tag, setTag] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [typingInputWidth, setTypingInputWidth] = useState(0);
  const inputRef = useRef(null);
  const handleTag = (e) => {
    setTag(e.target.value);
    setShowInstructions(true);
    if (e.target.value === "") {
      setShowInstructions(false);
    }
    setTypingInputWidth(e.target.value.length);
  };
  const handleDivClick = () => {
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tag.trim() !== "") {
        onSetTags([...tags, tag.trim()]);
        setTag("");
        setTypingInputWidth(1);
      }
    } else if (e.key === "Backspace" && tag === "") {
      e.preventDefault();
      if (tags?.length > 0) {
        removeLastTag();
      }
    }
  };

  const removeLastTag = () => {
    onSetTags(tags.slice(0, -1));
  };

  const handleRemoveTag = (indexToRemove) => {
    onSetTags(tags.filter((_, index) => index !== indexToRemove));
  };
  return (
    <div className="flex flex-col relative overflow-hidden">
      <label htmlFor="tags" className="label label-text text-text">
        Tags:
      </label>

      <div
        className="min-h-10 h-10 cursor-text flex flex-row items-center w-full overflow-hidden align-middle input text-text input-bordered bg-secondary"
        onClick={handleDivClick}
      >
        {tags?.length > 0 && (
          <div className="inline">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-primary text-text px-2 py-1 rounded-md inline-block break-all align-middle mr-1 text-xs"
              >
                <div className="flex gap-x-2 items-center">
                  <p>{tag}</p>
                  <button
                    className="text-sm"
                    onClick={() => handleRemoveTag(index)}
                  >
                    x
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          value={tag}
          onChange={handleTag}
          id="tags"
          name="tags"
          className=" min-w-[3ch] -outline-offset-2 overflow-hidden min-h-10 h-10"
          style={{ width: `${typingInputWidth}ch` }}
          placeholder="Type here"
          onKeyDown={handleKeyDown}
        />
      </div>
      {showInstructions && (
        <div className="absolute top-full bg-secondary left-0 w-full border border-[#a6adbb33] z-50 px-2 py-1 rounded-md">
          <p className="text-text text-sm mt-2">
            Press Enter to add {tag !== "" && tag}
          </p>
        </div>
      )}
    </div>
  );
}
