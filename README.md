# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Application URL: http://ec2-44-252-94-190.us-west-2.compute.amazonaws.com
📋 Table of Contents

Overview
Architecture
Technologies Used
Prerequisites
Project Structure
Local Development
CI/CD Pipeline
Deployment
Environment Variables
Monitoring
Contributing
License

🔍 Overview
This project demonstrates a production-ready React application built with Vite and deployed using AWS services. The CI/CD pipeline automatically builds, tests, and deploys the application to an EC2 instance whenever code is pushed to the main branch.
Key Features

⚡ Fast Development - Vite for lightning-fast builds and HMR
🔄 Automated Deployment - Complete CI/CD pipeline with AWS
🛡️ Security Best Practices - IAM roles, secure credentials management
📊 Monitoring - CloudWatch integration for logs and metrics
🌐 Production Ready - Nginx reverse proxy, SSL-ready
📱 Responsive Design - Mobile-first approach

🏗️ Architecture
Developer → GitHub → CodePipeline → CodeBuild → CodeDeploy → EC2 → Users
                         ↓
                    S3 (Artifacts)


 
AWS Services Used

CodePipeline: Orchestrates the entire CI/CD workflow
CodeBuild: Builds the React application using Node.js
CodeDeploy: Deploys the application to EC2 instances
EC2: Hosts the application on Amazon Linux 2
S3: Stores build artifacts
IAM: Manages service permissions and roles
CloudWatch: Provides logging and monitoring

🛠️ Technologies Used
Frontend

React 18 - UI library
Vite - Build tool and dev server
JavaScript/JSX - Programming language
CSS3 - Styling
HTML5 - Markup

Backend/Infrastructure

Node.js 20 - Runtime environment
Nginx - Web server and reverse proxy
Amazon Linux 2 - Operating system
AWS CLI - AWS command line interface

DevOps

Git/GitHub - Version control
AWS CodePipeline - CI/CD orchestration
AWS CodeBuild - Build automation
AWS CodeDeploy - Deployment automation

📚 Prerequisites
Before setting up this project, ensure you have:

AWS Account with appropriate permissions
GitHub repository with your React + Vite code
Basic knowledge of AWS services
Node.js 18+ installed locally

Required AWS Permissions

CodePipeline, CodeBuild, CodeDeploy access
EC2 instance management
S3 bucket creation and management
IAM role creation and management

📁 Project Structure
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utility functions
│   └── main.jsx           # Application entry point
├── scripts/               # Deployment scripts
│   ├── install_dependencies.sh
│   ├── start_server.sh
│   ├── stop_server.sh
│   └── validate_service.sh
├── buildspec.yml          # CodeBuild configuration
├── appspec.yml           # CodeDeploy configuration
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md            # Project documentation
💻 Local Development
Setup

Clone the repository

bash   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

Install dependencies

bash   npm install

Set up environment variables

bash   cp .env.example .env
   # Edit .env with your actual values

Start development server

bash   npm run dev

Open your browser

   http://localhost:5173
Available Scripts

npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build
npm run lint - Run ESLint

🔄 CI/CD Pipeline
Pipeline Stages

Source Stage

Triggers on push to main branch
Downloads source code from GitHub


Build Stage

Installs Node.js dependencies
Runs npm run build
Creates deployment artifacts


Deploy Stage

Deploys to EC2 instances
Runs deployment scripts
Validates deployment



Pipeline Configuration
The pipeline is configured using these files:
buildspec.yml
yamlversion: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 20
    commands:
      - npm install
  build:
    commands:
      - npm run build
      - cp appspec.yml dist/
      - cp -r scripts dist/
artifacts:
  files:
    - '**/*'
  base-directory: 'dist'
appspec.yml
yamlversion: 0.0
os: linux
files:
  - source: /
    destination: /var/www/html
    overwrite: yes
permissions:
  - object: /var/www/html
    owner: nginx
    group: nginx
    mode: 755
hooks:
  BeforeInstall:
    - location: scripts/install_dependencies.sh
      timeout: 300
      runas: root
  ApplicationStart:
    - location: scripts/start_server.sh
      timeout: 300
      runas: root
  ValidateService:
    - location: scripts/validate_service.sh
      timeout: 300
      runas: root
🚀 Deployment
Manual Deployment
To deploy manually:

Trigger Pipeline

bash   git push origin main

Monitor Progress

Check AWS CodePipeline console
View build logs in CodeBuild
Monitor deployment in CodeDeploy



Automatic Deployment
The pipeline automatically deploys when:

Code is pushed to the main branch
Pull requests are merged to main

Rollback
To rollback to a previous version:

Go to CodeDeploy console
Select your application
Choose "Redeploy" with a previous revision

🔐 Environment Variables
Required Variables
Create a .env file with these variables:
env# Google APIs (if using)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_GOOGLE_PLACES_API_KEY=your_google_places_api_key

# Firebase (if using)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id

# Other APIs
VITE_API_BASE_URL=https://your-api.com
Production Environment
For production, store sensitive variables in:

AWS Systems Manager Parameter Store
AWS Secrets Manager
Environment variables in CodeBuild

📊 Monitoring
CloudWatch Logs
Monitor your application with CloudWatch:

CodeBuild Logs: /aws/codebuild/react-app-build
CodeDeploy Logs: Available in CodeDeploy console
Application Logs: /var/log/nginx/

Health Checks
The deployment includes health checks:

Nginx status validation
Application response check
Port availability check

🤝 Contributing

Fork the repository
Create a feature branch

bash   git checkout -b feature/amazing-feature

Commit your changes

bash   git commit -m 'Add some amazing feature'

Push to the branch

bash   git push origin feature/amazing-feature

Open a Pull Request

Development Guidelines

Follow existing code style
Write meaningful commit messages
Update documentation for new features
Test your changes locally before pushing

📝 Troubleshooting
Common Issues

Build Fails

Check Node.js version in buildspec.yml
Verify all dependencies are in package.json
Check CodeBuild logs for specific errors


Deployment Fails

Verify CodeDeploy agent is running on EC2
Check IAM role permissions
Validate appspec.yml syntax


Application Not Accessible

Check EC2 security group allows HTTP (port 80)
Verify Nginx is running: sudo systemctl status nginx
Check application logs



Useful Commands
bash# Check CodeDeploy agent status
sudo service codedeploy-agent status

# View deployment logs
sudo tail -f /var/log/aws/codedeploy-agent/codedeploy-agent.log

# Check Nginx status
sudo systemctl status nginx

# View application logs
sudo tail -f /var/log/nginx/access.log
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
📞 Support
If you have any questions or need help with setup:

Check the Issues page
Create a new issue with detailed description
Include relevant logs and error messages

🙏 Acknowledgments

React team for the amazing library
Vite team for the fast build tool
AWS for reliable cloud infrastructure
Open source community for inspiration


Built with ❤️ using React + Vite and AWS
