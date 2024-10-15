import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

interface IProjectAboutProps {
  richText: string;
}

const ProjectAbout = ({ richText }: IProjectAboutProps) => {
  const parsedRichText = DOMPurify.sanitize(
    marked.parse(richText, { breaks: true }) as string,
  );

  return (
    <>
      <div className="flex-center gap-2 spread border-b-small pb-2">
        <div className="text-tinted fs-sm">About the Project</div>
      </div>
      <div
        id="description"
        className="mdc mt-4 font-normal leading-snug md:text-lg"
        dangerouslySetInnerHTML={{
          __html: parsedRichText,
        }}
      />
    </>
  );
};

export default ProjectAbout;
