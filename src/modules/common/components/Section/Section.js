import SectionTitle from './SectionTitle';

const Section = ({ children, title }) => {
  return (
    <section>
      <SectionTitle title={title} />

      {children}
    </section>
  );
};

export default Section;
