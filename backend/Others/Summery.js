const OpenAI = require('openai');
const anyscale = new OpenAI({
  baseURL: "https://api.endpoints.anyscale.com/v1",
  apiKey: "esecret_rbf677i4byyhcxll6ueqe829p2",
});

async function chat_complete(prompt) {
  const completion = await anyscale.chat.completions.create({
    model: "google/gemma-7b-it",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.1,
  });
  process.stdout.write(completion.choices[0]?.message?.content);
}

const textToSummarize = `
AbirAshabNiloy
Phone:01794406966
Email:bsse1315@iit.du.ac.bd
LinkedinID:AbirAshabNiloy
Address:Modhubazar,WestDhanmondi
EDUCATION
2022-PresentUNIVERSITYOFDHAKA
InstituteofInformationTechnology(IIT)
BSc.inSoftwareEngineering(BSSE)|CGPA-3.54/4(upto4thsemester)
2018-2020BIRSHRESHTHANOORMOHAMMADPUBLICCOLLEGE,PEELKHANA,DHAKA
HigherSecondaryCertificate(HSC)|GPA-5.00/5.00
2013-2018BANCHARAMPURSMPILOTHIGHSCHOOL,BANCHARAMPUR,BRAHMANBARIA
SecondarySchoolCertificate(SSC)|GPA-5.00/5.00
EXPERIENCE
01January2024-01march2024SoftwareEngineerTrainee,XPEEDLAB
●Madeatodolistapplicationusingreactandnode
●Madeablogapplicationusingnextandexpress
●Madeaportfolio,searchongoogleby‘abir-ashab.github.io’
●Workingonaprojectnamedvalidationmaster
FIELDSOFINTEREST
CompetitiveProgramming,MachineLearningandDataScience,WebDevelopment,History
COURSESTAKEN
DiscreteMathematics,DataStructureandAlgorithm,ObjectOrientedConcepts,DatabaseManagementSystem,
TheoryofComputing,ComputerNetworking,SoftwareRequirementsSpecificationandAnalysis,WebTechnology,
DesignPatterns,OperatingSystemandSystemProgramming,InformationSecurity,NumericalAnalysis,
ProbabilityandStatistics,CalculusandAnalyticGeometry,OrdinaryDifferentialEquations,Sociology.

PROJECTSANDCOCURRICULARACTIVITIES
1.MachineLearningAlgorithmsFromScratch
●ImplementedKNN,Kmeans,DecisionTree,RandomForestandLogisticRegression
●UsedC++andgraphicsvisualization
2.InternshipManagementSystem
●CollecteddatafromtopBDsoftwarecompanies
●UsingFullstackWebDevelopment
●Planningtomakeaplatformforinternship
3.CompetitiveProgramming
●Specialistatcodeforces(max-ratings:1440+)
●3*atcodechef(max-ratings:1700+)
EXTRACURRICULARACTIVITIES
1.Photography
contest.
2.Games
●Playindoorgames(tabletennis,badminton,carrom)
●Playoutdoorgames(cricket,football)
SKILLS
●FrontEnd:React,Next,HTML,CSS,JavaScript,Tailwind
●BackEnd:Node,Express
●Language:C,C++,Java,Python,Javascript
●Database:Sqlite,Mongodb,Postgresql
`;
const query = `Extract different segments from this resume: ${textToSummarize}`;
chat_complete(query);