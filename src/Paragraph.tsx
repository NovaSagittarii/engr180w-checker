import React from "react";
import { HasKey } from "./HasKey";
import Sentence from "./Sentence";

interface ParagraphProps extends HasKey {
  paragraph: string;
}
function Paragraph({ paragraph, key = -1 }: ParagraphProps) {
  const sentences = paragraph.split(/\. ?/).filter((x) => x);
  return (
    <div key={key} className='flex flex-row flex-wrap width-full'>
      <div className='w-10'></div>
      {sentences.map((sentence, index) => (
        <Sentence sentence={sentence} key={index} />
      ))}
    </div>
  );
}

export default Paragraph;
