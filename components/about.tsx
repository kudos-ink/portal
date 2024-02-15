import { Link } from "@nextui-org/link";

const ABOUT_TITLE = "About Kudos";

const About = () => (
  <>
    <Link href="#about" aria-label={ABOUT_TITLE} title={ABOUT_TITLE}>
      <h2 id="about" className="text-2xl md:text-3xl md:leading-normal">
        About <span className="font-sansBlack">Kudos</span>
      </h2>
    </Link>
    <div className="mt-6 grid gap-12 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <p>
          Kudos is a platform designed to streamline the process of onboarding
          new developers to the Polkadot Ecosystem.
        </p>
        <p>
          We make it simple to browse, search and filter open GitHub
          contributions across the entire ecosystem, allowing aspiring
          contributors to find projects and tasks, which match their skill level
          and interests.
        </p>
        <p>
          In addition, we provide project maintainers the ability to tag open
          contributions with custom incentives, ranging from native tokens,
          NFT’s, POAP’s and many more!
        </p>
        <br />
        <p>
          Kudos is working to develop the new emerging narrative:{" "}
          <strong className="text-primary">Agile Devtime</strong>.
        </p>
        <p>
          We want to provide projects with the ability to rapidly and flexibly
          increase their workforce on demand. Whether it’s to take advantage of
          a new grant, or to polish up existing features allowing the core team
          to focus on more fruitful endeavours, we want to provide the
          infrastructural and organisational layer to make this possibility a
          reality.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p>Our work spans a wide range of areas, including:</p>
        <ul className="list-disc pl-4 space-y-4">
          <li>
            <strong>Unified Repository Access</strong>: The portal consolidates
            repositories from the entire ecosystem into a single platform,
            providing a comprehensive view without the need to navigate through
            GitHub,
          </li>
          <li>
            <strong>Project Categorisation</strong>: The portal allows for
            refined searches based on specific interests and programming
            languages, enabling users to easily find projects that align with
            their skills and passions,
          </li>
          <li>
            <strong>Issue Curation</strong>: Kudos will actively collaborate
            with projects to curate sets of high quality issues which provide
            all of the necessary context to allow a contributor to begin work,
          </li>
          <li>
            <strong>Custom Incentives</strong>: We offer project maintainers the
            chance to utilise our smart contract templates along with
            customisable Github Workflows, allowing issues to be tagged with
            incentives which can later be automatically claimed by the
            contributor once the contribution has been accepted.
          </li>
        </ul>
      </div>
    </div>
  </>
);

export default About;
