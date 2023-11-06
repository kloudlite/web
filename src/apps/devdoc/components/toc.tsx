import type { Heading } from 'nextra';

const Toc = ({ headings }: { headings: Heading[] }) => {
  return (
    <div>
      <ul className="list-none flex flex-col gap-md">
        {headings.map((heading) => (
          <a key={heading.value} href={`#${heading.id}`}>
            {heading.value}
          </a>
        ))}
      </ul>
    </div>
  );
};

export default Toc;
