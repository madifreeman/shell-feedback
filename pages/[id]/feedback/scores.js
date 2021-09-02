import FeedbackDashboardLayout from "../../../components/FeedbackDashboardLayout";
import Heading from "../../../components/Heading";
import { columnMeans } from "/utils/mean";
import { camelize } from "/utils/camelize";
// import { NextSeo } from 'next-seo';
// import { urlFor } from 'lib/sanity/helpers';
import Airtable from "airtable";

export async function getServerSideProps(context) {
  const airtableClient = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID);

  const categories = [
    "Knowledge",
    "Passion",
    "Leadership",
    "Competency",
    "Value Prop",
    "Branding",
    "Presentation",
    "Scale",
    "Differentiation",
    "Impact",
    "Patentable",
    "Themes",
    "Benefit",
    "Coachable",
    "Relevant",
    "Total",
  ];

  // Startup scores
  // Get average scores for startup
  const { id } = context.params;
  const startupScores = await airtableClient("Feedback Totals")
    .find(id)
    .then((record) => record.fields)
    .catch((err) => {
      console.error(err);
      return false;
    });
  const startup = { name: startupScores["Name"], id: startupScores["ID"] };
  const invest = {
    percentage: parseInt(startupScores["Invest Sum"]/startupScores["Invest Answers"] * 100),
    numResponses: startupScores["Invest Answers"],
  };

  const scores = {};
  categories.forEach(
    (cat) => (scores[camelize(cat)] = startupScores[cat].toFixed(2))
  );

  // Overall averages
  // Get all startups' average totals
  const allScoresRes = await airtableClient("Feedback Totals")
    .select({ view: "Full Score Details" })
    .all();

  // convert to matrix and find average of each column (each column corresponds to a category)
  const allScoresMatrix = allScoresRes.map(({ fields }) =>
    categories.map((cat) => fields[cat])
  );
  const categoryMeans = columnMeans(allScoresMatrix);

  // convert back to object
  const averages = {};
  categories.forEach(
    (cat, i) => (averages[camelize(cat)] = categoryMeans[i].toFixed(2))
  );

  return {
    props: { startup, scores, averages, invest },
  };
}

const ScoreCard = ({ question, score, average, invest }) => (
  <div className="flex flex-wrap w-full mt-2 mb-4 -m-2">
    <div className="w-full p-2 text-left">
      <div className="items-center h-full px-8 py-6 border border-gray-200 rounded">
        <h3 className="pb-1 text-base font-semibold text-gray-700">
          {question}
        </h3>
        <p className="text-base text-gray-700">
          You scored: <span className="font-semibold">{score}</span>
        </p>
        <p className="text-base text-gray-700">
          Average: <span className="font-semibold">{average}</span>
        </p>
      </div>
    </div>
  </div>
);

const SectionHeading = ({ title }) => (
  <h4 className="text-base font-semibold tracking-widest text-gray-500 uppercase">
    {title}
  </h4>
);

export default function FeedbackScores({ startup, scores, averages, invest }) {
  return (
    <>
      {/* <NextSeo
      title='Score Averages'
      openGraph={{
        images: [
          {
            url: urlFor(startup.image),
            width: 1200,
            height: 630,
          },
        ],
      }}
    /> */}
      <div className="bg-gray-100">
        <FeedbackDashboardLayout
          startup={startup}
          title="Score Averages"
          description={`Below you will find your averaged scores from each of the mentor feedback questions. The average for each question across all the teams is also displayed so that you can see how ${startup.name} compared to the other teams at Selection Days.`}
          selectedTab="Scores"
        >
          <div className="pt-6">
            <SectionHeading title="Overall" />
            <ScoreCard
              question="Your overall score for Selection Days"
              score={scores.total}
              average={averages.total}
            />
            <div className="flex flex-wrap w-full mt-2 mb-8 -m-2">
              <div className="w-full p-2 text-left">
                <div className="items-center h-full px-8 py-6 border border-gray-200 rounded">
                  <h3 className="pb-1 text-base font-semibold text-gray-700">
                    {invest.percentage}% of mentors indicated they would invest
                  </h3>
                  <p className="text-xs text-gray-700">({invest.numResponses} responses)</p>
                </div>
              </div>
            </div>
          </div>
          <SectionHeading title="Team & Ability" />
          <div className="flex flex-wrap mt-2 mb-8 -m-2">
            <ScoreCard
              question="Does the team have in-depth industry knowledge?"
              score={scores.knowledge}
              average={averages.knowledge}
            />
            <ScoreCard
              question="Does the team have the passion and vision to make their
                    idea successful?"
              score={scores.passion}
              average={averages.passion}
            />
            <ScoreCard
              question="Does the team exhibit strong leadership qualities?"
              score={scores.leadership}
              average={averages.leadership}
            />
            <ScoreCard
              question="Does the team have the range of competencies to deliver?"
              score={scores.competency}
              average={averages.competency}
            />
          </div>
          <SectionHeading title="Execution Power" />
          <div className="flex flex-wrap mt-2 mb-8 -m-2">
            <ScoreCard
              question="How clear is the team's customer value proposition?"
              score={scores.valueProp}
              average={averages.valueProp}
            />
            <ScoreCard
              question="How strong is the team's branding and story?"
              score={scores.branding}
              average={averages.branding}
            />
            <ScoreCard
              question="How strong is the team's presentation skills?"
              score={scores.presentation}
              average={averages.presentation}
            />
          </div>
          <SectionHeading title="Market & Product" />
          <div className="flex flex-wrap mt-2 mb-8 -m-2">
            <ScoreCard
              question="Do you believe this is an important/big enough problem to solve?"
              score={scores.scale}
              average={averages.scale}
            />
            <ScoreCard
              question="Has this team differentiated themselves from other solutions or alternatives?"
              score={scores.differentiation}
              average={averages.differentiation}
            />
            <ScoreCard
              question="How impactful do you think the team's product or service is?"
              score={scores.impact}
              average={averages.impact}
            />
            <ScoreCard
              question="Does the solution’s IP belong to the start-up, and/or do you see it being patentable in the future?"
              score={scores.patentable}
              average={averages.patentable}
            />
          </div>
          <SectionHeading title="Programme Benefit" />
          <div className="flex flex-wrap mt-2 mb-8 -m-2">
            <ScoreCard
              question="Does this start-up’s solution have strong linkages to the programme themes?"
              score={scores.themes}
              average={averages.themes}
            />
            <ScoreCard
              question="Will the team benefit a lot from joining the programme?"
              score={scores.benefit}
              average={averages.benefit}
            />
            <ScoreCard
              question="Is the team coachable?"
              score={scores.coachable}
              average={averages.coachable}
            />
          </div>
        </FeedbackDashboardLayout>
      </div>
    </>
  );
}

// export default FeedbackScores;
