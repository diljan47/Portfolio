"use client";
import Image from "next/image";
import { useState } from "react";
import { GoLinkExternal } from "react-icons/go";

interface ProjectProps {
  number: string;
  date: string;
  title: string;
  desc: string;
  tech: string[];
  images: string[];
  links: { label: string; url: string }[];
  showImages?: boolean;
}

export default function Project({
  number,
  date,
  title,
  desc,
  tech,
  links,
  images,
  showImages = false,
}: ProjectProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="border border-black">
      <div>
        <div className="p-4 space-y-2">
          <div className="font-mono text-base md:text-lg text-accent-blue font-normal">
            #{number} [ {date} ]
          </div>
          <div className="flex items-center gap-4">
            <h3 className="font-mono text-xl md:text-2xl leading-tight font-light">
              {title}
            </h3>
            <a
              href={links[0].url}
              target="_blank"
              className="hover:text-accent-blue transition-colors"
            >
              <GoLinkExternal size={20} className="mb-1 " />
            </a>
          </div>
          <p className="font-mono text-sm md:text-base leading-tight font-normal">
            {desc}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] border-t border-black">
          <div>
            {showImages && (
              <>
                <div className="relative w-full h-[200px] md:h-[300px] bg-neutral-100">
                  <Image
                    src={images[currentImage]}
                    alt={`Image ${currentImage + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-fill"
                    priority
                  />
                  <div className="hidden">
                    {images.map(
                      (src, index) =>
                        index !== currentImage && (
                          <Image
                            key={src}
                            src={src}
                            alt={`Preload ${index + 1}`}
                            width={1200}
                            height={630}
                            priority
                          />
                        )
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 text-center border-t border-black">
                  <button
                    onClick={prevImage}
                    className="font-mono text-xs md:text-sm hover:text-accent-blue py-2 md:py-3 border-r border-black"
                  >
                    [ prev ]
                  </button>
                  <span className="font-mono text-xs md:text-sm py-2 md:py-3">
                    {currentImage + 1} / {images.length}
                  </span>
                  <button
                    onClick={nextImage}
                    className="font-mono text-xs md:text-sm hover:text-accent-blue py-2 md:py-3 border-l border-black"
                  >
                    [ next ]
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="p-2 md:p-3 font-mono text-base md:text-lg bg-black text-white">
            <div className="space-y-1 md:space-y-2 mb-3 md:mb-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  className="block hover:text-gray-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-3 md:pt-4 border-t border-white/30">
              <div className="text-xs md:text-sm text-gray-400 mb-2">
                Stacks Used:
              </div>
              <div className="space-y-1">
                {tech.map((item, index) => (
                  <div key={index} className="text-xs md:text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
