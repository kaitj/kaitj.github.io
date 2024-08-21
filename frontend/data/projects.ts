import ProjectProps from "../interfaces/projects";

const projData: ProjectProps[] = [
  {
    name: "AFIDS Validator",
    image:
      "https://github.com/afids/afids-validator/blob/master/afidsvalidator/static/lib/afidsvalidator-react/public/afids_banner.png?raw=true",
    description:
      "Web application for validation of anatomical fiducials",
    website: "https://validator.afids.io",
    github: "https://github.com/afids/afids-validator",
  },
  {
    name: "Snakebids",
    image:
      "https://user-images.githubusercontent.com/11492701/122223457-2c0bb580-ce81-11eb-8138-ee2c66302d39.png",
    description: "Package to build reproducible neuroimaging workflows",
    website: "https://snakebids.readthedocs.io/en/stable",
    github: "https://github.com/khanlab/snakebids",
  },
  {
    name: "OpenBB",
    image:
      "https://raw.githubusercontent.com/OpenBB-finance/OpenBBTerminal/develop/images/openbb_logo.png",
    description: "Open-source investment research software platform",
    website: "https://www.openbb.co",
    github: "https://github.com/OpenBB-finance/OpenBBTerminal",
  },
];

export default projData;
