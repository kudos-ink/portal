import { title, subtitle } from "@/components/primitives";
import Search from "../components/search";

const searchItems = [ //TODO: improve
  { value: "senior", emoji: "👵", label: "Senior" },
  { value: "engineer", emoji: "🤓", label: "Engineer" },
  { value: "dev", emoji: "🤓", label: "Developer" },
  { value: "finance", emoji: "💰", label: "Finance" },
  { value: "sys-admin", emoji: "♾️", label: "Sys Admin" },
  { value: "javascript", emoji: "☕️", label: "JavaScript" },
  // { value: "exec", emoji: "💼", label: "Executive" },
  { value: "backend", emoji: "🍑", label: "Backend" },
  { value: "golang", emoji: "🐀", label: "Golang" },
  { value: "cloud", emoji: "☁️", label: "Cloud" },
  // { value: "medical", emoji: "🚑", label: "Medical" },
  { value: "front-end", emoji: "🎨", label: "Front End" },
  { value: "full-stack", emoji: "🥞", label: "Full Stack" },
  { value: "ops", emoji: "♾️", label: "Ops" },
  { value: "design", emoji: "🎨", label: "Design" },
  { value: "react", emoji: "⚛️", label: "React" },
  { value: "infosec", emoji: "🔑", label: "InfoSec" },
  { value: "marketing", emoji: "🚥", label: "Marketing" },
  { value: "mobile", emoji: "📱", label: "Mobile" },
  { value: "content-writing", emoji: "✍️", label: "Content Writing" },
  { value: "saas", emoji: "📦", label: "SaaS" },
  { value: "recruiter", emoji: "🎯", label: "Recruiter" },
  { value: "full-time", emoji: "⏰", label: "Full Time" },
  { value: "api", emoji: "🤖", label: "API" },
  // { value: "sales", emoji: "💼", label: "Sales" },
  { value: "ruby", emoji: "💎", label: "Ruby" },
  { value: "education", emoji: "👨‍🏫", label: "Education" },
  { value: "devops", emoji: "♾️", label: "DevOps" },
  { value: "stats", emoji: "👩‍🔬", label: "Stats" },
  { value: "python", emoji: "🐍", label: "Python" },
  { value: "node", emoji: "🔗", label: "Node" },
  // { value: "english", emoji: "🇬🇧", label: "English" },
  { value: "non-tech", emoji: "🔌", label: "Non Tech" },
  { value: "video", emoji: "📼", label: "Video" },
  // { value: "travel", emoji: "🎒", label: "Travel" },
  { value: "quality-assurance", emoji: "🔬", label: "Quality Assurance" },
  // { value: "ecommerce", emoji: "🛍", label: "Ecommerce" },
  { value: "teaching", emoji: "👨‍🏫", label: "Teaching" },
  { value: "linux", emoji: "🐧", label: "Linux" },
  { value: "java", emoji: "☕️", label: "Java" },
  { value: "crypto", emoji: "🏅", label: "Crypto" },
  { value: "junior", emoji: "👶", label: "Junior" },
  { value: "git", emoji: "📦", label: "Git" },
  { value: "legal", emoji: "👩‍⚖️", label: "Legal" },
  { value: "android", emoji: "🤖", label: "Android" },
  // { value: "accounting", emoji: "💼", label: "Accounting" },
  // { value: "admin", emoji: "♾️", label: "Admin" },
  // { value: "microsoft", emoji: "🖼", label: "Microsoft" },
  // { value: "excel", emoji: "📗", label: "Excel" },
  { value: "php", emoji: "🐘", label: "PHP" }
];

export default function Home() {
  return (
    <div>
      <section className="flex flex-col items-center py-8 md:py-10">
        <h1 className={title()}>Find Collaborations,</h1>
        <h1 className={title()}>Collect Kudos</h1>
      </section>
      <div className="flex flex-col items-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <Search placeholder="Search" emoji="🔍" items={searchItems} />
          <h2 className={subtitle({ class: "mt-4" })}>Banner</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex justify-start gap-4">
          <div>
            <h2 className={subtitle({ class: "mt-4" })}>Filter 1</h2>
          </div>
          <div>
            <h2 className={subtitle({ class: "mt-4" })}>Filter 2</h2>
          </div>
          <div>
            <h2 className={subtitle({ class: "mt-4" })}>Filter 3</h2>
          </div>
          <div>
            <h2 className={subtitle({ class: "mt-4" })}>Clear</h2>
          </div>
        </div>
        <div className="flex justify-end">
          <div>
            <h2 className={subtitle({ class: "mt-4" })}>Sort</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
