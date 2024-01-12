import { useEffect, useState } from "react";
import Paragraph from "./Paragraph";

function Editor() {
  const [content, setContent] = useState("");
  const [paragraphText, setParagraphText] = useState<string[]>([]);
  useEffect(() => {
    setParagraphText(content.split(/\n+/));
  }, [content]);
  return (
    <div>
      <textarea
        onChange={(event) => setContent(event.target.value)}
        className='w-full border border-black'
      />
      {paragraphText.map((paragraph, index) => (
        <Paragraph paragraph={paragraph} key={index} />
      ))}
    </div>
  );
}

export default Editor;
