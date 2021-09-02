import FeedbackDashboardLayout from "../../../components/FeedbackDashboardLayout";
// import { overallMean, columnMeans } from "/utils/mean";
// import { camelize } from "/utils/camelize";
// import { NextSeo } from 'next-seo';
// import { urlFor } from 'lib/sanity/helpers';
import FeedbackComment from "../../../components/Comment";
import Airtable from "airtable";

export async function getServerSideProps(context) {
  const airtableClient = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID);

  const { id } = context.params;
  const commentsRes = await airtableClient("Feedback Submissions")
    .select({
      view: "All Reviews",
      fields: ["Name", "Comments"],
      filterByFormula: `AND({ID (from Feedback Totals)} = '${id}', (NOT({Comments} = '')))`,
    })
    .all();

  return {
    props: {
      startup: { name: commentsRes[0].fields["Name"], id },
      comments: commentsRes.map((c) => c.fields["Comments"]),
    },
  };
}

export default function FeedbackComments({ startup, comments }) {
  return (
    <>
      <div className="bg-gray-100">
        <FeedbackDashboardLayout
          startup={startup}
          title="Mentor Comments"
          description={`Below you will find your averaged scores from each of the mentor feedback questions. The average for each question across all the teams is also displayed so that you can see how ${startup.name} compared to the other teams at Selection Days.`}
          selectedTab="Comments"
        >
          <ul className="pt-6">
            {comments.map((comment, i) => (
              <FeedbackComment
                comment={comment}
                key={i}
              />
            ))}
          </ul>
        </FeedbackDashboardLayout>
      </div>
    </>
  );
}

