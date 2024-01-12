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
      <div className='p-4 m-4 rounded-lg bg-white border border-black/20'>
        {paragraphText.map((paragraph, index) => (
          <Paragraph paragraph={paragraph} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Editor;
