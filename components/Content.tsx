import { PortableText } from "@portabletext/react";
import Image from 'next/image';

type ImageBlock = {
  asset: string;
  alt: string;
};

type ContentProps = {
  content: any;
};

const myPortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageBlock }) => {
      return (
        <div className="pb-4">
        <Image 
          src={value.asset} 
          alt={value.alt} 
          width={500} 
          height={248.43}
          quality={90}
          loading="lazy"
          className="rounded-lg shadow-md shadow-gray-500"

        />
        </div>
      );
    },
  },
};

export const Content: React.FC<ContentProps> = ({ content }) => {
  return (
    <div className="">
      <PortableText 
        value={content} 
        components={myPortableTextComponents} 
      />
    </div>
  );
};
