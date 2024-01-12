import { HasKey } from "./HasKey";
import Sentence from "./Sentence";

interface ParagraphProps extends HasKey {
  paragraph: string;
}
function Paragraph({ paragraph, key }: ParagraphProps) {
  const sentences = paragraph.split(/\. ?/);
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
