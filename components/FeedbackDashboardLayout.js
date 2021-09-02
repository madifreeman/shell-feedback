import { CommentIcon, HandshakeIcon, InvestIcon } from "/public/icons";
import { ChartBarIcon, UserGroupIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Container from "./Container";
import Heading from "./Heading";
import { NextSeo } from 'next-seo';

const FeedbackMenu = ({ selectedTab, id }) => {
  const iconWidth = 5;
  const path = `/${id}/feedback`;
  const tabs = [
    {
      name: "Scores",
      icon: <ChartBarIcon className="w-5 h-5" />,
      link: `${path}/scores`,
    },
    {
      name: "Comments",
      icon: <CommentIcon width={iconWidth} />,
      link: `${path}/comments`,
    },
  ];

  return (
    <div className="px-8 py-6  bg-white rounded-lg shadow sm:px-10 sm:py-8">
      <h3 className="pb-3 text-base font-semibold tracking-widest text-gray-500 uppercase">
        Feedback
      </h3>
      <ul className="text-base font-medium tracking-wide text-gray-500">
        {tabs.map((tab) => {
          if (selectedTab === tab.name) {
            return (
              <li className="flex items-center py-2 group" key={tab.name}>
                <i
                  className="w-10 pr-2 text-xl text-center text-teal-500 group-hover:text-teal-400"
                  aria-hidden="true"
                >
                  {tab.icon}
                </i>
                <Link href={tab.link}>
                  <a className="text-black group-hover:text-teal-500">
                    {tab.name}
                  </a>
                </Link>
              </li>
            );
          }
          return (
            <li className="flex items-center py-2 group" key={tab.name}>
              <i
                className="w-10 pr-2 text-xl text-center text-gray-500 group-hover:text-teal-400"
                aria-hidden="true"
              >
                {tab.icon}
              </i>
              <Link href={tab.link}>
                <a className="group-hover:text-teal-500 ">{tab.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const FeedbackDashboardPageTitle = ({ startup, title, description }) => (
  <div className="pb-4">
    <h2 className="pb-2 text-xl font-semibold leading-none text-teal-500">
      {startup}
    </h2>
    <h3 className="pb-6 text-3xl font-semibold leading-none text-gray-900">
      {title}
    </h3>
    <p className="max-w-2xl text-base text-gray-700">{description}</p>
  </div>
);

const FeedbackDashboardLayout = ({
  children,
  startup,
  title,
  description,
  selectedTab,
}) => {
  const bgImage =
    "https://cdn.sanity.io/images/15z5b3ho/production/e17c938dec425b093825af9beee313b305169d0c-1920x1080.jpg?w=2000&h=2000&fit=max";
  return (
    <>
      <NextSeo
        title={title}
        openGraph={{
          images: [
            {
              url: bgImage,
              width: 1200,
              height: 630,
            },
          ],
        }}
      />
      <Heading
        pageTitle="Mentor Feedback"
        breadcrumbs={[{ title: selectedTab }]}
        bgImage={bgImage}
      />
      <Container>
        <div className="relative pb-24 pt-8 -mt-24">
          <div className="container mx-auto">
            <div className="flex flex-wrap -mx-4">
              <div className="z-10 w-full px-4 pb-8 md:w-full lg:w-1/3 xl:w-1/4">
                <FeedbackMenu selectedTab={selectedTab} id={startup.id} />
              </div>

              <div className="z-10 w-full px-4 md:w-full lg:w-2/3 xl:w-3/4">
                <div className="p-8 bg-white rounded-lg shadow sm:p-12">
                  <FeedbackDashboardPageTitle
                    startup={startup.name}
                    title={title}
                    description={description}
                  />
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FeedbackDashboardLayout;
